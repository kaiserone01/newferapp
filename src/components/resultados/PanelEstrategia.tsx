import React from "react";
import { Tarjeta, Insignia } from "@/components/ui";
import { TorreIcono, CasaIcono } from "@/components/iconos";

export interface PanelEstrategiaProps {
  tipo: "larga" | "corta";
  titulo: string;
  subtitulo: string;
  rentabilidadNetaStr: string;
  rangoMinMaxStr: string;
  flujoMensualStr: string;
  ingresoBrutoStr: string;
  ingresoNetoStr: string;
  esGanadora?: boolean;
}

export const PanelEstrategia: React.FC<PanelEstrategiaProps> = ({
  tipo,
  titulo,
  subtitulo,
  rentabilidadNetaStr,
  rangoMinMaxStr,
  flujoMensualStr,
  ingresoBrutoStr,
  ingresoNetoStr,
  esGanadora = false,
}) => {
  const esLarga = tipo === "larga";
  const colorBorde = esLarga ? "brass" : "teal";
  const colorTextoHex = esLarga ? "var(--brass-400)" : "var(--teal-400)";

  return (
    <Tarjeta
      superficie="elevada"
      bordeColor={colorBorde}
      className="relative flex flex-col justify-between h-full transition-all duration-200"
    >
      <div>
        {/* Encabezado del Panel */}
        <div className="flex items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
          <div className="flex items-center gap-2">
            {esLarga ? (
              <TorreIcono size={22} className="text-[var(--brass-400)]" />
            ) : (
              <CasaIcono size={22} className="text-[var(--teal-400)]" />
            )}
            <div>
              <h3 className="text-sm font-semibold text-[var(--mist-100)]">{titulo}</h3>
              <p className="text-[11px] text-[var(--mist-400)]">{subtitulo}</p>
            </div>
          </div>
          {esGanadora && (
            <Insignia variante={esLarga ? "brass" : "teal"} className="text-[10px]">
              Mayor Rentabilidad
            </Insignia>
          )}
        </div>

        {/* Cifra Héroe y Rango */}
        <div className="py-5 text-center sm:text-left space-y-1">
          <span className="text-xs font-mono text-[var(--mist-400)] uppercase tracking-wider block">
            Rentabilidad Neta Anual
          </span>
          <div
            className="text-4xl sm:text-5xl font-display font-bold tabular-nums tracking-tight"
            style={{ color: colorTextoHex }}
          >
            {rentabilidadNetaStr}
          </div>
          <p className="text-xs text-[var(--mist-400)] font-sans">{rangoMinMaxStr}</p>
        </div>
      </div>

      {/* Resumen de Flujo de Caja */}
      <div className="pt-4 border-t border-[var(--line)] grid grid-cols-2 gap-2 text-xs font-mono">
        <div>
          <span className="text-[11px] text-[var(--mist-400)] block">Flujo Mensual</span>
          <span className="text-sm font-semibold text-[var(--mist-100)]">{flujoMensualStr}</span>
        </div>
        <div>
          <span className="text-[11px] text-[var(--mist-400)] block">Ingreso Neto Anual</span>
          <span className="text-sm font-semibold text-[var(--mist-100)]">{ingresoNetoStr}</span>
        </div>
      </div>
    </Tarjeta>
  );
};
