import type { RangoTiempo } from "./tipos";

export function calcularDesde(rango: RangoTiempo): string | null {
  const ahora = new Date();

  switch (rango) {
    case "hoy": {
      const inicioDelDia = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
      return inicioDelDia.toISOString();
    }
    case "7d": {
      const hace7Dias = new Date(ahora.getTime() - 7 * 24 * 60 * 60 * 1000);
      return hace7Dias.toISOString();
    }
    case "30d": {
      const hace30Dias = new Date(ahora.getTime() - 30 * 24 * 60 * 60 * 1000);
      return hace30Dias.toISOString();
    }
    case "todo":
      return null;
  }
}

export function granularidadPara(rango: RangoTiempo): "hora" | "dia" {
  return rango === "hoy" ? "hora" : "dia";
}
