"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = useMemo(() => params.get("token") || "", [params]);

  const [newPassword, setNewPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const tokenMissing = !token;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (tokenMissing) {
      setMsg("Geen token in de link. Gebruik de link uit je e-mail.");
      return;
    }

    if (newPassword.trim().length < 8) {
      setMsg("Wachtwoord moet minimaal 8 tekens zijn.");
      return;
    }

    setBusy(true);
    try {
      const r = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await r.json().catch(() => null);

      if (!r.ok || !data?.ok) {
        setMsg(data?.error || "Reset mislukt");
        return;
      }

      setMsg("Wachtwoord aangepast. Je kunt nu inloggen.");
      setTimeout(() => router.replace("/auth/login"), 700);
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
            <div className="text-lg font-semibold tracking-tight text-black">Bouwapp</div>
          </div>

          <div className="auth-card rounded-2xl border border-black/10 bg-white p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xl font-semibold tracking-tight text-black">Nieuw wachtwoord</div>
                <div className="mt-1 text-sm text-black/60">
                  Kies een nieuw wachtwoord voor je account.
                </div>
              </div>

              <div className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-700">
                Reset
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-black">Nieuw wachtwoord</label>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15"
                  placeholder="Minimaal 8 tekens"
                  type="password"
                  autoComplete="new-password"
                />
              </div>

              {msg ? (
                <div className="rounded-xl border border-yellow-400/50 bg-yellow-400/15 px-4 py-3 text-sm text-black">
                  {msg}
                </div>
              ) : null}

              <button
                disabled={busy || tokenMissing}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-black/90 disabled:opacity-60"
              >
                {busy ? "Bezig..." : "Opslaan"}
              </button>

              {tokenMissing ? (
                <div className="rounded-xl border border-red-600/20 bg-red-600/10 px-4 py-3 text-sm text-black">
                  Geen token in de url. Gebruik de link uit je e-mail.
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-3 pt-1">
                <Link href="/auth/forgot-password" className="text-xs font-medium text-blue-600 hover:underline">
                  Nieuwe reset link
                </Link>

                <Link href="/auth/login" className="text-xs font-medium text-black/70 hover:underline">
                  Terug naar inloggen
                </Link>
              </div>

              <div className="pt-2 text-center text-xs text-black/60">
                Tip. Gebruik een lang wachtwoord, of een wachtwoord manager.
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
