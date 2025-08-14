import { useState } from "react";
import Toast from "../components/Toast";
import { validatePanFormat, validatePinFormat } from "../validation.js";
import { submitPan, savePin } from "../api.js";

export default function PanVerification({ aadhaar, onDone }) {
  const [pan, setPan] = useState("");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");

  const [toast, setToast] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setToast(null);

    if (!validatePanFormat(pan))
      return setErr("Invalid PAN format (ABCDE1234F)");

    const panRes = await submitPan({ aadhaar, pan: pan.toUpperCase() });
    if (!panRes.ok) return setErr(panRes.message || "PAN verify failed");

    if (pin) {
      if (!validatePinFormat(pin)) return setErr("Invalid PIN");
      const pinRes = await savePin({ aadhaar, pin });
      if (!pinRes.ok) return setErr(pinRes.message || "PIN save failed");
    }

    setToast({ message: "PAN verified successfully ", type: "success" });
    onDone?.(pan.toUpperCase());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          PAN Verification
        </h2>

        <form onSubmit={submit} className="grid gap-4">
          {/* PAN Field */}
          <label className="block">
            <span className="text-sm font-medium">PAN</span>
            <input
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              maxLength={10}
              placeholder="ABCDE1234F"
              className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </label>

          {/* PIN Field */}
          <label className="block">
            <span className="text-sm font-medium">PIN Code(optional)</span>
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              placeholder="110001"
              className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </label>

          {/* Error Message */}
          {err && <div className="text-red-600 text-sm">{err}</div>}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Validate PAN
          </button>
        </form>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
