import { Animation, Gato } from '@components/includes';
import { CATEGORIAS, Categoria, PROYECTOS, Proyecto, TONOS, Tono } from '@/data/portfolio';
import { caras, Iso, planoX, planoY, poligono, punto } from '@/lib/iso';
import { GatoPose } from '@/lib/michi';
import { ArrowUpRight, CursorClick, HandTap, LockSimple } from '@phosphor-icons/react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { CSSProperties, FC, KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react';

/*
 * "Más trabajo" es una sala isométrica, a lo Habbo pero con el estilo del portafolio:
 * cada proyecto es una nota pegada en la pared. Al pasar el mouse (o tocar) una nota, se
 * despega de la pared, aparece su nombre y el visor de al lado muestra el proyecto.
 * Los muebles se pueden usar: la lámpara se enciende, la puerta se abre y Michi se va al sofá
 * o a su camita si se los tocas.
 * La sala se dibuja con las mismas utilidades isométricas que el taller del hero (lib/iso.ts).
 */

const ease = [0.23, 1, 0.32, 1] as const;

const V: Iso = { s: 31, cx: 320, cy: 198 };
const ALTO = 6.4;
const NOTA = { w: 2.2, h: 2.65 };

// Paleta de objetos (fija en ambos temas, como en el taller).
const C = {
    crema: '#f4f1de',
    arena: '#f2cc8f',
    terra: '#e07a5f',
    salvia: '#81b29a',
    pizarra: '#3d405b',
    pizarraOsc: '#2b2d42',
    tinta: '#1b1a19',
    madera: '#b9835a',
    maderaOsc: '#8a5c3b',
};

// Cada nota es un papel del color del proyecto, con su chincheta más intensa.
const PAPEL: Record<Tono, { papel: string; chincheta: string }> = {
    accent: { papel: '#f3bba8', chincheta: '#e07a5f' },
    sand: { papel: '#f6dcab', chincheta: '#d39a3c' },
    sage: { papel: '#bfd9ca', chincheta: '#4f9474' },
    slate: { papel: '#cbcde0', chincheta: '#3d405b' },
};

type Pared = 'izq' | 'der';

/**
 * Huecos para las notas, simétricos: tres columnas por pared, a la misma distancia de la
 * esquina en las dos paredes, y filas a la misma altura. Se llenan por parejas espejadas
 * (centro, junto a la esquina, afuera) para que la pared quede siempre equilibrada.
 * En la pared izquierda `pos` es la coordenada y donde empieza la nota (avanza hacia y = 0);
 * en la derecha, la coordenada x. `z` es el borde superior.
 */
const COLUMNAS: [number, number][] = [
    [5.8, 3.6], // centro
    [3.2, 1.0], // junto a la esquina
    [8.4, 6.2], // afuera
];
const FILAS = [5.95, 3.1];
const HUECOS: { pared: Pared; pos: number; z: number }[] = FILAS.flatMap((z) =>
    COLUMNAS.flatMap(([izq, der]) => [
        { pared: 'izq' as Pared, pos: izq, z },
        { pared: 'der' as Pared, pos: der, z },
    ]),
);

type Hueco = (typeof HUECOS)[number];

const plano = (h: Hueco) => (h.pared === 'der' ? planoX(V, h.pos, 0.03, h.z) : planoY(V, 0.03, h.pos, h.z));

/** Punto de pantalla sobre el centro del borde superior de la nota (para su letrero). */
const encimaDe = (h: Hueco) => (h.pared === 'der' ? punto(V, h.pos + NOTA.w / 2, 0, h.z + 0.25) : punto(V, 0, h.pos - NOTA.w / 2, h.z + 0.25));

/** Parte el nombre en dos renglones cortos para que quepa en la nota. */
function renglones(texto: string, max = 13): string[] {
    const lineas: string[] = [];
    let actual = '';
    for (const palabra of texto.split(' ')) {
        const prueba = actual ? `${actual} ${palabra}` : palabra;
        if (prueba.length <= max || !actual) actual = prueba;
        else {
            lineas.push(actual);
            actual = palabra;
        }
    }
    lineas.push(actual);
    if (lineas.length > 2) return [lineas[0], `${lineas[1].slice(0, max - 1)}…`];
    return lineas;
}

/** Caja isométrica con sombreado (tapa clara, izquierda media, derecha oscura). */
function Caja({ x, y, z, w, d, h, tapa, izq, der, children }: { x: number; y: number; z: number; w: number; d: number; h: number; tapa: string; izq: string; der: string; children?: ReactNode }) {
    const c = caras(V, x, y, z, w, d, h);
    return (
        <g>
            <polygon points={c.der} fill={der} />
            <polygon points={c.izq} fill={izq} />
            <polygon points={c.tapa} fill={tapa} />
            {children}
        </g>
    );
}

interface NotaProps {
    p: Proyecto;
    numero: number;
    hueco: Hueco;
    activa: boolean;
    apagada: boolean;
    onActivar: () => void;
}

