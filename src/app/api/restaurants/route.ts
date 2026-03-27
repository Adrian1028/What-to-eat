import { NextRequest, NextResponse } from "next/server";
import { getRedisClient, RESTAURANT_CACHE_TTL } from "@/lib/redis";
import type { Restaurant } from "@/types/database";

/**
 * BFF API Route: GET /api/restaurants
 *
 * Proxies restaurant search to Google Places (or Yelp) so that:
 *   1. API keys never leave the server
 *   2. No CORS issues from the client
 *   3. Results are cached in Redis with TTL < 24h (data compliance)
 *
 * Query params:
 *   lat       — latitude (required)
 *   lng       — longitude (required)
 *   radius    — search radius in metres (default 1000)
 *   keyword   — optional search keyword
 *   open_now  — "true" to filter only open restaurants
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || "1000";
  const keyword = searchParams.get("keyword") || "";
  const openNow = searchParams.get("open_now") === "true";

  // ---- Validate required params ----
  if (!lat || !lng) {
    return NextResponse.json(
      { error: "lat and lng query parameters are required" },
      { status: 400 }
    );
  }

  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  if (isNaN(latNum) || isNaN(lngNum) || latNum < -90 || latNum > 90 || lngNum < -180 || lngNum > 180) {
    return NextResponse.json(
      { error: "Invalid lat/lng values" },
      { status: 400 }
    );
  }

  // ---- Build cache key (grid-snapped to ~111m for privacy & hit rate) ----
  const gridLat = (Math.round(latNum * 1000) / 1000).toFixed(3);
  const gridLng = (Math.round(lngNum * 1000) / 1000).toFixed(3);
  const cacheKey = `restaurants:${gridLat}:${gridLng}:${radius}:${keyword}:${openNow}`;

  // ---- Check Redis cache first ----
  try {
    const redis = getRedisClient();
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json({
        restaurants: JSON.parse(cached) as Restaurant[],
        source: "cache",
      });
    }
  } catch {
    // Redis unavailable — fall through to API
  }

  // ---- Call Google Places Nearby Search ----
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfiguration: missing API key" },
      { status: 500 }
    );
  }

  const googleUrl = new URL(
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
  );
  googleUrl.searchParams.set("location", `${latNum},${lngNum}`);
  googleUrl.searchParams.set("radius", radius);
  googleUrl.searchParams.set("type", "restaurant");
  googleUrl.searchParams.set("key", apiKey);
  if (keyword) googleUrl.searchParams.set("keyword", keyword);
  if (openNow) googleUrl.searchParams.set("opennow", "");

  try {
    const res = await fetch(googleUrl.toString(), { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error(`Google API responded with ${res.status}`);
    }

    const data = await res.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    // ---- Transform to internal Restaurant shape ----
    const restaurants: Restaurant[] = (data.results || []).map(
      (place: Record<string, unknown>) => {
        const geo = place.geometry as { location: { lat: number; lng: number } };
        const rLat = geo.location.lat;
        const rLng = geo.location.lng;

        // Haversine distance
        const dLat = ((rLat - latNum) * Math.PI) / 180;
        const dLng = ((rLng - lngNum) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos((latNum * Math.PI) / 180) *
            Math.cos((rLat * Math.PI) / 180) *
            Math.sin(dLng / 2) ** 2;
        const distance_m = Math.round(
          6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        );

        return {
          place_id: place.place_id as string,
          name: place.name as string,
          rating: (place.rating as number) ?? 0,
          price_level: place.price_level as number | undefined,
          distance_m,
          travel_time_min: Math.max(1, Math.round(distance_m / 80)), // ~walking speed estimate
          latitude: rLat,
          longitude: rLng,
          address: (place.vicinity as string) ?? "",
          categories: ((place.types as string[]) ?? []).slice(0, 3),
          is_open:
            (place.opening_hours as { open_now?: boolean })?.open_now ?? null,
        };
      }
    );

    // ---- Store in Redis (volatile, TTL < 24h) ----
    try {
      const redis = getRedisClient();
      await redis.set(
        cacheKey,
        JSON.stringify(restaurants),
        "EX",
        RESTAURANT_CACHE_TTL
      );
    } catch {
      // Redis write failure is non-critical
    }

    return NextResponse.json({ restaurants, source: "api" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to fetch restaurants: ${message}` },
      { status: 502 }
    );
  }
}
