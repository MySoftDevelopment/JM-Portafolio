/** Categorías del blog: la clave va en el frontmatter de cada entrada. */
export const CATEGORIAS = {
    seguridad: 'Seguridad',
    ciberataques: 'Ciberataques',
    ia: 'Inteligencia artificial',
    tecnologia: 'Tecnología',
    lanzamientos: 'Lanzamientos',
    ecosistema: 'Ecosistema',
    guias: 'Guías',
} as const;

export type Categoria = keyof typeof CATEGORIAS;

/** Qué cubre cada categoría: se muestra en su página (/blog/categoria/<clave>/) y sirve de meta description. */
export const DESCRIPCIONES: Record<Categoria, string> = {
    seguridad: 'Vulnerabilidades y parches en PHP, Laravel, Node.js, React, Nginx y el resto del stack: a quién afectan, cómo saber si te tocan y qué hacer hoy.',
    ciberataques: 'Hackeos, filtraciones y ataques a empresas y servicios grandes: qué pasó, qué datos se expusieron y qué lección deja para quien desarrolla.',
    ia: 'Modelos y productos de inteligencia artificial: qué se anunció, qué cambia de verdad frente a lo anterior, cuánto cuesta y cuándo conviene usarlo.',
    tecnologia: 'Actualidad de la industria: big tech, chips, robótica, internet y regulación digital, contada con datos de las fuentes originales.',
    lanzamientos: 'Versiones nuevas de las herramientas del stack: qué traen, qué rompen y cómo migrar.',
    ecosistema: 'Cambios en la industria del desarrollo: fin de soporte, licencias, deprecaciones y encuestas.',
    guias: 'Guías paso a paso escritas desde proyectos reales en producción.',
};

/** Escenas de Michi para las ilustraciones (las dibuja Marca/Utilidades/Creación Imágenes/blog.py). */
export const ESCENAS = [
    'lupa', 'piensa', 'bicho', 'escudo', 'paquete', 'servidor', 'llave', 'alerta', 'robot', 'chip',
    'mundo', 'cohete', 'incendio', 'antifaz', 'candado', 'monedas', 'chat', 'nuevo', 'portatil', 'celular',
    'nube', 'grafica', 'desconectado', 'megafono', 'balanza', 'reloj', 'cafe', 'gafas', 'martillo',
] as const;

/** Lo que la portada necesita de cada entrada (se pasa como prop a la isla de React). */
export interface EntradaResumen {
    slug: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    categoria: Categoria;
    /** Ilustración de Michi (WebP con fondo transparente), si ya se generó. */
    escena?: string;
}

const formatoFecha = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const fechaLarga = (fecha: Date | string) => formatoFecha.format(new Date(fecha));
