import { describe, it, expect } from "vitest";
import { FormularioAdapter } from "@/adaptadores/entrada/FormularioAdapter";

describe("Adaptador de Entrada y Esquema Zod — Pruebas de Validación", () => {
  it("debe validar correctamente datos válidos del formulario", () => {
    const res = FormularioAdapter.transformarYValidar({
      precio: "200000",
      rentaMensualLarga: "1800",
      tarifaNocheCorta: "120",
      ocupacionCorta: "65",
      moneda: "USD",
    });

    expect(res.exito).toBe(true);
    expect(res.datos?.precio).toBe(200000);
    expect(res.datos?.rentaMensualLarga).toBe(1800);
    expect(res.datos?.tarifaNocheCorta).toBe(120);
    expect(res.datos?.ocupacionCorta).toBe(0.65);
    expect(res.datos?.moneda).toBe("USD");
  });

  it("debe rechazar precio menor o igual a cero con el mensaje adecuado", () => {
    const res = FormularioAdapter.transformarYValidar({
      precio: "0",
      rentaMensualLarga: "1500",
      tarifaNocheCorta: "100",
      ocupacionCorta: "70",
      moneda: "USD",
    });

    expect(res.exito).toBe(false);
    expect(res.errores?.precio).toBe("El precio debe ser mayor que cero.");
  });

  it("debe rechazar ocupación mayor al 100%", () => {
    const res = FormularioAdapter.transformarYValidar({
      precio: "150000",
      rentaMensualLarga: "1500",
      tarifaNocheCorta: "100",
      ocupacionCorta: "150", // 150% -> 1.5 en el adapter
      moneda: "USD",
    });

    expect(res.exito).toBe(false);
    expect(res.errores?.ocupacionCorta).toBe("La ocupación no puede superar el 100% (1.0).");
  });

  it("debe convertir porcentajes ingresados como > 1 a decimales en los ajustes avanzados", () => {
    const res = FormularioAdapter.transformarYValidar({
      precio: "150000",
      rentaMensualLarga: "1500",
      tarifaNocheCorta: "100",
      ocupacionCorta: "70",
      moneda: "USD",
      costosCierrePorcentaje: "5", // 5% -> 0.05
      vacanciaLargaPorcentaje: "8", // 8% -> 0.08
    });

    expect(res.exito).toBe(true);
    expect(res.datos?.costosCierrePorcentaje).toBe(0.05);
    expect(res.datos?.vacanciaLargaPorcentaje).toBe(0.08);
  });
});
