import { handlers } from '@/src/lib/auth/authConfig';

export const { GET, POST } = handlers;

/* For testing:
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("req ip:", req.ip);
  return NextResponse.json({ message: "GET" });
}

export async function POST(req: NextRequest) {
  console.log("req ip:", req.ip);
  const data = await req.json();
  return NextResponse.json({ message: "POST", data });
}
*/
