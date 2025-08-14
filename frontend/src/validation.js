export const validateAadhaarFormat = a => /^[2-9][0-9]{11}$/.test((a||"").replace(/\s/g,""));
export const validateOtpFormat     = o => /^[0-9]{6}$/.test(o||"");
export const validatePanFormat     = p => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test((p||"").toUpperCase());
export const validatePinFormat     = x => /^[1-9][0-9]{5}$/.test(x||"");
export const validateMobile        = m => /^[6-9][0-9]{9}$/.test((m||"").replace(/\D/g,""));
