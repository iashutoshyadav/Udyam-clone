import { useEffect, useState } from "react";

export default function Toast({ message, type = "success", onClose, inline = false }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!message) return;
        setShow(true);

        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(() => onClose?.(), 300);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div
            className={`
        ${inline ? "mt-2 text-center" : "fixed bottom-5 right-5 z-50"}
      `}
        >
            <div
                className={`transform transition-all duration-300 ease-in-out px-4 py-2 rounded-lg shadow-lg text-white
          ${type === "success" ? "bg-green-600" : "bg-red-600"}
          ${show ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}
        `}
            >
                {message}
            </div>
        </div>
    );
}
