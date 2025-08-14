import prisma from "../config/db.js";

export const verifyPan = async (req, res) => {
  const { aadhaar, pan } = req.body;

  const user = await prisma.user.findUnique({ where: { aadhaar } });
  if (!user) return res.status(404).json({ ok: false, message: "User not found" });
  if (!user.otpValid) {
    return res.status(400).json({ ok: false, message: "Complete Aadhaar OTP first." });
  }

  await prisma.user.update({
    where: { aadhaar },
    data: { pan }
  });

  res.json({ ok: true, message: "PAN verified and saved." });
};
