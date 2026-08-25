"use client";

import React from "react";
import { Desplegable, Input } from "@/components/ui";
import { SelectorCanalPlataforma } from "./SelectorCanalPlataforma";
import { EntradaFormularioRaw } from "@/nucleo/rentabilidad/esquema-entrada";
import { CanalPlataforma } from "@/nucleo/rentabilidad/tipos";

export interface AjustesAvanzadosProps {
  val: EntradaFormularioRaw;
  onChange: (campo: keyof EntradaFormularioRaw, valor: string) => void;
  simboloMoneda: string;
}

export const AjustesAvanzados: React.FC<AjustesAvanzadosProps> = ({
  val,
  onChange,
  simboloMoneda,
}) => {
  const handleCanalChange = (nuevoCanal: CanalPlataforma, tasaComisionPct: number) => {
    onChange("canalPlataforma", nuevoCanal);
    onChange("comisionPlataformaPorcentaje", tasaComisionPct.toString());
  };

  return (
    <Desplegable
      titulo="▸ Ajustes avanzados y supuestos del modelo"
      subtitulo="Despliega si el cliente requiere ajustar vacancia, mantenimiento, administración, servicios o impuestos."
      abiertoInicial={false}
      className="mt-4"
    >
      <div className="space-y-6 pt-2">
        {/* 1. Inversión Inicial */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-semibold text-[var(--brass-400)] uppercase tracking-wider">
            Inversión e Imprevistos Iniciales
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              etiqueta="Costos de Cierre"
              sufijo="%"
              value={val.costosCierrePorcentaje ?? "4.0"}
              onChange={(e) => onChange("costosCierrePorcentaje", e.target.value)}
              ayuda="Notaría, registro (defecto: 4%)"
            />
            <Input
              etiqueta="Remodelación"
              prefijo={simboloMoneda}
              value={val.remodelacionMonto ?? "0"}
              onChange={(e) => onChange("remodelacionMonto", e.target.value)}
              ayuda="Mejoras iniciales"
            />
            <Input
              etiqueta="Dotación Vacacional"
              sufijo="%"
              value={val.dotacionCortaPorcentaje ?? "8.0"}
              onChange={(e) => onChange("dotacionCortaPorcentaje", e.target.value)}
              ayuda="Mobiliario vacacional (defecto: 8%)"
            />
          </div>
        </div>

        {/* 2. Renta Larga (Tradicional) */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-semibold text-[var(--brass-400)] uppercase tracking-wider">
            Supuestos Renta Larga (Tradicional)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              etiqueta="Vacancia y Morosidad"
              sufijo="%"
              value={val.vacanciaLargaPorcentaje ?? "6.0"}
              onChange={(e) => onChange("vacanciaLargaPorcentaje", e.target.value)}
              ayuda="Semanas desocupado (defecto: 6%)"
            />
            <Input
              etiqueta="Mantenimiento Tradicional"
              sufijo="%"
              value={val.mantenimientoLargaPorcentaje ?? "8.0"}
              onChange={(e) => onChange("mantenimientoLargaPorcentaje", e.target.value)}
              ayuda="% del ingreso efectivo (defecto: 8%)"
            />
            <Input
              etiqueta="Administración Inmobiliaria"
              sufijo="%"
              value={val.administracionLargaPorcentaje ?? "8.0"}
              onChange={(e) => onChange("administracionLargaPorcentaje", e.target.value)}
              ayuda="Honorarios agencia (defecto: 8%)"
            />
          </div>
        </div>

        {/* 3. Renta Corta (Vacacional) */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-semibold text-[var(--teal-400)] uppercase tracking-wider">
            Supuestos Renta Corta (Vacacional)
          </h4>
          <SelectorCanalPlataforma
            canal={val.canalPlataforma || "airbnb-host"}
            onCambioCanal={handleCanalChange}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            <Input
              etiqueta="Comisión Plataforma"
              sufijo="%"
              value={val.comisionPlataformaPorcentaje ?? "3.0"}
              onChange={(e) => onChange("comisionPlataformaPorcentaje", e.target.value)}
              ayuda="Airbnb/Booking comisión"
            />
            <Input
              etiqueta="Administración Operador"
              sufijo="%"
              value={val.administracionCortaPorcentaje ?? "15.0"}
              onChange={(e) => onChange("administracionCortaPorcentaje", e.target.value)}
              ayuda="Gestor vacacional (defecto: 15%)"
            />
            <Input
              etiqueta="Mantenimiento Vacacional"
              sufijo="%"
              value={val.mantenimientoCortaPorcentaje ?? "8.0"}
              onChange={(e) => onChange("mantenimientoCortaPorcentaje", e.target.value)}
              ayuda="% del ingreso bruto (defecto: 8%)"
            />
            <Input
              etiqueta="Estadía Promedio"
              sufijo="noches"
              value={val.duracionEstadiaNoches ?? "3"}
              onChange={(e) => onChange("duracionEstadiaNoches", e.target.value)}
              ayuda="Noches por huésped (defecto: 3)"
            />
            <Input
              etiqueta="Costo Limpieza Checkout"
              prefijo={simboloMoneda}
              value={val.costoLimpiezaMonto ?? "35"}
              onChange={(e) => onChange("costoLimpiezaMonto", e.target.value)}
              ayuda="Costo por estadía (defecto: $35)"
            />
            <Input
              etiqueta="Servicios Mensuales"
              prefijo={simboloMoneda}
              value={val.serviciosMensualesCortaMonto ?? "180"}
              onChange={(e) => onChange("serviciosMensualesCortaMonto", e.target.value)}
              ayuda="Luz, agua, wifi (defecto: $180/mes)"
            />
          </div>
        </div>

        {/* 4. Reserva y Tributarios */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-semibold text-[var(--mist-400)] uppercase tracking-wider">
            Reserva CapEx y Gastos Fijos Anuales
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              etiqueta="Reserva CapEx"
              sufijo="%"
              value={val.capexPorcentaje ?? "6.0"}
              onChange={(e) => onChange("capexPorcentaje", e.target.value)}
              ayuda="Reposición equipos (defecto: 6%)"
            />
            <Input
              etiqueta="Seguro Anual Propiedad"
              sufijo="%"
              value={val.seguroAnualPorcentaje ?? "0.35"}
              onChange={(e) => onChange("seguroAnualPorcentaje", e.target.value)}
              ayuda="% del precio (defecto: 0.35%)"
            />
            <Input
              etiqueta="Impuesto Predial Anual"
              sufijo="%"
              value={val.predialAnualPorcentaje ?? "0.5"}
              onChange={(e) => onChange("predialAnualPorcentaje", e.target.value)}
              ayuda="% del precio (defecto: 0.5%)"
            />
          </div>
        </div>
      </div>
    </Desplegable>
  );
};
