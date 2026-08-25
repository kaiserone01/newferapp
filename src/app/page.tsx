"use client";

import React, { useState } from "react";
import { FormularioPrincipal } from "@/components/formulario";
import { ComparadorEstrategias, DesglosePasoAPaso, MetricasAdicionales } from "@/components/resultados";
import { EjeOcupacion } from "@/components/eje-equilibrio";
import { EntradaCalculo, ResultadoCalculo } from "@/nucleo/rentabilidad/tipos";
import { calculadora } from "@/nucleo/rentabilidad";
import { UIAdapter } from "@/adaptadores/salida/UIAdapter";
import { BalanzaIcono } from "@/components/iconos";

export default function Home() {
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);

  const handleCalculoValido = (datos: EntradaCalculo) => {
    const res = calculadora.calcular(datos);
    setResultado(res);
  };

  const handleCalculoInvalido = () => {
    setResultado(null);
  };

  const vista = resultado ? UIAdapter.adaptarParaUI(resultado) : null;

  return (
    <main className="min-h-screen p-3 sm:p-6 lg:p-8 max-w-[1180px] mx-auto space-y-6 sm:space-y-8">
      {/* Encabezado principal */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
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
        <div className="text-right hidden sm:block">
          <span className="text-xs font-mono text-[var(--mist-600)] block">Modelo Stateless</span>
          <span className="text-xs font-mono text-[var(--teal-400)]">Sin Base de Datos</span>
        </div>
      </header>

      {/* Zona 1: Formulario de Entrada (Mobile First 375px) */}
      <section className="w-full">
        <FormularioPrincipal
          onCalculoValido={handleCalculoValido}
          onCalculoInvalido={handleCalculoInvalido}
        />
      </section>

      {/* Zona 2 & 3: Comparador, Eje de Equilibrio y Desglose de Resultados */}
      {resultado && vista && (
        <section className="w-full space-y-6 sm:space-y-8 transition-all duration-300">
          {/* Comparador de Estrategias y Cifra Héroe */}
          <ComparadorEstrategias
            vista={vista}
            rentabilidadNegativa={resultado.rentabilidadNegativa}
          />

          {/* Elemento Firma: Eje de Ocupación de Equilibrio (§7.4) */}
          <EjeOcupacion
            equilibrio={resultado.equilibrio}
            ocupacionEstimadaPct={resultado.entradaAplicada.ocupacionCorta * 100}
          />

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
    </main>
  );
}
