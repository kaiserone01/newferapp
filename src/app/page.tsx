"use client";

import React, { useState } from "react";
import { FormularioPrincipal } from "@/components/formulario";
import { ComparadorEstrategias, DesglosePasoAPaso, MetricasAdicionales } from "@/components/resultados";
import { EjeOcupacion } from "@/components/eje-equilibrio";
import { EntradaCalculo, ResultadoCalculo } from "@/nucleo/rentabilidad/tipos";
import { calculadora } from "@/nucleo/rentabilidad";
import { UIAdapter } from "@/adaptadores/salida/UIAdapter";
import { BalanzaIcono } from "@/components/iconos";
import { Boton, TourGuia } from "@/components/ui";

export default function Home() {
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [tourActivo, setTourActivo] = useState(false);
  const [valoresPrefijados, setValoresPrefijados] = useState<EntradaCalculo | null>(null);

  const handleCalculoValido = React.useCallback((datos: EntradaCalculo) => {
    const res = calculadora.calcular(datos);
    setResultado(res);
  }, []);

  const handleCalculoInvalido = React.useCallback(() => {
    setResultado(null);
  }, []);

  const handleStartTourPrefill = React.useCallback(() => {
    setValoresPrefijados({
      precio: 300000,
      rentaMensualLarga: 1800,
      tarifaNocheCorta: 220,
      ocupacionCorta: 0.70,
      moneda: "USD",
    });
  }, []);

  const handleCloseTour = React.useCallback(() => {
    setTourActivo(false);
    setValoresPrefijados(null);
  }, []);

  const vista = resultado ? UIAdapter.adaptarParaUI(resultado) : null;

  return (
    <main className="min-h-screen p-3 sm:p-6 lg:p-8 max-w-[1180px] mx-auto space-y-6 sm:space-y-8">
      {/* Encabezado principal */}
      <header id="header-principal" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[var(--ink-800)] border border-[var(--teal-400)]/40 text-[var(--teal-400)]">
            <BalanzaIcono size={26} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-[var(--mist-100)] tracking-tight">
              Calculadora de Rentabilidad Inmobiliaria
            </h1>
            <p className="text-xs sm:text-sm text-[var(--mist-400)]">
              Comparativa de rentabilidad neta: Alquiler Tradicional vs. Vacacional
            </p>
          </div>
        </div>
        <div className="text-right flex flex-col items-end gap-1.5 shrink-0">
          <Boton
            variante="secundario"
            tamano="sm"
            onClick={() => setTourActivo(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ink-800)] border border-[var(--teal-400)]/30 text-[var(--teal-400)] hover:bg-[var(--teal-400)] hover:text-[var(--ink-900)] transition-colors duration-150 shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Ver Tour</span>
          </Boton>
          <span className="text-[10px] font-mono text-[var(--mist-500)] hidden sm:block">Guía rápida</span>
        </div>
      </header>

      {/* Zona 1: Formulario de Entrada (Mobile First 375px) */}
      <section id="seccion-formulario" className="w-full">
        <FormularioPrincipal
          onCalculoValido={handleCalculoValido}
          onCalculoInvalido={handleCalculoInvalido}
          valoresPrefijados={valoresPrefijados}
        />
      </section>

      {/* Zona 2 & 3: Comparador, Eje de Equilibrio y Desglose de Resultados */}
      {resultado && vista && (
        <section className="w-full space-y-6 sm:space-y-8 transition-all duration-300">
          {/* Comparador de Estrategias y Cifra Héroe */}
          <div id="comparador-estrategias" className="w-full">
            <ComparadorEstrategias
              vista={vista}
              resultado={resultado}
            />
          </div>

          {/* Elemento Firma: Eje de Ocupación de Equilibrio (§7.4) */}
          <div id="eje-equilibrio" className="w-full">
            <EjeOcupacion
              equilibrio={resultado.equilibrio}
              ocupacionEstimadaPct={resultado.entradaAplicada.ocupacionCorta * 100}
            />
          </div>

          {/* Métricas Adicionales (Cap Rate, Payback, Sensibilidad) */}
          <MetricasAdicionales vista={vista} />

          {/* Desglose Paso a Paso */}
          <DesglosePasoAPaso resultado={resultado} />
        </section>
      )}

      {/* Pie de página */}
      <footer className="border-t border-[var(--line)] pt-6 pb-8 text-center text-xs text-[var(--mist-600)] font-mono">
        Calculadora de Rentabilidad Inmobiliaria — Estimaciones defensivas basadas en supuestos declarados.
      </footer>

      {tourActivo && (
        <TourGuia
          onClose={handleCloseTour}
          onStartTour={handleStartTourPrefill}
        />
      )}
    </main>
  );
}
