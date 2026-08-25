"use client";

import React, { useState, useEffect } from "react";
import { Boton } from "./Boton";

export interface TourGuiaProps {
  onClose: () => void;
  onStartTour: () => void;
}

const STEPS = [
  {
    targetId: "header-principal",
    titulo: "👋 ¡Bienvenido al Tour!",
    contenido: "Esta calculadora stateless te permite evaluar y comparar de forma visual la rentabilidad de una propiedad en alquiler tradicional frente al vacacional (turístico). Te guiaremos paso a paso por la interfaz.",
  },
  {
    targetId: "selector-moneda",
    titulo: "🪙 1. Selector de Divisa",
    contenido: "Selecciona la moneda del análisis: Dólares (USD), Euros (EUR) o Pesos Dominicanos (DOP). El motor financiero adaptará automáticamente los formatos monetarios y el tipo de cambio local.",
  },
  {
    targetId: "seccion-inputs",
    titulo: "✍️ 2. Datos Clave del Inmueble",
    contenido: "Ingresa el precio de compra, el alquiler tradicional estimado y la tarifa promedio por noche y ocupación esperada para la renta corta. Estos son los inputs esenciales del cálculo.",
  },
  {
    targetId: "seccion-ajustes-avanzados",
    titulo: "⚙️ 3. Ajustes Avanzados",
    contenido: "Despliega este menú para configurar supuestos avanzados: gastos de cierre/notaría, amueblamiento (dotación), administración (management), vacancia, limpiezas y gastos fijos (seguro, impuesto predial).",
  },
  {
    targetId: "comparador-estrategias",
    titulo: "📊 4. Veredicto y Comparativa",
    contenido: "Revisa las tarjetas de rentabilidad neta anual (Net Yield), el flujo mensual neto y los años necesarios para recuperar tu inversión (Payback). El banner superior te muestra la ganancia extra anual de la opción ganadora.",
  },
  {
    targetId: "eje-equilibrio",
    titulo: "⚖️ 5. Eje de Ocupación de Equilibrio",
    contenido: "Muestra gráficamente el porcentaje de ocupación vacacional requerido para igualar las ganancias del alquiler tradicional (triángulo). El círculo indica tu estimación y la barra colorea tu margen de ganancia.",
  },
  {
    targetId: "btn-descargar-pdf",
    titulo: "📄 6. Reporte PDF Vectorial",
    contenido: "Haz clic aquí para descargar un informe ejecutivo formal de dos páginas con todas las cifras y gráficos vectoriales formateados para impresión o envío directo a clientes y socios.",
  }
];

export const TourGuia: React.FC<TourGuiaProps> = ({ onClose, onStartTour }) => {
  const [step, setStep] = useState(0);

  // Inicializar cargando datos de prueba al comenzar
  useEffect(() => {
    onStartTour();
  }, [onStartTour]);

  // Manejar el resaltado del elemento actual
  useEffect(() => {
    const currentStepObj = STEPS[step];
    if (!currentStepObj) return;

    const el = document.getElementById(currentStepObj.targetId);
    if (el) {
      el.classList.add("tour-highlight");
      // Hacer scroll suave hacia el elemento
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return () => {
      if (el) {
        el.classList.remove("tour-highlight");
      }
    };
  }, [step]);

  const handleSiguiente = () => {
    if (step < STEPS.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handleAtras = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <>
      {/* Estilos inyectados autocontenidos para el resaltado del tour */}
      <style>{`
        .tour-highlight {
          position: relative !important;
          z-index: 100 !important;
          outline: 3px solid var(--teal-400) !important;
          outline-offset: 4px !important;
          box-shadow: 0 0 35px rgba(79, 209, 197, 0.4) !important;
          background-color: var(--ink-900) !important;
          transition: all 0.2s ease-in-out !important;
        }
      `}</style>

      {/* Backdrop oscuro translúcido */}
      <div className="fixed inset-0 z-[90] bg-[#070D1A]/80 backdrop-blur-[1px] pointer-events-auto" />

      {/* Tarjeta de Control del Tour */}
      <div className="fixed bottom-6 right-6 md:right-8 z-[110] max-w-[400px] w-[calc(100vw-3rem)] p-5 rounded-[12px] bg-[var(--ink-850)]/95 border border-[var(--line)] shadow-[0_10px_40px_rgba(7,13,26,0.8)] backdrop-blur-md flex flex-col gap-4 transition-all duration-300">
        {/* Cabecera */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-semibold tracking-wider text-[var(--teal-400)] uppercase">
            Guía de la Aplicación
          </span>
          <span className="text-[10px] font-mono text-[var(--mist-400)]">
            Paso {step + 1} de {STEPS.length}
          </span>
        </div>

        {/* Contenido */}
        <div className="space-y-1.5">
          <h4 className="text-sm font-display font-bold text-[var(--mist-100)]">
            {STEPS[step].titulo}
          </h4>
          <p className="text-xs text-[var(--mist-300)] leading-relaxed">
            {STEPS[step].contenido}
          </p>
        </div>

        {/* Barra de progreso visual */}
        <div className="h-1 w-full bg-[var(--ink-700)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--teal-400)] transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Botones de navegación */}
        <div className="flex items-center justify-between pt-1">
          <Boton
            variante="fantasma"
            tamano="sm"
            onClick={onClose}
            className="text-[var(--mist-500)] hover:text-[var(--coral-400)]"
          >
            Saltar
          </Boton>
          <div className="flex gap-2">
            {step > 0 && (
              <Boton variante="secundario" tamano="sm" onClick={handleAtras}>
                Atrás
              </Boton>
            )}
            <Boton variante="primario" tamano="sm" onClick={handleSiguiente}>
              {step === STEPS.length - 1 ? "Finalizar" : "Siguiente"}
            </Boton>
          </div>
        </div>
      </div>
    </>
  );
};
