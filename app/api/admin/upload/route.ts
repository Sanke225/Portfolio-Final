import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin/session";

export const runtime = "nodejs";

function sanitizeFilename(filename: string) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: "Non autorisé." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Aucun fichier envoyé." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = sanitizeFilename(file.name || "upload");
  const uniquePrefix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const directory = path.join(process.cwd(), "public", "uploads");
  const fileName = `${uniquePrefix}-${safeName}`;
  const filePath = path.join(directory, fileName);

  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(filePath, buffer);

  return NextResponse.json({
    url: `/uploads/${fileName}`,
    name: fileName,
    type: file.type,
    size: file.size,
  });
}
