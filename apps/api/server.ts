import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import loginRoute from "./apps/api/auth/login";
import meRoute from "./apps/api/auth/me";
import mobileRoutes from "./routes/mobile/routes/today";

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", loginRoute);
app.use("/auth", meRoute);
app.use("/mobile", mobileRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});