function Nota({ p, numero, hueco, activa, apagada, onActivar }: NotaProps) {
    const { papel, chincheta } = PAPEL[p.tono];
    const lineas = renglones(p.nombre);
    const { w, h } = NOTA;
    const foto = (w - 0.3) * 0.62;
    const resorte = 'transform 360ms cubic-bezier(0.34, 1.45, 0.64, 1), opacity 300ms ease';

    return (
        <g transform={plano(hueco)}>
            <g>
                {/* Sombra en la pared: crece cuando la nota se despega */}
                <rect x={0.05} y={0.08} width={w} height={h} rx={0.05} fill='#000000' style={{ opacity: apagada ? 0.05 : activa ? 0.3 : 0.16, transform: activa ? 'translate(0.14px, 0.2px)' : 'none', transition: resorte }} />

                <g role='button' tabIndex={apagada ? -1 : 0} aria-label={`${p.nombre}, ${p.tipo}`} aria-pressed={activa} aria-disabled={apagada} className={`nota outline-none ${apagada ? '' : 'cursor-pointer'}`} onPointerEnter={() => !apagada && onActivar()} onFocus={() => !apagada && onActivar()} onClick={() => !apagada && onActivar()} style={{ transform: activa ? 'translate(-0.05px, -0.12px) scale(1.07)' : 'none', transformOrigin: `${w / 2}px 0px`, transformBox: 'view-box', transition: resorte, opacity: apagada ? 0.28 : 1 }}>
                    <rect width={w} height={h} rx={0.05} fill={papel} />
                    <rect x={0} y={h - 0.5} width={w} height={0.5} rx={0.05} fill='#000000' opacity={0.04} />

                    {/* Miniatura: captura del sitio o icono de la app */}
                    <rect x={0.15} y={0.24} width={w - 0.3} height={foto} rx={0.03} fill={C.tinta} />
                    {p.variante === 'imagen' ? (
                        <image href={p.imagen} x={0.15} y={0.24} width={w - 0.3} height={foto} preserveAspectRatio='xMidYMin slice' />
                    ) : (
                        <>
                            <rect x={0.15} y={0.24} width={w - 0.3} height={foto} rx={0.03} fill={chincheta} opacity={0.35} />
                            <image href={p.imagen} x={w / 2 - 0.45} y={0.24 + foto / 2 - 0.45} width={0.9} height={0.9} />
                        </>
                    )}

                    {lineas.map((l, i) => (
                        <text key={i} x={0.15} y={0.24 + foto + 0.34 + i * 0.27} fontFamily='"Geist Variable", sans-serif' fontWeight={650} fontSize={0.21} fill={C.tinta}>
                            {l}
                        </text>
                    ))}
                    <text x={w - 0.14} y={h - 0.12} textAnchor='end' fontFamily='"Geist Mono Variable", monospace' fontSize={0.13} fill={C.tinta} opacity={0.55}>
                        {String(numero).padStart(2, '0')}
                    </text>

                    {/* Chincheta */}
                    <circle cx={w / 2} cy={0.07} r={0.12} fill={chincheta} style={{ transform: activa ? 'translateY(-0.03px)' : 'none', transition: resorte }} />
                    <circle cx={w / 2 - 0.035} cy={0.035} r={0.04} fill='#ffffff' opacity={0.6} />

                    {/* Marco de foco para teclado */}
                    <rect className='nota-foco' x={-0.08} y={-0.08} width={w + 0.16} height={h + 0.16} rx={0.1} fill='none' stroke={C.arena} strokeWidth={0.05} />
                </g>
            </g>
        </g>
    );
}

/** Letrero legible (sin deformar) que flota sobre algo, como el nombre de un mueble en Habbo. */
function Etiqueta({ x, y, texto, color, id }: { x: number; y: number; texto: string; color: string; id: string }) {
    const ancho = texto.length * 6.3 + 30;
    return (
        <g transform={`translate(${x.toFixed(1)} ${(y - 16).toFixed(1)})`} className='pointer-events-none'>
            <g key={id} className='etiqueta-sala'>
                <rect x={-ancho / 2} y={-14} width={ancho} height={22} rx={11} fill={C.tinta} stroke='rgb(255 255 255 / 0.14)' />
                <path d='M-5 8 L0 13 L5 8 Z' fill={C.tinta} />
                <circle cx={-ancho / 2 + 12} cy={-3} r={3.2} fill={color} />
                <text x={-ancho / 2 + 21} y={1} fontFamily='"Geist Variable", sans-serif' fontWeight={600} fontSize={11} fill={C.crema}>
                    {texto}
                </text>
            </g>
        </g>
    );
}

