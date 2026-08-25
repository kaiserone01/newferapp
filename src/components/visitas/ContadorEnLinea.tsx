"use client";

import { useEffect, useState } from "react";
import { Tarjeta } from "@/components/ui";
import { formatearNumero } from "@/lib/visitas/formato";

const INTERVALO_POLL_MS = 10_000;

export function ContadorEnLinea({ valorInicial }: { valorInicial: number }) {
  const [enLinea, setEnLinea] = useState(valorInicial);

  useEffect(() => {
    let cancelado = false;

    const consultar = async () => {
      try {
        const respuesta = await fetch("/api/visitas/online", { cache: "no-store" });
        const datos = await respuesta.json();
        if (!cancelado && typeof datos.enLinea === "number") {
          setEnLinea(datos.enLinea);
        }
      } catch {
        // Se ignora: el próximo intervalo reintenta.
      }
    };

    const intervalo = window.setInterval(consultar, INTERVALO_POLL_MS);

    return () => {
      cancelado = true;
      window.clearInterval(intervalo);
    };
  }, []);

  return (
    <Tarjeta bordeColor="teal" className="flex flex-col gap-1">
      <span className="flex items-center gap-1.5 text-xs text-[var(--mist-400)] uppercase tracking-wide">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--teal-400)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--teal-400)]" />
        </span>
        En línea ahora
      </span>
      <span className="text-2xl font-display font-bold text-[var(--mist-100)]">
        {formatearNumero(enLinea)}
      </span>
    </Tarjeta>
  );
}
