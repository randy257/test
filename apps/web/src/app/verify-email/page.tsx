"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") || "";

  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState<string>("Bezig...");

  useEffect(() => {
    async function run() {
      if (!token) {
        setStatus("error");
        setMessage("Geen token in de url.");
        return;
      }

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
    }

    run();
  }, [token, router]);

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.title}>E-mail verificatie</div>
        <div style={{ ...s.msg, color: status === "error" ? "#7f1d1d" : "#111827" }}>{message}</div>
        <a href="/login" style={s.link}>Naar login</a>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#0f172a" },
  card: { width: "100%", maxWidth: 520, borderRadius: 16, background: "white", padding: 20 },
  title: { fontSize: 18, fontWeight: 800 },
  msg: { marginTop: 10, lineHeight: 1.4 },
  link: { display: "inline-block", marginTop: 14, fontSize: 13, color: "#111827", textDecoration: "underline" },
};
