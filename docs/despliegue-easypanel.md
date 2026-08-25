# Guía de Despliegue en EasyPanel

Esta guía describe el procedimiento para desplegar el proyecto **`newfer-rentabilidad`** en una instancia de EasyPanel.

---

## Requisitos Previos

1. Un servidor con **EasyPanel** instalado y funcionando.
2. Un proyecto/espacio de trabajo en EasyPanel.
3. Repositorio en GitHub configurado con el código fuente.

---

## Configuración en EasyPanel

1. **Crear una nueva aplicación:**
   - En el panel de EasyPanel, haz clic en **+ App**.
   - Selecciona **App Service** (Servicio personalizado).
   - Asigna el nombre `newfer-rentabilidad`.

2. **Conectar el Repositorio:**
   - En la pestaña **Source**, selecciona **GitHub**.
   - Conecta tu cuenta y selecciona el repositorio `newfer-rentabilidad`.
   - Selecciona la rama principal (`main`).

3. **Configurar el Método de Build:**
   - En **Build Method**, selecciona **Dockerfile**.
   - Ruta del Dockerfile: `./Dockerfile`
   - Contexto del Build: `./`

4. **Configurar Puerto y Dominio:**
   - En la sección **Ports**, establece el puerto del contenedor en `3000`.
   - En **Domains**, agrega el dominio o subdominio asignado (ejemplo: `calculadora.tudominio.com`).
   - Activa el certificado SSL automático (Let's Encrypt).

5. **Desplegar:**
   - Haz clic en **Deploy**.
   - EasyPanel descargará el código, ejecutará el build multi-stage del `Dockerfile` y levantará el contenedor en producción.

---

## Auto-Deploy

EasyPanel configurará automáticamente un Webhook en tu repositorio de GitHub para que cada commit push a la rama `main` despliegue la nueva versión inmediatamente (build directo del `Dockerfile`, sin pipeline de CI intermedio). Antes de hacer push a `main`, correr localmente `npm run lint` y `npm run test`.

---

## Volumen persistente para `/visitas`

La ruta `/visitas` guarda sus estadísticas en un archivo SQLite en `/app/data/visitas.db` dentro del contenedor. Si no se configura un volumen persistente, ese archivo se pierde en cada deploy (el contenedor se recrea desde cero).

En EasyPanel:

1. En la app, ir a la pestaña **Mounts** (o **Volumes**).
2. Agregar un volumen tipo **Volume** con **Mount Path** = `/app/data`.
3. Guardar y volver a desplegar.
