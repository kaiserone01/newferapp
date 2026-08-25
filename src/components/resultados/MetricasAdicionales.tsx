import React from "react";
import { Tarjeta } from "@/components/ui";
import { VistaResultadosUI } from "@/adaptadores/salida/UIAdapter";
import { RelojIcono, TendenciaIcono, PorcentajeIcono } from "@/components/iconos";

export interface MetricasAdicionalesProps {
  vista: VistaResultadosUI;
}

export const MetricasAdicionales: React.FC<MetricasAdicionalesProps> = ({ vista }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {/* Retorno de Inversión (Payback y Cap Rate) */}
      <Tarjeta superficie="base" className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3">
          <RelojIcono size={20} className="text-[var(--teal-400)]" />
          <h4 className="text-sm font-display font-semibold text-[var(--mist-100)]">
            Retorno de Inversión y Cap Rate
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded bg-[var(--ink-700)]/40 border border-[var(--line)]">
            <span className="text-[11px] text-[var(--mist-400)] block">Payback Renta Larga</span>
            <span className="text-base font-bold text-[var(--brass-400)]">{vista.larga.paybackAniosStr}</span>
            <span className="text-[10px] text-[var(--mist-600)] block mt-0.5">Recuperación inversión</span>
          </div>
          <div className="p-3 rounded bg-[var(--ink-700)]/40 border border-[var(--line)]">
            <span className="text-[11px] text-[var(--mist-400)] block">Payback Renta Corta</span>
            <span className="text-base font-bold text-[var(--teal-400)]">{vista.corta.paybackAniosStr}</span>
            <span className="text-[10px] text-[var(--mist-600)] block mt-0.5">Recuperación inversión</span>
          </div>
        </div>

        <div className="pt-2 text-xs text-[var(--mist-400)] flex items-center justify-between border-t border-[var(--line)]">
          <span className="flex items-center gap-1.5 font-mono">
            <PorcentajeIcono size={16} className="text-[var(--mist-400)]" />
            Cap Rate (Neta)
          </span>
          <span className="font-mono font-semibold text-[var(--mist-100)]">
            Larga: {vista.larga.capRateStr} | Corta: {vista.corta.capRateStr}
          </span>
        </div>
      </Tarjeta>

      {/* Análisis de Sensibilidad Vacacional */}
      <Tarjeta superficie="base" className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3">
          <TendenciaIcono size={20} className="text-[var(--teal-400)]" />
          <h4 className="text-sm font-display font-semibold text-[var(--mist-100)]">
            Sensibilidad Renta Corta
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded bg-[var(--ink-700)]/30 border border-[var(--line)]">
            <span className="text-[11px] text-[var(--mist-400)] block">Ocupación +10 pts</span>
            <span className="text-sm font-bold text-[var(--teal-400)]">
              {vista.sensibilidad.ocupacionMas10Str}
            </span>
          </div>
          <div className="p-2.5 rounded bg-[var(--ink-700)]/30 border border-[var(--line)]">
            <span className="text-[11px] text-[var(--mist-400)] block">Ocupación −10 pts</span>
            <span className="text-sm font-bold text-[var(--coral-400)]">
              {vista.sensibilidad.ocupacionMenos10Str}
            </span>
          </div>

          <div className="p-2.5 rounded bg-[var(--ink-700)]/30 border border-[var(--line)]">
            <span className="text-[11px] text-[var(--mist-400)] block">Tarifa Noche +15%</span>
            <span className="text-sm font-bold text-[var(--teal-400)]">
              {vista.sensibilidad.tarifaMas15Str}
            </span>
          </div>
          <div className="p-2.5 rounded bg-[var(--ink-700)]/30 border border-[var(--line)]">
            <span className="text-[11px] text-[var(--mist-400)] block">Tarifa Noche −15%</span>
            <span className="text-sm font-bold text-[var(--coral-400)]">
              {vista.sensibilidad.tarifaMenos15Str}
            </span>
          </div>
        </div>
      </Tarjeta>
    </div>
  );
};