/** Nota libre que completa la simetría: invita a escribir y lleva a Contacto. */
function NotaLibre({ hueco, onEncima }: { hueco: Hueco; onEncima: (v: boolean) => void }) {
    const { w, h } = NOTA;
    return (
        <g transform={plano(hueco)}>
            <a href='#contacto' aria-label='¿Tu proyecto? Escríbeme' className='nota-libre' onPointerEnter={() => onEncima(true)} onPointerLeave={() => onEncima(false)} onFocus={() => onEncima(true)} onBlur={() => onEncima(false)}>
                <rect width={w} height={h} rx={0.06} fill='rgb(var(--ink) / 0.04)' stroke='rgb(var(--ink) / 0.35)' strokeWidth={0.04} strokeDasharray='0.14 0.1' />
                <g className='nota-libre-mas'>
                    <circle cx={w / 2} cy={0.95} r={0.38} fill='none' stroke='var(--brand, #e07a5f)' strokeWidth={0.05} />
                    <path d={`M${w / 2 - 0.16} 0.95 h0.32 M${w / 2} 0.79 v0.32`} stroke='var(--brand, #e07a5f)' strokeWidth={0.06} strokeLinecap='round' />
                </g>
                <text x={w / 2} y={1.75} textAnchor='middle' fontFamily='"Geist Variable", sans-serif' fontWeight={650} fontSize={0.21} fill='rgb(var(--ink))'>
                    ¿Tu proyecto?
                </text>
                <text x={w / 2} y={2.05} textAnchor='middle' fontFamily='"Geist Mono Variable", monospace' fontSize={0.14} letterSpacing={0.01} fill='rgb(var(--muted))'>
                    ESCRÍBEME
                </text>
            </a>
        </g>
    );
}

type Sitio = 'alfombra' | 'sofa' | 'cama';

// Dónde se pone Michi (coordenadas isométricas del suelo o del asiento) y qué hace allí.
const SITIOS: Record<Sitio, { punto: [number, number, number]; pose: GatoPose; texto: string }> = {
    alfombra: { punto: [6.1, 7.0, 0], pose: 'sentado', texto: 'Alfombra' },
    sofa: { punto: [0.95, 6.9, 0.62], pose: 'dormir', texto: 'Sofá' },
    cama: { punto: [8.2, 8.3, 0.05], pose: 'panza', texto: 'Camita de Michi' },
};

/** Props para que un mueble se pueda usar con mouse, toque y teclado. */
const usable = (accion: () => void, etiqueta: string) => ({
    role: 'button',
    tabIndex: 0,
    'aria-label': etiqueta,
    className: 'mueble cursor-pointer outline-none',
    onClick: accion,
    onKeyDown: (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            accion();
        }
    },
});

