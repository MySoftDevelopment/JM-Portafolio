import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIAS, type Categoria } from './lib/blog';

/*
 * Entradas del blog: un Markdown por entrada en src/content/blog/AAAA-MM-DD-slug.md.
 * El slug de la URL es el nombre del archivo sin la fecha.
 * Las escribe la rutina automática y llegan como Pull Request para revisarlas antes de publicar.
 */
const blog = defineCollection({
    loader: glob({
        pattern: '**/*.md',
        base: './src/content/blog',
        generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
    }),
    schema: z.object({
        titulo: z.string().max(110),
        // Es la meta description: Google muestra unos 155 caracteres.
        descripcion: z.string().min(70).max(170),
        fecha: z.coerce.date(),
        actualizado: z.coerce.date().optional(),
        categoria: z.enum(Object.keys(CATEGORIAS) as [Categoria, ...Categoria[]]),
        etiquetas: z.array(z.string()).default([]),
        // Fuentes primarias (avisos oficiales, CVE, changelogs). Toda entrada debe citar al menos una.
        fuentes: z.array(z.object({ titulo: z.string(), url: z.string().url() })).min(1),
        borrador: z.boolean().default(false),
    }),
});

export const collections = { blog };
