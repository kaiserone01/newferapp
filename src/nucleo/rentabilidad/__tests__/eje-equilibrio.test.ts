import { describe, it, expect } from "vitest";
import { calculadora } from "../index";

describe("Eje de Ocupación de Equilibrio — Casos Límite y Estado", () => {
  it("debe calcular el estado normal cuando la ocupación de equilibrio está entre 0 y 100%", () => {
    const res = calculadora.calcular({
      precio: 150000,
      rentaMensualLarga: 1200,
      tarifaNocheCorta: 120,
      ocupacionCorta: 0.65,
    });

    expect(res.equilibrio.estado).toBe("normal");
    expect(res.equilibrio.porcentajeEquilibrio).toBeGreaterThan(0);
    expect(res.equilibrio.porcentajeEquilibrio).toBeLessThanOrEqual(100);
    expect(res.equilibrio.mensaje).toContain("A partir del");
  });

  it("debe retornar estado inalcanzable cuando la ocupación necesaria supera el 100%", () => {
    const res = calculadora.calcular({
      precio: 250000,
      rentaMensualLarga: 4000,
      tarifaNocheCorta: 60,
      ocupacionCorta: 0.5,
    });

    expect(res.equilibrio.estado).toBe("inalcanzable");
    expect(res.equilibrio.porcentajeEquilibrio).toBeGreaterThan(100);
    expect(res.equilibrio.mensaje).toContain("Equilibrio inalcanzable");
  });

  it("debe retornar estado sin_superacion cuando el denominador es menor o igual a cero", () => {
    const res = calculadora.calcular({
      precio: 100000,
      rentaMensualLarga: 1500,
      tarifaNocheCorta: 15,
      ocupacionCorta: 0.5,
      comisionPlataformaPorcentaje: 0.5,
      administracionCortaPorcentaje: 0.5,
    });

    expect(res.equilibrio.estado).toBe("sin_superacion");
    expect(res.equilibrio.ocupacionEquilibrio).toBeNull();
  });
});
