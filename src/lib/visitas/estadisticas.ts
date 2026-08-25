import db from "./db";
import { calcularDesde, granularidadPara } from "./rango";
import type {
  ConteoPorEtiqueta,
  EstadisticasVisitas,
  PuntoSerieTemporal,
  RangoTiempo,
} from "./tipos";

const LIMITE_ETIQUETAS = 10;

function condicionDesde(desde: string | null): { clausula: string; params: unknown[] } {
  return desde ? { clausula: "WHERE iniciado_en >= ?", params: [desde] } : { clausula: "", params: [] };
}

function contarPorColumna(columna: string, desde: string | null): ConteoPorEtiqueta[] {
  const { clausula, params } = condicionDesde(desde);
  const filtroExtra = clausula ? `${clausula} AND ${columna} IS NOT NULL` : `WHERE ${columna} IS NOT NULL`;

  const filas = db
    .prepare(
      `SELECT COALESCE(${columna}, 'Desconocido') AS etiqueta, COUNT(*) AS visitas
       FROM visitas
       ${filtroExtra}
       GROUP BY etiqueta
       ORDER BY visitas DESC
       LIMIT ${LIMITE_ETIQUETAS}`
    )
    .all(...params) as ConteoPorEtiqueta[];

  return filas;
}

export function obtenerEstadisticas(rango: RangoTiempo): EstadisticasVisitas {
  const desde = calcularDesde(rango);
  const granularidad = granularidadPara(rango);
  const { clausula, params } = condicionDesde(desde);

  const { total } = db
    .prepare(`SELECT COUNT(*) AS total FROM visitas ${clausula}`)
    .get(...params) as { total: number };

  const { unicos } = db
    .prepare(`SELECT COUNT(DISTINCT visitor_hash) AS unicos FROM visitas ${clausula}`)
    .get(...params) as { unicos: number };

  const filtroDuracion = clausula
    ? `${clausula} AND duracion_segundos IS NOT NULL`
    : "WHERE duracion_segundos IS NOT NULL";
  const { promedio } = db
    .prepare(`SELECT AVG(duracion_segundos) AS promedio FROM visitas ${filtroDuracion}`)
    .get(...params) as { promedio: number | null };

  const formatoBucket = granularidad === "hora" ? "%Y-%m-%dT%H:00" : "%Y-%m-%d";
  const serieTemporal = db
    .prepare(
      `SELECT strftime('${formatoBucket}', iniciado_en) AS bucket, COUNT(*) AS visitas
       FROM visitas
       ${clausula}
       GROUP BY bucket
       ORDER BY bucket ASC`
    )
    .all(...params) as PuntoSerieTemporal[];

  return {
    rango,
    totalVisitas: total,
    visitantesUnicos: unicos,
    duracionPromedioSegundos: promedio,
    serieTemporal,
    granularidad,
    porPais: contarPorColumna("pais", desde),
    porDispositivo: contarPorColumna("dispositivo", desde),
    porNavegador: contarPorColumna("navegador", desde),
    porSistemaOperativo: contarPorColumna("sistema_operativo", desde),
  };
}
