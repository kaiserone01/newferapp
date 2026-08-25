import { ICalculadoraRentabilidad } from "./puertos/ICalculadoraRentabilidad";
import { EntradaCalculo, ResultadoCalculo } from "./tipos";
import { calcularRentaLarga } from "./renta-larga";
import { calcularRentaCorta } from "./renta-corta";
import { calcularEquilibrio } from "./comparador";
import { calcularEscenarios, calcularSensibilidad } from "./escenarios";
import {
  DEFAULT_ADMINISTRACION_CORTA_PORCENTAJE,
  DEFAULT_ADMINISTRACION_LARGA_PORCENTAJE,
  DEFAULT_CANAL_PLATAFORMA,
  DEFAULT_CAPEX_PORCENTAJE,
  DEFAULT_COSTOS_CIERRE_PORCENTAJE,
  DEFAULT_COSTO_LIMPIEZA_MONTO,
  DEFAULT_DOTACION_CORTA_PORCENTAJE,
  DEFAULT_DOTACION_LARGA_PORCENTAJE,
  DEFAULT_DURACION_ESTADIA_NOCHES,
  DEFAULT_MANTENIMIENTO_CORTA_PORCENTAJE,
  DEFAULT_MANTENIMIENTO_LARGA_PORCENTAJE,
  DEFAULT_OTROS_GASTOS_ANUALES_MONTO,
  DEFAULT_PREDIAL_ANUAL_PORCENTAJE,
  DEFAULT_SEGURO_ANUAL_PORCENTAJE,
  DEFAULT_SERVICIOS_MENSUALES_CORTA_MONTO,
  DEFAULT_VACANCIA_LARGA_PORCENTAJE,
  TASAS_COMISION_CANAL,
} from "./defaults";

export * from "./tipos";
export * from "./defaults";
export * from "./formato";
export * from "./puertos/ICalculadoraRentabilidad";

/**
 * Implementación concreta de la Calculadora de Rentabilidad.
 * Cumple con el puerto ICalculadoraRentabilidad.
 */
export class CalculadoraRentabilidad implements ICalculadoraRentabilidad {
  calcular(entrada: EntradaCalculo): ResultadoCalculo {
    const canal = entrada.canalPlataforma ?? DEFAULT_CANAL_PLATAFORMA;

    const entradaAplicada: Required<EntradaCalculo> = {
      precio: entrada.precio,
      rentaMensualLarga: entrada.rentaMensualLarga,
      tarifaNocheCorta: entrada.tarifaNocheCorta,
      ocupacionCorta: entrada.ocupacionCorta,
      moneda: entrada.moneda ?? "USD",

      costosCierrePorcentaje: entrada.costosCierrePorcentaje ?? DEFAULT_COSTOS_CIERRE_PORCENTAJE,
      remodelacionMonto: entrada.remodelacionMonto ?? 0,
      dotacionLargaPorcentaje: entrada.dotacionLargaPorcentaje ?? DEFAULT_DOTACION_LARGA_PORCENTAJE,
      dotacionCortaPorcentaje: entrada.dotacionCortaPorcentaje ?? DEFAULT_DOTACION_CORTA_PORCENTAJE,

      vacanciaLargaPorcentaje: entrada.vacanciaLargaPorcentaje ?? DEFAULT_VACANCIA_LARGA_PORCENTAJE,
      mantenimientoLargaPorcentaje: entrada.mantenimientoLargaPorcentaje ?? DEFAULT_MANTENIMIENTO_LARGA_PORCENTAJE,
      mantenimientoCortaPorcentaje: entrada.mantenimientoCortaPorcentaje ?? DEFAULT_MANTENIMIENTO_CORTA_PORCENTAJE,
      administracionLargaPorcentaje: entrada.administracionLargaPorcentaje ?? DEFAULT_ADMINISTRACION_LARGA_PORCENTAJE,
      administracionCortaPorcentaje: entrada.administracionCortaPorcentaje ?? DEFAULT_ADMINISTRACION_CORTA_PORCENTAJE,
      capexPorcentaje: entrada.capexPorcentaje ?? DEFAULT_CAPEX_PORCENTAJE,

      canalPlataforma: canal,
      comisionPlataformaPorcentaje: entrada.comisionPlataformaPorcentaje ?? TASAS_COMISION_CANAL[canal],
      duracionEstadiaNoches: entrada.duracionEstadiaNoches ?? DEFAULT_DURACION_ESTADIA_NOCHES,
      costoLimpiezaMonto: entrada.costoLimpiezaMonto ?? DEFAULT_COSTO_LIMPIEZA_MONTO,
      serviciosMensualesCortaMonto: entrada.serviciosMensualesCortaMonto ?? DEFAULT_SERVICIOS_MENSUALES_CORTA_MONTO,

      seguroAnualPorcentaje: entrada.seguroAnualPorcentaje ?? DEFAULT_SEGURO_ANUAL_PORCENTAJE,
      predialAnualPorcentaje: entrada.predialAnualPorcentaje ?? DEFAULT_PREDIAL_ANUAL_PORCENTAJE,
      otrosGastosAnualesMonto: entrada.otrosGastosAnualesMonto ?? DEFAULT_OTROS_GASTOS_ANUALES_MONTO,
    };

    const larga = calcularRentaLarga(entradaAplicada);
    const corta = calcularRentaCorta(entradaAplicada);
    const equilibrio = calcularEquilibrio(entradaAplicada, larga, corta);
    const escenarios = calcularEscenarios(entradaAplicada);
    const sensibilidad = calcularSensibilidad(entradaAplicada);

    const diferenciaAnualMonto = corta.ingresoNetoAnual - larga.ingresoNetoAnual;
    let estrategiaGanadora: "larga" | "corta" | "empate" = "empate";
    if (diferenciaAnualMonto > 0.01) estrategiaGanadora = "corta";
    else if (diferenciaAnualMonto < -0.01) estrategiaGanadora = "larga";

    const rentabilidadNegativa = larga.rentabilidadNeta < 0 || corta.rentabilidadNeta < 0;

    return {
      entradaAplicada,
      larga,
      corta,
      equilibrio,
      escenarios,
      sensibilidad,
      diferenciaAnualMonto,
      estrategiaGanadora,
      rentabilidadNegativa,
    };
  }
}

/** Instancia por defecto lista para usar */
export const calculadora = new CalculadoraRentabilidad();
