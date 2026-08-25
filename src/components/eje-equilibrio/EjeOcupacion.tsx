import React, { useRef, useEffect } from "react";
import { Tarjeta, Insignia } from "@/components/ui";
import { ResultadoEquilibrio } from "@/nucleo/rentabilidad/tipos";
import { EjeIcono, AlertaIcono } from "@/components/iconos";
import gsap from "gsap";

export interface EjeOcupacionProps {
  equilibrio: ResultadoEquilibrio;
  ocupacionEstimadaPct: number; // Expresado en 0 a 100 (ej: 70)
}

export const EjeOcupacion: React.FC<EjeOcupacionProps> = ({
  equilibrio,
  ocupacionEstimadaPct,
}) => {
  const { ocupacionEquilibrio, porcentajeEquilibrio, estado, mensaje } = equilibrio;

  // Clampear valores entre 0 y 100 para posicionamiento en la barra de progreso
  const posEstimadaPct = Math.min(100, Math.max(0, ocupacionEstimadaPct));
  const posEquilibrioPct =
    porcentajeEquilibrio !== null ? Math.min(100, Math.max(0, porcentajeEquilibrio)) : null;

  // Determinar margen (diferencia entre ocupación estimada y ocupación de equilibrio)
  const tieneMargenPositivo =
    porcentajeEquilibrio !== null && ocupacionEstimadaPct >= porcentajeEquilibrio;

  const inicioRelleno = posEquilibrioPct !== null ? Math.min(posEquilibrioPct, posEstimadaPct) : 0;
  const anchoRelleno =
    posEquilibrioPct !== null ? Math.abs(posEstimadaPct - posEquilibrioPct) : 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const rellenoRef = useRef<HTMLDivElement>(null);
  const eqMarkerRef = useRef<HTMLDivElement>(null);
  const estMarkerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (estado === "sin_superacion") return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Configurar estado inicial
      if (rellenoRef.current) {
        gsap.set(rellenoRef.current, { scaleX: 0, transformOrigin: "left center" });
      }
      if (eqMarkerRef.current) {
        gsap.set(eqMarkerRef.current, { scale: 0 });
      }
      if (estMarkerRef.current) {
        gsap.set(estMarkerRef.current, { scale: 0 });
      }

      // Animar tramo de relleno (700ms)
      if (rellenoRef.current) {
        tl.to(rellenoRef.current, {
          scaleX: 1,
          duration: 0.7,
        });
      }

      // Animar marcadores (300ms)
      const markers = [];
      if (eqMarkerRef.current) markers.push(eqMarkerRef.current);
      if (estMarkerRef.current) markers.push(estMarkerRef.current);

      if (markers.length > 0) {
        tl.to(
          markers,
          {
            scale: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [porcentajeEquilibrio, ocupacionEstimadaPct, estado]);

  return (
    <Tarjeta superficie="base" className="w-full space-y-5">
      {/* Encabezado del Eje de Equilibrio */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <EjeIcono size={22} className="text-[var(--teal-400)]" />
          <h3 className="text-base font-display font-semibold text-[var(--mist-100)]">
            Eje de Ocupación de Equilibrio
          </h3>
        </div>
        <Insignia
          variante={
            estado === "normal"
              ? tieneMargenPositivo
                ? "teal"
                : "advertencia"
              : estado === "inalcanzable"
              ? "negativo"
              : "base"
          }
          className="self-start sm:self-auto font-mono text-xs"
        >
          {estado === "normal"
            ? tieneMargenPositivo
              ? "Margen Positivo"
              : "Bajo Equilibrio"
            : estado === "inalcanzable"
            ? "Inalcanzable"
            : "Revisar Supuestos"}
        </Insignia>
      </div>

      {/* Explicación en texto */}
      <p className="text-xs sm:text-sm text-[var(--mist-100)]">{mensaje}</p>

      {/* Elemento Firma: Barra Horizontal de 0% a 100% con rounded-full */}
      {estado !== "sin_superacion" && (
        <div ref={containerRef} className="pt-6 pb-4 px-2 sm:px-4">
          <div className="relative w-full h-3 bg-[var(--ink-700)] rounded-full border border-[var(--line)]">
            {/* Tramo Relleno entre Equilibrio y Estimada */}
            {posEquilibrioPct !== null && (
              <div
                ref={rellenoRef}
                className={`absolute h-full rounded-full transition-all duration-300 ${
                  tieneMargenPositivo ? "bg-[var(--teal-400)]/40" : "bg-[var(--coral-400)]/40"
                }`}
                style={{
                  left: `${inicioRelleno}%`,
                  width: `${anchoRelleno}%`,
                }}
              />
            )}

            {/* Marcador 1: Punto de Equilibrio (Triángulo en --mist-400) */}
            {posEquilibrioPct !== null && (
              <div
                ref={eqMarkerRef}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group z-10"
                style={{ left: `${posEquilibrioPct}%` }}
              >
                {/* Etiqueta arriba */}
                <div className="absolute -top-7 whitespace-nowrap bg-[var(--ink-900)] text-[var(--mist-100)] border border-[var(--line)] text-[10px] font-mono px-1.5 py-0.5 rounded shadow">
                  Eq: {porcentajeEquilibrio}%
                </div>
                {/* Icono Triángulo */}
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[var(--mist-100)]" />
              </div>
            )}

            {/* Marcador 2: Ocupación Estimada (Círculo lleno en --teal-400) */}
            <div
              ref={estMarkerRef}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-20"
              style={{ left: `${posEstimadaPct}%` }}
            >
              {/* Círculo lleno */}
              <div className="w-5 h-5 rounded-full bg-[var(--teal-400)] border-2 border-[var(--ink-900)] shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--ink-900)]" />
              </div>
              {/* Etiqueta abajo */}
              <div className="absolute top-6 whitespace-nowrap bg-[var(--teal-400)] text-[var(--ink-900)] text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow">
                Est: {ocupacionEstimadaPct.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Marcas de Eje 0%, 50%, 100% */}
          <div className="flex justify-between text-[10px] font-mono text-[var(--mist-600)] mt-6">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      )}

      {/* Caso Especial Sin Superación */}
      {estado === "sin_superacion" && (
        <div className="p-3 rounded-lg bg-[var(--coral-400)]/10 border border-[var(--coral-400)]/30 flex items-center gap-3 text-xs text-[var(--coral-400)]">
          <AlertaIcono size={20} className="shrink-0" />
          <span>
            La renta larga ofrece mayor rendimiento bajo cualquier porcentaje de ocupación con las tarifas y costos vacacionales actuales.
          </span>
        </div>
      )}
    </Tarjeta>
  );
};
