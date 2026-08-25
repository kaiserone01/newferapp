import { EntradaCalculo, ResultadoEscenarios, ResultadoSensibilidad } from "./tipos";
import { calcularRentaLarga } from "./renta-larga";
import { calcularRentaCorta } from "./renta-corta";
import {
  DEFAULT_ADMINISTRACION_CORTA_PORCENTAJE,
  DEFAULT_ADMINISTRACION_LARGA_PORCENTAJE,
  DEFAULT_CAPEX_PORCENTAJE,
  DEFAULT_COSTO_LIMPIEZA_MONTO,
  DEFAULT_MANTENIMIENTO_CORTA_PORCENTAJE,
  DEFAULT_MANTENIMIENTO_LARGA_PORCENTAJE,
  DEFAULT_OTROS_GASTOS_ANUALES_MONTO,
  DEFAULT_SERVICIOS_MENSUALES_CORTA_MONTO,
  DEFAULT_VACANCIA_LARGA_PORCENTAJE,
} from "./defaults";

/**
 * Calcula los 3 escenarios de rentabilidad (Pesimista, Base, Optimista) descritos en el §4.5.
 */
export function calcularEscenarios(entrada: EntradaCalculo): ResultadoEscenarios {
  // Base
  const baseLarga = calcularRentaLarga(entrada);
  const baseCorta = calcularRentaCorta(entrada);

  // Pesimista
  const ocupacionPesimista = Math.max(0, entrada.ocupacionCorta - 0.12);
  const tarifaPesimista = entrada.tarifaNocheCorta * 0.90;
  const vacanciaPesimista = (entrada.vacanciaLargaPorcentaje ?? DEFAULT_VACANCIA_LARGA_PORCENTAJE) + 0.05;

  const entradaPesimista: EntradaCalculo = {
    ...entrada,
    ocupacionCorta: ocupacionPesimista,
    tarifaNocheCorta: tarifaPesimista,
    vacanciaLargaPorcentaje: vacanciaPesimista,
    mantenimientoLargaPorcentaje: (entrada.mantenimientoLargaPorcentaje ?? DEFAULT_MANTENIMIENTO_LARGA_PORCENTAJE) * 1.15,
    mantenimientoCortaPorcentaje: (entrada.mantenimientoCortaPorcentaje ?? DEFAULT_MANTENIMIENTO_CORTA_PORCENTAJE) * 1.15,
    administracionLargaPorcentaje: (entrada.administracionLargaPorcentaje ?? DEFAULT_ADMINISTRACION_LARGA_PORCENTAJE) * 1.15,
    administracionCortaPorcentaje: (entrada.administracionCortaPorcentaje ?? DEFAULT_ADMINISTRACION_CORTA_PORCENTAJE) * 1.15,
    capexPorcentaje: (entrada.capexPorcentaje ?? DEFAULT_CAPEX_PORCENTAJE) * 1.15,
    costoLimpiezaMonto: (entrada.costoLimpiezaMonto ?? DEFAULT_COSTO_LIMPIEZA_MONTO) * 1.15,
    serviciosMensualesCortaMonto: (entrada.serviciosMensualesCortaMonto ?? DEFAULT_SERVICIOS_MENSUALES_CORTA_MONTO) * 1.15,
    otrosGastosAnualesMonto: (entrada.otrosGastosAnualesMonto ?? DEFAULT_OTROS_GASTOS_ANUALES_MONTO) * 1.15,
  };

  const pesimistaLarga = calcularRentaLarga(entradaPesimista);
  const pesimistaCorta = calcularRentaCorta(entradaPesimista);

  // Optimista
  const ocupacionOptimista = Math.min(1.0, entrada.ocupacionCorta + 0.08);
  const tarifaOptimista = entrada.tarifaNocheCorta * 1.05;
  const vacanciaOptimista = Math.max(0, (entrada.vacanciaLargaPorcentaje ?? DEFAULT_VACANCIA_LARGA_PORCENTAJE) - 0.03);

  const entradaOptimista: EntradaCalculo = {
    ...entrada,
    ocupacionCorta: ocupacionOptimista,
    tarifaNocheCorta: tarifaOptimista,
    vacanciaLargaPorcentaje: vacanciaOptimista,
    mantenimientoLargaPorcentaje: (entrada.mantenimientoLargaPorcentaje ?? DEFAULT_MANTENIMIENTO_LARGA_PORCENTAJE) * 0.92,
    mantenimientoCortaPorcentaje: (entrada.mantenimientoCortaPorcentaje ?? DEFAULT_MANTENIMIENTO_CORTA_PORCENTAJE) * 0.92,
    administracionLargaPorcentaje: (entrada.administracionLargaPorcentaje ?? DEFAULT_ADMINISTRACION_LARGA_PORCENTAJE) * 0.92,
    administracionCortaPorcentaje: (entrada.administracionCortaPorcentaje ?? DEFAULT_ADMINISTRACION_CORTA_PORCENTAJE) * 0.92,
    capexPorcentaje: (entrada.capexPorcentaje ?? DEFAULT_CAPEX_PORCENTAJE) * 0.92,
    costoLimpiezaMonto: (entrada.costoLimpiezaMonto ?? DEFAULT_COSTO_LIMPIEZA_MONTO) * 0.92,
    serviciosMensualesCortaMonto: (entrada.serviciosMensualesCortaMonto ?? DEFAULT_SERVICIOS_MENSUALES_CORTA_MONTO) * 0.92,
    otrosGastosAnualesMonto: (entrada.otrosGastosAnualesMonto ?? DEFAULT_OTROS_GASTOS_ANUALES_MONTO) * 0.92,
  };

  const optimistaLarga = calcularRentaLarga(entradaOptimista);
  const optimistaCorta = calcularRentaCorta(entradaOptimista);

  return {
    pesimista: {
      rentabilidadNetaLarga: pesimistaLarga.rentabilidadNeta,
      rentabilidadNetaCorta: pesimistaCorta.rentabilidadNeta,
      ingresoNetoAnualLarga: pesimistaLarga.ingresoNetoAnual,
      ingresoNetoAnualCorta: pesimistaCorta.ingresoNetoAnual,
    },
    base: {
      rentabilidadNetaLarga: baseLarga.rentabilidadNeta,
      rentabilidadNetaCorta: baseCorta.rentabilidadNeta,
      ingresoNetoAnualLarga: baseLarga.ingresoNetoAnual,
      ingresoNetoAnualCorta: baseCorta.ingresoNetoAnual,
    },
    optimista: {
      rentabilidadNetaLarga: optimistaLarga.rentabilidadNeta,
      rentabilidadNetaCorta: optimistaCorta.rentabilidadNeta,
      ingresoNetoAnualLarga: optimistaLarga.ingresoNetoAnual,
      ingresoNetoAnualCorta: optimistaCorta.ingresoNetoAnual,
    },
    rangoLargaMinMax: [pesimistaLarga.rentabilidadNeta, optimistaLarga.rentabilidadNeta],
    rangoCortaMinMax: [pesimistaCorta.rentabilidadNeta, optimistaCorta.rentabilidadNeta],
  };
}

/**
 * Calcula la sensibilidad a ±10 pts de ocupación y ±15% de tarifa en renta corta.
 */
export function calcularSensibilidad(entrada: EntradaCalculo): ResultadoSensibilidad {
  const ocuMas10 = Math.min(1.0, entrada.ocupacionCorta + 0.10);
  const ocuMenos10 = Math.max(0, entrada.ocupacionCorta - 0.10);
  const tarifaMas15 = entrada.tarifaNocheCorta * 1.15;
  const tarifaMenos15 = entrada.tarifaNocheCorta * 0.85;

  return {
    cortaOcupacionMas10: calcularRentaCorta({ ...entrada, ocupacionCorta: ocuMas10 }).rentabilidadNeta,
    cortaOcupacionMenos10: calcularRentaCorta({ ...entrada, ocupacionCorta: ocuMenos10 }).rentabilidadNeta,
    cortaTarifaMas15: calcularRentaCorta({ ...entrada, tarifaNocheCorta: tarifaMas15 }).rentabilidadNeta,
    cortaTarifaMenos15: calcularRentaCorta({ ...entrada, tarifaNocheCorta: tarifaMenos15 }).rentabilidadNeta,
  };
}
