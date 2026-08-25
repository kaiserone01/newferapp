import React from "react";
import { Document, Page, Text, View, StyleSheet, Svg, Line, Polygon, Circle } from "@react-pdf/renderer";
import { ResultadoCalculo } from "@/nucleo/rentabilidad/tipos";
import { formatearMoneda, formatearPorcentaje, formatearNoches } from "@/nucleo/rentabilidad/formato";

// Paleta de colores para el PDF
const COLORES = {
  ink900: "#070D1A",
  ink800: "#0E1728",
  ink700: "#16223A",
  line: "#22304E",
  mist100: "#E9EEF8",
  mist400: "#8E9CBA",
  mist600: "#55648A",
  brass400: "#D9B26A",
  teal400: "#4FD1C5",
  coral400: "#F2765C",
  white: "#FFFFFF",
  darkText: "#1A202C",
};

const styles = StyleSheet.create({
  pagina: {
    padding: 32,
    backgroundColor: "#FFFFFF",
    fontSize: 9,
    fontFamily: "Helvetica",
    color: COLORES.darkText,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 12,
    marginBottom: 16,
  },
  tituloHeader: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: COLORES.ink900,
  },
  subtituloHeader: {
    fontSize: 8,
    color: "#64748B",
    marginTop: 2,
  },
  fechaHeader: {
    fontSize: 8,
    color: "#64748B",
    textAlign: "right",
  },
  seccion: {
    marginBottom: 16,
  },
  tituloSeccion: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORES.ink900,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    paddingBottom: 4,
  },
  gridDosColumnas: {
    flexDirection: "row",
    gap: 12,
  },
  tarjeta: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  tarjetaBrass: {
    borderLeftWidth: 4,
    borderLeftColor: COLORES.brass400,
  },
  tarjetaTeal: {
    borderLeftWidth: 4,
    borderLeftColor: COLORES.teal400,
  },
  tituloTarjeta: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  subtituloTarjeta: {
    fontSize: 7,
    color: "#64748B",
    marginBottom: 8,
  },
  cifraHeroe: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  rangoTexto: {
    fontSize: 8,
    color: "#64748B",
    marginBottom: 10,
  },
  filasTarjeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  labelMeta: {
    fontSize: 7,
    color: "#64748B",
  },
  valMeta: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    marginTop: 1,
  },
  ejeContenedor: {
    padding: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
  },
  ejeBarraBase: {
    height: 12,
    backgroundColor: "#E2E8F0",
    borderRadius: 6,
    position: "relative",
    marginTop: 16,
    marginBottom: 16,
  },
  tabla: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  tablaFila: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tablaHeaderFila: {
    backgroundColor: "#F1F5F9",
    fontFamily: "Helvetica-Bold",
  },
  tablaColConc: {
    flex: 2,
    fontSize: 8,
  },
  tablaColVal: {
    flex: 1,
    fontSize: 8,
    textAlign: "right",
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 32,
    right: 32,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 8,
    textAlign: "center",
    fontSize: 7,
    color: "#94A3B8",
  },
});

export interface DocumentoPDFProps {
  resultado: ResultadoCalculo;
  fechaFormateada: string;
}

