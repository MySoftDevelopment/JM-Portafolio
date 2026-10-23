import type { GatoPose } from './michi';
import { useSyncExternalStore } from 'react';

/*
 * "Director de escena": un solo IntersectionObserver mira las secciones con `data-escena`
 * y publica cuál cruza la mitad de la pantalla. Con eso:
 *  - Michi, el gato acompañante, cambia de pose y de mensaje,
 *  - la variable --brand (registrada con @property) se anima al color de esa escena.
 */

export interface Escena {
    marca: string;
    pose: GatoPose;
    mensaje: string;
}

const BASE = '#e07a5f';

export const ESCENAS: Record<string, Escena> = {
    inicio: { marca: BASE, pose: 'maullar', mensaje: '¡Miau! Soy Michi, el gato del taller de Juan.' },
    cifras: { marca: '#f2cc8f', pose: 'sentado', mensaje: 'Estas cifras son reales: salen de sus proyectos.' },
    proyectos: { marca: BASE, pose: 'mirar', mensaje: 'Te muestro lo que Juan tiene en producción.' },
    inces: { marca: '#b25ee0', pose: 'mirar', mensaje: 'INCES: sitio, app, notas y ERP para una academia entera.' },
    seve: { marca: '#ff4d5e', pose: 'mirar', mensaje: 'SEVE ya trae videoclases, soporte en vivo y cartera.' },
    fevel: { marca: '#25d366', pose: 'mirar', mensaje: 'FEVEL atiende WhatsApp e Instagram desde una sola bandeja.' },
    mysoft: { marca: '#3cc8e6', pose: 'mirar', mensaje: 'MySoft ahora también atiende bares y discotecas.' },
    mas: { marca: '#f2cc8f', pose: 'jugar', mensaje: 'Bienvenido a la sala: pasa por las notas de la pared.' },
    servicios: { marca: '#81b29a', pose: 'sentado', mensaje: '¿Qué necesitas? Seguro alguna de estas te sirve.' },
    stack: { marca: '#f2cc8f', pose: 'teclear', mensaje: 'Sus herramientas de todos los días (yo solo piso el teclado).' },
    github: { marca: '#81b29a', pose: 'teclear', mensaje: 'Programa casi todos los días. Mira su actividad.' },
    sobre: { marca: BASE, pose: 'jugar', mensaje: 'Juan no entrega y desaparece: se queda contigo.' },
    contacto: { marca: BASE, pose: 'panza', mensaje: '¡Escríbele! Te responde con una propuesta clara.' },
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
