import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";

/**
 * BFF API Route: GET /api/geocode
 *
 * Reverse-geocodes coordinates via LocationIQ.
 * Used to display a human-readable location name on the UI.
 *
 * Query params:
 *   lat — latitude (required)
 *   lng — longitude (required)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "lat and lng are required" },
      { status: 400 }
    );
  }

  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  if (isNaN(latNum) || isNaN(lngNum)) {
    return NextResponse.json(
      { error: "Invalid lat/lng values" },
      { status: 400 }
    );
  }

  // Grid-snap for cache hits (~111m precision)
  const gridLat = (Math.round(latNum * 1000) / 1000).toFixed(3);
  const gridLng = (Math.round(lngNum * 1000) / 1000).toFixed(3);
  const cacheKey = `geocode:${gridLat}:${gridLng}`;

  // Check cache
  try {
    const redis = getRedisClient();
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json({ address: cached, source: "cache" });
    }
  } catch {
    // Redis unavailable
  }

  const apiKey = process.env.LOCATIONIQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfiguration: missing LocationIQ key" },
      { status: 500 }
    );
  }

  try {
    const url = `https://us1.locationiq.com/v1/reverse?key=${encodeURIComponent(apiKey)}&lat=${latNum}&lon=${lngNum}&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`LocationIQ returned ${res.status}`);

    const data = await res.json();
    const address = (data.display_name as string) || "Unknown location";

    // Cache for 24h
    try {
      const redis = getRedisClient();
      await redis.set(cacheKey, address, "EX", 60 * 60 * 24);
    } catch {
      // non-critical
    }

    return NextResponse.json({ address, source: "api" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Geocode failed: ${message}` },
      { status: 502 }
    );
  }
}