export const DocumentoPDF: React.FC<DocumentoPDFProps> = ({ resultado, fechaFormateada }) => {
  const { larga, corta, equilibrio, entradaAplicada, escenarios } = resultado;
  const m = entradaAplicada.moneda || "USD";

  const posEstimadaPct = Math.min(100, Math.max(0, entradaAplicada.ocupacionCorta * 100));
  const posEquilibrioPct =
    equilibrio.porcentajeEquilibrio !== null
      ? Math.min(100, Math.max(0, equilibrio.porcentajeEquilibrio))
      : null;

  return (
    <Document title={`Rentabilidad ${formatearMoneda(larga.inversionTotal, m)}`}>
      {/* PÁGINA 1 — RESUMEN EJECUTIVO Y COMPARACIÓN */}
      <Page size="A4" style={styles.pagina}>
        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text style={styles.tituloHeader}>Informe de Rentabilidad Inmobiliaria</Text>
            <Text style={styles.subtituloHeader}>
              Propiedad: {formatearMoneda(entradaAplicada.precio, m)} | Renta Larga vs. Corta Vacacional
            </Text>
          </View>
          <View>
            <Text style={styles.fechaHeader}>Fecha: {fechaFormateada}</Text>
            <Text style={styles.fechaHeader}>Moneda: {m}</Text>
          </View>
        </View>

        {/* Sección 1: Comparativa Lado a Lado */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>1. Comparativa de Rentabilidad Neta</Text>
          <View style={styles.gridDosColumnas}>
            {/* Tarjeta Renta Larga */}
            <View style={[styles.tarjeta, styles.tarjetaBrass]}>
              <Text style={[styles.tituloTarjeta, { color: "#92400E" }]}>
                Renta Larga (Tradicional)
              </Text>
              <Text style={styles.subtituloTarjeta}>Alquiler residencial de largo plazo</Text>

              <Text style={[styles.cifraHeroe, { color: "#B45309" }]}>
                {formatearPorcentaje(larga.rentabilidadNeta, 2)}
              </Text>
              <Text style={styles.rangoTexto}>
                rango {formatearPorcentaje(escenarios.rangoLargaMinMax[0], 1)} –{" "}
                {formatearPorcentaje(escenarios.rangoLargaMinMax[1], 1)}
              </Text>

              <View style={styles.filasTarjeta}>
                <View>
                  <Text style={styles.labelMeta}>Flujo Mensual</Text>
                  <Text style={styles.valMeta}>{formatearMoneda(larga.flujoMensual, m)}</Text>
                </View>
                <View>
                  <Text style={styles.labelMeta}>Payback</Text>
                  <Text style={styles.valMeta}>
                    {larga.paybackAnios > 0 ? `${larga.paybackAnios.toFixed(1)} años` : "N/A"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Tarjeta Renta Corta */}
            <View style={[styles.tarjeta, styles.tarjetaTeal]}>
              <Text style={[styles.tituloTarjeta, { color: "#0F766E" }]}>
                Renta Corta (Vacacional)
              </Text>
              <Text style={styles.subtituloTarjeta}>
                Alquiler vacacional ({formatearNoches(corta.nochesOcupadasAnual)})
              </Text>

              <Text style={[styles.cifraHeroe, { color: "#0D9488" }]}>
                {formatearPorcentaje(corta.rentabilidadNeta, 2)}
              </Text>
              <Text style={styles.rangoTexto}>
                rango {formatearPorcentaje(escenarios.rangoCortaMinMax[0], 1)} –{" "}
                {formatearPorcentaje(escenarios.rangoCortaMinMax[1], 1)}
              </Text>

              <View style={styles.filasTarjeta}>
                <View>
                  <Text style={styles.labelMeta}>Flujo Mensual</Text>
                  <Text style={styles.valMeta}>{formatearMoneda(corta.flujoMensual, m)}</Text>
                </View>
                <View>
                  <Text style={styles.labelMeta}>Payback</Text>
                  <Text style={styles.valMeta}>
                    {corta.paybackAnios > 0 ? `${corta.paybackAnios.toFixed(1)} años` : "N/A"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Sección 2: Eje de Ocupación de Equilibrio */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>2. Eje de Ocupación de Equilibrio</Text>
          <View style={styles.ejeContenedor}>
            <Text style={{ fontSize: 8, color: "#334155", marginBottom: 8 }}>
              {equilibrio.mensaje}
            </Text>

            {/* Representación vectorial con SVG */}
            <Svg height="30" width="100%">
              {/* Barra base neutra */}
              <Line x1="0" y1="15" x2="100%" y2="15" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />

              {/* Marcador de Ocupación Estimada (Círculo Teal) */}
              <Circle cx={`${posEstimadaPct}%`} cy="15" r="7" fill="#0D9488" />

              {/* Marcador de Equilibrio (Triángulo Brass) */}
              {posEquilibrioPct !== null && (
                <Polygon
                  points={`${posEquilibrioPct * 5},5 ${posEquilibrioPct * 5 - 5},0 ${posEquilibrioPct * 5 + 5},0`}
                  fill="#B45309"
                />
              )}
            </Svg>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
              <Text style={{ fontSize: 7, color: "#64748B" }}>0% Ocupación</Text>
              <Text style={{ fontSize: 7, color: "#64748B" }}>50%</Text>
              <Text style={{ fontSize: 7, color: "#64748B" }}>100% Ocupación</Text>
            </View>
          </View>
        </View>

        {/* Pie de página 1 */}
        <Text style={styles.footer}>
          Página 1 de 2 — Documento generado automáticamente por Calculadora de Rentabilidad Inmobiliaria.
        </Text>
      </Page>

      {/* PÁGINA 2 — DESGLOSE DETALLADO Y SUPUESTOS */}
      <Page size="A4" style={styles.pagina}>
        <View style={styles.header}>
          <Text style={styles.tituloHeader}>Desglose Financiero y Supuestos</Text>
          <Text style={styles.fechaHeader}>Página 2</Text>
        </View>

        {/* Sección 3: Tabla de Desglose Paso a Paso */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>3. Desglose Anual Comparativo</Text>
          <View style={styles.tabla}>
            <View style={[styles.tablaFila, styles.tablaHeaderFila]}>
              <Text style={styles.tablaColConc}>Concepto Financiero</Text>
              <Text style={styles.tablaColVal}>Renta Larga</Text>
              <Text style={styles.tablaColVal}>Renta Corta</Text>
            </View>
            <View style={styles.tablaFila}>
              <Text style={styles.tablaColConc}>Inversión Total Requerida</Text>
              <Text style={styles.tablaColVal}>{formatearMoneda(larga.inversionTotal, m)}</Text>
              <Text style={styles.tablaColVal}>{formatearMoneda(corta.inversionTotal, m)}</Text>
            </View>
            <View style={styles.tablaFila}>
              <Text style={styles.tablaColConc}>Ingreso Bruto Anual Potencial</Text>
              <Text style={styles.tablaColVal}>{formatearMoneda(larga.ingresoBrutoPotencialAnual, m)}</Text>
              <Text style={styles.tablaColVal}>{formatearMoneda(corta.ingresoBrutoAnual, m)}</Text>
            </View>
            <View style={styles.tablaFila}>
              <Text style={styles.tablaColConc}>− Vacancia y Morosidad / Comisión</Text>
              <Text style={styles.tablaColVal}>−{formatearMoneda(larga.perdidaVacanciaAnual, m)}</Text>
              <Text style={styles.tablaColVal}>−{formatearMoneda(corta.comisionPlataformaAnual, m)}</Text>
            </View>
            <View style={styles.tablaFila}>
              <Text style={styles.tablaColConc}>− Honorarios de Administración</Text>
              <Text style={styles.tablaColVal}>
                −{formatearMoneda(larga.ingresoBrutoEfectivoAnual * entradaAplicada.administracionLargaPorcentaje, m)}
              </Text>
              <Text style={styles.tablaColVal}>−{formatearMoneda(corta.administracionAnual, m)}</Text>
            </View>
            <View style={styles.tablaFila}>
              <Text style={styles.tablaColConc}>− Mantenimiento y Conservación</Text>
              <Text style={styles.tablaColVal}>
                −{formatearMoneda(larga.ingresoBrutoEfectivoAnual * entradaAplicada.mantenimientoLargaPorcentaje, m)}
              </Text>
              <Text style={styles.tablaColVal}>−{formatearMoneda(corta.mantenimientoAnual, m)}</Text>
            </View>
            <View style={styles.tablaFila}>
              <Text style={styles.tablaColConc}>− Limpieza, Servicios y Reserva CapEx</Text>
              <Text style={styles.tablaColVal}>−{formatearMoneda(larga.reservaCapexAnual, m)}</Text>
              <Text style={styles.tablaColVal}>
                −{formatearMoneda(corta.costoLimpiezaAnual + corta.serviciosAnual + corta.reservaCapexAnual, m)}
              </Text>
            </View>
            <View style={[styles.tablaFila, { backgroundColor: "#F8FAFC", fontFamily: "Helvetica-Bold" }]}>
              <Text style={styles.tablaColConc}>Ingreso Neto Anual Residual</Text>
              <Text style={styles.tablaColVal}>{formatearMoneda(larga.ingresoNetoAnual, m)}</Text>
              <Text style={styles.tablaColVal}>{formatearMoneda(corta.ingresoNetoAnual, m)}</Text>
            </View>
            <View style={[styles.tablaFila, { backgroundColor: "#F1F5F9", fontFamily: "Helvetica-Bold" }]}>
              <Text style={styles.tablaColConc}>Rentabilidad Neta Anual</Text>
              <Text style={styles.tablaColVal}>{formatearPorcentaje(larga.rentabilidadNeta, 2)}</Text>
              <Text style={styles.tablaColVal}>{formatearPorcentaje(corta.rentabilidadNeta, 2)}</Text>
            </View>
          </View>
        </View>

        {/* Sección 4: Tabla de Supuestos Aplicados */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>4. Tabla de Supuestos Utilizados</Text>
          <View style={styles.tabla}>
            <View style={[styles.tablaFila, styles.tablaHeaderFila]}>
              <Text style={styles.tablaColConc}>Parámetro</Text>
              <Text style={styles.tablaColVal}>Valor Aplicado</Text>
            </View>
            <View style={styles.tablaFila}>
              <Text style={styles.tablaColConc}>Costos de Cierre Iniciales</Text>
              <Text style={styles.tablaColVal}>
                {formatearPorcentaje(entradaAplicada.costosCierrePorcentaje * 100, 1)}
              </Text>
            </View>
            <View style={styles.tablaFila}>
              <Text style={styles.tablaColConc}>Dotación Equipamiento Vacacional</Text>
              <Text style={styles.tablaColVal}>
                {formatearPorcentaje(entradaAplicada.dotacionCortaPorcentaje * 100, 1)}
              </Text>
            </View>
            <View style={styles.tablaFila}>
              <Text style={styles.tablaColConc}>Tasa Vacancia Renta Larga</Text>
              <Text style={styles.tablaColVal}>
                {formatearPorcentaje(entradaAplicada.vacanciaLargaPorcentaje * 100, 1)}
              </Text>
            </View>
            <View style={styles.tablaFila}>
              <Text style={styles.tablaColConc}>Administración Corta / Larga</Text>
              <Text style={styles.tablaColVal}>
                {formatearPorcentaje(entradaAplicada.administracionCortaPorcentaje * 100, 1)} /{" "}
                {formatearPorcentaje(entradaAplicada.administracionLargaPorcentaje * 100, 1)}
              </Text>
            </View>
            <View style={styles.tablaFila}>
              <Text style={styles.tablaColConc}>Reserva CapEx Reposición</Text>
              <Text style={styles.tablaColVal}>
                {formatearPorcentaje(entradaAplicada.capexPorcentaje * 100, 1)}
              </Text>
            </View>
          </View>
        </View>

        {/* Nota legal de alcance al pie (§10) */}
        <Text style={styles.footer}>
          Nota de alcance: Las cifras son estimaciones basadas en los supuestos declarados; la rentabilidad real varía según ocupación, gastos efectivos y condiciones de mercado.
        </Text>
      </Page>
    </Document>
  );
};
