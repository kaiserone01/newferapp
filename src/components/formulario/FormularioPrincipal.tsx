"use client";

import React, { useState, useEffect } from "react";
import { Input, Tarjeta, Boton } from "@/components/ui";
import { SelectorMoneda } from "./SelectorMoneda";
import { AjustesAvanzados } from "./AjustesAvanzados";
import { EntradaFormularioRaw } from "@/nucleo/rentabilidad/esquema-entrada";
import { FormularioAdapter } from "@/adaptadores/entrada/FormularioAdapter";
import { EntradaCalculo, SimboloMoneda } from "@/nucleo/rentabilidad/tipos";
import { MonedaIcono } from "@/components/iconos";

export interface FormularioPrincipalProps {
  onCalculoValido: (datos: EntradaCalculo) => void;
  onCalculoInvalido: (errores: Record<string, string>) => void;
  valoresPrefijados?: EntradaCalculo | null;
}

const MAPEADOR_SIMBOLOS: Record<SimboloMoneda, string> = {
  USD: "US$",
  EUR: "€",
  DOP: "RD$",
};

export const FormularioPrincipal: React.FC<FormularioPrincipalProps> = ({
  onCalculoValido,
  onCalculoInvalido,
  valoresPrefijados = null,
}) => {
  const [val, setVal] = useState<EntradaFormularioRaw>({
    precio: "150000",
    rentaMensualLarga: "1500",
    tarifaNocheCorta: "100",
    ocupacionCorta: "70",
    moneda: "USD",
  });

  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleCampoChange = (campo: keyof EntradaFormularioRaw, valor: string) => {
    setVal((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleMonedaChange = (nuevaMoneda: SimboloMoneda) => {
    setVal((prev) => ({ ...prev, moneda: nuevaMoneda }));
  };

  const handleReset = () => {
    const defaultVal: EntradaFormularioRaw = {
      precio: "",
      rentaMensualLarga: "",
      tarifaNocheCorta: "",
      ocupacionCorta: "",
      moneda: "USD",
      costosCierrePorcentaje: "",
      remodelacionMonto: "",
      dotacionLargaPorcentaje: "",
      dotacionCortaPorcentaje: "",
      vacanciaLargaPorcentaje: "",
      mantenimientoLargaPorcentaje: "",
      mantenimientoCortaPorcentaje: "",
      administracionLargaPorcentaje: "",
      administracionCortaPorcentaje: "",
      capexPorcentaje: "",
      comisionPlataformaPorcentaje: "",
      duracionEstadiaNoches: "",
      costoLimpiezaMonto: "",
      serviciosMensualesCortaMonto: "",
      seguroAnualPorcentaje: "",
      predialAnualPorcentaje: "",
      otrosGastosAnualesMonto: "",
    };
    setVal(defaultVal);
  };

  // Prefijar valores del formulario (utilizado en el Tour Guiado)
  useEffect(() => {
    if (valoresPrefijados) {
      setVal({
        precio: valoresPrefijados.precio.toString(),
        rentaMensualLarga: valoresPrefijados.rentaMensualLarga.toString(),
        tarifaNocheCorta: valoresPrefijados.tarifaNocheCorta.toString(),
        ocupacionCorta: Math.round(valoresPrefijados.ocupacionCorta * 100).toString(),
        moneda: valoresPrefijados.moneda || "USD",
        costosCierrePorcentaje: valoresPrefijados.costosCierrePorcentaje !== undefined ? (valoresPrefijados.costosCierrePorcentaje * 100).toString() : "",
        remodelacionMonto: valoresPrefijados.remodelacionMonto?.toString() || "",
        dotacionLargaPorcentaje: valoresPrefijados.dotacionLargaPorcentaje !== undefined ? (valoresPrefijados.dotacionLargaPorcentaje * 100).toString() : "",
        dotacionCortaPorcentaje: valoresPrefijados.dotacionCortaPorcentaje !== undefined ? (valoresPrefijados.dotacionCortaPorcentaje * 100).toString() : "",
        vacanciaLargaPorcentaje: valoresPrefijados.vacanciaLargaPorcentaje !== undefined ? (valoresPrefijados.vacanciaLargaPorcentaje * 100).toString() : "",
        mantenimientoLargaPorcentaje: valoresPrefijados.mantenimientoLargaPorcentaje !== undefined ? (valoresPrefijados.mantenimientoLargaPorcentaje * 100).toString() : "",
        mantenimientoCortaPorcentaje: valoresPrefijados.mantenimientoCortaPorcentaje !== undefined ? (valoresPrefijados.mantenimientoCortaPorcentaje * 100).toString() : "",
        administracionLargaPorcentaje: valoresPrefijados.administracionLargaPorcentaje !== undefined ? (valoresPrefijados.administracionLargaPorcentaje * 100).toString() : "",
        administracionCortaPorcentaje: valoresPrefijados.administracionCortaPorcentaje !== undefined ? (valoresPrefijados.administracionCortaPorcentaje * 100).toString() : "",
        capexPorcentaje: valoresPrefijados.capexPorcentaje !== undefined ? (valoresPrefijados.capexPorcentaje * 100).toString() : "",
        canalPlataforma: valoresPrefijados.canalPlataforma || "airbnb-host",
        comisionPlataformaPorcentaje: valoresPrefijados.comisionPlataformaPorcentaje !== undefined ? (valoresPrefijados.comisionPlataformaPorcentaje * 100).toString() : "",
        duracionEstadiaNoches: valoresPrefijados.duracionEstadiaNoches?.toString() || "",
        costoLimpiezaMonto: valoresPrefijados.costoLimpiezaMonto?.toString() || "",
        serviciosMensualesCortaMonto: valoresPrefijados.serviciosMensualesCortaMonto?.toString() || "",
        seguroAnualPorcentaje: valoresPrefijados.seguroAnualPorcentaje !== undefined ? (valoresPrefijados.seguroAnualPorcentaje * 100).toString() : "",
        predialAnualPorcentaje: valoresPrefijados.predialAnualPorcentaje !== undefined ? (valoresPrefijados.predialAnualPorcentaje * 100).toString() : "",
        otrosGastosAnualesMonto: valoresPrefijados.otrosGastosAnualesMonto?.toString() || "",
      });
    }
  }, [valoresPrefijados]);

  // Validación automática cada vez que cambia el estado del formulario (efecto seguro sin actualización en render)
  useEffect(() => {
    const estaVacio = !val.precio && !val.rentaMensualLarga && !val.tarifaNocheCorta && !val.ocupacionCorta;
    if (estaVacio) {
      setErrores({});
      onCalculoInvalido({});
      return;
    }

    const res = FormularioAdapter.transformarYValidar(val);
    if (res.exito && res.datos) {
      setErrores({});
      onCalculoValido(res.datos);
    } else if (res.errores) {
      setErrores(res.errores);
      onCalculoInvalido(res.errores);
    }
  }, [val, onCalculoValido, onCalculoInvalido]);

  const simboloMoneda = MAPEADOR_SIMBOLOS[val.moneda || "USD"];

  return (
    <Tarjeta superficie="base" className="w-full">
      <div className="space-y-5">
        {/* Encabezado del Formulario */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
          <div className="flex items-center gap-2">
            <MonedaIcono size={20} className="text-[var(--teal-400)]" />
            <h2 className="text-base sm:text-lg font-display font-semibold text-[var(--mist-100)]">
              Datos de la Propiedad
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Boton
              variante="fantasma"
              tamano="sm"
              onClick={handleReset}
              className="text-[var(--mist-400)] hover:text-[var(--coral-400)] transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>Limpiar Datos</span>
            </Boton>
            <span className="text-xs text-[var(--mist-600)] font-mono hidden sm:inline">Entrada Mínima</span>
          </div>
        </div>

        {/* Selector de Moneda */}
        <div id="selector-moneda" className="w-full">
          <SelectorMoneda valor={val.moneda || "USD"} onCambio={handleMonedaChange} />
        </div>

        {/* 4 Campos Visibles Principales */}
        <div id="seccion-inputs" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            etiqueta="Precio de Compra de la Propiedad"
            prefijo={simboloMoneda}
            value={val.precio}
            onChange={(e) => handleCampoChange("precio", e.target.value)}
            error={errores.precio}
            placeholder="150000"
            ayuda="Monto total de adquisición"
          />

          <Input
            etiqueta="Renta Mensual Estimada (Tradicional)"
            prefijo={simboloMoneda}
            value={val.rentaMensualLarga}
            onChange={(e) => handleCampoChange("rentaMensualLarga", e.target.value)}
            error={errores.rentaMensualLarga}
            placeholder="1500"
            ayuda="Alquiler mensual renta larga"
          />

          <Input
            etiqueta="Tarifa Promedio por Noche (Vacacional)"
            prefijo={simboloMoneda}
            value={val.tarifaNocheCorta}
            onChange={(e) => handleCampoChange("tarifaNocheCorta", e.target.value)}
            error={errores.tarifaNocheCorta}
            placeholder="100"
            ayuda="Tarifa vacacional esperada"
          />

          <Input
            etiqueta="Ocupación Vacacional Estimada"
            sufijo="%"
            value={val.ocupacionCorta}
            onChange={(e) => handleCampoChange("ocupacionCorta", e.target.value)}
            error={errores.ocupacionCorta}
            placeholder="70"
            ayuda="Porcentaje de noches alquiladas (0 a 100)"
          />
        </div>

        {/* Ajustes Avanzados Plegados */}
        <div id="seccion-ajustes-avanzados" className="w-full">
          <AjustesAvanzados
            val={val}
            onChange={handleCampoChange}
            simboloMoneda={simboloMoneda}
          />
        </div>
      </div>
    </Tarjeta>
  );
};
