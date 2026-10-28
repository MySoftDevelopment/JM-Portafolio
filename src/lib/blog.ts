/** Categorías del blog: la clave va en el frontmatter de cada entrada. */
export const CATEGORIAS = {
    seguridad: 'Seguridad',
    lanzamientos: 'Lanzamientos',
    ecosistema: 'Ecosistema',
    guias: 'Guías',
} as const;

export type Categoria = keyof typeof CATEGORIAS;

/** Escenas de Michi para las ilustraciones (las dibuja Marca/Utilidades/Creación Imágenes/blog.py). */
export const ESCENAS = ['lupa', 'piensa', 'bicho', 'escudo', 'paquete', 'servidor', 'llave', 'alerta'] as const;

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