/** La sala: paredes, piso de baldosas, muebles que se usan, Michi y las notas de los proyectos. */
function Sala({ activo, visibles, onActivar }: { activo: Proyecto; visibles: Set<string>; onActivar: (p: Proyecto) => void }) {
    const reduce = useReducedMotion();
    const suelo = caras(V, 0, 0, -0.6, 10, 10, 0.6);
    const [luz, setLuz] = useState(true);
    const [puerta, setPuerta] = useState(false);
    const [sitio, setSitio] = useState<Sitio>('alfombra');
    const [viajando, setViajando] = useState<false | 'izq' | 'der'>(false);
    const [accion, setAccion] = useState<GatoPose | null>(null);
    const [mimos, setMimos] = useState(0);
    const [encima, setEncima] = useState<string | null>(null);
    const temporizador = useRef<number>();
    const tMomento = useRef<number>();
    const enViaje = useRef(false);

    useEffect(
        () => () => {
            window.clearTimeout(temporizador.current);
            window.clearTimeout(tMomento.current);
        },
        [],
    );

    // Un gesto corto (maullar, ponerse alerta). Nunca interrumpe un viaje.
    const momento = (pose: GatoPose, ms: number) => {
        if (enViaje.current) return;
        window.clearTimeout(tMomento.current);
        setAccion(pose);
        tMomento.current = window.setTimeout(() => setAccion((a) => (a === pose ? null : a)), ms);
    };

    // Michi salta hasta el mueble: se agacha, vuela en arco y se acomoda.
    const irA = (destino: Sitio) => {
        if (destino === sitio || enViaje.current) return;
        const [ax] = punto(V, ...SITIOS[sitio].punto);
        const [bx] = punto(V, ...SITIOS[destino].punto);
        window.clearTimeout(tMomento.current);
        setAccion(null);
        if (reduce) {
            setSitio(destino);
            return;
        }
        enViaje.current = true;
        setViajando(bx < ax ? 'izq' : 'der');
        setAccion('preparar');
        temporizador.current = window.setTimeout(() => {
            setAccion('saltar');
            setSitio(destino);
            temporizador.current = window.setTimeout(() => {
                setAccion('aterrizar');
                temporizador.current = window.setTimeout(() => {
                    setAccion(null);
                    setViajando(false);
                    enViaje.current = false;
                }, 380);
            }, 750);
        }, 450);
    };

    const abrirPuerta = () => {
        setPuerta((v) => !v);
        // Un ruido en la puerta: Michi se pone alerta (si no está de viaje).
        if (!puerta) momento('alerta', 2600);
    };

    const [mx, my] = punto(V, ...SITIOS[sitio].punto);
    const poseMichi: GatoPose = accion ?? SITIOS[sitio].pose;
    const voltearMichi = viajando ? viajando === 'izq' : false;

    // Letrero: la nota activa, la nota libre o el mueble bajo el mouse.
    const huecoActivo = HUECOS[PROYECTOS.indexOf(activo)];
    const libre = PROYECTOS.length % 2 === 1 ? HUECOS[PROYECTOS.length] : null;
    const letrero = (() => {
        if (encima === 'libre' && libre) {
            const [x, y] = encimaDe(libre);
            return { x, y, texto: 'Tu proyecto aquí', color: 'var(--brand, #e07a5f)', id: 'libre' };
        }
        if (encima && encima in MUEBLES) {
            const m = MUEBLES[encima];
            const [x, y] = punto(V, ...m.punto);
            return { x, y, texto: m.texto(luz, puerta), color: C.arena, id: encima };
        }
        if (huecoActivo && visibles.has(activo.id)) {
            const [x, y] = encimaDe(huecoActivo);
            return { x, y, texto: activo.nombre, color: PAPEL[activo.tono].chincheta, id: activo.id };
        }
        return null;
    })();

    const sobre = (id: string) => ({ onPointerEnter: () => setEncima(id), onPointerLeave: () => setEncima((e) => (e === id ? null : e)) });

    return (
        <svg viewBox='0 0 640 545' className='taller h-auto w-full' role='group' aria-label='Sala de proyectos: cada nota de la pared es un proyecto y los muebles se pueden usar'>
            <defs>
                <radialGradient id='sala-lampara' cx='50%' cy='50%' r='50%'>
                    <stop offset='0%' stopColor={C.arena} stopOpacity='0.4' />
                    <stop offset='100%' stopColor={C.arena} stopOpacity='0' />
                </radialGradient>
                <linearGradient id='sala-pasillo' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='#f2cc8f' stopOpacity='0.55' />
                    <stop offset='100%' stopColor='#f2cc8f' stopOpacity='0.15' />
                </linearGradient>
            </defs>

            {/* Paredes */}
            <polygon
                points={poligono(V, [
                    [0, 0, 0],
                    [0, 10, 0],
                    [0, 10, ALTO],
                    [0, 0, ALTO],
                ])}
                fill='rgb(var(--surface))'
            />
            <polygon
                points={poligono(V, [
                    [0, 0, 0],
                    [10, 0, 0],
                    [10, 0, ALTO],
                    [0, 0, ALTO],
                ])}
                fill='rgb(var(--surface-2))'
            />
            <polyline
                points={poligono(V, [
                    [0, 10, ALTO],
                    [0, 0, ALTO],
                    [10, 0, ALTO],
                ])}
                fill='none'
                stroke='rgb(var(--line-strong))'
                strokeWidth={2}
            />
            <polyline
                points={poligono(V, [
                    [0, 0, 0],
                    [0, 0, ALTO],
                ])}
                fill='none'
                stroke='rgb(var(--line-strong))'
                strokeWidth={1}
            />
            <polygon
                points={poligono(V, [
                    [0, 0, 0],
                    [10, 0, 0],
                    [10, 0, 0.35],
                    [0, 0, 0.35],
                ])}
                fill='rgb(var(--raised))'
            />
            <polygon
                points={poligono(V, [
                    [0, 0, 0],
                    [0, 10, 0],
                    [0, 10, 0.35],
                    [0, 0, 0.35],
                ])}
                fill='rgb(var(--raised))'
            />

            {/* Luz de la lámpara sobre la pared izquierda */}
            <polygon
                points={poligono(V, [
                    [0, 10, 0],
                    [0, 7.4, 0],
                    [0, 7.4, ALTO],
                    [0, 10, ALTO],
                ])}
                fill={C.arena}
                style={{ opacity: luz ? 0.06 : 0, transition: 'opacity 400ms ease' }}
            />

            {/* Reloj, al fondo de la pared izquierda */}
            <g transform={planoY(V, 0.02, 9.85, 5.65)}>
                <circle cx={0.5} cy={0.5} r={0.42} fill={C.crema} stroke={C.madera} strokeWidth={0.08} />
                <g stroke={C.tinta} strokeLinecap='round'>
                    <line x1={0.5} y1={0.5} x2={0.5} y2={0.24} strokeWidth={0.05} className='giro' style={{ animationDuration: '60s', transformOrigin: '0.5px 0.5px', transformBox: 'view-box' }} />
                    <line x1={0.5} y1={0.5} x2={0.69} y2={0.5} strokeWidth={0.07} />
                </g>
                <circle cx={0.5} cy={0.5} r={0.04} fill={C.terra} />
            </g>

            {/* Puerta: se abre hacia la sala */}
            <g {...usable(abrirPuerta, puerta ? 'Cerrar la puerta' : 'Abrir la puerta')} {...sobre('puerta')}>
                <g transform={planoX(V, 8.65, 0.02, 3.5)}>
                    <rect x={0} y={0} width={1.25} height={3.5} rx={0.05} fill={C.madera} />
                    {/* Hueco de la puerta: pasillo iluminado cuando está abierta */}
                    <rect x={0.1} y={0.1} width={1.05} height={3.4} rx={0.03} fill='#0d0e14' />
                    <rect x={0.1} y={0.1} width={1.05} height={3.4} rx={0.03} fill='url(#sala-pasillo)' style={{ opacity: puerta ? 1 : 0, transition: 'opacity 400ms ease' }} />
                    {/* Hoja cerrada */}
                    <g style={{ opacity: puerta ? 0 : 1, transition: 'opacity 250ms ease' }}>
                        <rect x={0.1} y={0.1} width={1.05} height={3.4} rx={0.03} fill={C.pizarraOsc} />
                        <rect x={0.22} y={0.28} width={0.81} height={1.1} rx={0.04} fill='#ffffff' opacity={0.05} />
                        <rect x={0.22} y={1.62} width={0.81} height={1.6} rx={0.04} fill='#ffffff' opacity={0.03} />
                        <circle cx={0.98} cy={1.95} r={0.07} fill={C.arena} />
                    </g>
                </g>
                {/* Hoja abierta: gira sobre la bisagra y queda perpendicular a la pared */}
                <g transform={planoY(V, 8.75, 1.05, 3.4)} style={{ opacity: puerta ? 1 : 0, transition: 'opacity 250ms ease' }}>
                    <rect x={0} y={0} width={1.03} height={3.4} rx={0.03} fill={C.pizarra} />
                    <rect x={0.12} y={0.18} width={0.79} height={1.1} rx={0.04} fill='#ffffff' opacity={0.06} />
                    <circle cx={0.15} cy={1.85} r={0.07} fill={C.arena} />
                </g>
            </g>

            {/* Notas de los proyectos (y la libre, si hace falta para la simetría) */}
            {PROYECTOS.slice(0, HUECOS.length).map((p, i) => (
                <Nota key={p.id} p={p} numero={i + 1} hueco={HUECOS[i]} activa={p.id === activo.id} apagada={!visibles.has(p.id)} onActivar={() => onActivar(p)} />
            ))}
            {libre && <NotaLibre hueco={libre} onEncima={(v) => setEncima(v ? 'libre' : null)} />}

            {/* Piso de baldosas */}
            <polygon points={suelo.der} fill='rgb(var(--line-strong))' />
            <polygon points={suelo.izq} fill='rgb(var(--line))' />
            <polygon points={suelo.tapa} fill='rgb(var(--raised))' />
            {Array.from({ length: 10 }).map((_, i) =>
                Array.from({ length: 10 }).map((__, j) =>
                    (i + j) % 2 === 0 ? (
                        <polygon
                            key={`${i}-${j}`}
                            points={poligono(V, [
                                [i, j, 0],
                                [i + 1, j, 0],
                                [i + 1, j + 1, 0],
                                [i, j + 1, 0],
                            ])}
                            fill='rgb(var(--ink) / 0.025)'
                        />
                    ) : null,
                ),
            )}
            <g stroke='rgb(var(--ink) / 0.05)' strokeWidth={1}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <g key={i}>
                        <polyline
                            points={poligono(V, [
                                [i + 1, 0, 0],
                                [i + 1, 10, 0],
                            ])}
                        />
                        <polyline
                            points={poligono(V, [
                                [0, i + 1, 0],
                                [10, i + 1, 0],
                            ])}
                        />
                    </g>
                ))}
            </g>
            {/* Luz que entra por la puerta abierta */}
            <polygon
                points={poligono(V, [
                    [8.65, 0, 0.01],
                    [9.9, 0, 0.01],
                    [10, 2.6, 0.01],
                    [8.2, 2.6, 0.01],
                ])}
                fill={C.arena}
                style={{ opacity: puerta ? 0.12 : 0, transition: 'opacity 400ms ease' }}
            />

            {/* Alfombra: tócala para llamar a Michi */}
            <g {...usable(() => irA('alfombra'), 'Llamar a Michi a la alfombra')} {...sobre('alfombra')}>
                <polygon
                    points={poligono(V, [
                        [2.6, 3.4, 0.01],
                        [7.6, 3.4, 0.01],
                        [7.6, 7.8, 0.01],
                        [2.6, 7.8, 0.01],
                    ])}
                    fill={C.terra}
                    opacity={0.2}
                />
                <polygon
                    points={poligono(V, [
                        [2.9, 3.7, 0.02],
                        [7.3, 3.7, 0.02],
                        [7.3, 7.5, 0.02],
                        [2.9, 7.5, 0.02],
                    ])}
                    fill='none'
                    stroke={C.arena}
                    strokeOpacity={0.45}
                    strokeWidth={1.2}
                    strokeDasharray='4 4'
                />
            </g>

            {/* Planta en la esquina */}
            <Caja x={0.5} y={0.5} z={0} w={0.85} d={0.85} h={0.75} tapa='#c9744f' izq={C.terra} der='#b95c43' />
            {(() => {
                const [px, py] = punto(V, 0.92, 0.92, 0.75);
                return (
                    <g className='respira' style={{ animationDuration: '5s' }}>
                        <ellipse cx={px - 10} cy={py - 15} rx={7} ry={16} fill={C.salvia} transform={`rotate(-28 ${px - 10} ${py - 15})`} />
                        <ellipse cx={px + 10} cy={py - 16} rx={7} ry={17} fill='#6ea088' transform={`rotate(26 ${px + 10} ${py - 16})`} />
                        <ellipse cx={px} cy={py - 24} rx={7.5} ry={19} fill={C.salvia} />
                    </g>
                );
            })()}

            {/* Sofá contra la pared izquierda: tócalo y Michi se acuesta allí */}
            <g {...usable(() => irA('sofa'), 'Mandar a Michi al sofá')} {...sobre('sofa')}>
                <Caja x={0.15} y={5.1} z={0} w={1.6} d={3.3} h={0.62} tapa={C.pizarra} izq={C.pizarraOsc} der='#20222f' />
                <Caja x={0.15} y={5.1} z={0.62} w={0.45} d={3.3} h={0.85} tapa={C.pizarra} izq={C.pizarraOsc} der='#20222f' />
                <Caja x={0.6} y={5.1} z={0.62} w={1.15} d={0.4} h={0.42} tapa={C.pizarra} izq={C.pizarraOsc} der='#20222f' />
                <Caja x={0.6} y={8.0} z={0.62} w={1.15} d={0.4} h={0.42} tapa={C.pizarra} izq={C.pizarraOsc} der='#20222f' />
                <Caja x={0.62} y={5.55} z={0.62} w={1.08} d={1.2} h={0.12} tapa='#545779' izq='#45486a' der='#383a55' />
                <Caja x={0.62} y={6.8} z={0.62} w={1.08} d={1.15} h={0.12} tapa='#545779' izq='#45486a' der='#383a55' />
                <Caja x={0.62} y={5.6} z={0.74} w={0.36} d={0.7} h={0.55} tapa='#ea9478' izq={C.terra} der='#b95c43' />
            </g>

            {/* Lámpara de pie: tócala para encenderla o apagarla */}
            {(() => {
                const [bx, by] = punto(V, 1.1, 9.1, 0);
                const [tx, ty] = punto(V, 1.1, 9.1, 3.1);
                return (
                    <g {...usable(() => setLuz((v) => !v), luz ? 'Apagar la lámpara' : 'Encender la lámpara')} {...sobre('lampara')}>
                        <circle cx={tx} cy={ty + 6} r={58} fill='url(#sala-lampara)' style={{ opacity: luz ? 1 : 0, transition: 'opacity 400ms ease' }} />
                        <ellipse cx={bx} cy={by} rx={11} ry={5} fill={C.pizarraOsc} />
                        <line x1={bx} y1={by} x2={tx} y2={ty} stroke={C.pizarra} strokeWidth={3} />
                        <path d={`M${tx - 14} ${ty + 6} L${tx - 8} ${ty - 12} L${tx + 8} ${ty - 12} L${tx + 14} ${ty + 6} Z`} style={{ fill: luz ? C.arena : '#8f7a57', transition: 'fill 300ms ease' }} />
                        <ellipse cx={tx} cy={ty + 6} rx={14} ry={3.5} style={{ fill: luz ? '#ffe8b8' : '#5d5446', transition: 'fill 300ms ease' }} />
                        <rect x={tx - 18} y={ty - 16} width={36} height={by - ty + 22} fill='transparent' />
                    </g>
                );
            })()}

            {/* Mesa de centro con libretas y una taza */}
            <Caja x={4.3} y={4.7} z={0} w={1.8} d={1.3} h={0.55} tapa={C.madera} izq={C.maderaOsc} der='#6f4a30' />
            <Caja x={4.6} y={5} z={0.55} w={0.7} d={0.55} h={0.08} tapa={C.arena} izq='#d9b277' der='#c19a62' />
            <Caja x={4.68} y={5.05} z={0.63} w={0.62} d={0.48} h={0.06} tapa={PAPEL.sage.papel} izq='#a7c6b5' der='#93b3a2' />
            <Caja x={5.6} y={5.3} z={0.55} w={0.3} d={0.3} h={0.32} tapa={C.crema} izq='#e3dfc6' der='#cbc6ab' />

            {/* Puffs */}
            <Caja x={3.2} y={6.5} z={0} w={0.95} d={0.95} h={0.55} tapa='#94c2ab' izq={C.salvia} der='#5f8f78' />
            <Caja x={6.6} y={3.9} z={0} w={0.95} d={0.95} h={0.55} tapa='#ea9478' izq={C.terra} der='#b95c43' />

            {/* Camita de Michi, con su estambre: tócala y va a jugar allí */}
            {(() => {
                const [cx, cy] = punto(V, 8.2, 8.3, 0);
                return (
                    <g {...usable(() => irA('cama'), 'Mandar a Michi a su camita')} {...sobre('cama')}>
                        <ellipse cx={cx} cy={cy} rx={32} ry={15} fill={C.pizarra} />
                        <ellipse cx={cx} cy={cy - 3} rx={25} ry={10.5} fill={C.pizarraOsc} />
                        <ellipse cx={cx} cy={cy - 2} rx={19} ry={7.5} fill={C.terra} opacity={0.55} />
                        <circle cx={cx + 34} cy={cy + 9} r={7} fill={C.salvia} />
                        <path d={`M${cx + 29} ${cy + 6} q5 2 10 -2 M${cx + 28} ${cy + 10} q6 3 12 -1`} stroke='#5f8f78' strokeWidth={1.2} fill='none' strokeLinecap='round' />
                    </g>
                );
            })()}

            {/* Michi: viaja entre la alfombra, el sofá y su camita. Tócalo y maúlla. */}
            <g style={{ transform: `translate(${mx.toFixed(1)}px, ${my.toFixed(1)}px)`, transition: reduce ? 'none' : 'transform 750ms cubic-bezier(0.45, 0, 0.55, 1)' }}>
                <g className={accion === 'saltar' ? 'sala-vuelo' : ''}>
                    <svg x={-52} y={-125} width={104} height={130} viewBox='0 0 120 150' overflow='visible' className='pointer-events-none'>
                        <Gato pose={poseMichi} voltear={voltearMichi} mimos={mimos} />
                    </svg>
                </g>
                <rect
                    x={-30}
                    y={-108}
                    width={60}
                    height={110}
                    fill='transparent'
                    {...usable(() => {
                        if (enViaje.current) return;
                        setMimos((n) => n + 1);
                        momento('maullar', 1500);
                    }, 'Acariciar a Michi')}
                />
            </g>

            {/* Letrero flotante */}
            {letrero && <Etiqueta {...letrero} />}
        </svg>
    );
}

