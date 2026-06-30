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

// Whitelist des types MIME autorisés
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: "Non autorisé." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Aucun fichier envoyé." }, { status: 400 });
  }

  // Vérifier le type MIME
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      { message: `Type de fichier non autorisé. Types acceptés: ${ALLOWED_MIME_TYPES.join(", ")}` },
      { status: 400 }
    );
  }

  // Vérifier la taille
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { message: `Fichier trop volumineux. Taille max: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
      { status: 400 }
    );
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
