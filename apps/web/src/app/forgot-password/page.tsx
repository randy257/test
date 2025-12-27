"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(null);
    setBusy(true);
    try {
      await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setDone("Check je terminal, daar staat de reset link.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.title}>Wachtwoord vergeten</div>
        <div style={s.sub}>Vul je e-mail in. Je krijgt een link om je wachtwoord te resetten.</div>

        <form onSubmit={onSubmit} style={s.form}>
          <label style={s.label}>
            E-mail
            <input style={s.input} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>

          {done ? <div style={s.ok}>{done}</div> : null}

          <button disabled={busy} style={{ ...s.button, opacity: busy ? 0.7 : 1 }}>
            {busy ? "Bezig..." : "Reset link sturen"}
          </button>

          <a href="/login" style={s.link}>Terug naar login</a>
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
  ok: { borderRadius: 10, padding: "10px 12px", background: "#ecfccb", border: "1px solid #bef264", color: "#365314", fontSize: 13, lineHeight: 1.35 },
  link: { fontSize: 13, color: "#111827", textDecoration: "underline" },
};
