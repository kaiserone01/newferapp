import { z } from "zod";
import { SimboloMoneda, CanalPlataforma } from "./tipos";

/**
 * Esquema de validación Zod para las entradas de la calculadora.
 * Los mensajes de error están expresados en la voz de la interfaz en español.
 */
export const esquemaEntradaCalculo = z.object({
  precio: z
    .number({ message: "El precio debe ser un número válido." })
    .gt(0, { message: "El precio debe ser mayor que cero." }),
  
  rentaMensualLarga: z
    .number({ message: "La renta mensual debe ser un número válido." })
    .min(0, { message: "La renta mensual no puede ser negativa." }),

  tarifaNocheCorta: z
    .number({ message: "La tarifa por noche debe ser un número válido." })
    .gt(0, { message: "La tarifa por noche debe ser mayor que cero." }),

  ocupacionCorta: z
    .number({ message: "La ocupación debe ser un número válido." })
    .min(0, { message: "La ocupación debe ser al menos 0% (0.0)." })
    .max(1, { message: "La ocupación no puede superar el 100% (1.0)." }),

  moneda: z.enum(["USD", "EUR", "DOP"] as const).optional().default("USD"),

  // --- Ajustes Avanzados Opcionales ---
  costosCierrePorcentaje: z.number().min(0).max(1).optional(),
  remodelacionMonto: z.number().min(0).optional(),
  dotacionLargaPorcentaje: z.number().min(0).max(1).optional(),
  dotacionCortaPorcentaje: z.number().min(0).max(1).optional(),

  vacanciaLargaPorcentaje: z.number().min(0).max(1).optional(),
  mantenimientoLargaPorcentaje: z.number().min(0).max(1).optional(),
  mantenimientoCortaPorcentaje: z.number().min(0).max(1).optional(),
  administracionLargaPorcentaje: z.number().min(0).max(1).optional(),
  administracionCortaPorcentaje: z.number().min(0).max(1).optional(),
  capexPorcentaje: z.number().min(0).max(1).optional(),

  canalPlataforma: z.enum(["airbnb-host", "airbnb-shared", "booking", "directo"] as const).optional(),
  comisionPlataformaPorcentaje: z.number().min(0).max(1).optional(),
  duracionEstadiaNoches: z.number().gt(0).optional(),
  costoLimpiezaMonto: z.number().min(0).optional(),
  serviciosMensualesCortaMonto: z.number().min(0).optional(),

  seguroAnualPorcentaje: z.number().min(0).max(1).optional(),
  predialAnualPorcentaje: z.number().min(0).max(1).optional(),
  otrosGastosAnualesMonto: z.number().min(0).optional(),
});

export type EntradaFormularioRaw = {
  precio: string;
  rentaMensualLarga: string;
  tarifaNocheCorta: string;
  ocupacionCorta: string;
  moneda: SimboloMoneda;

  // Avanzados (strings)
  costosCierrePorcentaje?: string;
  remodelacionMonto?: string;
  dotacionLargaPorcentaje?: string;
  dotacionCortaPorcentaje?: string;

  vacanciaLargaPorcentaje?: string;
  mantenimientoLargaPorcentaje?: string;
  mantenimientoCortaPorcentaje?: string;
  administracionLargaPorcentaje?: string;
  administracionCortaPorcentaje?: string;
  capexPorcentaje?: string;

  canalPlataforma?: CanalPlataforma;
  comisionPlataformaPorcentaje?: string;
  duracionEstadiaNoches?: string;
  costoLimpiezaMonto?: string;
  serviciosMensualesCortaMonto?: string;

  seguroAnualPorcentaje?: string;
  predialAnualPorcentaje?: string;
  otrosGastosAnualesMonto?: string;
};
