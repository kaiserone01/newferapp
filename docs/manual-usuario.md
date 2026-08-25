# Manual de Usuario: Calculadora de Rentabilidad Inmobiliaria

Esta guía explica en detalle el funcionamiento de la calculadora, los conceptos financieros aplicados y el propósito de cada opción para facilitar el análisis de inversiones inmobiliarias.

---

## 1. ¿Cómo funciona la aplicación?

La aplicación compara de forma instantánea dos estrategias de explotación inmobiliaria para una misma propiedad utilizando un **modelo stateless** (sin base de datos):

1. **Renta Larga (Tradicional):** Alquiler de vivienda por períodos anuales o de largo plazo. Se caracteriza por flujos estables y menores costos operativos, pero con tarifas promedio más bajas.
2. **Renta Corta (Vacacional):** Alquiler temporal/turístico por noches a través de plataformas como Airbnb o Booking.com. Ofrece mayor facturación bruta potencial, pero con gastos operativos significativamente más altos (limpieza, servicios públicos, comisiones de plataformas y administración intensiva).

La calculadora toma el precio de compra y los supuestos de ingresos y egresos para deducir de forma secuencial la **inversión total inicial**, los **costos operativos anuales (OpEx)**, la **reserva de CapEx** y determinar el **Ingreso Operativo Neto (NOI)** y la **Rentabilidad Neta Anual**.

---

## 2. Descripción de las Opciones del Formulario

### 2.1 Datos Principales (Requeridos)

* **Moneda (USD, EUR, DOP):** 
  Define la unidad monetaria de visualización y el formato regional del reporte (`US$`, `€`, `RD$`). Todos los cálculos se realizan de forma homogénea en la moneda seleccionada.
* **Precio de Compra de la Propiedad:** 
  Es el precio acordado de adquisición del inmueble. Funciona como base para calcular el costo de los impuestos prediales, seguros, gastos de cierre y dotación inicial.
* **Renta Mensual Estimada (Tradicional):** 
  El alquiler neto mensual estimado que pagaría un inquilino de largo plazo.
* **Tarifa Promedio por Noche (Vacacional):** 
  El precio por noche promedio que cobrarás a los huéspedes en la modalidad vacacional (neto de impuestos hoteleros si corresponden).
* **Ocupación Vacacional Estimada (%):** 
  El porcentaje de noches del año en las que la propiedad estará alquilada (ej: 70% equivale a unas 255 noches ocupadas al año).

---

### 2.2 Ajustes Avanzados (Desplegables)

Haciendo clic en **"Ajustes Avanzados"** se pueden personalizar los supuestos financieros. Si no se modifican, la calculadora aplica valores promedio realistas del sector:

#### Costos de Adquisición (Inversión Inicial)
* **Gastos de Cierre y Formalización (%):** Costos de notaría, registro de propiedad y honorarios legales. Se calcula como un porcentaje del precio de compra (Default: `4.0%`).
* **Presupuesto de Remodelación (Monto Fijo):** Dinero destinado a reparaciones, pintura o reformas necesarias antes de listar la propiedad (Default: `0`).
* **Dotación y Mobiliario (%):** Porcentaje del precio destinado a amueblar y equipar la propiedad. Suele ser bajo en renta tradicional (Default: `1.0%`) y sustancialmente más alto en vacacional para cumplir con estándares competitivos (Default: `8.0%`).

#### Costos Operativos de Renta Larga (Tradicional)
* **Tasa de Vacancia y Morosidad (%):** Previsión de meses en los que la propiedad esté desocupada entre contratos o por falta de pago del inquilino (Default: `5.0%` del ingreso bruto).
* **Comisión de Administración Tradicional (%):** Pago a agencias inmobiliarias por la gestión del inquilino y cobros (Default: `8.0%` del ingreso bruto efectivo).
* **Mantenimiento Renta Larga (%):** Reserva periódica para reparaciones menores de fontanería, pintura, etc. (Default: `5.0%` del ingreso bruto).

#### Costos Operativos de Renta Corta (Vacacional)
* **Canal de Venta / Plataforma:** 
  Determina la comisión de la plataforma vacacional. Las opciones son:
  * **Airbnb (Solo Anfitrión):** Comisión estándar fija del `3.0%`.
  * **Airbnb (Tarifa Compartida):** Comisión aproximada del `15.0%`.
  * **Booking.com:** Comisión promedio estándar del `15.0%`.
  * **Directo (Sin intermediarios):** Comisión de plataforma del `0.0%`.
