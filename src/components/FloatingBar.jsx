import React from "react";
import { useNavigate } from "react-router-dom";

const FloatingBar = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate("/gallery", { state: { autoFilter: "new_arrivals" } })
      }
      className="fixed right-2 top-1/2 -translate-y-1/2 z-[100] cursor-pointer drop-shadow-2xl hover:scale-110 transition-transform"
    >
      <div className="relative flex items-center justify-center w-28 h-28">
        {/* 16-Point Sharp Starburst (Solid Red) */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full fill-red-600"
        >
          <path d="M50 0 L58 30 L85 15 L75 42 L100 50 L75 58 L85 85 L58 70 L50 100 L42 70 L15 85 L25 58 L0 50 L25 42 L15 15 L42 30 Z" />
        </svg>

        {/* "NEW" Text - Only this part blinks 🟡 */}
        <span className="relative z-10 font-[900] text-yellow-400 text-2xl tracking-tighter italic drop-shadow-[2px_2px_0px_rgba(0,0,0,0.7)] animate-[pulse_0.6s_infinite]">
          NEW
        </span>
      </div>
    </div>
  );
};

export default FloatingBar;
