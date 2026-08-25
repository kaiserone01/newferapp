import crypto from "node:crypto";
import geoip from "geoip-lite";
import { NextRequest, userAgent } from "next/server";
import db from "./db";
import type { RegistrarFinEntrada, RegistrarInicioEntrada } from "./tipos";

function obtenerIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "0.0.0.0";
}

export function extraerDatosDeSolicitud(request: NextRequest): Omit<
  RegistrarInicioEntrada,
  "sessionId" | "path"
> {
  const ip = obtenerIp(request);
  const { device, browser, os } = userAgent(request);
  const ubicacion = geoip.lookup(ip);

  return {
    ip,
    userAgent: request.headers.get("user-agent") ?? "",
    pais: ubicacion?.country ?? null,
    ciudad: ubicacion?.city || null,
    dispositivo: device.type ?? "desktop",
    navegador: browser.name ?? "desconocido",
    sistemaOperativo: os.name ?? "desconocido",
  };
}

export function calcularVisitorHash(ip: string, userAgentStr: string): string {
  return crypto.createHash("sha256").update(`${ip}|${userAgentStr}`).digest("hex");
}

export function registrarInicio(entrada: RegistrarInicioEntrada): void {
  const visitorHash = calcularVisitorHash(entrada.ip, entrada.userAgent);

  db.prepare(
    `INSERT INTO visitas
      (session_id, visitor_hash, path, pais, ciudad, dispositivo, navegador, sistema_operativo, iniciado_en)
     VALUES (@sessionId, @visitorHash, @path, @pais, @ciudad, @dispositivo, @navegador, @sistemaOperativo, @iniciadoEn)`
  ).run({
    sessionId: entrada.sessionId,
    visitorHash,
    path: entrada.path,
    pais: entrada.pais,
    ciudad: entrada.ciudad,
    dispositivo: entrada.dispositivo,
    navegador: entrada.navegador,
    sistemaOperativo: entrada.sistemaOperativo,
    iniciadoEn: new Date().toISOString(),
  });
}

export function registrarFin(entrada: RegistrarFinEntrada): void {
  db.prepare(
    `UPDATE visitas
     SET finalizado_en = @finalizadoEn, duracion_segundos = @duracionSegundos
     WHERE session_id = @sessionId`
  ).run({
    sessionId: entrada.sessionId,
    finalizadoEn: new Date().toISOString(),
    duracionSegundos: Math.round(entrada.duracionSegundos),
  });
}
