import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otpController.js";
import validateRequest from "../middlewares/validateRequest.js";
import { aadhaarSchema, otpSchema } from "../validation/rules.js";

const router = express.Router();
router.post("/send", validateRequest(aadhaarSchema), sendOtp);
router.post("/verify", validateRequest(otpSchema), verifyOtp);
export default router;