* **Comisión de Administración Vacacional (%):** Honorarios de la empresa de Property Management por coordinar llaves, limpiezas y atención al huésped (Default: `18.0%` del ingreso bruto efectivo).
* **Mantenimiento Vacacional (%):** Desgaste mayor debido al flujo constante de huéspedes (Default: `8.0%` del ingreso bruto).
* **Promedio de Estadía (Noches):** Duración media de la reserva de un huésped. Sirve para proyectar cuántos procesos de checkout/limpieza se realizarán al año (Default: `3 noches`).
* **Costo de Limpieza por Salida:** Monto fijo por la limpieza completa y lavandería en cada checkout (Default: `40` en la moneda seleccionada).
* **Servicios Públicos Mensuales:** Costo mensual acumulado de electricidad, agua, gas e internet de alta velocidad (que en renta corta siempre asume el propietario) (Default: `150`).

#### Gastos Fijos (Aplicados a ambas estrategias)
* **Reserva de CapEx (Fondo de Capital):** Fondo anual de provisión para reemplazar activos mayores a largo plazo como aire acondicionado, calentador, electrodomésticos o impermeabilización del techo (Default: `3.0%` del ingreso bruto).
* **Seguro de la Propiedad Anual (%):** Costo del seguro multirriesgo del inmueble (Default: `0.25%` del precio de compra).
* **Impuesto Predial Anual (%):** Impuesto territorial del municipio sobre la propiedad (Default: `0.8%` del precio de compra).
* **Otros Gastos Anuales (Monto Fijo):** Cuotas de mantenimiento de condominio (HOA), membresías u otros egresos corporativos no listados (Default: `0`).

---

## 3. Guía de Resultados y Visualizaciones

Una vez completados los campos, la aplicación despliega automáticamente las siguientes secciones dinámicas:

### 3.1 Panel de Estrategias (Comparación)
Presenta dos tarjetas financieras (una dorada para Renta Larga y una verde azulado para Renta Corta). Cada una muestra:
* **Rentabilidad Neta Anual (%):** La rentabilidad real sobre la inversión total (`Ingreso Neto Anual / Inversión Inicial`).
* **Flujo Mensual Promedio:** Dinero líquido neto mensual libre de gastos que ingresa al propietario.
* **Inversión Total:** El capital real desembolsado (`Precio de compra + Cierre + Remodelación + Dotación`).
* **Payback (Años):** Período necesario de operación para recuperar el 100% de la inversión inicial.

> [!NOTE]
> En la parte superior de este panel se muestra un **Banner Resumen** que calcula automáticamente cuánta ganancia o pérdida anual adicional genera una estrategia frente a la otra.

### 3.2 Eje de Ocupación de Equilibrio
Este widget es una de las herramientas más valiosas de la calculadora. Muestra una barra horizontal donde:
1. El **marcador marrón** (triángulo) representa la **Ocupación de Equilibrio (Break-Even)**. Es el porcentaje exacto de ocupación vacacional en el que los ingresos netos de la renta corta igualan exactamente a los de la renta larga tradicional.
2. El **marcador verde azulado** (círculo) muestra tu **Ocupación Estimada**.
3. El **tramo coloreado** representa el **margen de seguridad**: verde azulado si tu estimación supera el punto de equilibrio (zona de ganancia) o coral si estás por debajo del punto de equilibrio (zona de pérdida).

### 3.3 Desglose Financiero Paso a Paso
Una tabla comparativa interactiva estructurada en cascada que te permite auditar detalladamente cada ingreso y gasto anual de ambas estrategias side-by-side:
* **Ingresos Brutos Potenciales**
* **(-) Deducción por Vacancia / Plataformas**
* **(=) Ingresos Efectivos**
* **(-) Desglose de Gastos Operativos (OpEx):** Limpieza, administración, mantenimiento, seguros, impuestos y servicios públicos.
* **(-) Reserva CapEx**
* **(=) Ingreso Neto Anual (NOI)**

### 3.4 Reporte PDF Descargable
Haciendo clic en **"Generar Reporte PDF"**, la aplicación compila todas estas métricas de la pantalla en un documento vectorial de dos páginas, diseñado con fuentes y colores corporativos, listo para imprimir, enviar por correo o presentar a socios de inversión.
