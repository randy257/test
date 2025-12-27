import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, token } = await req.json();

  if (!email || !token) {
    return NextResponse.json({ ok: false, error: "Missing data" }, { status: 400 });
  }

  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "Bouwapp <no-reply@jouwdomein.nl>",
    to: email,
    subject: "Verifieer je e-mail",
    html: `
      <p>Hallo,</p>
      <p>Klik op de knop om je e-mail te verifiëren.</p>
      <p>
        <a href="${verifyUrl}">Verifieer e-mail</a>
      </p>
      <p>Deze link verloopt na 24 uur.</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
