import { useSyncExternalStore } from 'react';

/*
 * "Director de escena": un solo IntersectionObserver mira las secciones con `data-escena`
 * y publica cuál cruza la mitad de la pantalla. Con eso:
 *  - el robot acompañante cambia de pose y de mensaje,
 *  - la variable --brand (registrada con @property) se anima al color de esa escena.
 */

export type Pose = 'saludar' | 'senalar' | 'mostrar' | 'pensar' | 'teclear' | 'celebrar';

export interface Escena {
    marca: string;
    pose: Pose;
    mensaje: string;
}

const BASE = '#e07a5f';

export const ESCENAS: Record<string, Escena> = {
    inicio: { marca: BASE, pose: 'saludar', mensaje: '¡Hola! Soy Bit, el ayudante del taller de Juan.' },
    cifras: { marca: '#f2cc8f', pose: 'mostrar', mensaje: 'Estas cifras son reales: salen de sus proyectos.' },
    proyectos: { marca: BASE, pose: 'senalar', mensaje: 'Te muestro lo que Juan tiene en producción.' },
    inces: { marca: '#b25ee0', pose: 'senalar', mensaje: 'INCES: sitio, app y ERP para una academia entera.' },
    seve: { marca: '#ff4d5e', pose: 'senalar', mensaje: 'SEVE funciona en más de 100 colegios de Colombia.' },
    fevel: { marca: '#25d366', pose: 'senalar', mensaje: 'FEVEL controla su inventario y vende por WhatsApp.' },
    mysoft: { marca: '#3cc8e6', pose: 'senalar', mensaje: 'MySoft es el ERP que Juan creó para PYMEs y ópticas.' },
    mas: { marca: '#f2cc8f', pose: 'mostrar', mensaje: 'Hay más: tiendas, sitios y apps. Prueba los filtros.' },
    servicios: { marca: '#81b29a', pose: 'pensar', mensaje: '¿Qué necesitas? Seguro alguna de estas te sirve.' },
    stack: { marca: '#f2cc8f', pose: 'teclear', mensaje: 'Sus herramientas de todos los días.' },
    github: { marca: '#81b29a', pose: 'teclear', mensaje: 'Programa casi todos los días. Mira su actividad.' },
    sobre: { marca: BASE, pose: 'mostrar', mensaje: 'Juan no entrega y desaparece: se queda contigo.' },
    contacto: { marca: BASE, pose: 'celebrar', mensaje: '¡Escríbele! Te responde con una propuesta clara.' },
};

let actual = 'inicio';
const oyentes = new Set<() => void>();

function publicar(id: string) {
    if (id === actual || !ESCENAS[id]) return;
    actual = id;
    document.documentElement.style.setProperty('--brand', ESCENAS[id].marca);
    oyentes.forEach((o) => o());
}

export function useEscena(): string {
    return useSyncExternalStore(
        (cb) => {
            oyentes.add(cb);
            return () => oyentes.delete(cb);
        },
        () => actual,
    );
}

/** Empieza a mirar las secciones. Devuelve la función de limpieza. */
export function observarEscenas(): () => void {
    const obs = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((e) => {
                if (e.isIntersecting) publicar((e.target as HTMLElement).dataset.escena ?? '');
            });
        },
        { rootMargin: '-50% 0px -50% 0px' },
    );

    document.querySelectorAll('[data-escena]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
}