// Muebles con letrero al pasar el mouse (el texto cambia con su estado).
const MUEBLES: Record<string, { punto: [number, number, number]; texto: (luz: boolean, puerta: boolean) => string }> = {
    lampara: { punto: [1.1, 9.1, 3.6], texto: (luz) => (luz ? 'Apagar la lámpara' : 'Encender la lámpara') },
    puerta: { punto: [9.27, 0, 3.75], texto: (_, puerta) => (puerta ? 'Cerrar la puerta' : 'Abrir la puerta') },
    sofa: { punto: [0.9, 6.75, 1.7], texto: () => 'Mandar a Michi al sofá' },
    cama: { punto: [8.2, 8.3, 0.9], texto: () => 'Mandar a Michi a su camita' },
    alfombra: { punto: [5.1, 5.6, 1.2], texto: () => 'Llamar a Michi' },
};

/** Sombra difusa bajo los objetos del escenario. */
function Piso() {
    return <span className='absolute bottom-[42px] left-1/2 h-3 w-24 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(0_0_0/0.45),transparent)]' aria-hidden />;
}

/** Parte superior del visor: rejilla de puntos y la ilustración del proyecto. */
function Escenario({ p }: { p: Proyecto }) {
    if (p.variante === 'imagen') {
        // La captura asoma desde abajo como una ventana.
        return (
            <div className='stage encendido h-[232px] px-6 pt-7'>
                <div className='overflow-hidden rounded-t-[12px] border border-b-0 border-line-strong bg-surface shadow-[0_-12px_40px_-20px_rgb(0_0_0/0.5)]'>
                    <div className='flex items-center gap-1 border-b border-line px-3 py-2'>
                        <span className='h-1.5 w-1.5 rounded-full bg-line-strong' />
                        <span className='h-1.5 w-1.5 rounded-full bg-line-strong' />
                        <span className='h-1.5 w-1.5 rounded-full bg-line-strong' />
                    </div>
                    <img src={p.imagen} alt={p.alt} width={1280} height={800} loading='lazy' className='aspect-[16/10] w-full object-cover object-top' />
                </div>
            </div>
        );
    }

    return (
        <div className='stage encendido grid h-[232px] place-items-center'>
            <img src={p.imagen} alt={p.alt} width={88} height={88} loading='lazy' className='relative z-[1] h-[88px] w-[88px] rounded-[24px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]' />
            <Piso />
        </div>
    );
}

