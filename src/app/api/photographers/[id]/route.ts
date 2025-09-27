import { NextRequest, NextResponse } from "next/server";
import data from "@/lib/db.json";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (isNaN(Number(id))) {
    return NextResponse.json({ message: "Invalid ID" });
  }

  return NextResponse.json(data.photographers[Number(id)]);
}
