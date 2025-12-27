import { NextResponse } from "next/server";
import { DevAuthStore } from "../_store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email || "").trim();
  const password = String(body?.password || "");

  const res = DevAuthStore.login(email, password);
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: res.error }, { status: 401 });
  }

  const token = "dev-session-" + crypto.randomUUID();
  return NextResponse.json({
    ok: true,
    token,
    user: res.user,
  });
}
