import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const REVIEWS_FILE = path.join(process.cwd(), "data", "reviews.json");

export async function GET() {
  try {
    if (!fs.existsSync(REVIEWS_FILE)) {
      return NextResponse.json({ count: 0 });
    }
    const raw = fs.readFileSync(REVIEWS_FILE, "utf-8");
    const arr = JSON.parse(raw);
    return NextResponse.json({ count: arr.length });
  } catch (err) {
    return NextResponse.json({ count: 0 });
  }
}
