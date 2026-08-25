import { describe, it, expect } from "vitest";
import { calculadora } from "../index";
import { calcularRentaLarga } from "../renta-larga";
import { calcularRentaCorta } from "../renta-corta";
import { calcularEquilibrio } from "../comparador";

describe("Motor Financiero — Pruebas de Contrato (§11 / §397)", () => {
  it("debe reproducir exactamente la Renta Larga de referencia (12.00% bruta y 9.00% neta sobre US$150,000)", () => {
    // Ejemplo de referencia: Inversión = 150,000 USD
    // Renta mensual = 1,500 USD (Bruto anual = 18,000 -> 12.00% bruta)
    // Para lograr 9.00% neta (13,500 USD netos):
    // vacancia (0%), mantenimiento (15%), administracion (10%), capex (0%), otros (0) => 25% deducciones
    const resultado = calcularRentaLarga({
      precio: 150000,
      rentaMensualLarga: 1500,
      tarifaNocheCorta: 100,
      ocupacionCorta: 0.7,
      costosCierrePorcentaje: 0,
      dotacionLargaPorcentaje: 0,
      remodelacionMonto: 0,
      vacanciaLargaPorcentaje: 0,
      mantenimientoLargaPorcentaje: 0.15,
      administracionLargaPorcentaje: 0.10,
      capexPorcentaje: 0,
      seguroAnualPorcentaje: 0,
      predialAnualPorcentaje: 0,
      otrosGastosAnualesMonto: 0,
    });

    expect(resultado.inversionTotal).toBe(150000);
    expect(resultado.ingresoBrutoPotencialAnual).toBe(18000);
    expect(resultado.rentabilidadBruta).toBeCloseTo(12.0, 2);
    expect(resultado.ingresoNetoAnual).toBe(13500);
    expect(resultado.rentabilidadNeta).toBeCloseTo(9.0, 2);
  });

  it("debe reproducir exactamente la Renta Corta de referencia (15.33% bruta y 11.20% neta sobre US$250,000)", () => {
    // Ejemplo de referencia: Inversión = 250,000 USD
    // Tarifa por noche = 150 USD, ocupación = 70% (255.5 noches -> Bruto anual = 38,325 USD -> 15.33% bruta)
    // Para lograr 11.20% neta (28,000 USD netos -> deducción total = 10,325 USD):
    const tarifa = 150;
    const ocupacion = 0.70;
    const noches = 365 * ocupacion; // 255.5
    const brutoAnual = noches * tarifa; // 38,325

    // Inversión = 250,000 -> 15.33% bruta
    expect(brutoAnual / 250000 * 100).toBeCloseTo(15.33, 2);

    const comision = 0.03;
    const admin = 0.15;
    // Mantenimiento exacto para alcanzar deducción total de 10,325 USD (28,000 USD netos)
    const mantenimiento = (10325 - brutoAnual * (comision + admin)) / brutoAnual;

    const resultado = calcularRentaCorta({
      precio: 250000,
      rentaMensualLarga: 2000,
      tarifaNocheCorta: tarifa,
      ocupacionCorta: ocupacion,
      costosCierrePorcentaje: 0,
      dotacionCortaPorcentaje: 0,
      remodelacionMonto: 0,
      comisionPlataformaPorcentaje: comision,
      administracionCortaPorcentaje: admin,
      mantenimientoCortaPorcentaje: mantenimiento,
      capexPorcentaje: 0,
      costoLimpiezaMonto: 0,
      serviciosMensualesCortaMonto: 0,
      seguroAnualPorcentaje: 0,
      predialAnualPorcentaje: 0,
      otrosGastosAnualesMonto: 0,
    });

    expect(resultado.inversionTotal).toBe(250000);
    expect(resultado.ingresoBrutoAnual).toBeCloseTo(38325, 1);
    expect(resultado.rentabilidadBruta).toBeCloseTo(15.33, 2);
    expect(resultado.ingresoNetoAnual).toBeCloseTo(28000, 1);
    expect(resultado.rentabilidadNeta).toBeCloseTo(11.20, 2);
  });

  it("debe calcular correctamente los 3 casos límite del Eje de Ocupación de Equilibrio (§4.6)", () => {
    // Caso 1: Normal
    const resNormal = calculadora.calcular({
      precio: 100000,
      rentaMensualLarga: 800,
      tarifaNocheCorta: 120,
      ocupacionCorta: 0.65,
    });
    expect(resNormal.equilibrio.estado).toBe("normal");
    expect(resNormal.equilibrio.ocupacionEquilibrio).toBeGreaterThan(0);
    expect(resNormal.equilibrio.ocupacionEquilibrio).toBeLessThanOrEqual(1);

    // Caso 2: Inalcanzable (> 100%)
    const resInalcanzable = calculadora.calcular({
      precio: 200000,
      rentaMensualLarga: 3000, // renta larga muy alta
      tarifaNocheCorta: 50,    // tarifa corta muy baja
      ocupacionCorta: 0.5,
    });
    expect(resInalcanzable.equilibrio.estado).toBe("inalcanzable");
    expect(resInalcanzable.equilibrio.ocupacionEquilibrio).toBeGreaterThan(1);

    // Caso 3: Sin superación (denominador <= 0 por costos exorbitantes o tarifa cero)
    const resSinSuperacion = calcularEquilibrio(
      {
        precio: 100000,
        rentaMensualLarga: 1000,
        tarifaNocheCorta: 10,
        ocupacionCorta: 0.5,
        comisionPlataformaPorcentaje: 0.5,
        administracionCortaPorcentaje: 0.5,
        capexPorcentaje: 0.1,
      },
      calculadora.calcular({ precio: 100000, rentaMensualLarga: 1000, tarifaNocheCorta: 10, ocupacionCorta: 0.5 }).larga,
      calculadora.calcular({ precio: 100000, rentaMensualLarga: 1000, tarifaNocheCorta: 10, ocupacionCorta: 0.5 }).corta
    );
    expect(resSinSuperacion.estado).toBe("sin_superacion");
    expect(resSinSuperacion.ocupacionEquilibrio).toBeNull();
  });

  it("debe calcular los escenarios pesimista, base y optimista correctamente", () => {
    const res = calculadora.calcular({
      precio: 150000,
      rentaMensualLarga: 1000,
      tarifaNocheCorta: 100,
      ocupacionCorta: 0.65,
    });

    expect(res.escenarios.pesimista.rentabilidadNetaCorta).toBeLessThan(res.escenarios.base.rentabilidadNetaCorta);
    expect(res.escenarios.optimista.rentabilidadNetaCorta).toBeGreaterThan(res.escenarios.base.rentabilidadNetaCorta);
  });
});
