"use client";

import { useEffect, useRef } from "react";

const INTERVALO_PING_MS = 20_000;
const RUTAS_EXCLUIDAS = ["/visitas"];

function rutaExcluida(pathname: string): boolean {
  return RUTAS_EXCLUIDAS.some((ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`));
}

function generarSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function VisitTracker() {
  const yaMontado = useRef(false);

  useEffect(() => {
    if (yaMontado.current) return;
    if (rutaExcluida(window.location.pathname)) return;
    yaMontado.current = true;

    const sessionId = generarSessionId();
    const inicio = Date.now();

    fetch("/api/visitas/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, path: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});

    const enviarPing = () => {
      fetch("/api/visitas/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
        keepalive: true,
      }).catch(() => {});
    };

    const intervaloPing = window.setInterval(enviarPing, INTERVALO_PING_MS);

    const enviarFin = () => {
      const duracionSegundos = (Date.now() - inicio) / 1000;
      navigator.sendBeacon(
        "/api/visitas/track/fin",
        JSON.stringify({ sessionId, duracionSegundos })
      );
    };

    const alCambiarVisibilidad = () => {
      if (document.visibilityState === "hidden") {
        enviarFin();
      }
    };

    document.addEventListener("visibilitychange", alCambiarVisibilidad);
    window.addEventListener("pagehide", enviarFin);

    return () => {
      window.clearInterval(intervaloPing);
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      window.removeEventListener("pagehide", enviarFin);
    };
  }, []);

  return null;
}
