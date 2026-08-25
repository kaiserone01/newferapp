import { ResultadoCalculo, SimboloMoneda } from "@/nucleo/rentabilidad/tipos";
import { formatearMoneda, formatearPorcentaje, formatearNoches } from "@/nucleo/rentabilidad/formato";

export interface DatosFormateadosEstrategia {
  rentabilidadNetaStr: string;
  rentabilidadBrutaStr: string;
  flujoMensualStr: string;
  ingresoNetoAnualStr: string;
  ingresoBrutoAnualStr: string;
  rangoMinMaxStr: string;
  paybackAniosStr: string;
  capRateStr: string;
}

export interface VistaResultadosUI {
  larga: DatosFormateadosEstrategia;
  corta: DatosFormateadosEstrategia;
  diferenciaAnualStr: string;
  simboloMoneda: SimboloMoneda;
  estrategiaGanadora: "larga" | "corta" | "empate";
  sensibilidad: {
    ocupacionMas10Str: string;
    ocupacionMenos10Str: string;
    tarifaMas15Str: string;
    tarifaMenos15Str: string;
  };
  nochesOcupadasStr: string;
}

/**
 * Adaptador de Salida (Hexagonal):
 * Adapta el ResultadoCalculo del motor a representaciones listas para los componentes React.
 */
export class UIAdapter {
  static adaptarParaUI(res: ResultadoCalculo): VistaResultadosUI {
    const m = res.entradaAplicada.moneda || "USD";

    const adaptarEstrategia = (
      neta: number,
      bruta: number,
      flujo: number,
      netoAnual: number,
      brutoAnual: number,
      rango: [number, number],
      payback: number,
      capRate: number
    ): DatosFormateadosEstrategia => ({
      rentabilidadNetaStr: formatearPorcentaje(neta, 2),
      rentabilidadBrutaStr: formatearPorcentaje(bruta, 2),
      flujoMensualStr: formatearMoneda(flujo, m),
      ingresoNetoAnualStr: formatearMoneda(netoAnual, m),
      ingresoBrutoAnualStr: formatearMoneda(brutoAnual, m),
      rangoMinMaxStr: `rango ${formatearPorcentaje(rango[0], 1)} – ${formatearPorcentaje(rango[1], 1)}`,
      paybackAniosStr: payback > 0 ? `${payback.toFixed(1)} años` : "N/A",
      capRateStr: formatearPorcentaje(capRate, 2),
    });

    return {
      larga: adaptarEstrategia(
        res.larga.rentabilidadNeta,
        res.larga.rentabilidadBruta,
        res.larga.flujoMensual,
        res.larga.ingresoNetoAnual,
        res.larga.ingresoBrutoPotencialAnual,
        res.escenarios.rangoLargaMinMax,
        res.larga.paybackAnios,
        res.larga.capRate
      ),
      corta: adaptarEstrategia(
        res.corta.rentabilidadNeta,
        res.corta.rentabilidadBruta,
        res.corta.flujoMensual,
        res.corta.ingresoNetoAnual,
        res.corta.ingresoBrutoAnual,
        res.escenarios.rangoCortaMinMax,
        res.corta.paybackAnios,
        res.corta.capRate
      ),
      diferenciaAnualStr: formatearMoneda(Math.abs(res.diferenciaAnualMonto), m),
      simboloMoneda: m,
      estrategiaGanadora: res.estrategiaGanadora,
      sensibilidad: {
        ocupacionMas10Str: formatearPorcentaje(res.sensibilidad.cortaOcupacionMas10, 2),
        ocupacionMenos10Str: formatearPorcentaje(res.sensibilidad.cortaOcupacionMenos10, 2),
        tarifaMas15Str: formatearPorcentaje(res.sensibilidad.cortaTarifaMas15, 2),
        tarifaMenos15Str: formatearPorcentaje(res.sensibilidad.cortaTarifaMenos15, 2),
      },
      nochesOcupadasStr: formatearNoches(res.corta.nochesOcupadasAnual),
    };
  }
}
