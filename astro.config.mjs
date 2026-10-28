import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

const ruta = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
    site: 'https://juanmolina.dev',
    // /blog/mi-entrada/ se genera como carpeta con index.html: Apache la sirve sin reglas extra.
    build: { format: 'directory' },
    integrations: [react()],
    markdown: {
        // Dos temas sin color por defecto: el CSS elige el del tema activo (ver .prosa en index.scss).
        shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false },
    },
    vite: {
        resolve: {
            alias: {
                '@': ruta('./src'),
                '@configuration': ruta('./src/api/configuration'),
                '@components': ruta('./src/components'),
                '@includes': ruta('./src/components/includes'),
            },
        },
        css: {
            preprocessorOptions: {
                scss: { api: 'modern-compiler' },
            },
        },
    },
});
