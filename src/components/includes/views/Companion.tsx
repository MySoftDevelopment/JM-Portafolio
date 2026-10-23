import { ESCENAS, observarEscenas, useEscena } from '@/lib/escena';
import { GatoPose, Mirada } from '@/lib/michi';
import { X } from '@phosphor-icons/react';
import { animate, AnimatePresence, motion, useMotionValue, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Gato } from './Gato';

const CLAVE = 'michi-oculto';
const DORMIR_TRAS = 25000;

function leerOculto() {
    try {
        return localStorage.getItem(CLAVE) === '1';
    } catch {
        return false;
    }
}

const esEscritorio = () => window.matchMedia('(min-width: 640px)').matches;

/** Dónde está Michi: en el suelo (una esquina) o sentado sobre un componente de la página. */
type Lugar = { tipo: 'suelo'; lado: 'der' | 'izq' } | { tipo: 'percha'; el: HTMLElement; k: number };

/**
 * Michi acompaña el recorrido: aparece fuera de las habitaciones (en el taller del hero y en
 * la sala de proyectos ya vive uno),
 * cambia de pose y de mensaje según la sección y, por su cuenta, de vez en cuando juega con
 * el estambre, se pone alerta, rueda panza arriba, maúlla o salta: al otro lado de la pantalla
 * o encima de un componente de la página (los marcados con data-percha), donde se queda
 * sentado mientras se desplaza la página. Salta como un gato real: agachado, en arco y
 * aterrizando con las patas delanteras. Si nadie hace nada, se duerme.
 * Sigue el cursor con los ojos, se pone alerta si se acerca y, al tocarlo, maúlla y suelta corazones.
 */
