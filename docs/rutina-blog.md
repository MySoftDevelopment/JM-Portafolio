# Rutina del blog

Instrucciones para el agente programado que escribe las entradas del blog de juanmolina.dev.
El agente **nunca publica**: abre un Pull Request y Juan lo revisa y lo fusiona. Al fusionarlo, GitHub Actions construye el sitio y Hostinger lo publica.

## 1. Buscar noticias

Revisa lo publicado desde la última entrada del blog (la fecha más reciente en `src/content/blog/`). Fuentes, en este orden de prioridad:

- **Seguridad:** catálogo KEV de CISA, GitHub Advisory Database (ecosistemas npm y composer, severidad alta o crítica), avisos de seguridad de php.net y de nodejs.org.
- **Lanzamientos y cambios:** blogs y notas de versión oficiales de PHP, Node.js, React, TypeScript, Vite, Laravel, Expo y React Native, Tailwind CSS, MySQL y MariaDB, y Nginx.
- Puedes usar medios de tecnología para **descubrir** noticias, pero la entrada se escribe y se cita a partir de la **fuente primaria** (aviso oficial, CVE, changelog o anuncio del proyecto).

## 2. Elegir

Escribe **una entrada por ejecución** (dos solo si hay dos noticias de seguridad críticas). Para elegirla:

- Prioridad: vulnerabilidad explotada activamente > vulnerabilidad crítica o alta en algo muy usado del stack > versión mayor con cambios que rompen > versión menor con algo útil.
- Descarta lo que ya está cubierto: lee los títulos y etiquetas de `src/content/blog/`.
- Descarta rumores, noticias sin fuente primaria y temas fuera del stack de la portada (PHP, Laravel, Node.js, React, React Native/Expo, TypeScript, Vite, Tailwind, MySQL/MariaDB, Nginx, Debian, WhatsApp Cloud API).
- **Si no hay nada que valga la pena, no crees nada.** Termina sin abrir PR. Es mejor una semana sin entrada que una entrada de relleno.

## 3. Verificar

- Cada dato concreto (número de CVE, versiones afectadas y corregidas, fechas, puntuación CVSS, configuraciones) debe estar en una fuente primaria que hayas leído. Si dos fuentes no coinciden, manda la oficial. Si no puedes confirmar algo, no lo escribas.
- No inventes comandos, opciones de configuración ni nombres de paquetes. Si das un comando, debe existir tal cual.
- No afirmes que un proveedor (Hostinger, AWS, etc.) ya aplicó un parche salvo que lo diga una fuente.

## 4. Escribir

Archivo: `src/content/blog/AAAA-MM-DD-slug.md`. El slug va en español, corto y con las palabras que buscaría alguien en Google (ejemplo: `php2shell-actualiza-php`). Usa como referencia de tono y estructura `src/content/blog/2026-10-28-php2shell-actualiza-php.md`.

Frontmatter (lo valida `src/content.config.ts`, y si no cumple, el build falla):

```yaml
---
titulo: 'Máximo 110 caracteres, con el nombre del producto y el problema'
descripcion: 'Entre 70 y 170 caracteres. Es la meta description: qué pasó y por qué importa.'
fecha: AAAA-MM-DD
categoria: seguridad # seguridad | lanzamientos | ecosistema | guias
etiquetas: ['PHP', 'CVE-AAAA-NNNNN']
fuentes:
    - titulo: 'Nombre de la fuente primaria'
      url: 'https://...'
---
```

Estilo:

- Español de Colombia, tuteando, claro y directo. Frases cortas. Sin emojis ni signos de exclamación.
- Escribe para alguien que tiene un proyecto en producción: **qué pasó, a quién afecta, cómo saber si me afecta y qué hago hoy**. Ese enfoque práctico es lo que diferencia la entrada de una noticia más.
- Entre 600 y 1200 palabras. Secciones con `##`, pasos con `###`, una tabla de versiones si aplica y bloques de código con su lenguaje (` ```bash `, ` ```php `, ` ```ts `).
- Redacción propia. No copies párrafos de las fuentes; como mucho, una cita corta entre comillas y atribuida.
- El cierre es un resumen en pasos. No añadas una llamada a contactar: la página ya la incluye.

## 5. Comprobar y abrir el PR

1. Ejecuta `yarn install --frozen-lockfile` y `yarn build`. Si el build falla, corrige la entrada (normalmente el frontmatter).
2. Crea la rama `blog/AAAA-MM-DD-slug` desde `main` y haz commit solo del archivo de la entrada.
3. Abre el PR contra `main`:
    - Título: `Blog: <titulo de la entrada>`
    - Cuerpo: un resumen de dos líneas, la lista de fuentes y una sección **«Para revisar»** con los datos más delicados (versiones, CVE, comandos), para que Juan los pueda comprobar rápido.
4. No fusiones el PR ni toques ningún otro archivo del repositorio.
