import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin/session";
import { getSiteContent, saveSiteContent } from "@/lib/site-content/server";
import type { SiteContent } from "@/lib/site-content/types";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  // Sécuriser la lecture du contenu admin
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ message: "Non autorisé." }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ message: "Non autorisé." }, { status: 401 });
  }

  const content = (await request.json()) as SiteContent;
  const saved = await saveSiteContent(content);

  return NextResponse.json({ content: saved });
}
