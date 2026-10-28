---
titulo: 'Next.js 16.4.1 y 15.5.28: dos fallos críticos de ejecución remota de código y uno de denegación de servicio'
descripcion: 'Next.js corrigió fallos críticos en use cache y en la optimización de imágenes SVG, y uno en Server Actions que también toca a React. Qué versión instalar.'
fecha: 2026-10-28T07:00:00-05:00
categoria: seguridad
michi: bicho
etiquetas: ['Next.js', 'React', 'React Server Components', 'sharp', 'CVE-2026-96889']
fuentes:
    - titulo: 'Next.js: Security Update for Upstream Vulnerabilities (14 oct 2026)'
      url: 'https://nextjs.org/blog/nextjs-security-update-october-14-2026'
    - titulo: 'GHSA-673q-mjm6-r5xr: RCE en funciones use cache (Next.js)'
      url: 'https://github.com/vercel/next.js/security/advisories/GHSA-673q-mjm6-r5xr'
    - titulo: 'GHSA-2464-fhr4-w9xw / CVE-2026-96889: RCE en la optimización de imágenes con SVG (Next.js)'
      url: 'https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw'
    - titulo: 'GHSA-h3gv-c5rc-p453: denegación de servicio en React Server Functions (React)'
      url: 'https://github.com/react/react/security/advisories/GHSA-h3gv-c5rc-p453'
    - titulo: 'Netlify: Next.js & React security release (Oct 2026)'
      url: 'https://www.netlify.com/changelog/2026-10-14-nextjs-react-security-vulnerabilities/'
---

El 14 de octubre el equipo de Next.js publicó una actualización de seguridad fuera de calendario: **16.4.1** (LTS activa) y **15.5.28** (LTS de mantenimiento). Corrige **dos vulnerabilidades críticas** (CVSS 4.0: 9.5) que permiten **ejecutar código en el servidor sin autenticación**, y una de severidad alta que puede **tumbar tu aplicación**. Una de ellas viene de React, así que también afecta a otros frameworks con React Server Components.

```bash
npm install next@16.4.1   # si estás en 16.x
npm install next@15.5.28  # si estás en 15.x
```

## Los tres fallos

### 1. Ejecución de código en funciones `use cache` (crítico)

**GHSA-673q-mjm6-r5xr**, de 16.0.0 a 16.4.0. Afecta a aplicaciones con **App Router y Cache Components** que tengan una función `use cache` que devuelva **varios arreglos tipados** (`Uint8Array`, `Float32Array`, etc.). Un atacante sin autenticar puede ejecutar código en tu servidor.

No hay alternativa temporal. Next.js recomienda actualizar de inmediato **aunque tu aplicación no tenga funciones así**.

### 2. Ejecución de código al optimizar imágenes SVG (crítico)

**CVE-2026-96889** (GHSA-2464-fhr4-w9xw). El fallo está en una librería de procesamiento de imágenes que usa Next.js por debajo, a través de `sharp`. Puede llevar a ejecutar código **cuando Next.js corre en Linux con glibc**, que es el caso de la mayoría de servidores y de las imágenes de Docker basadas en Debian o Ubuntu. Las imágenes basadas en Alpine usan musl, otra librería del sistema.

Las versiones afectadas son **de la 10.0.0 a la 15.5.27** y **de la 16.0.0 a la 16.4.0**. Si sigues en Next.js 13 o 14, también estás expuesto, y esas ramas no tienen versión corregida. Para ellas, la alternativa oficial es asegurarte de que Next.js use **`sharp` 0.35.5 o superior**. Revisa qué versión quedó instalada:

```bash
npm ls sharp
```

Como `sharp` es una dependencia de Next.js, instalarlo aparte no garantiza que Next.js use esa copia. Para forzar la versión en todo el árbol de dependencias, usa `overrides` en tu `package.json` (con yarn se llama `resolutions`), y luego vuelve a instalar:

```json
{
    "overrides": {
        "sharp": "^0.35.5"
    }
}
```

Además del optimizador de imágenes, Netlify señala que el mismo fallo es alcanzable con `ImageResponse` de `next/og`, el que genera imágenes para redes sociales.

### 3. Denegación de servicio con Server Actions (alto)

**GHSA-p3m5-59mp-jv5r** en Next.js, que viene de **GHSA-h3gv-c5rc-p453** en React. Una petición manipulada contra una aplicación con App Router y **al menos una Server Action** dispara el consumo de CPU y bloquea las demás peticiones de ese proceso. Las aplicaciones con Pages Router o sin Server Actions no son vulnerables.

El fallo está en los paquetes de React para Server Components (`react-server-dom-webpack`, `react-server-dom-parcel` y `react-server-dom-turbopack`), en las versiones 19.0.0 a 19.3.0. Está corregido en **19.0.9, 19.1.10, 19.2.9 y 19.3.1**. Si usas React Server Components con otro framework o *bundler*, actualiza esos paquetes. **Si tu aplicación de React no usa Server Components** (por ejemplo, una SPA con Vite o una app de Expo), este fallo no te afecta.

## Qué hacer

1. **Comprueba tu versión:** `npm ls next`.
2. **Actualiza** a 16.4.1 o 15.5.28 y confirma que `sharp` quedó en 0.35.5 o superior (`npm ls sharp`).
3. **Vuelve a construir y desplegar.** En Docker, reconstruye la imagen; en tu VPS, reinicia el proceso (PM2, systemd).
4. **Si estás en Next.js 14 o anterior:** fuerza `sharp` 0.35.5 o superior ya y planea la migración a la 15 o la 16. Según Netlify, la denegación de servicio con Server Actions también afecta a las versiones 13 y 14, y ahí no habrá arreglo.

### ¿Y si mi app está en una plataforma administrada?

Actualiza igual. Según Netlify, en su plataforma la optimización de imágenes la hace su propio CDN, así que esa ruta del fallo de SVG no pasa por tu función, aunque `next/og` sí puede verse afectado. La denegación de servicio tiene poco impacto por el autoescalado, pero puede **subirte la factura** si alguien la aprovecha. En otras plataformas, consulta su aviso o actualiza y vuelve a desplegar.

## En resumen

1. Next.js 16: actualiza a **16.4.1**. Next.js 15: actualiza a **15.5.28**.
2. Verifica que `sharp` sea **0.35.5 o superior**, sobre todo en Next.js 14 o anterior.
3. Si usas React Server Components fuera de Next.js, actualiza `react-server-dom-*` a 19.0.9, 19.1.10, 19.2.9 o 19.3.1.
4. Reconstruye, despliega y reinicia los procesos.
