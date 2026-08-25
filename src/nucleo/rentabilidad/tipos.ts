/**
 * Moneda admitida para el formato de salida
 */
export type SimboloMoneda = "USD" | "EUR" | "COP" | "MXN";

/**
 * Canal de distribución para renta corta (determina la comisión por defecto)
 */
export type CanalPlataforma = "airbnb-host" | "airbnb-shared" | "booking" | "directo";

/**
 * Datos de entrada para realizar el cálculo de rentabilidad.
 */
export interface EntradaCalculo {
  /** Precio de compra de la propiedad en la moneda seleccionada */
  precio: number;
  /** Renta mensual estimada en modalidad tradicional (renta larga) */
  rentaMensualLarga: number;
  /** Tarifa promedio por noche estimada en modalidad vacacional (renta corta) */
  tarifaNocheCorta: number;
  /** Porcentaje estimado de ocupación vacacional (0 a 1, ej: 0.70 para 70%) */
  ocupacionCorta: number;
  /** Símbolo de moneda para representación gráfica (defecto: 'USD') */
  moneda?: SimboloMoneda;

  // --- Ajustes Avanzados Opcionales (si no se envían, se aplican defaults) ---

  /** Costos de cierre (registro, notaría, honorarios) en % del precio (ej: 0.04) */
  costosCierrePorcentaje?: number;
  /** Costo de remodelación inicial en monto fijo */
  remodelacionMonto?: number;
  /** Costo de dotación/equipamiento (% del precio, ej: 0 en larga, 0.08 en corta) */
  dotacionLargaPorcentaje?: number;
  dotacionCortaPorcentaje?: number;

  /** Tasa de vacancia y morosidad en renta larga (% del ingreso bruto, ej: 0.06) */
  vacanciaLargaPorcentaje?: number;
  /** Mantenimiento (% del ingreso bruto efectivo, ej: 0.08) */
  mantenimientoLargaPorcentaje?: number;
  mantenimientoCortaPorcentaje?: number;
  /** Honorarios de administración (% del ingreso bruto efectivo, ej: 0.08 larga, 0.15 corta) */
  administracionLargaPorcentaje?: number;
  administracionCortaPorcentaje?: number;
  /** Reserva CapEx (% del ingreso bruto, ej: 0.06) */
  capexPorcentaje?: number;

  /** Canal de comisión de plataforma vacacional (defecto: 'airbnb-host') */
  canalPlataforma?: CanalPlataforma;
  /** Tasa de comisión de plataforma (% del ingreso bruto, ej: 0.03 para airbnb host-only) */
  comisionPlataformaPorcentaje?: number;
  /** Duración promedio de estadía en noches (defecto: 3) */
  duracionEstadiaNoches?: number;
  /** Costo promedio por limpieza de checkout */
  costoLimpiezaMonto?: number;
  /** Servicios públicos mensuales vacacionales (luz, agua, internet) */
  serviciosMensualesCortaMonto?: number;

  /** Seguro anual (% del precio, ej: 0.0035) */
  seguroAnualPorcentaje?: number;
  /** Impuesto predial anual (% del precio, ej: 0.005) */
  predialAnualPorcentaje?: number;
  /** Otros gastos fijos anuales */
  otrosGastosAnualesMonto?: number;
}

/**
 * Resultado detallado para la estrategia de Renta Larga
 */
export interface ResultadoRentaLarga {
  inversionTotal: number;
  ingresoBrutoPotencialAnual: number;
  perdidaVacanciaAnual: number;
  ingresoBrutoEfectivoAnual: number;
  gastosOperativosAnual: number;
  reservaCapexAnual: number;
  ingresoNetoAnual: number;
  flujoMensual: number;
  rentabilidadBruta: number;
  rentabilidadNeta: number;
  capRate: number;
  paybackAnios: number;
}

/**
 * Resultado detallado para la estrategia de Renta Corta
 */
export interface ResultadoRentaCorta {
  inversionTotal: number;
  nochesOcupadasAnual: number;
  ingresoBrutoAnual: number;
  comisionPlataformaAnual: number;
  administracionAnual: number;
  estadiasAnual: number;
  costoLimpiezaAnual: number;
  serviciosAnual: number;
  mantenimientoAnual: number;
  seguroAnual: number;
  predialAnual: number;
  reservaCapexAnual: number;
  gastosTotalesAnual: number;
  ingresoNetoAnual: number;
  flujoMensual: number;
  rentabilidadBruta: number;
  rentabilidadNeta: number;
  capRate: number;
  paybackAnios: number;
}

/**
 * Estado y métricas del Eje de Ocupación de Equilibrio
 */
export interface ResultadoEquilibrio {
  /** Porcentaje de ocupación requerido (0 a 1) o null si es inalcanzable */
  ocupacionEquilibrio: number | null;
  /** Porcentaje expresado de 0 a 100 */
  porcentajeEquilibrio: number | null;
  /** Estado del cálculo */
  estado: "normal" | "inalcanzable" | "anomalo" | "sin_superacion";
  /** Mensaje explicativo para la UI */
  mensaje: string;
}

/**
 * Resultado de escenarios (Pesimista, Base, Optimista)
 */
export interface EscenarioRentabilidad {
  rentabilidadNetaLarga: number;
  rentabilidadNetaCorta: number;
  ingresoNetoAnualLarga: number;
  ingresoNetoAnualCorta: number;
}

export interface ResultadoEscenarios {
  pesimista: EscenarioRentabilidad;
  base: EscenarioRentabilidad;
  optimista: EscenarioRentabilidad;
  rangoLargaMinMax: [number, number];
  rangoCortaMinMax: [number, number];
}

/**
 * Sensibilidad a cambios de ocupación y tarifa
 */
export interface ResultadoSensibilidad {
  cortaOcupacionMas10: number;
  cortaOcupacionMenos10: number;
  cortaTarifaMas15: number;
  cortaTarifaMenos15: number;
}

/**
 * Objeto completo de salida del motor financiero
 */
export interface ResultadoCalculo {
  entradaAplicada: Required<EntradaCalculo>;
  larga: ResultadoRentaLarga;
  corta: ResultadoRentaCorta;
  equilibrio: ResultadoEquilibrio;
  escenarios: ResultadoEscenarios;
  sensibilidad: ResultadoSensibilidad;
  diferenciaAnualMonto: number;
  estrategiaGanadora: "larga" | "corta" | "empate";
  rentabilidadNegativa: boolean;
}
