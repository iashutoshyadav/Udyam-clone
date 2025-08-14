const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function requestAadhaarOtp({ aadhaar }) {
  const r = await fetch(`${API}/otp/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ aadhaar })
  });
  return r.json();
}

export async function verifyAadhaarOtp({ aadhaar, otp }) {
  const r = await fetch(`${API}/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ aadhaar, otp })
  });
  return r.json();
}

export async function submitPan({ aadhaar, pan }) {
  const r = await fetch(`${API}/pan/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ aadhaar, pan })
  });
  return r.json();
}

export async function savePin({ aadhaar, pin }) {
  const r = await fetch(`${API}/pin/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ aadhaar, pin })
  });
  return r.json();
}
