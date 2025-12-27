"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      await new Promise((r) => setTimeout(r, 600));

      if (!email.includes("@") || password.length < 6) {
        setError("Check je e-mail en wachtwoord.");
        return;
      }

      localStorage.setItem("auth_token", "dev");
      localStorage.setItem("auth_user", JSON.stringify({ email }));
      window.location.href = "/dashboard";
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-stretch">
        <div className="hidden w-1/2 flex-col justify-between bg-black p-10 text-white lg:flex">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-yellow-400" />
            <div className="text-lg font-semibold tracking-tight">Bouwapp</div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              Planning en bezorging
            </div>
            <h1 className="max-w-sm text-4xl font-semibold leading-tight">
              Plan routes. Scan pakketten. Houd controle.
            </h1>
            <p className="max-w-md text-sm leading-6 text-white/70">
              Eén plek voor routes, pakketten, voorraad en facturatie. Veilig met rollen en audit logs.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Feature title="Routes" text="Overzicht en toewijzing." />
              <Feature title="Pakketten" text="Status updates en exceptions." />
              <Feature title="Voorraad" text="Realtime voorraadniveau." />
              <Feature title="Facturatie" text="Automatisch en inzichtelijk." />
            </div>
          </div>

          <div className="text-xs text-white/50">© {new Date().getFullYear()} Bouwapp</div>
        </div>

        <div className="flex w-full flex-1 items-center justify-center p-6 lg:w-1/2">
          <div className="w-full max-w-md">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="h-10 w-10 rounded-xl bg-yellow-400" />
              <div className="text-lg font-semibold tracking-tight text-black">Bouwapp</div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold tracking-tight text-black">Inloggen</div>
                  <div className="mt-1 text-sm text-black/60">Gebruik je werkmail om verder te gaan.</div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                  <span className="text-sm font-semibold text-white">Go</span>
                </div>
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-medium text-black">E-mail</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="naam@bedrijf.nl"
                    className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none ring-0 transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-black">Wachtwoord</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimaal 6 tekens"
                    type="password"
                    className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none ring-0 transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15"
                    autoComplete="current-password"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-xs text-black/70">
                    <input type="checkbox" className="h-4 w-4 accent-blue-600" />
                    Ingelogd blijven
                  </label>

                  <a href="/forgot-password" className="text-xs font-medium text-blue-600 hover:underline">
                    Wachtwoord vergeten
                  </a>
                </div>

                {error ? (
                  <div className="rounded-xl border border-yellow-400/60 bg-yellow-400/15 px-4 py-3 text-sm text-black">
                    {error}
                  </div>
                ) : null}

                <button
                  disabled={busy}
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-black/90 disabled:opacity-60"
                >
                  {busy ? "Bezig..." : "Inloggen"}
                </button>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => alert("Koppel later aan SSO")}
                    className="flex h-11 w-full items-center justify-center rounded-xl border border-black/10 bg-white text-sm font-semibold text-black transition hover:bg-black/5"
                  >
                    Login met SSO
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Koppel later aan verificatie mail")}
                    className="flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-600/90"
                  >
                    Verifieer e-mail
                  </button>
                </div>

                <div className="pt-2 text-center text-xs text-black/60">
                  Door in te loggen accepteer je de voorwaarden en privacy policy.
                </div>
              </form>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-black/60">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span>Support</span>
              <span className="text-black/30">•</span>
              <span>Status</span>
              <span className="text-black/30">•</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature(props: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-semibold">{props.title}</div>
      <div className="mt-1 text-xs text-white/70">{props.text}</div>
    </div>
  );
}
