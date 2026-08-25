# Diseño: Ruta `/visitas` y eliminación del CI de GitHub Actions

Fecha: 2026-08-25

## 1. Contexto

`newfer-rentabilidad` es una calculadora de rentabilidad inmobiliaria construida en Next.js 16, actualmente **stateless** (sin base de datos, ver `handoff.md`). Se despliega en EasyPanel vía Docker; EasyPanel ya tiene configurado un webhook de GitHub que dispara un build/deploy automático en cada push a `main` (ver `docs/despliegue-easypanel.md`).

Este documento cubre dos cambios independientes:

1. Eliminar el pipeline de CI de GitHub Actions (`.github/workflows/ci.yml`), ya redundante frente al webhook de auto-deploy de EasyPanel.
2. Añadir una ruta `/visitas` que cuantifique tráfico del sitio: número de visitantes, procedencia geográfica, tiempo de uso y dispositivos utilizados.

## 2. Eliminación del CI

- Se borra `.github/workflows/ci.yml` completo.
- El `Dockerfile` ya ejecuta `npm run build` en su etapa `builder`; el deploy en EasyPanel sigue funcionando igual (build vía Dockerfile disparado por el webhook).
- **Efecto colateral aceptado:** hoy no queda ningún paso automático que corra `npm run lint` o `npm run test` en cada push. Quedan como verificación manual/local. El usuario asumió explícitamente este trade-off al pedir eliminar el flujo.
- Se actualiza la sección "Auto-Deploy" de `docs/despliegue-easypanel.md` (línea 45), que hoy dice *"...tras pasar los tests del pipeline CI"* — ese enunciado deja de ser cierto y se corrige.

## 3. Ruta `/visitas`: objetivo

Cuantificar, para el sitio completo:
- **Cuántas personas** visitan (visitas totales y visitantes únicos aproximados).
- **Desde qué lugares** (país / ciudad, vía GeoIP).
- **Tiempo de uso** (duración de sesión, desde que entra hasta que abandona la pestaña).
- **Desde qué dispositivos** (tipo de dispositivo, navegador, sistema operativo).

Dashboard público en `/visitas` (sin autenticación — decisión explícita del usuario), con filtros de rango: Hoy / 7 días / 30 días / Todo.

## 4. Almacenamiento: SQLite

Se introduce una base de datos SQLite local (`better-sqlite3`), rompiendo deliberadamente el diseño stateless original solo para este propósito. Motivo: cero infraestructura adicional que mantener (vs. Postgres como servicio aparte), suficiente para el volumen de tráfico de este sitio.

### Esquema — tabla `visitas`

| Columna              | Tipo    | Notas                                                   |
|----------------------|---------|----------------------------------------------------------|
| `id`                 | INTEGER | PK autoincremental                                       |
| `session_id`         | TEXT    | Generado en cliente, correlaciona inicio/fin de una visita |
| `visitor_hash`       | TEXT    | SHA-256 de `IP + User-Agent`, para aproximar "único"     |
| `path`               | TEXT    | Ruta visitada                                             |
| `pais`               | TEXT    | Resuelto por GeoIP a partir de la IP                      |
| `ciudad`              | TEXT    | Resuelto por GeoIP a partir de la IP (puede ser `NULL`)   |
| `dispositivo`        | TEXT    | `mobile` / `tablet` / `desktop`                           |
| `navegador`          | TEXT    | Ej. `Chrome`, `Safari`                                     |
| `sistema_operativo`  | TEXT    | Ej. `Windows`, `iOS`                                       |
| `iniciado_en`        | TEXT    | ISO datetime, al primer beacon                             |
| `finalizado_en`      | TEXT    | ISO datetime, al beacon de cierre (`NULL` si nunca llegó)  |
| `duracion_segundos`  | INTEGER | Calculado a partir de `finalizado_en - iniciado_en`, o enviado directo por el cliente |

**Privacidad por diseño:** no se persiste la IP cruda, solo su huella derivada (`visitor_hash`) y el país/ciudad ya resueltos. El `id`, `session_id` y `visitor_hash` no son datos personales identificables directamente.

## 5. Captura de datos

Sin middleware, sin cookies. Un componente cliente (`VisitTracker`, sin UI) montado en `src/app/layout.tsx`:

1. **Al montar** (cada carga real de página, ejecuta JS ⇒ filtra naturalmente bots sin JS): genera un `sessionId` (UUID en memoria) y llama `POST /api/visitas/track` con `{ sessionId, path }`.
2. **Al ocultarse/cerrar la pestaña** (`visibilitychange` → `hidden`, y `pagehide` como respaldo): `navigator.sendBeacon('/api/visitas/track/fin', JSON.stringify({ sessionId, duracionSegundos }))`.

En el servidor (API routes, runtime Node.js — **verificar en implementación** cuál es la forma correcta en Next 16 de forzar runtime Node.js en un route handler, dado que esta versión tiene cambios documentados en `node_modules/next/dist/docs/`):

- `POST /api/visitas/track`: lee IP real desde `x-forwarded-for` (header inyectado por el proxy de EasyPanel), resuelve país/ciudad con `geoip-lite`, parsea el `User-Agent` (dispositivo/navegador/SO — usar el parser que provea Next 16 si existe, si no `ua-parser-js`), calcula `visitor_hash`, e inserta la fila con `iniciado_en = now()`.
- `POST /api/visitas/track/fin`: actualiza la fila de ese `session_id` con `finalizado_en` y `duracion_segundos`.

## 6. Dashboard `/visitas`

Server Component que lee `?rango=hoy|7d|30d|todo` (default `7d`) y agrega la tabla SQLite:

- Tarjetas: visitas totales, visitantes únicos (`COUNT DISTINCT visitor_hash`), duración promedio de sesión.
- Gráfico de serie temporal: agrupado por hora si el rango es "Hoy", por día en el resto de rangos (un gráfico diario de un solo punto no aporta nada).
- Tabla/lista: top países, desglose por dispositivo, navegador y sistema operativo.

**Gráficos:** se usa `recharts` (estándar de facto en dashboards React, minimiza código propio) para el gráfico de visitas por día y cualquier barra/torta de desglose. Las tarjetas y tablas reutilizan el UI kit existente (`Tarjeta`, `Insignia`, etc. en `src/components/ui/`).

## 7. Cambios de infraestructura

- **Dependencias nuevas:** `better-sqlite3`, `geoip-lite`, `recharts` (y `ua-parser-js` solo si Next 16 no trae un parser de User-Agent utilizable).
- **Dockerfile:** la etapa `deps` necesita herramientas de compilación nativa (`python3 make g++`) para compilar `better-sqlite3` sobre Alpine — hoy solo instala `libc6-compat`.
- **Persistencia:** el archivo SQLite vive en `/app/data/visitas.db`. Se agrega un volumen en `docker-compose.yml` mapeado a esa ruta. **Acción manual requerida en EasyPanel:** configurar un volumen persistente apuntando a `/app/data`, o los datos se pierden en cada deploy (el contenedor se recrea desde cero). Esto se documenta en `docs/despliegue-easypanel.md`.

## 8. Fuera de alcance

- Autenticación para `/visitas` (decisión explícita: dashboard público).
- Tracking por página individual más allá de la ruta visitada (no hay múltiples rutas de contenido hoy, solo `/` y `/kitchen-sink`).
- Exportación de datos, alertas, o retención/purga automática de registros antiguos.
- Migración a Postgres u otro motor (SQLite es la decisión tomada para el volumen actual del sitio).