export function Companion() {
    const escena = useEscena();
    const reduce = useReducedMotion();
    const [oculto, setOculto] = useState(leerOculto);
    const [globo, setGlobo] = useState(true);
    const [lado, setLado] = useState<'der' | 'izq'>('der');
    const [accion, setAccion] = useState<GatoPose | null>(null);
    const [dormido, setDormido] = useState(false);
    const [mimos, setMimos] = useState(0);
    const [mirada, setMirada] = useState<Mirada | null>(null);
    const [grande, setGrande] = useState(esEscritorio);
    // Hacia dónde mira durante el salto (las vistas de perfil miran a la derecha).
    const [rumbo, setRumbo] = useState<1 | -1>(1);
    // El cursor se acerca: se pone en alerta.
    const [cerca, setCerca] = useState(false);

    const temporizador = useRef<number>();
    const tAccion = useRef<number>();
    const saltando = useRef(false);
    const lugar = useRef<Lugar>({ tipo: 'suelo', lado: 'der' });
    // Cambia cada vez que Michi se esconde: un salto a medias de antes se da por cancelado.
    const sesion = useRef(0);
    const ladoRef = useRef(lado);
    const dormidoRef = useRef(dormido);
    const botonRef = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const giro = useMotionValue(0);
    const aplastar = useMotionValue(1);

    ladoRef.current = lado;
    dormidoRef.current = dormido;

    const datos = ESCENAS[escena] ?? ESCENAS.inicio;
    // En las habitaciones (el taller del hero y la sala de proyectos) ya hay un Michi:
    // el acompañante se esconde para que no haya dos gatos.
    const enHabitacion = escena === 'inicio' || escena === 'mas';
    const ancho = grande ? 120 : 80;
    const margen = grande ? 20 : 12;

    useEffect(() => observarEscenas(), []);

    const abajo = grande ? 20 : 12;
    const altoCaja = grande ? 150 : 100;

    // Distancia hasta el borde izquierdo (sin contar la barra de desplazamiento).
    const distancia = useCallback(() => document.documentElement.clientWidth - ancho - margen * 2, [ancho, margen]);
    const distanciaRef = useRef(distancia);
    distanciaRef.current = distancia;

    /** Desplazamiento (x, y) para que las patas de Michi queden en ese lugar. */
    const coords = useCallback(
        (l: Lugar) => {
            if (l.tipo === 'suelo') return { x: l.lado === 'izq' ? -distancia() : 0, y: 0 };
            // Las patas están a 6/150 del borde inferior de la caja del gato.
            const patasX = document.documentElement.clientWidth - margen - ancho / 2;
            const patasY = window.innerHeight - abajo - (altoCaja * 6) / 150;
            const r = l.el.getBoundingClientRect();
            return { x: r.left + r.width * l.k - patasX, y: r.top - patasY };
        },
        [abajo, altoCaja, ancho, distancia, margen],
    );

    const mostrarGlobo = useCallback(() => {
        setGlobo(true);
        window.clearTimeout(temporizador.current);
        temporizador.current = window.setTimeout(() => setGlobo(false), esEscritorio() ? 7000 : 4500);
    }, []);

    // El globo aparece en cada cambio de escena y se esconde solo para no tapar el contenido
    // (más rápido en móvil). Tocar a Michi lo vuelve a mostrar.
    useEffect(() => {
        mostrarGlobo();
        return () => window.clearTimeout(temporizador.current);
    }, [escena, mostrarGlobo]);

    const hacer = useCallback((pose: GatoPose, ms: number) => {
        window.clearTimeout(tAccion.current);
        setAccion(pose);
        tAccion.current = window.setTimeout(() => setAccion((a) => (a === pose ? null : a)), ms);
    }, []);

    /**
     * Salta como un gato real hasta un lugar (el suelo o encima de un componente):
     * se agacha y menea el trasero, vuela en arco con la nariz arriba y luego abajo,
     * aterriza con las patas delanteras y se vuelve a sentar. `rapido` salta sin prepararse
     * (por ejemplo, cuando el componente donde estaba se va de la pantalla).
     */
    const saltarA = useCallback(
        async (destino: Lugar, rapido = false) => {
            if (saltando.current || reduce) return;
            saltando.current = true;
            window.clearTimeout(tAccion.current);
            setGlobo(false);
            const mia = sesion.current;
            const esperar = (ms: number) => new Promise((r) => window.setTimeout(r, ms));
            // Si se escondió a mitad del salto, este salto ya no manda.
            const cancelado = () => sesion.current !== mia;

            const desde = { x: x.get(), y: y.get() };
            let hasta = coords(destino);
            const sentido = hasta.x < desde.x ? -1 : 1;
            setRumbo(sentido);

            if (!rapido) {
                setAccion('preparar');
                await esperar(650);
                if (cancelado()) return;
                hasta = coords(destino);
            }

            setAccion('saltar');
            const recorrido = Math.hypot(hasta.x - desde.x, hasta.y - desde.y);
            const duracion = Math.min(1.05, 0.5 + recorrido / 2600);
            const pico = Math.min(desde.y, hasta.y) - Math.min(170, 70 + recorrido / 8);
            await Promise.all([
                animate(x, hasta.x, { duration: duracion, ease: [0.3, 0.1, 0.7, 0.9] }),
                animate(y, [desde.y, pico, hasta.y], { duration: duracion, times: [0, 0.45, 1], ease: ['easeOut', 'easeIn'] }),
                animate(giro, [sentido * -16, 0, sentido * 18], { duration: duracion, times: [0, 0.5, 1], ease: 'easeInOut' }),
            ]);
            if (cancelado()) return;

            lugar.current = destino;
            // Encima de un componente, el globo y la mirada se orientan según la mitad de la pantalla.
            const nuevoLado = destino.tipo === 'suelo' ? destino.lado : hasta.x + document.documentElement.clientWidth - margen - ancho / 2 < document.documentElement.clientWidth / 2 ? 'izq' : 'der';

            setAccion('aterrizar');
            giro.set(0);
            await animate(aplastar, [0.9, 1.03, 1], { duration: 0.35, times: [0, 0.6, 1], ease: 'easeOut' });
            if (cancelado()) return;
            await esperar(200);
            if (cancelado()) return;
            setLado(nuevoLado);
            await esperar(150);
            if (cancelado()) return;
            setAccion(null);
            saltando.current = false;
        },
        [ancho, aplastar, coords, giro, margen, reduce, x, y],
    );

    /** Componentes de la página donde Michi se puede sentar ahora mismo (a la vista y con espacio). */
    const perchas = useCallback(() => {
        const alto = window.innerHeight;
        return Array.from(document.querySelectorAll<HTMLElement>('[data-percha]')).filter((el) => {
            const r = el.getBoundingClientRect();
            const actual = lugar.current.tipo === 'percha' && lugar.current.el === el;
            return !actual && r.width >= ancho + 40 && r.top > altoCaja + 90 && r.top < alto - 160;
        });
    }, [altoCaja, ancho]);

    /** Elige un sitio al azar sobre el componente, sin que el gato se salga de sus bordes. */
    const sitioEn = useCallback(
        (el: HTMLElement): Lugar => {
            const r = el.getBoundingClientRect();
            const margenK = (ancho / 2 + 12) / r.width;
            return { tipo: 'percha', el, k: margenK + Math.random() * Math.max(0, 1 - margenK * 2) };
        },
        [ancho],
    );

    const alSuelo = useCallback((): Lugar => {
        // Baja al lado más cercano.
        const actual = x.get();
        return { tipo: 'suelo', lado: actual < -distancia() / 2 ? 'izq' : 'der' };
    }, [distancia, x]);

    // Mantiene a Michi en su sitio al cambiar el tamaño de la ventana.
    useEffect(() => {
        const ajustar = () => {
            setGrande(esEscritorio());
            if (saltando.current) return;
            const c = coords(lugar.current);
            x.set(c.x);
            y.set(c.y);
        };
        ajustar();
        window.addEventListener('resize', ajustar);
        return () => window.removeEventListener('resize', ajustar);
    }, [coords, x, y]);

    // Sentado sobre un componente, lo acompaña al desplazar la página; si el componente
    // se va de la pantalla, salta de vuelta al suelo.
    useEffect(() => {
        if (enHabitacion || oculto) return;
        let raf = 0;
        const seguir = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const l = lugar.current;
                if (l.tipo !== 'percha' || saltando.current) return;
                const r = l.el.getBoundingClientRect();
                if (!l.el.isConnected || r.top < altoCaja * 0.5 + 70 || r.top > window.innerHeight - 40) {
                    void saltarA(alSuelo(), true);
                    return;
                }
                const c = coords(l);
                x.set(c.x);
                y.set(c.y);
            });
        };
        window.addEventListener('scroll', seguir, { passive: true });
        return () => {
            window.removeEventListener('scroll', seguir);
            cancelAnimationFrame(raf);
        };
    }, [alSuelo, altoCaja, coords, enHabitacion, oculto, saltarA, x, y]);

    // Al entrar a una habitación u ocultarlo, se reinicia del todo: corta cualquier salto y
    // baja a la esquina del lado donde estaba (izquierda o derecha). Así, al reaparecer, entra
    // por ese mismo lado con la animación normal y muestra su globo con la información.
    useEffect(() => {
        if (!enHabitacion && !oculto) {
            mostrarGlobo();
            return;
        }
        sesion.current += 1;
        [x, y, giro, aplastar].forEach((v) => v.stop());
        window.clearTimeout(tAccion.current);
        saltando.current = false;
        // La mitad de la pantalla donde quedó (en el suelo, sobre un componente o en el aire).
        const lado = x.get() < -distanciaRef.current() / 2 ? 'izq' : 'der';
        lugar.current = { tipo: 'suelo', lado };
        x.set(lado === 'izq' ? -distanciaRef.current() : 0);
        y.set(0);
        giro.set(0);
        aplastar.set(1);
        setLado(lado);
        setAccion(null);
        setDormido(false);
        setCerca(false);
        setMirada(null);
    }, [aplastar, enHabitacion, giro, mostrarGlobo, oculto, x, y]);

    // Travesuras por su cuenta, cada 8 a 14 segundos: saltar a un componente de la página,
    // al otro lado, jugar, ponerse alerta, rodar panza arriba o maullar.
    useEffect(() => {
        if (enHabitacion || oculto || reduce) return;
        let id: number;
        const programar = () => {
            id = window.setTimeout(
                async () => {
                    if (!document.hidden && !saltando.current && !dormidoRef.current) {
                        const r = Math.random();
                        const opciones = perchas();
                        if (r < 0.4) {
                            if (opciones.length && Math.random() < 0.75) await saltarA(sitioEn(opciones[Math.floor(Math.random() * opciones.length)]));
                            else if (lugar.current.tipo === 'percha') await saltarA(alSuelo());
                            else await saltarA({ tipo: 'suelo', lado: ladoRef.current === 'der' ? 'izq' : 'der' });
                        } else if (r < 0.6) hacer('jugar', 5400);
                        else if (r < 0.75) hacer('alerta', 2600);
                        else if (r < 0.87) hacer('panza', 4400);
                        else hacer('maullar', 1500);
                    }
                    programar();
                },
                8000 + Math.random() * 6000,
            );
        };
        programar();
        return () => window.clearTimeout(id);
    }, [alSuelo, enHabitacion, oculto, perchas, reduce, saltarA, sitioEn, hacer]);

    // Si nadie se mueve en un rato, se echa a dormir; cualquier gesto lo despierta.
    useEffect(() => {
        if (enHabitacion || oculto) return;
        let id = window.setTimeout(() => setDormido(true), DORMIR_TRAS);
        const actividad = () => {
            if (dormidoRef.current) setDormido(false);
            window.clearTimeout(id);
            id = window.setTimeout(() => setDormido(true), DORMIR_TRAS);
        };
        const eventos = ['scroll', 'pointerdown', 'keydown'] as const;
        eventos.forEach((e) => window.addEventListener(e, actividad, { passive: true }));
        return () => {
            window.clearTimeout(id);
            eventos.forEach((e) => window.removeEventListener(e, actividad));
        };
    }, [enHabitacion, oculto]);

    // Los ojos siguen al cursor (solo con mouse; un cálculo por fotograma como mucho).
    useEffect(() => {
        if (enHabitacion || oculto || !window.matchMedia('(pointer: fine)').matches) return;
        let raf = 0;
        const mover = (e: PointerEvent) => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                const el = botonRef.current;
                if (!el) return;
                const r = el.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2);
                const dy = e.clientY - (r.top + r.height / 2);
                setCerca(Math.hypot(dx, dy) < 190);
                let m: Mirada = dx < -70 ? -1 : dx > 70 ? 1 : 0;
                // Volteado, el dibujo está en espejo: la mirada también.
                if (ladoRef.current === 'izq') m = (m * -1) as Mirada;
                setMirada(m);
            });
        };
        window.addEventListener('pointermove', mover, { passive: true });
        return () => {
            window.removeEventListener('pointermove', mover);
            cancelAnimationFrame(raf);
        };
    }, [enHabitacion, oculto]);

    const cambiarOculto = (valor: boolean) => {
        setOculto(valor);
        try {
            localStorage.setItem(CLAVE, valor ? '1' : '0');
        } catch {
            // Sin almacenamiento: dura solo esta visita.
        }
    };

    const acariciar = () => {
        if (saltando.current) return;
        setDormido(false);
        setMimos((n) => n + 1);
        hacer('maullar', 1500);
        mostrarGlobo();
    };

    const pose: GatoPose = accion ?? (dormido ? 'dormir' : cerca ? 'alerta' : datos.pose);
    const izq = lado === 'izq';
    const deSalto = pose === 'preparar' || pose === 'saltar' || pose === 'aterrizar';
    // Sin cursor, en "mirar" observa el contenido (hacia el centro de la pantalla).
    const ojos: Mirada = mirada ?? (pose === 'mirar' ? -1 : 0);
    const muelle = reduce ? { duration: 0 } : { type: 'spring' as const, duration: 0.7, bounce: 0.25 };

    return (
        <>
            <motion.div className='pointer-events-none fixed z-30' style={{ x, y, right: margen, bottom: abajo, width: ancho }}>
                <AnimatePresence>
                    {!enHabitacion && !oculto && (
                        <motion.div key='michi' className='relative' initial={{ opacity: 0, y: 120 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 120 }} transition={muelle}>
                            <AnimatePresence mode='wait'>
                                {globo && !deSalto && (
                                    <motion.div key={escena} role='status' aria-live='polite' className={`pointer-events-auto absolute bottom-[58%] w-max max-w-[220px] rounded-[16px] bg-[#f4f1de] px-4 py-3 text-[13px] font-medium leading-snug text-[#1b1a19] shadow-[0_18px_40px_-16px_rgb(0_0_0/0.6)] sm:max-w-[250px] ${izq ? 'left-[88%] rounded-bl-[4px]' : 'right-[88%] rounded-br-[4px]'}`} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, filter: 'blur(4px)', transition: { duration: 0.15 } }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
                                        <span className='mb-1 flex items-center justify-between gap-3'>
                                            <span className='font-mono text-[10px] uppercase tracking-[0.18em] text-[#6d6a60]'>
                                                <span className='mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle' style={{ background: 'var(--brand)' }} />
                                                Michi
                                            </span>
                                            <button type='button' onClick={() => cambiarOculto(true)} className='-mr-1.5 grid h-6 w-6 place-items-center rounded-full text-[#6d6a60] transition-colors hover:bg-black/5 hover:text-[#1b1a19]' aria-label='Ocultar a Michi'>
                                                <X size={12} weight='bold' />
                                            </button>
                                        </span>
                                        {datos.mensaje}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button ref={botonRef} type='button' onClick={acariciar} className='pointer-events-auto relative block h-[100px] w-[80px] transition-transform active:scale-95 sm:h-[150px] sm:w-[120px]' aria-label='Acariciar a Michi'>
                                <motion.span className='block h-full w-full' style={{ rotate: giro, scaleY: aplastar, transformOrigin: '50% 95%' }}>
                                    <Gato pose={pose} mirada={ojos} voltear={deSalto ? rumbo === -1 : izq} mimos={mimos} className='h-full w-full' />
                                </motion.span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {!enHabitacion && oculto && (
                    <motion.button key='volver' type='button' onClick={() => cambiarOculto(false)} className='fixed bottom-3 right-3 z-30 flex h-10 items-center gap-2 rounded-full border border-line-strong bg-surface/90 pl-2 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted shadow-lg backdrop-blur transition-colors hover:text-ink sm:bottom-5 sm:right-5' initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                        <span className='grid h-6 w-6 place-items-center rounded-full' style={{ background: 'var(--brand)' }}>
                            <span className='h-2 w-2 rounded-full bg-[#1b1a19]' />
                        </span>
                        Traer a Michi
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
