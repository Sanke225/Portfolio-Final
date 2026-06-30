import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin/session";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: await isAdminRequest(request) });
}
