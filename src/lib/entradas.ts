import { getCollection, type CollectionEntry } from 'astro:content';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { EntradaResumen } from './blog';

export type Entrada = CollectionEntry<'blog'>;

/** Entradas publicadas (sin borradores), de la más reciente a la más antigua. */
export async function entradasPublicadas(): Promise<Entrada[]> {
    const todas = await getCollection('blog', ({ data }) => !data.borrador);
    return todas.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

/**
 * Imágenes de una entrada, generadas por blog.py en public/images/blog/<slug>/.
 * Si todavía no existen, la entrada se muestra sin ilustración y comparte la imagen general del sitio.
 */
export function imagenes(slug: string): { portada?: string; escena?: string } {
    const ruta = (archivo: string) => (existsSync(join(process.cwd(), 'public', 'images', 'blog', slug, archivo)) ? `/images/blog/${slug}/${archivo}` : undefined);
    return { portada: ruta('portada.jpg'), escena: ruta('escena.webp') };
}

export const resumen = (e: Entrada): EntradaResumen => ({
    slug: e.id,
    titulo: e.data.titulo,
    descripcion: e.data.descripcion,
    fecha: e.data.fecha.toISOString(),
    categoria: e.data.categoria,
    escena: imagenes(e.id).escena,
});
