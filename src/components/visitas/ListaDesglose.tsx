import { formatearNumero } from "@/lib/visitas/formato";
import type { ConteoPorEtiqueta } from "@/lib/visitas/tipos";

interface ListaDesgloseProps {
  titulo: string;
  datos: ConteoPorEtiqueta[];
  formatearEtiqueta?: (etiqueta: string) => string;
}

export function ListaDesglose({ titulo, datos, formatearEtiqueta }: ListaDesgloseProps) {
  const maximo = Math.max(1, ...datos.map((item) => item.visitas));

  return (
    <div>
      <h3 className="text-sm font-semibold text-[var(--mist-100)] mb-3">{titulo}</h3>
      {datos.length === 0 ? (
        <p className="text-sm text-[var(--mist-600)]">Sin datos en este rango.</p>
      ) : (
        <ul className="space-y-2">
          {datos.map((item) => (
            <li key={item.etiqueta} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-sm text-[var(--mist-400)]">
                {formatearEtiqueta ? formatearEtiqueta(item.etiqueta) : item.etiqueta}
              </span>
              <div className="flex-1 h-2 rounded-full bg-[var(--ink-700)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--teal-400)]"
                  style={{ width: `${(item.visitas / maximo) * 100}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-xs font-mono text-[var(--mist-400)]">
                {formatearNumero(item.visitas)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
