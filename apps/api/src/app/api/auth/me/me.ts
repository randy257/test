import { Router } from "express";

const r = Router();

function homeFor(userType: string) {
  if (userType === "org_admin") return "/org/overview";
  if (userType === "org_staff") return "/org/routes";
  if (userType === "business_client") return "/client/home";
  return "/app/home";
}

r.get("/me", (req, res) => {
  const cookieToken = req.cookies?.auth_token;
  const auth = String(req.headers.authorization || "");
  const bearerToken = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  const token = bearerToken || cookieToken;
  if (!token) return res.status(401).json({ ok: false, error: "Not logged in" });

  let email = "user@email.nl";
  try {
    email = Buffer.from(token, "base64").toString("utf8") || email;
  } catch {}

  let userType = "consumer";
  const e = email.toLowerCase();
  if (e.endsWith("@bouwapp.nl")) userType = "org_admin";
  else if (e.endsWith("@planner.nl")) userType = "org_staff";
  else if (e.includes("bedrijf")) userType = "business_client";
  else if (e.includes("zzp")) userType = "zzp";

  return res.json({
    ok: true,
    user: { email, userType },
    home: homeFor(userType),
    permissions: [],
  });
});

export default r;
