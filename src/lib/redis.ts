import Redis from "ioredis";

let redis: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redis) {
    const url = process.env.REDIS_URL || "redis://localhost:6379";
    redis = new Redis(url, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        if (times > 3) return null;
        return Math.min(times * 200, 2000);
      },
    });
  }
  return redis;
}

/** Maximum TTL for volatile restaurant data — 24 hours in seconds */
export const RESTAURANT_CACHE_TTL = 60 * 60 * 24;
