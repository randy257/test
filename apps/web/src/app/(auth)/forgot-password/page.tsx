"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const eMail = email.trim();
    if (!eMail || !eMail.includes("@")) {
      setMsg("Vul een geldig e-mailadres in.");
      return;
    }

    setBusy(true);
    try {
      await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: eMail }),
      });

      setMsg(
        "Als dit e-mailadres bestaat, ontvang je een reset link. In de ontwikkelomgeving staat deze in de terminal."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
        <div className="w-full">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-yellow-400" />
            <div className="text-lg font-semibold tracking-tight text-black">
              Bouwapp
            </div>
          </div>

          <div className="auth-card rounded-2xl border border-black/10 bg-white p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xl font-semibold tracking-tight text-black">
                  Wachtwoord vergeten
                </div>
                <div className="mt-1 text-sm text-black/60">
                  Vul je e-mail in om een reset link te ontvangen.
                </div>
              </div>

              <div className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-700">
                Reset
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-black">E-mail</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15"
                  placeholder="naam@bedrijf.nl"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>

              {msg ? (
                <div className="rounded-xl border border-blue-600/20 bg-blue-600/10 px-4 py-3 text-sm text-black">
                  {msg}
                </div>
              ) : null}

              <button
                disabled={busy}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-black/90 disabled:opacity-60"
              >
                {busy ? "Bezig..." : "Reset link sturen"}
              </button>

              <div className="flex items-center justify-between gap-3 pt-1">
                <Link
                  href="/auth/login"
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Terug naar inloggen
                </Link>

                <Link
                  href="/auth/verify-email"
                  className="text-xs font-medium text-black/70 hover:underline"
                >
                  E-mail verifiëren
                </Link>
              </div>

              <div className="pt-2 text-center text-xs text-black/60">
                Ontvang je geen mail. Controleer je spamfolder.
              </div>
            </form>
          </div>

          <div className="mt-5 text-center text-xs text-black/60">
            <Link className="hover:underline" href="/">
              Terug naar start
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
