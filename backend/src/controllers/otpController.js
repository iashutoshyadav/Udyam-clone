import prisma from "../config/db.js";

export const sendOtp = async (req, res) => {
  const { aadhaar } = req.body;

  const otp = String(Math.floor(100000 + Math.random() * 900000));

  await prisma.user.upsert({
    where: { aadhaar },
    update: { otp, otpValid: false },
    create: { aadhaar, otp, otpValid: false }
  });

  console.log(`Generated OTP ${otp} for Aadhaar ${aadhaar}`);
  res.json({ ok: true, message: "OTP sent to your registered mobile." });
};

export const verifyOtp = async (req, res) => {
  const { aadhaar, otp } = req.body;

  const user = await prisma.user.findUnique({ where: { aadhaar } });
  if (!user) return res.status(404).json({ ok: false, message: "User not found" });

  if (user.otp === otp) {
    await prisma.user.update({
      where: { aadhaar },
      data: { otpValid: true }
    });
    return res.json({ ok: true, message: "Aadhaar verified." });
  }

  return res.status(400).json({ ok: false, message: "Invalid Aadhaar or OTP." });
};
