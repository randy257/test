import { Router } from "express";

const r = Router();

r.post("/login", (req, res) => {
  const email = String(req.body?.email || "").trim();
  const password = String(req.body?.password || "").trim();

  if (!email || !password) {
    return res.status(400).json({ ok: false, error: "Vul e-mail en wachtwoord in." });
  }

  let userType = "consumer";
  const e = email.toLowerCase();
  if (e.endsWith("@bouwapp.nl")) userType = "org_admin";
  else if (e.endsWith("@planner.nl")) userType = "org_staff";
  else if (e.includes("bedrijf")) userType = "business_client";
  else if (e.includes("zzp")) userType = "zzp";

  const token = Buffer.from(email).toString("base64");

  res.cookie("auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res.json({
    ok: true,
    token,
    user: { email, userType },
  });
});

export default r;
