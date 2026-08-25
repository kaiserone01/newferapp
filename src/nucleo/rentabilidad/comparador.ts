import { EntradaCalculo, ResultadoEquilibrio, ResultadoRentaCorta, ResultadoRentaLarga } from "./tipos";
import {
  DEFAULT_ADMINISTRACION_CORTA_PORCENTAJE,
  DEFAULT_CANAL_PLATAFORMA,
  DEFAULT_CAPEX_PORCENTAJE,
  DEFAULT_COSTO_LIMPIEZA_MONTO,
  DEFAULT_DURACION_ESTADIA_NOCHES,
  DEFAULT_MANTENIMIENTO_CORTA_PORCENTAJE,
  DEFAULT_OTROS_GASTOS_ANUALES_MONTO,
  DEFAULT_PREDIAL_ANUAL_PORCENTAJE,
  DEFAULT_SEGURO_ANUAL_PORCENTAJE,
  DEFAULT_SERVICIOS_MENSUALES_CORTA_MONTO,
  TASAS_COMISION_CANAL,
} from "./defaults";

/**
 * Calcula el punto de ocupación de equilibrio donde Renta Corta e Ingreso Neto de Renta Larga son iguales.
 * Maneja los 3 casos límite descritos en el §4.6.
 */
export function calcularEquilibrio(
  entrada: EntradaCalculo,
  larga: ResultadoRentaLarga,
  _corta: ResultadoRentaCorta
): ResultadoEquilibrio {
  const precio = entrada.precio;
  const tarifa = entrada.tarifaNocheCorta;
  const duracionEstadia = entrada.duracionEstadiaNoches ?? DEFAULT_DURACION_ESTADIA_NOCHES;
  const costoLimpieza = entrada.costoLimpiezaMonto ?? DEFAULT_COSTO_LIMPIEZA_MONTO;

  const canal = entrada.canalPlataforma ?? DEFAULT_CANAL_PLATAFORMA;
  const tasaComision = entrada.comisionPlataformaPorcentaje ?? TASAS_COMISION_CANAL[canal];
  const tasaAdministracion = entrada.administracionCortaPorcentaje ?? DEFAULT_ADMINISTRACION_CORTA_PORCENTAJE;
  const tasaCapex = entrada.capexPorcentaje ?? DEFAULT_CAPEX_PORCENTAJE;
  const tasaMantenimiento = entrada.mantenimientoCortaPorcentaje ?? DEFAULT_MANTENIMIENTO_CORTA_PORCENTAJE;

  const tasasVariables = tasaComision + tasaAdministracion + tasaCapex + tasaMantenimiento;

  const serviciosAnual = (entrada.serviciosMensualesCortaMonto ?? DEFAULT_SERVICIOS_MENSUALES_CORTA_MONTO) * 12;
  const seguroAnual = precio * (entrada.seguroAnualPorcentaje ?? DEFAULT_SEGURO_ANUAL_PORCENTAJE);
  const predialAnual = precio * (entrada.predialAnualPorcentaje ?? DEFAULT_PREDIAL_ANUAL_PORCENTAJE);
  const otrosGastosAnual = entrada.otrosGastosAnualesMonto ?? DEFAULT_OTROS_GASTOS_ANUALES_MONTO;

  const gastosFijosCorta = serviciosAnual + seguroAnual + predialAnual + otrosGastosAnual;

  const costoLimpiezaPorNoche = duracionEstadia > 0 ? costoLimpieza / duracionEstadia : 0;
  const denominador = 365 * (tarifa * (1 - tasasVariables) - costoLimpiezaPorNoche);

  if (denominador <= 0) {
    return {
      ocupacionEquilibrio: null,
      porcentajeEquilibrio: null,
      estado: "sin_superacion",
      mensaje: "Con esta tarifa y costos, la renta corta no supera el rendimiento de la renta larga.",
    };
  }

  const numerador = larga.ingresoNetoAnual + gastosFijosCorta;
  const ocupacionCalculada = numerador / denominador;

  if (ocupacionCalculada <= 0) {
    return {
      ocupacionEquilibrio: ocupacionCalculada,
      porcentajeEquilibrio: Number((ocupacionCalculada * 100).toFixed(2)),
      estado: "anomalo",
      mensaje: "Caso anómalo: La renta corta genera mayor rendimiento incluso vacía. Revisa las entradas.",
    };
  }

  if (ocupacionCalculada > 1) {
    return {
      ocupacionEquilibrio: ocupacionCalculada,
      porcentajeEquilibrio: Number((ocupacionCalculada * 100).toFixed(2)),
      estado: "inalcanzable",
      mensaje: `Equilibrio inalcanzable: Se requiere ${(ocupacionCalculada * 100).toFixed(1)}% de ocupación (> 100%).`,
    };
  }

  return {
    ocupacionEquilibrio: ocupacionCalculada,
    porcentajeEquilibrio: Number((ocupacionCalculada * 100).toFixed(2)),
    estado: "normal",
    mensaje: `A partir del ${(ocupacionCalculada * 100).toFixed(1)}% de ocupación, la renta corta rinde más.`,
  };
}
