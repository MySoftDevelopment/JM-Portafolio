import { getCollection, type CollectionEntry } from 'astro:content';
import type { EntradaResumen } from './blog';

export type Entrada = CollectionEntry<'blog'>;

/** Entradas publicadas (sin borradores), de la más reciente a la más antigua. */
export async function entradasPublicadas(): Promise<Entrada[]> {
    const todas = await getCollection('blog', ({ data }) => !data.borrador);
    return todas.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

export const resumen = (e: Entrada): EntradaResumen => ({
    slug: e.id,
    titulo: e.data.titulo,
    descripcion: e.data.descripcion,
    fecha: e.data.fecha.toISOString(),
    categoria: e.data.categoria,
});
