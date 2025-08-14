import { validateAadhaar, validateOtp, validatePan } from "../validation";

describe("Validation utils", () => {
  test("Aadhaar: accepts 12 digits, rejects others", () => {
    expect(validateAadhaar("123412341234")).toBe(true);
    expect(validateAadhaar("1234 1234 1234")).toBe(true);
    expect(validateAadhaar("12341234")).toBe(false);
    expect(validateAadhaar("abcdefgh1234")).toBe(false);
  });

  test("OTP: 6 digits only", () => {
    expect(validateOtp("123456")).toBe(true);
    expect(validateOtp("12345")).toBe(false);
    expect(validateOtp("a23456")).toBe(false);
  });

  test("PAN: pattern ABCDE1234F", () => {
    expect(validatePan("ABCDE1234F")).toBe(true);
    expect(validatePan("abcde1234f")).toBe(true);
    expect(validatePan("ABCD1234F")).toBe(false);
    expect(validatePan("ABCDE12345")).toBe(false);
  });
});
