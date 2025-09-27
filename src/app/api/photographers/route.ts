import { NextResponse } from "next/server";
import data from "@/lib/db.json";

export async function GET() {
  return NextResponse.json(data.photographers);
}
