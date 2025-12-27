import { NextResponse } from "next/server";
import { DevAuthStore } from "../_store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const token = String(body?.token || "").trim();

  const res = DevAuthStore.verifyEmail(token);
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: res.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
