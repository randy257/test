import { NextResponse } from "next/server";
import { DevAuthStore } from "../_store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const token = String(body?.token || "").trim();
  const newPassword = String(body?.newPassword || "");

  if (newPassword.length < 8) {
    return NextResponse.json({ ok: false, error: "Wachtwoord moet minimaal 8 tekens zijn" }, { status: 400 });
  }

  const res = DevAuthStore.resetPassword(token, newPassword);
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: res.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
