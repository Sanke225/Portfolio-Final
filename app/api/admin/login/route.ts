import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminSessionToken } from "@/lib/admin/session";
import { checkRateLimit, getClientIp } from "@/lib/admin/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // Rate limiting par IP
  const clientIp = getClientIp(request);
  const rateLimitResult = checkRateLimit(clientIp);

  if (!rateLimitResult.success) {
    const resetIn = Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000 / 60);
    return NextResponse.json(
      {
        message: `Trop de tentatives. Réessayez dans ${resetIn} minute(s).`,
        retryAfter: rateLimitResult.resetAt,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  const { password } = (await request.json()) as { password?: string };
  const expectedPassword = process.env.ADMIN_PASSWORD;

  // Vérifier que ADMIN_PASSWORD est défini en production
  if (!expectedPassword) {
    console.error("[SECURITY] ADMIN_PASSWORD not set in environment");
    return NextResponse.json(
      { message: "Configuration serveur invalide." },
      { status: 500 },
    );
  }

  if (!password || password !== expectedPassword) {
    return NextResponse.json(
      {
        message: "Mot de passe invalide.",
        remaining: rateLimitResult.remaining,
      },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: await createAdminSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
