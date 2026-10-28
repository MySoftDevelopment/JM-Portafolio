import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { entradasPublicadas } from '@/lib/entradas';

export async function GET(context: APIContext) {
    const entradas = await entradasPublicadas();

    return rss({
        title: 'Blog de Juan Molina',
        description: 'Vulnerabilidades, lanzamientos y cambios en PHP, Node.js, React y TypeScript.',
        site: context.site!,
        customData: '<language>es-co</language>',
        items: entradas.map((e) => ({
            title: e.data.titulo,
            description: e.data.descripcion,
            pubDate: e.data.fecha,
            link: `/blog/${e.id}/`,
            categories: e.data.etiquetas,
        })),
    });
}
