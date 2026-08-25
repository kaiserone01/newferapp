"use client";

import { useEffect, useRef } from "react";

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
    yaMontado.current = true;

    const sessionId = generarSessionId();
    const inicio = Date.now();

    fetch("/api/visitas/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, path: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});

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
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      window.removeEventListener("pagehide", enviarFin);
    };
  }, []);

  return null;
}
