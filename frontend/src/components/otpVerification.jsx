import { useState } from "react";
import { validateOtpFormat } from "../validation.js";
import { verifyAadhaarOtp } from "../api.js";

export default function OtpVerification({ aadhaar, onBack, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!validateOtpFormat(otp)) return setErr("Enter 6-digit OTP.");
    const res = await verifyAadhaarOtp({ aadhaar, otp });
    if (!res.ok) return setErr(res.message || "Invalid OTP");
    onSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          OTP Verification
        </h2>

        <form onSubmit={submit} className="grid gap-4">
          <div className="text-sm">
            OTP sent to Aadhaar: <b>{aadhaar}</b>
          </div>

          <label className="block">
            <span className="text-sm font-medium">Enter OTP</span>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              placeholder="******"
              className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </label>

          {err && <div className="text-red-600 text-sm">{err}</div>}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-2.5 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 font-medium"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
