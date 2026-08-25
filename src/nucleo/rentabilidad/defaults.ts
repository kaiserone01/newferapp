import { CanalPlataforma } from "./tipos";

/**
 * Supuestos y parámetros por defecto para la Calculadora de Rentabilidad.
 * Ningún valor numérico vive harcodeado en las funciones del motor.
 */

/** Costos de cierre (registro, notaría, honorarios) en % del precio (4%) */
export const DEFAULT_COSTOS_CIERRE_PORCENTAJE = 0.04;

/** Dotación/equipamiento para renta larga (0%) */
export const DEFAULT_DOTACION_LARGA_PORCENTAJE = 0.0;

/** Dotación/equipamiento para renta corta (8% del precio) */
export const DEFAULT_DOTACION_CORTA_PORCENTAJE = 0.08;

/** Tasa de vacancia y morosidad en renta larga (6%) */
export const DEFAULT_VACANCIA_LARGA_PORCENTAJE = 0.06;

/** Gastos de mantenimiento en renta larga (% del ingreso bruto efectivo, 8%) */
export const DEFAULT_MANTENIMIENTO_LARGA_PORCENTAJE = 0.08;

/** Gastos de mantenimiento en renta corta (% del ingreso bruto, 8%) */
export const DEFAULT_MANTENIMIENTO_CORTA_PORCENTAJE = 0.08;

/** Tasa de administración en renta larga (8%) */
export const DEFAULT_ADMINISTRACION_LARGA_PORCENTAJE = 0.08;

/** Tasa de administración en renta corta (15%) */
export const DEFAULT_ADMINISTRACION_CORTA_PORCENTAJE = 0.15;

/** Reserva CapEx (6% del ingreso bruto) */
export const DEFAULT_CAPEX_PORCENTAJE = 0.06;

/** Canal de plataforma por defecto ('airbnb-host') */
export const DEFAULT_CANAL_PLATAFORMA: CanalPlataforma = "airbnb-host";

/** Tasas de comisión por canal de plataforma */
export const TASAS_COMISION_CANAL: Record<CanalPlataforma, number> = {
  "airbnb-host": 0.03,
  "airbnb-shared": 0.15,
  booking: 0.17,
  directo: 0.0,
};

/** Duración promedio de estadía vacacional (3 noches) */
export const DEFAULT_DURACION_ESTADIA_NOCHES = 3;

/** Costo promedio por limpieza checkout (US$35) */
export const DEFAULT_COSTO_LIMPIEZA_MONTO = 35;

/** Servicios mensuales en renta corta (US$180/mes) */
export const DEFAULT_SERVICIOS_MENSUALES_CORTA_MONTO = 180;

/** Seguro de propiedad anual (0.35% del precio anual) */
export const DEFAULT_SEGURO_ANUAL_PORCENTAJE = 0.0035;

/** Impuesto predial anual (0.5% del precio anual) */
export const DEFAULT_PREDIAL_ANUAL_PORCENTAJE = 0.005;

/** Otros gastos fijos anuales ($0) */
export const DEFAULT_OTROS_GASTOS_ANUALES_MONTO = 0;
