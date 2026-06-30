import type { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "portfolio-admin-session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "dev-admin-session";
}

// Utilise Web Crypto API (compatible Edge Runtime)
async function hmac(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(getSessionSecret());
  const valueData = encoder.encode(value);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, valueData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function createAdminSessionToken() {
  const issuedAt = Date.now().toString();
  const signature = await hmac(issuedAt);
  return `${issuedAt}.${signature}`;
}

export async function verifyAdminSessionToken(token: string | undefined) {
  if (!token) {
    return false;
  }

  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) {
    return false;
  }

  const expected = await hmac(issuedAt);

  // Timing-safe comparison simple
  if (signature !== expected) {
    return false;
  }

  const age = Date.now() - Number(issuedAt);
  return Number.isFinite(age) && age <= SESSION_TTL_MS;
}

export async function isAdminRequest(request: NextRequest) {
  return await verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}
