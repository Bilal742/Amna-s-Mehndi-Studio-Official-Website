import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Incoming = {
  name: string;
  email: string;
  rating: number;
  review: string;
  images?: string[]
  createdAt?: string;
};

const DATA_DIR = path.resolve(process.cwd(), "data");
const UPLOAD_DIR = path.resolve(process.cwd(), "public", "uploads");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");

function ensureDirs() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  if (!fs.existsSync(REVIEWS_FILE)) fs.writeFileSync(REVIEWS_FILE, "[]");
}

export async function POST(req: Request) {
  ensureDirs();

  try {
    const body: Incoming = await req.json();

    if (!body.name || !body.email || !body.rating || body.rating < 1) {
      return NextResponse.json({ error: "Name, email and rating required" }, { status: 400 });
    }

    const savedImagePaths: string[] = [];

    if (body.images && body.images.length) {
      for (let i = 0; i < body.images.length; i++) {
        const dataUrl = body.images[i];
        const matches = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
        if (!matches) continue;
        const ext = matches[1].split("/")[1];
        const base64 = matches[2];
        const filename = `review-${Date.now()}-${i}.${ext}`;
        const filePath = path.join(UPLOAD_DIR, filename);
        fs.writeFileSync(filePath, Buffer.from(base64, "base64"));
        savedImagePaths.push(`/uploads/${filename}`);
      }
    }

    const raw = fs.readFileSync(REVIEWS_FILE, "utf-8");
    const arr = JSON.parse(raw) as any[];

    const newReview = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      rating: body.rating,
      review: body.review ?? "",
      images: savedImagePaths,
      createdAt: body.createdAt ?? new Date().toISOString(),
    };

    arr.unshift(newReview);
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(arr, null, 2), "utf-8");

    return NextResponse.json({ ok: true, review: newReview }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Server error" }, { status: 500 });
  }
}

export async function GET() {
  ensureDirs();
  try {
    const raw = fs.readFileSync(REVIEWS_FILE, "utf-8");
    const arr = JSON.parse(raw);
    return NextResponse.json(arr);
  } catch (err: any) {
    return NextResponse.json([], { status: 200 });
  }
}
