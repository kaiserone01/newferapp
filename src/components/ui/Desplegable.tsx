"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export interface DesplegableProps {
  titulo: string;
  subtitulo?: string;
  abiertoInicial?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Desplegable: React.FC<DesplegableProps> = ({
  titulo,
  subtitulo,
  abiertoInicial = false,
  children,
  className = "",
}) => {
  const [abierto, setAbierto] = useState(abiertoInicial);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isFirstRender.current) {
        isFirstRender.current = false;
        if (abierto) {
          gsap.set(el, { height: "auto", opacity: 1, visibility: "visible" });
        } else {
          gsap.set(el, { height: 0, opacity: 0, visibility: "hidden" });
        }
        return;
      }

      if (isReduced) {
        if (abierto) {
          gsap.set(el, { height: "auto", opacity: 1, visibility: "visible" });
        } else {
          gsap.set(el, { height: 0, opacity: 0, visibility: "hidden" });
        }
      } else {
        if (abierto) {
          gsap.killTweensOf(el);
          gsap.fromTo(
            el,
            { height: 0, opacity: 0, visibility: "visible" },
            {
              height: el.scrollHeight,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                gsap.set(el, { height: "auto" });
              },
            }
          );
        } else {
          gsap.killTweensOf(el);
          const currentHeight = el.offsetHeight;
          gsap.fromTo(
            el,
            { height: currentHeight, opacity: 1 },
            {
              height: 0,
              opacity: 0,
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                gsap.set(el, { visibility: "hidden" });
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [abierto]);

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-[10px] border border-[var(--line)] bg-[var(--ink-800)] overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-[var(--ink-700)]/50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--mist-400)]"
      >
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[var(--mist-100)] flex items-center gap-2">
            {titulo}
          </span>
          {subtitulo && (
            <span className="text-xs text-[var(--mist-400)] mt-0.5">{subtitulo}</span>
          )}
        </div>
        <div
          className={`transform transition-transform duration-200 text-[var(--mist-400)] ${
            abierto ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      <div
        ref={contentRef}
        style={{ overflow: "hidden" }}
        className="border-t border-[var(--line)] bg-[var(--ink-900)]/40"
      >
        <div className="p-4 sm:p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

