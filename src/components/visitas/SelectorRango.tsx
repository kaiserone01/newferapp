import Link from "next/link";
import type { RangoTiempo } from "@/lib/visitas/tipos";

const OPCIONES: { valor: RangoTiempo; etiqueta: string }[] = [
  { valor: "hoy", etiqueta: "Hoy" },
  { valor: "7d", etiqueta: "7 días" },
  { valor: "30d", etiqueta: "30 días" },
  { valor: "todo", etiqueta: "Todo" },
];

export function SelectorRango({ activo }: { activo: RangoTiempo }) {
  return (
    <nav className="flex gap-2">
      {OPCIONES.map((opcion) => (
        <Link
          key={opcion.valor}
          href={`/visitas?rango=${opcion.valor}`}
          className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors duration-150 ${
            opcion.valor === activo
              ? "bg-[var(--teal-400)] text-[var(--ink-900)] border-transparent font-semibold"
              : "bg-[var(--ink-800)] text-[var(--mist-400)] border-[var(--line)] hover:bg-[var(--ink-700)] hover:text-[var(--mist-100)]"
          }`}
        >
          {opcion.etiqueta}
        </Link>
      ))}
    </nav>
  );
}
