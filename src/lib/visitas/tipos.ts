export type RangoTiempo = "hoy" | "7d" | "30d" | "todo";

export interface RegistrarInicioEntrada {
  sessionId: string;
  path: string;
  ip: string;
  userAgent: string;
  pais: string | null;
  ciudad: string | null;
  dispositivo: string;
  navegador: string;
  sistemaOperativo: string;
}

export interface RegistrarFinEntrada {
  sessionId: string;
  duracionSegundos: number;
}

export interface PuntoSerieTemporal {
  bucket: string;
  visitas: number;
}

export interface ConteoPorEtiqueta {
  etiqueta: string;
  visitas: number;
}

export interface EstadisticasVisitas {
  rango: RangoTiempo;
  totalVisitas: number;
  visitantesUnicos: number;
  duracionPromedioSegundos: number | null;
  serieTemporal: PuntoSerieTemporal[];
  granularidad: "hora" | "dia";
  porPais: ConteoPorEtiqueta[];
  porDispositivo: ConteoPorEtiqueta[];
  porNavegador: ConteoPorEtiqueta[];
  porSistemaOperativo: ConteoPorEtiqueta[];
}
