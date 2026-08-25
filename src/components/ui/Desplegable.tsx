"use client";

import React, { useState } from "react";

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

  return (
    <div className={`w-full rounded-[10px] border border-[var(--line)] bg-[var(--ink-800)] overflow-hidden ${className}`}>
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
      {abierto && <div className="p-4 sm:p-5 border-t border-[var(--line)] bg-[var(--ink-900)]/40">{children}</div>}
    </div>
  );
};
