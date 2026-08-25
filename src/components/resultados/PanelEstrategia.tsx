import React, { useRef, useEffect } from "react";
import { Tarjeta, Insignia } from "@/components/ui";
import { TorreIcono, CasaIcono } from "@/components/iconos";
import gsap from "gsap";

export interface PanelEstrategiaProps {
  tipo: "larga" | "corta";
  titulo: string;
  subtitulo: string;
  rentabilidadNetaStr: string;
  rentabilidadNetaVal: number;
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
  rentabilidadNetaVal,
  rangoMinMaxStr,
  flujoMensualStr,
  ingresoBrutoStr,
  ingresoNetoStr,
  esGanadora = false,
}) => {
  const esLarga = tipo === "larga";
  const colorBorde = esLarga ? "brass" : "teal";
  const colorTextoHex = esLarga ? "var(--brass-400)" : "var(--teal-400)";
  
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numRef.current) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const formateador = new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (isReduced) {
      numRef.current.textContent = `${formateador.format(rentabilidadNetaVal)}%`;
      return;
    }

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.fromTo(
        obj,
        { val: 0 },
        {
          val: rentabilidadNetaVal,
          duration: 0.9,
          ease: "power2.out",
          onUpdate: () => {
            if (numRef.current) {
              numRef.current.textContent = `${formateador.format(obj.val)}%`;
            }
          },
        }
      );
    }, numRef);

    return () => ctx.revert();
  }, [rentabilidadNetaVal]);

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
            ref={numRef}
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

