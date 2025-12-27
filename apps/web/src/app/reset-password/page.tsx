"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
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
      setTimeout(() => router.replace("/login"), 700);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.title}>Nieuw wachtwoord</div>
        <div style={s.sub}>Plak hier je nieuwe wachtwoord.</div>

        <form onSubmit={onSubmit} style={s.form}>
          <label style={s.label}>
            Nieuw wachtwoord
            <input
              style={s.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
            />
          </label>

          {msg ? <div style={s.note}>{msg}</div> : null}

          <button disabled={busy || !token} style={{ ...s.button, opacity: busy ? 0.7 : 1 }}>
            {busy ? "Bezig..." : "Opslaan"}
          </button>

          {!token ? <div style={s.warn}>Geen token in de url. Gebruik de link uit je e-mail.</div> : null}
        </form>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#0f172a" },
  card: { width: "100%", maxWidth: 480, borderRadius: 16, background: "white", padding: 20 },
  title: { fontSize: 18, fontWeight: 800 },
  sub: { marginTop: 6, opacity: 0.8, lineHeight: 1.4 },
  form: { marginTop: 16, display: "flex", flexDirection: "column", gap: 12 },
  label: { fontSize: 13, display: "flex", flexDirection: "column", gap: 6 },
  input: { height: 42, borderRadius: 10, border: "1px solid #e5e7eb", padding: "0 12px", outline: "none" },
  button: { height: 44, borderRadius: 10, border: "none", background: "#111827", color: "white", fontWeight: 700, cursor: "pointer" },
  note: { borderRadius: 10, padding: "10px 12px", background: "#e0f2fe", border: "1px solid ","#7dd3fc", color: "#0c4a6e", fontSize: 13, lineHeight: 1.35 } as any,
  warn: { fontSize: 13, color: "#7f1d1d" },
};
