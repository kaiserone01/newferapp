# Handoff: Calculadora de Rentabilidad Inmobiliaria

## 1) Objetivo
Construir una calculadora interactiva de rentabilidad inmobiliaria web stateless (sin base de datos) que compare de manera visual el alquiler residencial tradicional frente al vacacional, incluyendo reportes PDF con tipografías corporativas y microinteracciones fluidas con GSAP.

## 2) Estado actual
- **Completado y Funcional:**
  - Fases 0 a 5: Proyecto Next.js 16 compilando sin errores, suite Vitest al 100% de éxito, e interfaz responsiva completa (formulario, comparador, desglose y eje de equilibrio).
  - Fase 6: Generación de reporte PDF vectorial de dos páginas en cliente con fuentes corporativas (`Space Grotesk` y `JetBrains Mono`) y eje de ocupación de equilibrio a precisión.
  - Fase 7: Capa de animaciones interactivas GSAP implementada en acordeones (`Desplegable.tsx`), contadores dinámicos de rentabilidad (`PanelEstrategia.tsx`), stagger en filas (`DesglosePasoAPaso.tsx`) y trazado elástico en el `EjeOcupacion.tsx`. Soporte de accesibilidad e inyección de `gsap.context()` / `revert()` listos.
  - Cambio de Moneda: El selector y el motor financiero soportan única y estrictamente **USD (Dólares)**, **EUR (Euros)** y **DOP (Pesos Dominicanos)**, con su respectivo formateo de localización regional (incluyendo `es-DO` con el símbolo `RD$`).
  - Botón de Reset: Implementado un botón "Limpiar Datos" de tipo fantasma en el cabezal del formulario que restablece todos los inputs (incluidos los avanzados) a vacío, ocultando de manera limpia el panel de resultados.
  - Solución al Render Loop (Warning React): Envueltos los callbacks `handleCalculoValido` y `handleCalculoInvalido` en hooks `useCallback` en `page.tsx`. Esto estabiliza sus identidades de referencia y previene bucles de actualización infinita con el `useEffect` de validación del formulario.
  - Descargas de PDF Correctas: Se corrigió el tipo MIME del blob de descarga forzando explícitamente `type: "application/pdf"`. Esto garantiza que los navegadores y sistemas operativos de escritorio o móviles abran y muestren correctamente el archivo descargado como un documento PDF nativo.
- **Pendiente:**
  - Cierre y entrega del proyecto. No restan fases técnicas por desarrollar.

## 3) Archivos y cambios
- [page.tsx](file:///d:/newfersuite-app/recursos/newferapp/src/app/page.tsx): Envueltos `handleCalculoValido` y `handleCalculoInvalido` en hooks `useCallback` para estabilizar referencias.
- [PDFAdapter.ts](file:///d:/newfersuite-app/recursos/newferapp/src/adaptadores/salida/PDFAdapter.ts): Envuelto el blob compilado en un nuevo objeto `Blob` forzando el tipo MIME `application/pdf` antes de generar el Object URL.
- [FormularioPrincipal.tsx](file:///d:/newfersuite-app/recursos/newferapp/src/components/formulario/FormularioPrincipal.tsx): Importado el componente `Boton`, agregada la función `handleReset` que limpia todos los campos de texto e invalida el cálculo actual, y añadido el botón "Limpiar Datos" con icono de refresco en el encabezado de la tarjeta. Actualizado `MAPEADOR_SIMBOLOS` para asociar `DOP` con `RD$`.
- [tipos.ts](file:///d:/newfersuite-app/recursos/newferapp/src/nucleo/rentabilidad/tipos.ts): Restringido `SimboloMoneda` a `"USD" | "EUR" | "DOP"`.
- [esquema-entrada.ts](file:///d:/newfersuite-app/recursos/newferapp/src/nucleo/rentabilidad/esquema-entrada.ts): Actualizado el enum de moneda de Zod para validar únicamente `"USD"`, `"EUR"` y `"DOP"`.
- [formato.ts](file:///d:/newfersuite-app/recursos/newferapp/src/nucleo/rentabilidad/formato.ts): Reemplazados `COP` y `MXN` por `DOP` en `MAPEADOR_MONEDAS` con locale `es-DO` y símbolo `RD$`.
- [SelectorMoneda.tsx](file:///d:/newfersuite-app/recursos/newferapp/src/components/formulario/SelectorMoneda.tsx): Ajustado el panel del selector de moneda para permitir únicamente USD, EUR y DOP.
- [Desplegable.tsx](file:///d:/newfersuite-app/recursos/newferapp/src/components/ui/Desplegable.tsx): Animación GSAP de acordeón de altura y opacidad (300ms, ease power2.out) y tipado estricto para evitar advertencias de TypeScript.
- [PanelEstrategia.tsx](file:///d:/newfersuite-app/recursos/newferapp/src/components/resultados/PanelEstrategia.tsx): Animación de contadores de rentabilidad neta en formato `es-ES` usando GSAP.
- [ComparadorEstrategias.tsx](file:///d:/newfersuite-app/recursos/newferapp/src/components/resultados/ComparadorEstrategias.tsx): Configurado paso de prop `rentabilidadNetaVal` a tarjetas de comparación.
- [DesglosePasoAPaso.tsx](file:///d:/newfersuite-app/recursos/newferapp/src/components/resultados/DesglosePasoAPaso.tsx): Animación staggered (`stagger: 0.05`, `y: 8px -> 0`) para las filas de desglose.
- [EjeOcupacion.tsx](file:///d:/newfersuite-app/recursos/newferapp/src/components/eje-equilibrio/EjeOcupacion.tsx): Animación GSAP de relleno de barra y marcadores con rebote elástico.
- [DocumentoPDF.tsx](file:///d:/newfersuite-app/recursos/newferapp/src/pdf/DocumentoPDF.tsx): Registro de fuentes corporativas TTF (`Space Grotesk` y `JetBrains Mono`) y redibujado vectorial a escala (`480pt`) del eje SVG.

## 4) Intentos fallidos
- **Fuentes WOFF/WOFF2 en PDF:** Intentar registrar fuentes WOFF/WOFF2 en `@react-pdf/renderer` arrojó errores de compatibilidad. Se solucionó obteniendo las URLs directas de los archivos `.ttf` TrueType del CDN de Google Fonts (`fonts.gstatic.com`).
- **Refs en callbacks de GSAP:** Usar `contentRef.current` directamente dentro de callbacks de GSAP causó problemas con el linter de TypeScript debido a que puede ser `null` en momentos de desmontaje de React. Se solucionó copiando el elemento a una variable constante local (`const el = contentRef.current; if (!el) return;`) antes del contexto de GSAP.

## 5) Próximos pasos
1. Solicitar confirmación final al cliente/usuario del diseño visual del reporte PDF descargado.
2. Hacer revisión visual general de las animaciones en el navegador (en dispositivos de resolución móvil y tablet) para asegurar que el responsive y las animaciones coincidan a la perfección.
3. Proceder al despliegue final en producción a través de EasyPanel o similar (ver `docs/despliegue-easypanel.md`).
