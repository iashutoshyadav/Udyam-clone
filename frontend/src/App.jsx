import { useState } from "react";
import AadhaarVerification from "./components/AadhaarVerification.jsx";
import OtpVerification from "./components/OtpVerification.jsx";
import PanVerification from "./components/PanVerification.jsx";

export default function App() {
  const [step, setStep] = useState(1);        
  const [aadhaar, setAadhaar] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  return (
    <div style={{maxWidth:560, margin:"0 auto", padding:16}}>
      

      {step === 1 && (
        <AadhaarVerification onOtpSent={({ aadhaar }) => {
          setAadhaar(aadhaar);
          setStep(1.5);
        }} />
      )}

      {step === 1.5 && (
        <OtpVerification
          aadhaar={aadhaar}
          onBack={() => setStep(1)}
          onSuccess={() => { setOtpVerified(true); setStep(2); }}
        />
      )}

      {step === 2 && (
        <PanVerification
          aadhaar={aadhaar}
          otpVerified={otpVerified}
          onDone={() => {}}
        />
      )}
    </div>
  );
}
