import React from "react";
import { Boton, Input, Tarjeta, Desplegable, Separador, Insignia } from "@/components/ui";
import {
  TorreIcono,
  CasaIcono,
  CalendarioIcono,
  MonedaIcono,
  PorcentajeIcono,
  BalanzaIcono,
  EjeIcono,
  TendenciaIcono,
  RelojIcono,
  AlertaIcono,
  DocumentoIcono,
  DesgloseIcono,
} from "@/components/iconos";

export const metadata = {
  title: "Kitchen Sink — Design System | Calculadora de Rentabilidad",
  description: "Catálogo de componentes UI, tipografía, paleta de color e iconografía SVG",
};

export default function KitchenSinkPage() {
  return (
    <main className="min-h-screen p-4 sm:p-8 max-w-[1180px] mx-auto space-y-10">
      <header className="space-y-2 border-b border-[var(--line)] pb-6">
        <div className="flex items-center gap-3">
          <Insignia variante="teal">Fase 2</Insignia>
          <span className="text-xs text-[var(--mist-400)] font-mono">UI/UX Pro Max</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[var(--mist-100)]">
          Kitchen Sink — Design System
        </h1>
        <p className="text-sm text-[var(--mist-400)]">
          Catálogo completo de tokens de color, tipografías, primitivas UI y los 12 iconos SVG vectoriales.
        </p>
      </header>

      {/* 1. Paleta de Color */}
      <section className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-[var(--mist-100)]">
          1. Paleta de Colores
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-4 rounded-lg bg-[var(--ink-900)] border border-[var(--line)]">
            <span className="block text-[var(--mist-100)] font-semibold">ink-900</span>
            <span className="text-[var(--mist-600)]">#070D1A</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)]">
            <span className="block text-[var(--mist-100)] font-semibold">ink-800</span>
            <span className="text-[var(--mist-600)]">#0E1728</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-700)] border border-[var(--line)]">
            <span className="block text-[var(--mist-100)] font-semibold">ink-700</span>
            <span className="text-[var(--mist-600)]">#16223A</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--line)]">
            <span className="block text-[var(--mist-100)] font-semibold">line</span>
            <span className="text-[var(--mist-400)]">#22304E</span>
          </div>

          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--brass-400)]">
            <span className="block text-[var(--brass-400)] font-semibold">brass-400</span>
            <span className="text-[var(--mist-400)]">Renta Larga</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--teal-400)]">
            <span className="block text-[var(--teal-400)] font-semibold">teal-400</span>
            <span className="text-[var(--mist-400)]">Renta Corta</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--coral-400)]">
            <span className="block text-[var(--coral-400)] font-semibold">coral-400</span>
            <span className="text-[var(--mist-400)]">Gastos / Negativo</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--amber-400)]">
            <span className="block text-[var(--amber-400)] font-semibold">amber-400</span>
            <span className="text-[var(--mist-400)]">Advertencia</span>
          </div>
        </div>
      </section>

      <Separador />

      {/* 2. Tipografía */}
      <section className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-[var(--mist-100)]">
          2. Tipografía (3 Familias)
        </h2>
        <div className="space-y-4">
          <Tarjeta>
            <span className="text-xs text-[var(--mist-400)] font-mono block mb-1">
              Space Grotesk — Display / Cifras Héroe
            </span>
            <p className="text-4xl sm:text-5xl font-display font-bold text-[var(--teal-400)] tracking-tight">
              11.20%
            </p>
          </Tarjeta>
          <Tarjeta>
            <span className="text-xs text-[var(--mist-400)] font-mono block mb-1">
              Geist Sans — Cuerpo / Etiquetas / Textos
            </span>
            <p className="text-sm text-[var(--mist-100)]">
              La entrada debe ser mínima. El asesor inmobiliario opera frente al cliente durante la venta.
            </p>
          </Tarjeta>
          <Tarjeta>
            <span className="text-xs text-[var(--mist-400)] font-mono block mb-1">
              JetBrains Mono — Datos / Tablas (tabular-nums)
            </span>
            <p className="text-lg font-mono text-[var(--brass-400)] tabular-nums">
              US$ 150.000,00 | +9.00% neto anual
            </p>
          </Tarjeta>
        </div>
      </section>

      <Separador />

      {/* 3. Primitivas UI */}
      <section className="space-y-6">
        <h2 className="text-xl font-display font-semibold text-[var(--mist-100)]">
          3. Componentes Primitivos
        </h2>

        {/* Botones */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[var(--mist-400)]">Botones</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Boton variante="primario">Primario (Teal)</Boton>
            <Boton variante="brass">Renta Larga (Brass)</Boton>
            <Boton variante="secundario">Secundario</Boton>
            <Boton variante="fantasma">Fantasma</Boton>
            <Boton variante="primario" tamano="sm">Pequeño</Boton>
            <Boton variante="primario" tamano="lg">Grande</Boton>
            <Boton variante="primario" disabled>Deshabilitado</Boton>
          </div>
        </div>

        {/* Insignias */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[var(--mist-400)]">Insignias / Badges</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Insignia variante="base">Base</Insignia>
            <Insignia variante="positivo">🟢 Positivo (+11.2%)</Insignia>
            <Insignia variante="brass">Renta Larga</Insignia>
            <Insignia variante="teal">Renta Corta</Insignia>
            <Insignia variante="advertencia">🟡 Advertencia</Insignia>
            <Insignia variante="negativo">🔴 Negativo (-2.4%)</Insignia>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[var(--mist-400)]">Inputs de Formulario</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              etiqueta="Precio de la Propiedad"
              prefijo="US$"
              placeholder="150.000"
              ayuda="Monto total de compra"
            />
            <Input
              etiqueta="Ocupación Esperada"
              sufijo="%"
              placeholder="70"
              ayuda="Porcentaje vacacional anual"
            />
            <Input
              etiqueta="Campo con Error"
              prefijo="US$"
              placeholder="0"
              error="El precio debe ser mayor que cero"
            />
            <Input
              etiqueta="Campo Deshabilitado"
              value="4.0%"
              disabled
              ayuda="Valor por defecto bloqueado"
            />
          </div>
        </div>

        {/* Tarjetas */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[var(--mist-400)]">Tarjetas de Superficie</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Tarjeta superficie="base" bordeColor="brass">
              <span className="text-xs font-mono text-[var(--brass-400)]">Renta Larga</span>
              <h4 className="text-lg font-display font-semibold mt-1">Superficie Base (ink-800)</h4>
              <p className="text-sm text-[var(--mist-400)] mt-2">Borde acentuado en latón.</p>
            </Tarjeta>

            <Tarjeta superficie="elevada" bordeColor="teal">
              <span className="text-xs font-mono text-[var(--teal-400)]">Renta Corta</span>
              <h4 className="text-lg font-display font-semibold mt-1">Superficie Elevada (ink-700)</h4>
              <p className="text-sm text-[var(--mist-400)] mt-2">Borde acentuado en verde azulado.</p>
            </Tarjeta>
          </div>
        </div>

        {/* Desplegable / Accordion */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[var(--mist-400)]">Desplegable de Ajustes Avanzados</h3>
          <Desplegable
            titulo="▸ Ajustes avanzados del modelo financiero"
            subtitulo="Costos de cierre, vacancia, mantenimiento, administración y CapEx"
            abiertoInicial={true}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[var(--mist-400)]">
              <div>
                <span className="block font-semibold text-[var(--mist-100)]">Costos de Cierre</span>
                <span>4.0% del precio</span>
              </div>
              <div>
                <span className="block font-semibold text-[var(--mist-100)]">Administración Corta</span>
                <span>15.0% del ingreso bruto</span>
              </div>
              <div>
                <span className="block font-semibold text-[var(--mist-100)]">Reserva CapEx</span>
                <span>6.0% del ingreso bruto</span>
              </div>
            </div>
          </Desplegable>
        </div>
      </section>

      <Separador />

      {/* 4. Set de 12 Iconos SVG */}
      <section className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-[var(--mist-100)]">
          4. Set de 12 Iconos SVG Propios
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)] flex flex-col items-center gap-2">
            <TorreIcono size={28} className="text-[var(--brass-400)]" />
            <span>Torre</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)] flex flex-col items-center gap-2">
            <CasaIcono size={28} className="text-[var(--teal-400)]" />
            <span>Casa</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)] flex flex-col items-center gap-2">
            <CalendarioIcono size={28} className="text-[var(--mist-100)]" />
            <span>Calendario</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)] flex flex-col items-center gap-2">
            <MonedaIcono size={28} className="text-[var(--mist-100)]" />
            <span>Moneda</span>
          </div>

          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)] flex flex-col items-center gap-2">
            <PorcentajeIcono size={28} className="text-[var(--mist-100)]" />
            <span>Porcentaje</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)] flex flex-col items-center gap-2">
            <BalanzaIcono size={28} className="text-[var(--mist-100)]" />
            <span>Balanza</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)] flex flex-col items-center gap-2">
            <EjeIcono size={28} className="text-[var(--teal-400)]" />
            <span>Eje</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)] flex flex-col items-center gap-2">
            <TendenciaIcono size={28} className="text-[var(--teal-400)]" />
            <span>Tendencia</span>
          </div>

          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)] flex flex-col items-center gap-2">
            <RelojIcono size={28} className="text-[var(--mist-100)]" />
            <span>Reloj</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)] flex flex-col items-center gap-2">
            <AlertaIcono size={28} className="text-[var(--amber-400)]" />
            <span>Alerta</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)] flex flex-col items-center gap-2">
            <DocumentoIcono size={28} className="text-[var(--mist-100)]" />
            <span>Documento</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--ink-800)] border border-[var(--line)] flex flex-col items-center gap-2">
            <DesgloseIcono size={28} className="text-[var(--mist-100)]" />
            <span>Desglose</span>
          </div>
        </div>
      </section>
    </main>
  );
}
