# JuanMolina Portafolio 2026.

Estás visualizando el repositorio del portafolio y blog de [juanmolina.dev](https://juanmolina.dev).

Está programado con Astro + React + TypeScript + Tailwind. Astro genera el HTML de cada página en el build (mejor para buscadores) y los componentes de React se hidratan en el navegador.

## ¿Cómo usar?

- Necesitas [Node](https://nodejs.org/es/download/) 22.23 o superior.
- Instala yarn y las dependencias:
```
npm install --global yarn
yarn
```
- Para desarrollar y construir:
```
yarn start
```
```
yarn build
```

## Blog

- Cada entrada es un Markdown en `src/content/blog/AAAA-MM-DD-slug.md`; el esquema del frontmatter está en `src/content.config.ts`.
- Las entradas las escribe y publica una rutina programada (instrucciones en `docs/rutina-blog.md`). Si un dato queda en duda, abre un Pull Request en lugar de publicar.

## Despliegue

Cada push a `main` ejecuta `.github/workflows/deploy.yml`: construye el sitio y publica `dist/` en la rama `deploy`. Hostinger recibe el webhook y hace pull de esa rama.

## Colaboradores

Este proyecto fue creado por [Juanito](https://github.com/OuisVN).

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
