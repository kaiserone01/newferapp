"use client";

import React, { useState, useEffect } from "react";
import { Input, Tarjeta } from "@/components/ui";
import { SelectorMoneda } from "./SelectorMoneda";
import { AjustesAvanzados } from "./AjustesAvanzados";
import { EntradaFormularioRaw } from "@/nucleo/rentabilidad/esquema-entrada";
import { FormularioAdapter } from "@/adaptadores/entrada/FormularioAdapter";
import { EntradaCalculo, SimboloMoneda } from "@/nucleo/rentabilidad/tipos";
import { MonedaIcono } from "@/components/iconos";

export interface FormularioPrincipalProps {
  onCalculoValido: (datos: EntradaCalculo) => void;
  onCalculoInvalido: (errores: Record<string, string>) => void;
}

const MAPEADOR_SIMBOLOS: Record<SimboloMoneda, string> = {
  USD: "US$",
  EUR: "€",
  COP: "COL$",
  MXN: "MX$",
};

export const FormularioPrincipal: React.FC<FormularioPrincipalProps> = ({
  onCalculoValido,
  onCalculoInvalido,
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
    setVal((prev) => {
      const nuevoState = { ...prev, [campo]: valor };
      procesarValidacion(nuevoState);
      return nuevoState;
    });
  };

  const handleMonedaChange = (nuevaMoneda: SimboloMoneda) => {
    setVal((prev) => {
      const nuevoState = { ...prev, moneda: nuevaMoneda };
      procesarValidacion(nuevoState);
      return nuevoState;
    });
  };

  const procesarValidacion = (raw: EntradaFormularioRaw) => {
    const res = FormularioAdapter.transformarYValidar(raw);
    if (res.exito && res.datos) {
      setErrores({});
      onCalculoValido(res.datos);
    } else if (res.errores) {
      setErrores(res.errores);
      onCalculoInvalido(res.errores);
    }
  };

  // Validación inicial en el primer render
  useEffect(() => {
    procesarValidacion(val);
  }, []);

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
          <span className="text-xs text-[var(--mist-400)] font-mono">Entrada Mínima</span>
        </div>

        {/* Selector de Moneda */}
        <SelectorMoneda valor={val.moneda || "USD"} onCambio={handleMonedaChange} />

        {/* 4 Campos Visibles Principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <AjustesAvanzados
          val={val}
          onChange={handleCampoChange}
          simboloMoneda={simboloMoneda}
        />
      </div>
    </Tarjeta>
  );
};
