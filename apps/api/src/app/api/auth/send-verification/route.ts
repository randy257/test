import { NextResponse } from "next/server";
import { DevAuthStore } from "../_store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email || "").trim();

  const res = DevAuthStore.requestEmailVerification(email);

  if ("token" in res && res.token) {
    const url = new URL(req.url);
    const verifyLink = `${url.origin}/verify-email?token=${res.token}`;
    console.log("DEV VERIFY LINK:", verifyLink);
  }

  return NextResponse.json({ ok: true });
}
