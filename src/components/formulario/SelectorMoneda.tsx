"use client";

import React from "react";
import { SimboloMoneda } from "@/nucleo/rentabilidad/tipos";

export interface SelectorMonedaProps {
  valor: SimboloMoneda;
  onCambio: (moneda: SimboloMoneda) => void;
}

const OPCIONES_MONEDA: { valor: SimboloMoneda; etiqueta: string; simbolo: string }[] = [
  { valor: "USD", etiqueta: "Dólares", simbolo: "US$" },
  { valor: "EUR", etiqueta: "Euros", simbolo: "€" },
  { valor: "DOP", etiqueta: "Peso Dominicano", simbolo: "RD$" },
];

export const SelectorMoneda: React.FC<SelectorMonedaProps> = ({ valor, onCambio }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-medium text-[var(--mist-400)] tracking-wide">
        Moneda
      </label>
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-sm bg-[var(--ink-800)] border border-[var(--line)]">
        {OPCIONES_MONEDA.map((opcion) => {
          const seleccionada = valor === opcion.valor;
          return (
            <button
              key={opcion.valor}
              type="button"
              onClick={() => onCambio(opcion.valor)}
              className={`py-1.5 px-2 rounded text-xs font-mono transition-colors duration-150 flex items-center justify-center gap-1 ${
                seleccionada
                  ? "bg-[var(--teal-400)] text-[var(--ink-900)] font-bold shadow-sm"
                  : "text-[var(--mist-400)] hover:text-[var(--mist-100)] hover:bg-[var(--ink-700)]"
              }`}
            >
              <span>{opcion.simbolo}</span>
              <span className="hidden xs:inline">{opcion.valor}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
