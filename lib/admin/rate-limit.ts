/**
 * Rate Limiter simple en mémoire pour l'authentification admin
 * En production, utiliser Redis ou Vercel KV
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup toutes les 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Rate limiter pour login admin
 * @param identifier - IP ou identifiant unique
 * @param maxAttempts - Nombre max de tentatives (défaut: 5)
 * @param windowMs - Fenêtre de temps en ms (défaut: 15 min)
 */
export function checkRateLimit(
  identifier: string,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000,
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || entry.resetAt < now) {
    // Nouvelle fenêtre
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + windowMs,
    };
    rateLimitStore.set(identifier, newEntry);

    return {
      success: true,
      remaining: maxAttempts - 1,
      resetAt: newEntry.resetAt,
    };
  }

  // Fenêtre active
  if (entry.count >= maxAttempts) {
    return {
      success: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count++;

  return {
    success: true,
    remaining: maxAttempts - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Obtenir l'IP du client (compatible Vercel)
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}
