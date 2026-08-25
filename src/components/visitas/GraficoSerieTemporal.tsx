"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { etiquetaBucket } from "@/lib/visitas/formato";
import type { PuntoSerieTemporal } from "@/lib/visitas/tipos";

interface GraficoSerieTemporalProps {
  datos: PuntoSerieTemporal[];
  granularidad: "hora" | "dia";
}

export function GraficoSerieTemporal({ datos, granularidad }: GraficoSerieTemporalProps) {
  const datosFormateados = datos.map((punto) => ({
    etiqueta: etiquetaBucket(punto.bucket, granularidad),
    visitas: punto.visitas,
  }));

  if (datosFormateados.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-[var(--mist-600)]">
        Sin datos en este rango.
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={datosFormateados} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--teal-400)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--teal-400)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
          <XAxis dataKey="etiqueta" stroke="var(--mist-600)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--mist-600)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--ink-800)",
              border: "1px solid var(--line)",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "var(--mist-400)" }}
          />
          <Area
            type="monotone"
            dataKey="visitas"
            stroke="var(--teal-400)"
            fill="url(#colorVisitas)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
