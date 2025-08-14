import Joi from "joi";
import { AADHAAR_REGEX, OTP_REGEX, PAN_REGEX, PIN_REGEX } from "./regex.js";

export const aadhaarSchema = Joi.object({
  aadhaar: Joi.string().pattern(AADHAAR_REGEX).required()
});

export const otpSchema = Joi.object({
  aadhaar: Joi.string().pattern(AADHAAR_REGEX).required(),
  otp: Joi.string().pattern(OTP_REGEX).required()
});

export const panSchema = Joi.object({
  aadhaar: Joi.string().pattern(AADHAAR_REGEX).required(),
  pan: Joi.string().uppercase().pattern(PAN_REGEX).required()
});

export const pinSaveSchema = Joi.object({
  aadhaar: Joi.string().pattern(AADHAAR_REGEX).required(),
  pin: Joi.string().pattern(PIN_REGEX).required()
});
