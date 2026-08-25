const NOMBRES_PAIS = new Intl.DisplayNames(["es"], { type: "region" });

export function formatearNumero(valor: number): string {
  return new Intl.NumberFormat("es-ES").format(valor);
}

export function formatearDuracion(segundos: number | null): string {
  if (segundos === null || Number.isNaN(segundos)) return "—";

  const totalSegundos = Math.round(segundos);
  const minutos = Math.floor(totalSegundos / 60);
  const resto = totalSegundos % 60;

  if (minutos === 0) return `${resto}s`;
  return `${minutos}m ${resto}s`;
}

export function nombrePais(codigoIso: string): string {
  if (codigoIso === "Desconocido") return "Desconocido";
  try {
    return NOMBRES_PAIS.of(codigoIso) ?? codigoIso;
  } catch {
    return codigoIso;
  }
}

export function etiquetaBucket(bucket: string, granularidad: "hora" | "dia"): string {
  if (granularidad === "hora") {
    return bucket.slice(11, 16);
  }
  return bucket.slice(5, 10);
}
