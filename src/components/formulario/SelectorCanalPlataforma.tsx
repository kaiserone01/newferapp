"use client";

import React from "react";
import { CanalPlataforma } from "@/nucleo/rentabilidad/tipos";
import { TASAS_COMISION_CANAL } from "@/nucleo/rentabilidad/defaults";

export interface SelectorCanalPlataformaProps {
  canal: CanalPlataforma;
  onCambioCanal: (canal: CanalPlataforma, tasaComisionPct: number) => void;
}

const OPCIONES_CANAL: { valor: CanalPlataforma; etiqueta: string; nota: string }[] = [
  { valor: "airbnb-host", etiqueta: "Airbnb (Host-Only)", nota: "3.0% comisión" },
  { valor: "airbnb-shared", etiqueta: "Airbnb (Compartido)", nota: "15.0% comisión" },
  { valor: "booking", etiqueta: "Booking.com", nota: "17.0% comisión" },
  { valor: "directo", etiqueta: "Canal Directo / Sitios", nota: "0.0% comisión" },
];

export const SelectorCanalPlataforma: React.FC<SelectorCanalPlataformaProps> = ({
  canal,
  onCambioCanal,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-medium text-[var(--mist-400)] tracking-wide">
        Canal de Distribución Vacacional
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {OPCIONES_CANAL.map((opcion) => {
          const seleccionada = canal === opcion.valor;
          const tasaPct = TASAS_COMISION_CANAL[opcion.valor] * 100;
          return (
            <button
              key={opcion.valor}
              type="button"
              onClick={() => onCambioCanal(opcion.valor, tasaPct)}
              className={`p-3 rounded-sm border text-left transition-all duration-150 flex flex-col justify-between ${
                seleccionada
                  ? "bg-[var(--ink-700)] border-[var(--teal-400)] text-[var(--mist-100)] ring-1 ring-[var(--teal-400)]"
                  : "bg-[var(--ink-800)] border-[var(--line)] text-[var(--mist-400)] hover:border-[var(--mist-600)]"
              }`}
            >
              <span className="text-xs font-semibold">{opcion.etiqueta}</span>
              <span className="text-[11px] font-mono text-[var(--teal-400)] mt-1">{opcion.nota}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
