export const healthCheck = (req, res) =>
  res.json({ ok: true, status: "Backend is running" });
