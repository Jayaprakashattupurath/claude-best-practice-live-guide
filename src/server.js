import express from "express";
import cors from "cors";
import { buildGuidance } from "./claudeBestPractice.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => {
  res.json({ ok: true, service: "claude-best-practice-guide" });
});

app.post("/api/guidance", (req, res) => {
  const { scenario, goal, constraints } = req.body || {};
  const result = buildGuidance({ scenario, goal, constraints });
  res.json(result);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});