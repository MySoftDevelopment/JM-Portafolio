import { Gato } from '@includes/index';
import { GatoPose, Mirada } from '@/lib/michi';
import { animate, motion, useReducedMotion } from 'motion/react';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

/*
 * La página 404: Michi se llevó la página y la convirtió en estambre.
 * El "0" del 404 es la bola, que entra rodando y deja el hilo en el suelo; Michi llega
 * de un salto siguiendo el hilo y se sienta con la pata encima. Luego, por su cuenta,
 * tira del hilo, maúlla, rueda panza arriba o se duerme si nadie hace nada.
 *
 * La escena es un SVG de 100 x 48 unidades (viewBox 0 30 100 48; el suelo está en y = 70)
 * y Michi va encima en HTML, colocado en porcentajes del mismo marco.
 */

const SALVIA = '#81b29a';
const SALVIA_OSC = '#5f8f78';

const SUELO = 70;
const BOLA = { x: 41, r: 10.5 };
const ease = [0.23, 1, 0.32, 1] as const;

// Momentos de la entrada (segundos).
const T_BOLA = 0.55;
const D_BOLA = 1.25;
const T_SALTO = 1.75;
const D_SALTO = 0.6;

const DORMIR_TRAS = 20000;

type Travesura = 'tiron' | 'maullar' | 'mirar' | 'panza';
const TRAVESURAS: Travesura[] = ['tiron', 'tiron', 'maullar', 'mirar', 'panza'];
const DURACION: Record<Travesura, number> = { tiron: 1500, maullar: 1700, mirar: 2200, panza: 2600 };

const azar = (min: number, max: number) => min + Math.random() * (max - min);

/** El hilo sale por la derecha, pasa bajo la pata de Michi y termina dentro de la bola. */
const HILO = `M106 ${SUELO - 0.4} C96 ${SUELO - 1.4} 90 ${SUELO + 0.4} 82 ${SUELO - 0.6} S66 ${SUELO - 1.6} 58 ${SUELO - 0.5} S48 ${SUELO - 1} ${BOLA.x} ${SUELO - BOLA.r}`;

function Cuatro({ x, delay, reduce }: { x: number; delay: number; reduce: boolean | null }) {
    return (
        <motion.text
            x={x}
            y={SUELO}
            textAnchor='middle'
            fontSize={30}
            fontWeight={600}
            letterSpacing={-1}
            fill='rgb(var(--ink))'
            style={{ fontFamily: '"Geist Variable", system-ui, sans-serif', transformBox: 'fill-box', transformOrigin: '50% 100%' }}
            initial={reduce ? false : { opacity: 0, transform: 'translateY(-26px) scaleY(1)' }}
            animate={{ opacity: 1, transform: ['translateY(-26px) scaleY(1)', 'translateY(0px) scaleY(0.86)', 'translateY(0px) scaleY(1)'] }}
            transition={{ delay, duration: 0.7, times: [0, 0.55, 1], ease: ['easeIn', [0.34, 1.6, 0.64, 1]], opacity: { delay, duration: 0.2 } }}
        >
            4
        </motion.text>
    );
}

/** La bola de estambre, centrada en (0, 0). */
function Estambre() {
    const r = BOLA.r;
    return (
        <g>
            <circle r={r} fill={SALVIA} />
            <g fill='none' stroke={SALVIA_OSC} strokeWidth={0.9} strokeLinecap='round'>
                <path d={`M${-r * 0.8} ${-r * 0.45} q${r * 0.8} ${r * 0.35} ${r * 1.55} ${-r * 0.2}`} />
                <path d={`M${-r * 0.98} ${r * 0.05} q${r} ${r * 0.5} ${r * 1.9} ${-r * 0.1}`} />
                <path d={`M${-r * 0.7} ${r * 0.6} q${r * 0.7} ${r * 0.25} ${r * 1.35} ${-r * 0.3}`} />
                <path d={`M${-r * 0.35} ${-r * 0.92} q${-r * 0.45} ${r * 0.95} ${r * 0.05} ${r * 1.85}`} />
                <path d={`M${r * 0.3} ${-r * 0.95} q${r * 0.5} ${r * 0.9} ${r * 0.1} ${r * 1.9}`} />
            </g>
            <circle cx={-r * 0.35} cy={-r * 0.42} r={r * 0.22} fill='#ffffff' opacity={0.22} />
        </g>
    );
}

