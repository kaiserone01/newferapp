import { EntradaCalculo, ResultadoRentaLarga } from "./tipos";
import {
  DEFAULT_ADMINISTRACION_LARGA_PORCENTAJE,
  DEFAULT_CAPEX_PORCENTAJE,
  DEFAULT_COSTOS_CIERRE_PORCENTAJE,
  DEFAULT_DOTACION_LARGA_PORCENTAJE,
  DEFAULT_MANTENIMIENTO_LARGA_PORCENTAJE,
  DEFAULT_OTROS_GASTOS_ANUALES_MONTO,
  DEFAULT_PREDIAL_ANUAL_PORCENTAJE,
  DEFAULT_SEGURO_ANUAL_PORCENTAJE,
  DEFAULT_VACANCIA_LARGA_PORCENTAJE,
} from "./defaults";

/**
 * Calcula la rentabilidad en la modalidad de Renta Larga (Alquiler Tradicional).
 * 
 * @param entrada Variables de entrada ingresadas por el usuario.
 * @returns ResultadoRentaLarga Desglose financiero completo.
 */
export function calcularRentaLarga(entrada: EntradaCalculo): ResultadoRentaLarga {
  const precio = entrada.precio;
  const costosCierre = precio * (entrada.costosCierrePorcentaje ?? DEFAULT_COSTOS_CIERRE_PORCENTAJE);
  const remodelacion = entrada.remodelacionMonto ?? 0;
  const dotacion = precio * (entrada.dotacionLargaPorcentaje ?? DEFAULT_DOTACION_LARGA_PORCENTAJE);

  const inversionTotal = precio + costosCierre + remodelacion + dotacion;

  const ingresoBrutoPotencialAnual = entrada.rentaMensualLarga * 12;
  const tasaVacancia = entrada.vacanciaLargaPorcentaje ?? DEFAULT_VACANCIA_LARGA_PORCENTAJE;
  const perdidaVacanciaAnual = ingresoBrutoPotencialAnual * tasaVacancia;
  const ingresoBrutoEfectivoAnual = ingresoBrutoPotencialAnual - perdidaVacanciaAnual;

  const tasaMantenimiento = entrada.mantenimientoLargaPorcentaje ?? DEFAULT_MANTENIMIENTO_LARGA_PORCENTAJE;
  const mantenimientoAnual = ingresoBrutoEfectivoAnual * tasaMantenimiento;

  const tasaAdministracion = entrada.administracionLargaPorcentaje ?? DEFAULT_ADMINISTRACION_LARGA_PORCENTAJE;
  const administracionAnual = ingresoBrutoEfectivoAnual * tasaAdministracion;

  const seguroAnual = precio * (entrada.seguroAnualPorcentaje ?? DEFAULT_SEGURO_ANUAL_PORCENTAJE);
  const predialAnual = precio * (entrada.predialAnualPorcentaje ?? DEFAULT_PREDIAL_ANUAL_PORCENTAJE);
  const otrosGastosAnual = entrada.otrosGastosAnualesMonto ?? DEFAULT_OTROS_GASTOS_ANUALES_MONTO;

  const gastosOperativosAnual =
    mantenimientoAnual + administracionAnual + seguroAnual + predialAnual + otrosGastosAnual;

  const tasaCapex = entrada.capexPorcentaje ?? DEFAULT_CAPEX_PORCENTAJE;
  const reservaCapexAnual = ingresoBrutoEfectivoAnual * tasaCapex;

  const ingresoNetoAnual = ingresoBrutoEfectivoAnual - gastosOperativosAnual - reservaCapexAnual;
  const flujoMensual = ingresoNetoAnual / 12;

  const rentabilidadBruta = (ingresoBrutoPotencialAnual / inversionTotal) * 100;
  const rentabilidadNeta = (ingresoNetoAnual / inversionTotal) * 100;
  const capRate = rentabilidadNeta;
  const paybackAnios = ingresoNetoAnual > 0 ? inversionTotal / ingresoNetoAnual : 0;

  return {
    inversionTotal,
    ingresoBrutoPotencialAnual,
    perdidaVacanciaAnual,
    ingresoBrutoEfectivoAnual,
    gastosOperativosAnual,
    reservaCapexAnual,
    ingresoNetoAnual,
    flujoMensual,
    rentabilidadBruta,
    rentabilidadNeta,
    capRate,
    paybackAnios,
  };
}
