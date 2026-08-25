import React from "react";
import { Tarjeta } from "@/components/ui";
import { ResultadoCalculo } from "@/nucleo/rentabilidad/tipos";
import { formatearMoneda, formatearPorcentaje } from "@/nucleo/rentabilidad/formato";
import { DesgloseIcono } from "@/components/iconos";

export interface DesglosePasoAPasoProps {
  resultado: ResultadoCalculo;
}

export const DesglosePasoAPaso: React.FC<DesglosePasoAPasoProps> = ({ resultado }) => {
  const m = resultado.entradaAplicada.moneda || "USD";
  const { larga, corta, entradaAplicada } = resultado;

  return (
    <Tarjeta superficie="base" className="w-full space-y-4">
      <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3">
        <DesgloseIcono size={20} className="text-[var(--teal-400)]" />
        <h3 className="text-base font-display font-semibold text-[var(--mist-100)]">
          Desglose Financiero Paso a Paso
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--line)] text-[var(--mist-400)]">
              <th className="py-2 pr-4 font-normal">Concepto Financiero</th>
              <th className="py-2 px-3 text-right font-normal text-[var(--brass-400)]">Renta Larga</th>
              <th className="py-2 pl-3 text-right font-normal text-[var(--teal-400)]">Renta Corta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)] text-[var(--mist-100)]">
            {/* Inversión Inicial */}
            <tr className="bg-[var(--ink-700)]/30 font-semibold">
              <td className="py-2.5 pr-4">Inversión Total Requerida</td>
              <td className="py-2.5 px-3 text-right">{formatearMoneda(larga.inversionTotal, m)}</td>
              <td className="py-2.5 pl-3 text-right">{formatearMoneda(corta.inversionTotal, m)}</td>
            </tr>

            {/* Ingresos Brutos */}
            <tr>
              <td className="py-2 pr-4 text-[var(--mist-400)]">
                Ingreso Bruto Potencial Anual
              </td>
              <td className="py-2 px-3 text-right">{formatearMoneda(larga.ingresoBrutoPotencialAnual, m)}</td>
              <td className="py-2 pl-3 text-right">{formatearMoneda(corta.ingresoBrutoAnual, m)}</td>
            </tr>
            {larga.perdidaVacanciaAnual > 0 && (
              <tr>
                <td className="py-2 pr-4 text-[var(--coral-400)] pl-4">
                  − Vacancia y Morosidad ({formatearPorcentaje(entradaAplicada.vacanciaLargaPorcentaje * 100, 1)})
                </td>
                <td className="py-2 px-3 text-right text-[var(--coral-400)]">
                  −{formatearMoneda(larga.perdidaVacanciaAnual, m)}
                </td>
                <td className="py-2 pl-3 text-right text-[var(--mist-600)]">—</td>
              </tr>
            )}

            {/* Gastos Vacacionales */}
            {corta.comisionPlataformaAnual > 0 && (
              <tr>
                <td className="py-2 pr-4 text-[var(--coral-400)] pl-4">
                  − Comisión Plataforma ({formatearPorcentaje(entradaAplicada.comisionPlataformaPorcentaje * 100, 1)})
                </td>
                <td className="py-2 px-3 text-right text-[var(--mist-600)]">—</td>
                <td className="py-2 pl-3 text-right text-[var(--coral-400)]">
                  −{formatearMoneda(corta.comisionPlataformaAnual, m)}
                </td>
              </tr>
            )}

            <tr>
              <td className="py-2 pr-4 text-[var(--coral-400)] pl-4">
                − Honorarios de Administración
              </td>
              <td className="py-2 px-3 text-right text-[var(--coral-400)]">
                −{formatearMoneda(larga.ingresoBrutoEfectivoAnual * entradaAplicada.administracionLargaPorcentaje, m)}
              </td>
              <td className="py-2 pl-3 text-right text-[var(--coral-400)]">
                −{formatearMoneda(corta.administracionAnual, m)}
              </td>
            </tr>

            {corta.costoLimpiezaAnual > 0 && (
              <tr>
                <td className="py-2 pr-4 text-[var(--coral-400)] pl-4">
                  − Costos de Limpieza Checkout
                </td>
                <td className="py-2 px-3 text-right text-[var(--mist-600)]">—</td>
                <td className="py-2 pl-3 text-right text-[var(--coral-400)]">
                  −{formatearMoneda(corta.costoLimpiezaAnual, m)}
                </td>
              </tr>
            )}

            {corta.serviciosAnual > 0 && (
              <tr>
                <td className="py-2 pr-4 text-[var(--coral-400)] pl-4">
                  − Servicios Públicos Vacacionales
                </td>
                <td className="py-2 px-3 text-right text-[var(--mist-600)]">—</td>
                <td className="py-2 pl-3 text-right text-[var(--coral-400)]">
                  −{formatearMoneda(corta.serviciosAnual, m)}
                </td>
              </tr>
            )}

            <tr>
              <td className="py-2 pr-4 text-[var(--coral-400)] pl-4">
                − Mantenimiento y Conservación
              </td>
              <td className="py-2 px-3 text-right text-[var(--coral-400)]">
                −{formatearMoneda(larga.ingresoBrutoEfectivoAnual * entradaAplicada.mantenimientoLargaPorcentaje, m)}
              </td>
              <td className="py-2 pl-3 text-right text-[var(--coral-400)]">
                −{formatearMoneda(corta.mantenimientoAnual, m)}
              </td>
            </tr>

            <tr>
              <td className="py-2 pr-4 text-[var(--coral-400)] pl-4">
                − Reserva CapEx ({formatearPorcentaje(entradaAplicada.capexPorcentaje * 100, 1)})
              </td>
              <td className="py-2 px-3 text-right text-[var(--coral-400)]">
                −{formatearMoneda(larga.reservaCapexAnual, m)}
              </td>
              <td className="py-2 pl-3 text-right text-[var(--coral-400)]">
                −{formatearMoneda(corta.reservaCapexAnual, m)}
              </td>
            </tr>

            {/* Total Ingreso Neto */}
            <tr className="bg-[var(--ink-700)]/50 font-bold text-sm">
              <td className="py-3 pr-4">Ingreso Neto Anual Residual</td>
              <td className="py-3 px-3 text-right text-[var(--brass-400)]">
                {formatearMoneda(larga.ingresoNetoAnual, m)}
              </td>
              <td className="py-3 pl-3 text-right text-[var(--teal-400)]">
                {formatearMoneda(corta.ingresoNetoAnual, m)}
              </td>
            </tr>

            {/* Rentabilidades Finales */}
            <tr className="font-bold text-sm">
              <td className="py-2.5 pr-4">Rentabilidad Bruta Anual</td>
              <td className="py-2.5 px-3 text-right">{formatearPorcentaje(larga.rentabilidadBruta, 2)}</td>
              <td className="py-2.5 pl-3 text-right">{formatearPorcentaje(corta.rentabilidadBruta, 2)}</td>
            </tr>

            <tr className="font-bold text-base bg-[var(--ink-700)]">
              <td className="py-3 pr-4">Rentabilidad Neta Anual</td>
              <td className="py-3 px-3 text-right text-[var(--brass-400)]">
                {formatearPorcentaje(larga.rentabilidadNeta, 2)}
              </td>
              <td className="py-3 pl-3 text-right text-[var(--teal-400)]">
                {formatearPorcentaje(corta.rentabilidadNeta, 2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Tarjeta>
  );
};
