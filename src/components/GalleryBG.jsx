// src/components/GalleryBG.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * GalleryBG.jsx — Full-screen forest parallax background
 * - Hills fill screen below clouds (anchored bottom, 100vw width)
 * - Realistic soft motion via GSAP
 */

const LAYERS = [
  {
    name: "sky",
    file: "/assets/forests/layer-sky.png",
    depth: 0.2,
    horizontalFactor: 0.15,
    verticalFactor: 0.1,
  },
  {
    name: "hills",
    file: "/assets/forests/layer-hills.png",
    depth: 0.4,
    horizontalFactor: 0,
    verticalFactor: 0.1,
  }, // hills fixed horizontally
  
];

const GalleryBG = ({ intensity = 0.65, disabledOnMobile = true }) => {
  const layerEls = useRef([]);

  useEffect(() => {
    if (disabledOnMobile && window.innerWidth < 640) return;

    layerEls.current.forEach(
      (el) => el && gsap.set(el, { x: 0, y: 0, scale: 1 })
    );

    // Subtle breathing motion
    layerEls.current.forEach((el, idx) => {
      if (!el) return;
      const layer = LAYERS[idx];
      const depth = (layer.depth || 0.5) * intensity;
      const hFactor = (layer.horizontalFactor ?? 0.3) * depth;
      const vFactor = (layer.verticalFactor ?? 0.3) * depth;
      const driftX = hFactor === 0 ? 0 : (idx % 2 === 0 ? -1 : 1) * 6 * hFactor;
      const driftY = (idx % 2 === 0 ? -1 : 1) * 4 * vFactor;

      gsap.to(el, {
        y: `${driftY}px`,
        scale: 1 + 0.015 * depth,
        duration: 12 + idx * 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      if (driftX !== 0)
        gsap.to(el, {
          x: `${driftX}px`,
          duration: 18 + idx * 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
    });

    // Mouse movement parallax
    const onMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const { innerWidth, innerHeight } = window;
      const px = (clientX / innerWidth - 0.5) * 2;
      const py = (clientY / innerHeight - 0.5) * 2;

      layerEls.current.forEach((el, idx) => {
        if (!el) return;
        const layer = LAYERS[idx];
        const depth = (layer.depth || 0.5) * intensity;
        const hFactor = (layer.horizontalFactor ?? 0.3) * depth;
        const vFactor = (layer.verticalFactor ?? 0.3) * depth;

        const tx = hFactor === 0 ? 0 : px * hFactor * 15;
        const ty = py * vFactor * 8;

        gsap.to(el, {
          x: tx,
          y: ty,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      gsap.killTweensOf(layerEls.current);
    };
  }, [intensity, disabledOnMobile]);

  const setLayerRef = (el, i) => (layerEls.current[i] = el);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{ willChange: "transform" }}
    >
      <style>{`
        .forest-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .forest-layer {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          will-change: transform, opacity;
          pointer-events: none;
          user-select: none;
          display: block;
        }

        /* 🌄 Hills: full width, anchored bottom */
        .forest-layer.hills {
          top: auto !important;
          bottom: -30vh !important;
          transform: translateX(-50%) !important;
          width: 100vw !important;
          height: 100vh !important;
          object-fit: cover;
          object-position: bottom center;
        }

        /* Sky always covers entire view */
        .forest-layer.sky {
          top: 0 !important;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          object-position: top center;
        }

        /* Slight vignette and color grading */
        .forest-grade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: multiply;
          background: radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0.05), transparent 70%),
                      linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.03));
          z-index: 3;
        }

        @media (max-width: 768px) {
          .forest-layer.hills { height: 80vh; }
          .forest-layer.sky { height: 100vh; }
        }
      `}</style>

      <div className="forest-wrap">
        {LAYERS.map((layer, i) => (
          <img
            key={layer.name}
            ref={(el) => setLayerRef(el, i)}
            src={layer.file}
            alt={layer.name}
            className={`forest-layer ${layer.name}`}
            draggable={false}
            style={{ zIndex: i }}
          />
        ))}
        <div className="forest-grade" aria-hidden="true" />
      </div>
    </div>
  );
};

export default GalleryBG;
