import { useState } from "react";
import { validateAadhaarFormat } from "../validation.js";
import { requestAadhaarOtp } from "../api.js";

export default function AadhaarVerification({ onOtpSent }) {
  const [aadhaar, setAadhaar] = useState("");
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!validateAadhaarFormat(aadhaar)) {
      return setErr("Enter a valid 12-digit Aadhaar.");
    }
    if (!/^\d{10}$/.test(mobile)) {
      return setErr("Enter a valid 10-digit mobile number.");
    }

    const res = await requestAadhaarOtp({
      aadhaar: aadhaar.replace(/\s/g, ""),
      mobile,
    });

    if (!res.ok) return setErr(res.message || "Failed to send OTP");

    onOtpSent({
      aadhaar: aadhaar.replace(/\s/g, ""),
      mobile,
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 to-white flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="w-full max-w-2xl text-center mb-6">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-blue-600 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center">
            U
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Udyam Registration</h1>
        <p className="text-gray-500">
          Ministry of Micro, Small and Medium Enterprises
        </p>

        {/* Progress Bar */}
        <div className="flex items-center mt-6">
          <div className="flex-1 h-1 bg-blue-600"></div>
          <div className="flex-1 h-1 bg-gray-200"></div>
        </div>
        <div className="flex justify-between text-sm mt-2 text-gray-600">
          <span className="text-blue-600 font-medium">
            Step 1: Aadhaar & Mobile No.
          </span>
          <span>Step 2: PAN Validation</span>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded-2xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0 .828-.895 1.5-2 1.5S8 11.828 8 11s.895-1.5 2-1.5 2 .672 2 1.5zM14 11c0 .828.895 1.5 2 1.5s2-.672 2-1.5-.895-1.5-2-1.5-2 .672-2 1.5zM12 12.75V15m0 0H9m3 0h3"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Aadhaar & OTP Verification
          </h2>
          <p className="text-gray-500 text-sm text-center mt-1">
            Enter your Aadhaar number and mobile number to receive OTP
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          {/* Aadhaar Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aadhaar Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
              maxLength={12}
              placeholder="Enter 12-digit Aadhaar number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Mobile Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Error Message */}
          {err && <div className="text-red-600 text-sm">{err}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Send OTP
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>© 2025 Government of India. All rights reserved.</p>
        <p>
          For technical support, contact:{" "}
          <a
            href="mailto:support@udyamregistration.gov.in"
            className="text-blue-600 hover:underline"
          >
            support@udyamregistration.gov.in
          </a>
        </p>
      </footer>
    </div>
  );
}
