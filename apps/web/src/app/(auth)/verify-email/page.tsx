"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = useMemo(() => params.get("token") || "", [params]);

  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("Bezig met verifiëren...");

  useEffect(() => {
    async function run() {
      if (!token) {
        setStatus("error");
        setMessage("Geen token in de url. Gebruik de link uit je e-mail.");
        return;
      }

      try {
        const r = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await r.json().catch(() => null);

        if (!r.ok || !data?.ok) {
          setStatus("error");
          setMessage(data?.error || "Verificatie mislukt.");
          return;
        }

        setStatus("ok");
        setMessage("E-mail geverifieerd. Je kunt nu inloggen.");
        setTimeout(() => router.replace("/login"), 900);
      } catch {
        setStatus("error");
        setMessage("Er ging iets mis. Probeer het later opnieuw.");
      }
    }

    run();
  }, [token, router]);

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
                  E-mail verificatie
                </div>
                <div className="mt-1 text-sm text-black/60">
                  We controleren je verificatie link.
                </div>
              </div>

              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  status === "loading"
                    ? "bg-blue-600/10 text-blue-700"
                    : status === "ok"
                    ? "bg-green-600/10 text-green-700"
                    : "bg-red-600/10 text-red-700"
                }`}
              >
                {status === "loading" ? "Bezig" : status === "ok" ? "Gelukt" : "Fout"}
              </div>
            </div>

            <div
              className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
                status === "ok"
                  ? "border-green-600/30 bg-green-600/10 text-black"
                  : status === "error"
                  ? "border-red-600/30 bg-red-600/10 text-black"
                  : "border-blue-600/20 bg-blue-600/10 text-black"
              }`}
            >
              {message}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <Link
                href="/login"
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                Naar inloggen
              </Link>

              {status === "error" ? (
                <Link
                  href="/verify-email"
                  className="text-xs font-medium text-black/70 hover:underline"
                >
                  Nieuwe link aanvragen
                </Link>
              ) : null}
            </div>

            <div className="pt-4 text-center text-xs text-black/60">
              Je kunt dit tabblad sluiten na succesvolle verificatie.
            </div>
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
