import { EntradaCalculo, ResultadoRentaCorta } from "./tipos";
import {
  DEFAULT_ADMINISTRACION_CORTA_PORCENTAJE,
  DEFAULT_CANAL_PLATAFORMA,
  DEFAULT_CAPEX_PORCENTAJE,
  DEFAULT_COSTOS_CIERRE_PORCENTAJE,
  DEFAULT_COSTO_LIMPIEZA_MONTO,
  DEFAULT_DOTACION_CORTA_PORCENTAJE,
  DEFAULT_DURACION_ESTADIA_NOCHES,
  DEFAULT_MANTENIMIENTO_CORTA_PORCENTAJE,
  DEFAULT_OTROS_GASTOS_ANUALES_MONTO,
  DEFAULT_PREDIAL_ANUAL_PORCENTAJE,
  DEFAULT_SEGURO_ANUAL_PORCENTAJE,
  DEFAULT_SERVICIOS_MENSUALES_CORTA_MONTO,
  TASAS_COMISION_CANAL,
} from "./defaults";

/**
 * Calcula la rentabilidad en la modalidad de Renta Corta (Alquiler Vacacional).
 * 
 * @param entrada Variables de entrada ingresadas por el usuario.
 * @returns ResultadoRentaCorta Desglose financiero completo.
 */
export function calcularRentaCorta(entrada: EntradaCalculo): ResultadoRentaCorta {
  const precio = entrada.precio;
  const costosCierre = precio * (entrada.costosCierrePorcentaje ?? DEFAULT_COSTOS_CIERRE_PORCENTAJE);
  const remodelacion = entrada.remodelacionMonto ?? 0;
  const dotacion = precio * (entrada.dotacionCortaPorcentaje ?? DEFAULT_DOTACION_CORTA_PORCENTAJE);

  const inversionTotal = precio + costosCierre + remodelacion + dotacion;

  const nochesOcupadasAnual = 365 * entrada.ocupacionCorta;
  const ingresoBrutoAnual = nochesOcupadasAnual * entrada.tarifaNocheCorta;

  const canal = entrada.canalPlataforma ?? DEFAULT_CANAL_PLATAFORMA;
  const tasaComision = entrada.comisionPlataformaPorcentaje ?? TASAS_COMISION_CANAL[canal];
  const comisionPlataformaAnual = ingresoBrutoAnual * tasaComision;

  const tasaAdministracion = entrada.administracionCortaPorcentaje ?? DEFAULT_ADMINISTRACION_CORTA_PORCENTAJE;
  const administracionAnual = ingresoBrutoAnual * tasaAdministracion;

  const duracionEstadia = entrada.duracionEstadiaNoches ?? DEFAULT_DURACION_ESTADIA_NOCHES;
  const estadiasAnual = duracionEstadia > 0 ? nochesOcupadasAnual / duracionEstadia : 0;
  const costoLimpiezaUnidad = entrada.costoLimpiezaMonto ?? DEFAULT_COSTO_LIMPIEZA_MONTO;
  const costoLimpiezaAnual = estadiasAnual * costoLimpiezaUnidad;

  const serviciosMensuales = entrada.serviciosMensualesCortaMonto ?? DEFAULT_SERVICIOS_MENSUALES_CORTA_MONTO;
  const serviciosAnual = serviciosMensuales * 12;

  const tasaMantenimiento = entrada.mantenimientoCortaPorcentaje ?? DEFAULT_MANTENIMIENTO_CORTA_PORCENTAJE;
  const mantenimientoAnual = ingresoBrutoAnual * tasaMantenimiento;

  const seguroAnual = precio * (entrada.seguroAnualPorcentaje ?? DEFAULT_SEGURO_ANUAL_PORCENTAJE);
  const predialAnual = precio * (entrada.predialAnualPorcentaje ?? DEFAULT_PREDIAL_ANUAL_PORCENTAJE);
  const otrosGastosAnual = entrada.otrosGastosAnualesMonto ?? DEFAULT_OTROS_GASTOS_ANUALES_MONTO;

  const tasaCapex = entrada.capexPorcentaje ?? DEFAULT_CAPEX_PORCENTAJE;
  const reservaCapexAnual = ingresoBrutoAnual * tasaCapex;

  const gastosTotalesAnual =
    comisionPlataformaAnual +
    administracionAnual +
    costoLimpiezaAnual +
    serviciosAnual +
    mantenimientoAnual +
    seguroAnual +
    predialAnual +
    otrosGastosAnual +
    reservaCapexAnual;

  const ingresoNetoAnual = ingresoBrutoAnual - gastosTotalesAnual;
  const flujoMensual = ingresoNetoAnual / 12;

  const rentabilidadBruta = (ingresoBrutoAnual / inversionTotal) * 100;
  const rentabilidadNeta = (ingresoNetoAnual / inversionTotal) * 100;
  const capRate = rentabilidadNeta;
  const paybackAnios = ingresoNetoAnual > 0 ? inversionTotal / ingresoNetoAnual : 0;

  return {
    inversionTotal,
    nochesOcupadasAnual,
    ingresoBrutoAnual,
    comisionPlataformaAnual,
    administracionAnual,
    estadiasAnual,
    costoLimpiezaAnual,
    serviciosAnual,
    mantenimientoAnual,
    seguroAnual,
    predialAnual,
    reservaCapexAnual,
    gastosTotalesAnual,
    ingresoNetoAnual,
    flujoMensual,
    rentabilidadBruta,
    rentabilidadNeta,
    capRate,
    paybackAnios,
  };
}
