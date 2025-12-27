import { NextResponse } from "next/server";
import { DevAuthStore } from "../_store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email || "").trim();

  const res = DevAuthStore.requestPasswordReset(email);

  if ("token" in res && res.token) {
    const url = new URL(req.url);
    const resetLink = `${url.origin}/reset-password?token=${res.token}`;
    console.log("DEV RESET LINK:", resetLink);
  }

  return NextResponse.json({ ok: true, message: "Als dit e-mailadres bestaat, sturen we een link." });
}