/** El visor muestra el proyecto de la nota activa. */
function Visor({ p }: { p: Proyecto }) {
    const tono = TONOS[p.tono];
    const numero = PROYECTOS.indexOf(p) + 1;
    const dominio = p.url ? new URL(p.url).hostname.replace(/^www\./, '') : '';

    return (
        <article className='card flex h-full flex-col' style={{ '--tono': tono.var } as CSSProperties} aria-live='polite'>
            <Escenario p={p} />

            <div className='grid grid-cols-[auto_1fr] items-start gap-3 border-t border-line px-6 pt-5'>
                <span className={`pt-1 font-mono text-[11px] tracking-wide ${tono.texto}`}>{String(numero).padStart(2, '0')}</span>
                <div className='min-w-0'>
                    <h3 className='text-lg font-semibold leading-snug tracking-tight'>{p.nombre}</h3>
                    <p className='mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint'>{p.tipo}</p>
                </div>
            </div>

            <div className='flex flex-1 flex-col px-6 pb-6 pt-3'>
                <p className='text-[15px] leading-relaxed text-muted'>{p.texto}</p>
                <ul className='mt-4 flex flex-wrap gap-1.5' aria-label='Tecnologías'>
                    {p.stack.map((s) => (
                        <li key={s} className='chip'>
                            {s}
                        </li>
                    ))}
                </ul>
                <div className='mt-6'>
                    {p.url ? (
                        <a href={p.url} target='_blank' rel='noopener noreferrer' className='btn-ghost h-9 px-4'>
                            {dominio}
                            <ArrowUpRight size={14} weight='bold' />
                        </a>
                    ) : (
                        <span className='inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-line px-3 font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint' title={p.insignia ? undefined : 'Sistema interno de un cliente'}>
                            {!p.insignia && <LockSimple size={12} weight='bold' />}
                            {p.insignia ?? 'Privado'}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}

export const MoreProjects: FC = () => {
    const [filtro, setFiltro] = useState<Categoria | 'todos'>('todos');
    const [elegido, setElegido] = useState<Proyecto>(PROYECTOS[0]);
    const reduce = useReducedMotion();
    const visibles = PROYECTOS.filter((p) => filtro === 'todos' || p.categoria === filtro);
    const cuantos = (id: Categoria | 'todos') => (id === 'todos' ? PROYECTOS.length : PROYECTOS.filter((p) => p.categoria === id).length);
    // Si el filtro esconde la nota elegida, el visor pasa a la primera que sigue a la vista.
    const activo = visibles.includes(elegido) ? elegido : (visibles[0] ?? PROYECTOS[0]);

    return (
        <section aria-labelledby='mas-proyectos' data-escena='mas' className='pb-24 md:pb-36'>
            <div className='container-page'>
                <Animation className='mb-8 flex flex-col gap-6 border-b border-line pb-6 md:flex-row md:items-end md:justify-between'>
                    <div>
                        <h2 id='mas-proyectos' className='text-3xl font-semibold tracking-[-0.03em] md:text-[2.6rem]'>
                            Más trabajo
                        </h2>
                        <p className='mt-2 text-muted'>Tiendas, sitios institucionales y apps, pegados en la pared de la sala.</p>
                    </div>

                    {/* Filtro: la pastilla activa se desliza entre opciones (layoutId). */}
                    <LayoutGroup id='filtro-proyectos'>
                        <div role='tablist' aria-label='Filtrar proyectos' className='flex gap-1 self-start overflow-x-auto rounded-full border border-line bg-surface/60 p-1 md:self-auto'>
                            {CATEGORIAS.map((c) => {
                                const sel = filtro === c.id;
                                return (
                                    <button key={c.id} type='button' role='tab' aria-selected={sel} onClick={() => setFiltro(c.id)} className={`relative h-9 shrink-0 rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 active:scale-[0.97] ${sel ? 'text-canvas' : 'text-muted hover:text-ink'}`}>
                                        {sel && <motion.span layoutId='pastilla' className='absolute inset-0 rounded-full bg-ink' transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0.15 }} />}
                                        <span className='relative'>
                                            {c.texto} <span className={sel ? 'text-canvas/60' : 'text-faint'}>{cuantos(c.id)}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </LayoutGroup>
                </Animation>

                <div className='grid items-start gap-8 lg:grid-cols-12 lg:gap-10'>
                    <Animation className='lg:col-span-7'>
                        <Sala activo={activo} visibles={new Set(visibles.map((p) => p.id))} onActivar={setElegido} />
                        <p className='mt-2 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint'>
                            <span className='hidden items-center gap-2 [@media(hover:hover)]:inline-flex'>
                                <CursorClick size={14} /> Pasa el mouse por una nota
                            </span>
                            <span className='inline-flex items-center gap-2 [@media(hover:hover)]:hidden'>
                                <HandTap size={14} /> Toca una nota para verla
                            </span>
                        </p>
                    </Animation>

                    <div className='lg:sticky lg:top-28 lg:col-span-5'>
                        <AnimatePresence mode='wait' initial={false}>
                            <motion.div key={activo.id} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, transition: { duration: 0.12 } }} transition={{ duration: 0.28, ease }}>
                                <Visor p={activo} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
