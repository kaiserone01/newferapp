import { pdf, DocumentProps } from "@react-pdf/renderer";
import React from "react";
import { ResultadoCalculo } from "@/nucleo/rentabilidad/tipos";
import { DocumentoPDF } from "@/pdf/DocumentoPDF";

/**
 * Adaptador de Salida (Hexagonal):
 * Renderiza el ResultadoCalculo del motor a un archivo PDF vectorial descargable en el cliente.
 */
export class PDFAdapter {
  /**
   * Genera el PDF en el cliente y dispara la descarga en el navegador.
   */
  static async descargarPDF(resultado: ResultadoCalculo): Promise<void> {
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const fechaISO = fecha.toISOString().split("T")[0];
    const montoClean = Math.round(resultado.larga.inversionTotal);
    const nombreArchivo = `rentabilidad-${montoClean}-${fechaISO}.pdf`;

    const docElement = React.createElement(DocumentoPDF, {
      resultado,
      fechaFormateada,
    }) as unknown as React.ReactElement<DocumentProps>;

    // Compilar el PDF como Blob vectorial en el cliente
    const rawBlob = await pdf(docElement).toBlob();
    const blob = new Blob([rawBlob], { type: "application/pdf" });

    // Disparar descarga en el navegador mediante elemento <a>
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = nombreArchivo;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
  }
}
