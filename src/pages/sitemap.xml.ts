import { entradasPublicadas } from '@/lib/entradas';

const SITIO = 'https://juanmolina.dev';

// Imágenes de la portada: Google las asocia a la página (búsqueda de imágenes).
const IMAGENES_INICIO = ['/images/og-image.jpg', '/images/projects/inces.webp', '/images/projects/inces-app.webp', '/images/projects/seve.webp', '/images/projects/mysoft.webp', '/images/projects/lilac.webp', '/images/projects/ilus/sorteos.svg', '/images/projects/ilus/eventos.svg', '/images/projects/ilus/citas.svg', '/images/projects/ilus/migraciones.svg'];

const dia = (d: Date) => d.toISOString().slice(0, 10);

/** Sitemap generado en cada build: cada entrada nueva del blog entra sola. */
export async function GET() {
    const entradas = await entradasPublicadas();
    const ultima = entradas[0] ? (entradas[0].data.actualizado ?? entradas[0].data.fecha) : new Date();

    const urls = [
        `    <url>
        <loc>${SITIO}/</loc>
        <lastmod>${dia(ultima)}</lastmod>
${IMAGENES_INICIO.map((i) => `        <image:image><image:loc>${SITIO}${i}</image:loc></image:image>`).join('\n')}
    </url>`,
        `    <url>
        <loc>${SITIO}/blog/</loc>
        <lastmod>${dia(ultima)}</lastmod>
    </url>`,
        `    <url>
        <loc>${SITIO}/servicios/revision-seguridad/</loc>
    </url>`,
        `    <url>
        <loc>${SITIO}/privacidad/</loc>
    </url>`,
        ...entradas.map(
            (e) => `    <url>
        <loc>${SITIO}/blog/${e.id}/</loc>
        <lastmod>${dia(e.data.actualizado ?? e.data.fecha)}</lastmod>
    </url>`,
        ),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;

    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
