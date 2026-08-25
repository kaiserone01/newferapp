"use client";

import React, { useState } from "react";
import { PanelEstrategia } from "./PanelEstrategia";
import { VistaResultadosUI } from "@/adaptadores/salida/UIAdapter";
import { BalanzaIcono, AlertaIcono, DocumentoIcono } from "@/components/iconos";
import { Boton } from "@/components/ui";
import { ResultadoCalculo } from "@/nucleo/rentabilidad/tipos";
import { PDFAdapter } from "@/adaptadores/salida/PDFAdapter";

export interface ComparadorEstrategiasProps {
  vista: VistaResultadosUI;
  resultado: ResultadoCalculo;
}

export const ComparadorEstrategias: React.FC<ComparadorEstrategiasProps> = ({
  vista,
  resultado,
}) => {
  const [descargando, setDescargando] = useState(false);
  const esCortaGanadora = vista.estrategiaGanadora === "corta";
  const esLargaGanadora = vista.estrategiaGanadora === "larga";

  const handleDescargarPDF = async () => {
    try {
      setDescargando(true);
      await PDFAdapter.descargarPDF(resultado);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    } finally {
      setDescargando(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Banner de Estrategia Ganadora, Diferencia y Botón de PDF */}
      <div className="p-3 sm:p-4 rounded-[10px] bg-[var(--ink-800)] border border-[var(--line)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <BalanzaIcono size={20} className="text-[var(--teal-400)] shrink-0" />
          <span className="text-[var(--mist-100)] font-medium">
            {esCortaGanadora ? (
              <>
                La <strong className="text-[var(--teal-400)]">Renta Corta</strong> genera{" "}
                <strong className="text-[var(--mist-100)]">{vista.diferenciaAnualStr}</strong> adicionales
                al año en el escenario base.
              </>
            ) : esLargaGanadora ? (
              <>
                La <strong className="text-[var(--brass-400)]">Renta Larga</strong> genera{" "}
                <strong className="text-[var(--mist-100)]">{vista.diferenciaAnualStr}</strong> adicionales
                al año en el escenario base.
              </>
            ) : (
              "Ambas estrategias generan el mismo rendimiento neto en el escenario base."
            )}
          </span>
        </div>

        <Boton
          id="btn-descargar-pdf"
          variante="primario"
          tamano="sm"
          onClick={handleDescargarPDF}
          disabled={descargando}
          className="w-full md:w-auto shrink-0"
        >
          <DocumentoIcono size={16} />
          <span>{descargando ? "Generando PDF..." : "Generar Reporte PDF"}</span>
        </Boton>
      </div>

      {/* Alerta de Rentabilidad Negativa (§5) */}
      {resultado.rentabilidadNegativa && (
        <div className="p-3 sm:p-4 rounded-[10px] bg-[var(--coral-400)]/15 border border-[var(--coral-400)]/40 flex items-center gap-3 text-xs text-[var(--coral-400)]">
          <AlertaIcono size={20} className="shrink-0" />
          <span>
            <strong>Atención:</strong> Los gastos totales proyectados superan el ingreso bruto en al menos una de las modalidades. La rentabilidad neta resulta negativa.
          </span>
        </div>
      )}

      {/* Tarjetas Lado a Lado (Desktop) / Apiladas (Mobile 375px) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PanelEstrategia
          tipo="larga"
          titulo="Renta Larga (Tradicional)"
          subtitulo="Alquiler mensual residencial a largo plazo"
          rentabilidadNetaStr={vista.larga.rentabilidadNetaStr}
          rentabilidadNetaVal={resultado.larga.rentabilidadNeta}
          rangoMinMaxStr={vista.larga.rangoMinMaxStr}
          flujoMensualStr={vista.larga.flujoMensualStr}
          ingresoBrutoStr={vista.larga.ingresoBrutoAnualStr}
          ingresoNetoStr={vista.larga.ingresoNetoAnualStr}
          esGanadora={esLargaGanadora}
        />
 
        <PanelEstrategia
          tipo="corta"
          titulo="Renta Corta (Vacacional)"
          subtitulo={`Alquiler por noches (${vista.nochesOcupadasStr} estimadas)`}
          rentabilidadNetaStr={vista.corta.rentabilidadNetaStr}
          rentabilidadNetaVal={resultado.corta.rentabilidadNeta}
          rangoMinMaxStr={vista.corta.rangoMinMaxStr}
          flujoMensualStr={vista.corta.flujoMensualStr}
          ingresoBrutoStr={vista.corta.ingresoBrutoAnualStr}
          ingresoNetoStr={vista.corta.ingresoNetoAnualStr}
          esGanadora={esCortaGanadora}
        />
      </div>
    </div>
  );
};
