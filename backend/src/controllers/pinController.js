import prisma from "../config/db.js";

export const savePin = async (req, res) => {
  const { aadhaar, pin } = req.body;

  const user = await prisma.user.findUnique({ where: { aadhaar } });
  if (!user) return res.status(404).json({ ok: false, message: "User not found" });

  await prisma.user.update({
    where: { aadhaar },
    data: { pin }
  });

  res.json({ ok: true, message: "PIN saved." });
};

