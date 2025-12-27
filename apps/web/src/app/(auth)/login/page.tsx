"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const canSubmit = email.trim().length > 3 && password.trim().length >= 6;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const eMail = email.trim();
    if (!eMail || !eMail.includes("@")) {
      setMsg("Vul een geldig e-mailadres in.");
      return;
    }
    if (password.trim().length < 6) {
      setMsg("Wachtwoord moet minimaal 6 tekens zijn.");
      return;
    }

    setBusy(true);
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: eMail, password }),
      });

      const data = await r.json().catch(() => null);

      if (!r.ok || !data?.ok) {
        setMsg(data?.error || "Inloggen mislukt");
        return;
      }

      localStorage.setItem("auth_token", data?.token || "dev");
      localStorage.setItem("auth_user", JSON.stringify(data?.user || { email: eMail }));
      router.replace("/dashboard");
    } catch {
      setMsg("Server niet bereikbaar. Probeer opnieuw.");
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
                <div className="text-xl font-semibold tracking-tight text-black">
                  Inloggen
                </div>
                <div className="mt-1 text-sm text-black/60">
                  Gebruik je werkmail.
                </div>
              </div>
              <div className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-700">
                Secure
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-black">E-mail</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15"
                  placeholder="naam@email.nl"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-black">Wachtwoord</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15"
                  placeholder="Wachtwoord"
                  autoComplete="current-password"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-xs text-black/70">
                  <input type="checkbox" className="h-4 w-4 accent-blue-600" />
                  Ingelogd blijven
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Wachtwoord vergeten
                </Link>
              </div>

              {msg ? (
                <div className="rounded-xl border border-yellow-400/50 bg-yellow-400/15 px-4 py-3 text-sm text-black">
                  {msg}
                </div>
              ) : null}

              <button
                disabled={busy || !canSubmit}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-black/90 disabled:opacity-60"
              >
                {busy ? "Bezig..." : "Inloggen"}
              </button>

              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => setMsg("SSO voeg je later toe via OIDC")}
                  disabled={busy}
                  className="text-xs font-medium text-black/70 hover:underline"
                >
                  Login met SSO
                </button>
              </div>

              <div className="pt-2 text-center text-xs text-black/60">
                Door in te loggen accepteer je de voorwaarden en privacy policy.
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
