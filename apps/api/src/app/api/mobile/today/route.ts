import { Router } from "express";

const r = Router();

r.get("/routes/today", (req, res) => {
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) return res.status(401).json({ ok: false, error: "Missing token" });

  return res.json({
    ok: true,
    route: {
      courier: { id: "c1", name: "Bezorger 1", lat: 52.3676, lng: 4.9041 },
      stops: [
        { id: "p1", name: "Pakket 1001", lat: 52.372, lng: 4.895, status: "onderweg" },
        { id: "p2", name: "Pakket 1002", lat: 52.361, lng: 4.92, status: "nieuw" },
        { id: "p3", name: "Pakket 1003", lat: 52.354, lng: 4.905, status: "geleverd" },
      ],
      routeLine: [
        { lat: 52.3676, lng: 4.9041 },
        { lat: 52.372, lng: 4.895 },
        { lat: 52.361, lng: 4.92 },
        { lat: 52.354, lng: 4.905 },
      ],
    },
  });
});

export default r;
