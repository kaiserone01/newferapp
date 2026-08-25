import { Tarjeta } from "@/components/ui";

interface TarjetaEstadisticaProps {
  etiqueta: string;
  valor: string;
}

export function TarjetaEstadistica({ etiqueta, valor }: TarjetaEstadisticaProps) {
  return (
    <Tarjeta className="flex flex-col gap-1">
      <span className="text-xs text-[var(--mist-400)] uppercase tracking-wide">{etiqueta}</span>
      <span className="text-2xl font-display font-bold text-[var(--mist-100)]">{valor}</span>
    </Tarjeta>
  );
}
