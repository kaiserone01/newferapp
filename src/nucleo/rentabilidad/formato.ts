import { SimboloMoneda } from "./tipos";

const MAPEADOR_MONEDAS: Record<SimboloMoneda, { locale: string; currency: string; symbol: string }> = {
  USD: { locale: "es-US", currency: "USD", symbol: "US$" },
  EUR: { locale: "es-ES", currency: "EUR", symbol: "€" },
  DOP: { locale: "es-DO", currency: "DOP", symbol: "RD$" },
};

/**
 * Formatea un valor numérico como moneda según el símbolo y locale.
 * Redondeo ocurre ÚNICAMENTE aquí, nunca en los valores intermedios.
 */
export function formatearMoneda(monto: number, simbolo: SimboloMoneda = "USD"): string {
  const config = MAPEADOR_MONEDAS[simbolo] ?? MAPEADOR_MONEDAS.USD;
  const formateador = new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formateador.format(monto);
}

/**
 * Formatea un número como porcentaje con el número de decimales especificado (defecto: 2).
 */
export function formatearPorcentaje(valorPorcentual: number, decimales: number = 2): string {
  const formateador = new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
  return `${formateador.format(valorPorcentual)}%`;
}

/**
 * Formatea un número de noches o días con 1 decimal.
 */
export function formatearNoches(noches: number): string {
  const formateador = new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `${formateador.format(noches)} noches`;
}
