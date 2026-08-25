import { z } from "zod";
import { EntradaCalculo } from "@/nucleo/rentabilidad/tipos";
import { esquemaEntradaCalculo, EntradaFormularioRaw } from "@/nucleo/rentabilidad/esquema-entrada";

export interface ResultadoValidacionFormulario {
  exito: boolean;
  datos?: EntradaCalculo;
  errores?: Record<string, string>;
}

/**
 * Adaptador de Entrada (Hexagonal):
 * Parsea y valida los datos capturados en el formulario web antes de enviarlos al dominio.
 */
export class FormularioAdapter {
  /**
   * Convierte y valida las entradas de texto crudo de la UI en un objeto EntradaCalculo.
   */
  static transformarYValidar(raw: EntradaFormularioRaw): ResultadoValidacionFormulario {
    const parseNumber = (val?: string): number | undefined => {
      if (!val || val.trim() === "") return undefined;
      const num = parseFloat(val.replace(/,/g, "."));
      return isNaN(num) ? undefined : num;
    };

    const objetoProcesado: Record<string, unknown> = {
      precio: parseNumber(raw.precio),
      rentaMensualLarga: parseNumber(raw.rentaMensualLarga),
      tarifaNocheCorta: parseNumber(raw.tarifaNocheCorta),
      ocupacionCorta:
        raw.ocupacionCorta !== undefined && raw.ocupacionCorta.trim() !== ""
          ? (parseNumber(raw.ocupacionCorta) ?? 0) > 1
            ? (parseNumber(raw.ocupacionCorta) ?? 0) / 100
            : parseNumber(raw.ocupacionCorta) ?? 0
          : undefined,
      moneda: raw.moneda || "USD",

      costosCierrePorcentaje: raw.costosCierrePorcentaje ? (parseNumber(raw.costosCierrePorcentaje) ?? 0) / 100 : undefined,
      remodelacionMonto: parseNumber(raw.remodelacionMonto),
      dotacionLargaPorcentaje: raw.dotacionLargaPorcentaje ? (parseNumber(raw.dotacionLargaPorcentaje) ?? 0) / 100 : undefined,
      dotacionCortaPorcentaje: raw.dotacionCortaPorcentaje ? (parseNumber(raw.dotacionCortaPorcentaje) ?? 0) / 100 : undefined,

      vacanciaLargaPorcentaje: raw.vacanciaLargaPorcentaje ? (parseNumber(raw.vacanciaLargaPorcentaje) ?? 0) / 100 : undefined,
      mantenimientoLargaPorcentaje: raw.mantenimientoLargaPorcentaje ? (parseNumber(raw.mantenimientoLargaPorcentaje) ?? 0) / 100 : undefined,
      mantenimientoCortaPorcentaje: raw.mantenimientoCortaPorcentaje ? (parseNumber(raw.mantenimientoCortaPorcentaje) ?? 0) / 100 : undefined,
      administracionLargaPorcentaje: raw.administracionLargaPorcentaje ? (parseNumber(raw.administracionLargaPorcentaje) ?? 0) / 100 : undefined,
      administracionCortaPorcentaje: raw.administracionCortaPorcentaje ? (parseNumber(raw.administracionCortaPorcentaje) ?? 0) / 100 : undefined,
      capexPorcentaje: raw.capexPorcentaje ? (parseNumber(raw.capexPorcentaje) ?? 0) / 100 : undefined,

      canalPlataforma: raw.canalPlataforma,
      comisionPlataformaPorcentaje: raw.comisionPlataformaPorcentaje ? (parseNumber(raw.comisionPlataformaPorcentaje) ?? 0) / 100 : undefined,
      duracionEstadiaNoches: parseNumber(raw.duracionEstadiaNoches),
      costoLimpiezaMonto: parseNumber(raw.costoLimpiezaMonto),
      serviciosMensualesCortaMonto: parseNumber(raw.serviciosMensualesCortaMonto),

      seguroAnualPorcentaje: raw.seguroAnualPorcentaje ? (parseNumber(raw.seguroAnualPorcentaje) ?? 0) / 100 : undefined,
      predialAnualPorcentaje: raw.predialAnualPorcentaje ? (parseNumber(raw.predialAnualPorcentaje) ?? 0) / 100 : undefined,
      otrosGastosAnualesMonto: parseNumber(raw.otrosGastosAnualesMonto),
    };

    const resultado = esquemaEntradaCalculo.safeParse(objetoProcesado);

    if (!resultado.success) {
      const mapaErrores: Record<string, string> = {};
      resultado.error.issues.forEach((issue: z.ZodIssue) => {
        const campo = issue.path[0] as string;
        if (!mapaErrores[campo]) {
          mapaErrores[campo] = issue.message;
        }
      });
      return { exito: false, errores: mapaErrores };
    }

    return { exito: true, datos: resultado.data as EntradaCalculo };
  }
}
