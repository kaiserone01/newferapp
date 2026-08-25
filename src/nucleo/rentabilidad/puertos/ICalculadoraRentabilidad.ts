import { EntradaCalculo, ResultadoCalculo } from "../tipos";

/**
 * Puerto primario (driven port) del Núcleo de Dominio.
 * Define la interfaz del motor de cálculo financiero.
 */
export interface ICalculadoraRentabilidad {
  /**
   * Ejecuta el cálculo completo de rentabilidad para ambas estrategias.
   * @param entrada Objeto con las variables ingresadas por el usuario o defaults.
   * @returns ResultadoCalculo objeto estricto con todos los desgloses financieros.
   */
  calcular(entrada: EntradaCalculo): ResultadoCalculo;
}