export const NoEncontrada: FC = () => {
    const reduce = useReducedMotion();
    const [pose, setPose] = useState<GatoPose>('saltar');
    const [voltear, setVoltear] = useState(true);
    const [mirada, setMirada] = useState<Mirada>(-1);
    const [mimos, setMimos] = useState(0);
    const [listo, setListo] = useState(false);

    const bola = useRef<SVGGElement>(null);
    const michi = useRef<HTMLButtonElement>(null);
    const tPose = useRef<number>();
    const ocupado = useRef(false);
    const dormido = useRef(false);
    const actividad = useRef(Date.now());

    // Entrada: Michi salta cuando la bola ya llegó; con "reducir movimiento" ya está sentado.
    useEffect(() => {
        if (reduce) {
            setPose('sentado');
            setVoltear(false);
            setListo(true);
            return;
        }
        const t1 = window.setTimeout(() => setPose('aterrizar'), (T_SALTO + D_SALTO - 0.05) * 1000);
        const t2 = window.setTimeout(
            () => {
                setPose('sentado');
                setVoltear(false);
                setListo(true);
            },
            (T_SALTO + D_SALTO + 0.25) * 1000,
        );
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [reduce]);

    /** La bola se mueve un poco (un tirón del hilo o un empujón) y vuelve a su sitio rodando. */
    const mover = useCallback(
        (dx: number) => {
            const el = bola.current;
            if (!el || reduce) return;
            const giro = (dx / BOLA.r) * (180 / Math.PI);
            animate(el, { transform: ['translate(0px, 0px) rotate(0deg)', `translate(${dx}px, 0px) rotate(${giro}deg)`, 'translate(0px, 0px) rotate(0deg)'] }, { duration: 0.9, times: [0, 0.35, 1], ease: [ease, [0.34, 1.4, 0.64, 1]] });
        },
        [reduce],
    );

    /** Cambia la pose un rato y vuelve a sentarse. */
    const posar = useCallback((p: GatoPose, ms: number) => {
        clearTimeout(tPose.current);
        ocupado.current = true;
        setPose(p);
        tPose.current = window.setTimeout(() => {
            ocupado.current = false;
            setPose('sentado');
        }, ms);
    }, []);

    // Al aterrizar tira del hilo: la bola se mueve un poquito.
    useEffect(() => {
        if (listo) mover(2.2);
    }, [listo, mover]);

    // Travesuras por su cuenta y sueño si nadie hace nada.
    useEffect(() => {
        if (!listo || reduce) return;
        let t = 0;
        const siguiente = () => {
            t = window.setTimeout(
                () => {
                    if (Date.now() - actividad.current > DORMIR_TRAS) {
                        dormido.current = true;
                        clearTimeout(tPose.current);
                        ocupado.current = true;
                        setPose('dormir');
                    } else if (!ocupado.current && !dormido.current) {
                        const tr = TRAVESURAS[Math.floor(Math.random() * TRAVESURAS.length)];
                        if (tr === 'tiron') {
                            posar('alerta', DURACION.tiron);
                            window.setTimeout(() => mover(2.8), 450);
                        } else {
                            posar(tr, DURACION[tr]);
                        }
                    }
                    siguiente();
                },
                azar(4500, 7500),
            );
        };
        siguiente();
        return () => clearTimeout(t);
    }, [listo, reduce, mover, posar]);

    // Cualquier actividad lo despierta; los ojos siguen al cursor (solo con mouse).
    useEffect(() => {
        if (!listo) return;
        const fino = window.matchMedia('(pointer: fine)').matches;
        let raf = 0;
        const despertar = () => {
            actividad.current = Date.now();
            if (dormido.current) {
                dormido.current = false;
                posar('alerta', 1100);
            }
        };
        const alMover = (e: PointerEvent) => {
            despertar();
            if (!fino || raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                const el = michi.current;
                if (!el) return;
                const r = el.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2);
                setMirada(dx < -60 ? -1 : dx > 60 ? 1 : 0);
            });
        };
        const otros = ['keydown', 'scroll', 'touchstart'] as const;
        window.addEventListener('pointermove', alMover, { passive: true });
        otros.forEach((ev) => window.addEventListener(ev, despertar, { passive: true }));
        return () => {
            window.removeEventListener('pointermove', alMover);
            otros.forEach((ev) => window.removeEventListener(ev, despertar));
            cancelAnimationFrame(raf);
        };
    }, [listo, posar]);

    useEffect(() => () => clearTimeout(tPose.current), []);

    const acariciar = () => {
        if (!listo) return;
        actividad.current = Date.now();
        dormido.current = false;
        setMimos((n) => n + 1);
        posar('maullar', 1500);
    };

    const empujar = () => {
        if (!listo) return;
        actividad.current = Date.now();
        dormido.current = false;
        mover(-5);
        posar('alerta', 1300);
    };

    // Michi: 22 unidades de ancho (27,5 de alto), con el suelo de su dibujo (y = 144 de 150) en y = 70.
    const MICHI = { x: 74, ancho: 22, arriba: SUELO - (144 / 150) * 27.5 };

    return (
        <div className='relative mx-auto w-full max-w-[640px] [container-type:inline-size]'>
            <div className='relative aspect-[100/48]'>
                <svg viewBox='0 30 100 48' className='absolute inset-0 h-full w-full overflow-visible' aria-hidden>
                    {/* Suelo */}
                    <motion.line x1={-4} x2={104} y1={SUELO + 0.6} y2={SUELO + 0.6} stroke='rgb(var(--line-strong))' strokeWidth={0.35} strokeDasharray='1.2 1.6' initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />

                    {/* El hilo se desenrolla detrás de la bola mientras rueda */}
                    <motion.path d={HILO} fill='none' stroke={SALVIA} strokeWidth={0.55} strokeLinecap='round' initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: T_BOLA, duration: D_BOLA, ease }} />

                    <Cuatro x={17} delay={0.1} reduce={reduce} />
                    <Cuatro x={64} delay={0.24} reduce={reduce} />

                    {/* El "0": rueda desde la derecha (gira lo que avanza) */}
                    <g transform={`translate(${BOLA.x} ${SUELO - BOLA.r})`}>
                        <motion.g style={{ transformBox: 'fill-box', transformOrigin: 'center' }} initial={reduce ? false : { transform: 'translate(64px, 0px) rotate(350deg)' }} animate={{ transform: 'translate(0px, 0px) rotate(0deg)' }} transition={{ delay: T_BOLA, duration: D_BOLA, ease }}>
                            <g ref={bola} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                                <Estambre />
                            </g>
                        </motion.g>
                    </g>
                </svg>

                {/* Para empujar la bola */}
                <button
                    type='button'
                    onClick={empujar}
                    aria-label='Empujar la bola de estambre'
                    className='absolute rounded-full'
                    style={{ left: `${BOLA.x - BOLA.r}%`, width: `${BOLA.r * 2}%`, top: `${((SUELO - BOLA.r * 2 - 30) / 48) * 100}%`, height: `${((BOLA.r * 2) / 48) * 100}%` }}
                />

                {/* Michi llega de un salto desde la derecha */}
                <motion.button
                    ref={michi}
                    type='button'
                    onClick={acariciar}
                    aria-label='Acariciar a Michi'
                    className='absolute block rounded-[24px]'
                    style={{ left: `${MICHI.x}%`, width: `${MICHI.ancho}%`, top: `${((MICHI.arriba - 30) / 48) * 100}%` }}
                    initial={reduce ? false : { opacity: 0, transform: 'translate(170%, -10%)' }}
                    animate={{ opacity: 1, transform: ['translate(170%, -10%)', 'translate(80%, -55%)', 'translate(0%, 0%)'] }}
                    transition={{ delay: T_SALTO, duration: D_SALTO, times: [0, 0.45, 1], ease: ['easeOut', 'easeIn'], opacity: { delay: T_SALTO, duration: 0.15 } }}
                >
                    <Gato pose={pose} mirada={pose === 'sentado' || pose === 'mirar' ? mirada : 0} voltear={voltear} mimos={mimos} className='w-full' />
                </motion.button>
            </div>
        </div>
    );
};

/** La línea de "consola" con la ruta que se pidió. */
export const Peticion: FC = () => {
    const [ruta, setRuta] = useState('');
    useEffect(() => {
        const p = window.location.pathname;
        try {
            setRuta(decodeURI(p));
        } catch {
            setRuta(p);
        }
    }, []);

    return (
        <p className='flex max-w-full flex-wrap items-baseline gap-x-2 font-mono text-[12px] text-muted'>
            <span className='text-faint'>GET</span>
            <span className='max-w-[32ch] truncate text-ink'>{ruta || '…'}</span>
            <span className='text-faint'>→</span>
            <span className='text-accent'>404</span>
            <span>Not Found</span>
            <span aria-hidden className='inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] self-center bg-ink/70 motion-safe:animate-[titila_1.1s_steps(2,end)_infinite]' />
        </p>
    );
};
