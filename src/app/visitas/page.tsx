import { Tarjeta } from "@/components/ui";
import { GraficoSerieTemporal } from "@/components/visitas/GraficoSerieTemporal";
import { ListaDesglose } from "@/components/visitas/ListaDesglose";
import { SelectorRango } from "@/components/visitas/SelectorRango";
import { TarjetaEstadistica } from "@/components/visitas/TarjetaEstadistica";
import { obtenerEstadisticas } from "@/lib/visitas/estadisticas";
import { formatearDuracion, formatearNumero, nombrePais } from "@/lib/visitas/formato";
import type { RangoTiempo } from "@/lib/visitas/tipos";

const RANGOS_VALIDOS: RangoTiempo[] = ["hoy", "7d", "30d", "todo"];

function normalizarRango(valor: string | string[] | undefined): RangoTiempo {
  if (typeof valor === "string" && RANGOS_VALIDOS.includes(valor as RangoTiempo)) {
    return valor as RangoTiempo;
  }
  return "7d";
}

export default async function VisitasPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const rango = normalizarRango(params.rango);
  const estadisticas = obtenerEstadisticas(rango);

  return (
    <main className="min-h-screen p-3 sm:p-6 lg:p-8 max-w-[1180px] mx-auto space-y-6 sm:space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-[var(--mist-100)] tracking-tight">
            Visitas
          </h1>
          <p className="text-xs sm:text-sm text-[var(--mist-400)]">
            Tráfico del sitio: visitantes, procedencia, dispositivos y tiempo de uso
          </p>
        </div>
        <SelectorRango activo={rango} />
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TarjetaEstadistica etiqueta="Visitas" valor={formatearNumero(estadisticas.totalVisitas)} />
        <TarjetaEstadistica
          etiqueta="Visitantes únicos"
          valor={formatearNumero(estadisticas.visitantesUnicos)}
        />
        <TarjetaEstadistica
          etiqueta="Duración promedio"
          valor={formatearDuracion(estadisticas.duracionPromedioSegundos)}
        />
      </section>

      <Tarjeta superficie="elevada">
        <h2 className="text-sm font-semibold text-[var(--mist-100)] mb-4">
          Visitas por {estadisticas.granularidad === "hora" ? "hora" : "día"}
        </h2>
        <GraficoSerieTemporal datos={estadisticas.serieTemporal} granularidad={estadisticas.granularidad} />
      </Tarjeta>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Tarjeta>
          <ListaDesglose titulo="Países" datos={estadisticas.porPais} formatearEtiqueta={nombrePais} />
        </Tarjeta>
        <Tarjeta>
          <ListaDesglose titulo="Dispositivos" datos={estadisticas.porDispositivo} />
        </Tarjeta>
        <Tarjeta>
          <ListaDesglose titulo="Navegadores" datos={estadisticas.porNavegador} />
        </Tarjeta>
        <Tarjeta>
          <ListaDesglose titulo="Sistema operativo" datos={estadisticas.porSistemaOperativo} />
        </Tarjeta>
      </section>

      <footer className="border-t border-[var(--line)] pt-6 pb-8 text-center text-xs text-[var(--mist-600)] font-mono">
        Estadísticas de tráfico — datos aproximados, sin cookies de seguimiento.
      </footer>
    </main>
  );
}
