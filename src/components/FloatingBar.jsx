import React, { useState } from "react";

// Poster shown when the "NEW" badge is clicked. Drop the image at
// public/assets/announcements/agm-xv-invite.jpg to update it.
const ANNOUNCEMENT_IMAGE = "/assets/announcements/agm-xv-invite.png";

const FloatingBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
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

      {open && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] p-4"
          onClick={() => setOpen(false)}
        >
          <img
            src={ANNOUNCEMENT_IMAGE}
            alt="TASPEF XV Annual General Body Meeting invitation"
            className="max-w-full max-h-[90vh] rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-8 text-white text-4xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingBar;
