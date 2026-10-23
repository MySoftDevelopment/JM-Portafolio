import { Gato } from '@components/includes';
import { caras, Iso, planoX, planoY, poligono, punto } from '@/lib/iso';
import { GatoPose } from '@/lib/michi';
import { useReducedMotion } from 'motion/react';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

/*
 * El taller de Juan: diorama isométrico dibujado con código (ver lib/iso.ts).
 * Suelo de 10 x 10 unidades con dos paredes: un estudio acogedor con escritorio, servidor,
 * banca bajo la ventana, rascador y las cosas de Michi, más detalles vivos. Paredes y suelo usan los tokens del tema; los objetos, la paleta Atelier
 * con acentos neón tomados de los proyectos de Juan.
 */

const V: Iso = { s: 31.5, cx: 330, cy: 206 };
const ALTO = 6;

// Paleta de objetos (fija en ambos temas, como un juguete).
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
    neonCian: '#3cc8e6',
    neonVerde: '#25d366',
    neonVioleta: '#b25ee0',
};

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

/** Círculo sobre el suelo (en proyección isométrica), para la alfombra. */
const circulo = (cx: number, cy: number, r: number) =>
    Array.from({ length: 48 }, (_, i) => {
        const a = (i / 48) * Math.PI * 2;
        return punto(V, cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0.01)
            .map((n) => n.toFixed(1))
            .join(',');
    }).join(' ');

// Rutina de Michi en el taller: juega con el estambre, se pone alerta, maúlla y rueda panza arriba.
const RUTINA: [GatoPose, number][] = [
    ['jugar', 6400],
    ['sentado', 2200],
    ['alerta', 2600],
    ['maullar', 1600],
    ['sentado', 2400],
    ['panza', 4400],
];

/** Michi sobre la alfombra (en el sitio que tenía Bit); al tocarlo maúlla y suelta corazones. */
function MichiTaller({ x, y, activo }: { x: number; y: number; activo: boolean }) {
    const reduce = useReducedMotion();
    const [paso, setPaso] = useState(0);
    const [mimos, setMimos] = useState(0);
    const [maullido, setMaullido] = useState(false);

    useEffect(() => {
        if (reduce || !activo) return;
        const id = window.setTimeout(() => setPaso((p) => (p + 1) % RUTINA.length), RUTINA[paso][1]);
        return () => window.clearTimeout(id);
    }, [paso, reduce, activo]);

    useEffect(() => {
        if (!maullido) return;
        const id = window.setTimeout(() => setMaullido(false), 1500);
        return () => window.clearTimeout(id);
    }, [maullido, mimos]);

    const pose = maullido ? 'maullar' : RUTINA[paso][0];

    return (
        <g>
            <ellipse cx={x} cy={y} rx={32} ry={10} fill='#000000' opacity={0.3} />
            <svg x={x - 68} y={y - 166} width={136} height={170} viewBox='0 0 120 150' overflow='visible'>
                <Gato pose={pose} mimos={mimos} sinSombra />
            </svg>
            <rect
                x={x - 45}
                y={y - 152}
                width={90}
                height={154}
                fill='transparent'
                className='cursor-pointer'
                onClick={() => {
                    setMimos((n) => n + 1);
                    setMaullido(true);
                }}
            />
        </g>
    );
}

export const Workshop: FC = () => {
    const ref = useRef<SVGSVGElement>(null);
    const [visible, setVisible] = useState(true);

    // Congela las animaciones cuando el taller sale de pantalla.
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const suelo = caras(V, 0, 0, -0.7, 10, 10, 0.7);
    const [rx, ry] = punto(V, 5.6, 6.2, 0);

    return (
        <svg ref={ref} viewBox='0 0 660 560' className={`taller h-auto w-full ${visible ? '' : 'pausado'}`} role='img' aria-label='Ilustración del taller de Juan: Michi, un gato naranja, juega con su estambre sobre la alfombra, entre el escritorio con el monitor, el servidor, la ventana, el rascador y el tablero de GitHub.'>
            <defs>
                <filter id='taller-neon' x='-50%' y='-50%' width='200%' height='200%'>
                    <feGaussianBlur stdDeviation='2.2' result='b' />
                    <feMerge>
                        <feMergeNode in='b' />
                        <feMergeNode in='b' />
                        <feMergeNode in='SourceGraphic' />
                    </feMerge>
                </filter>
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
            {/* Zócalo */}
            <polygon
                points={poligono(V, [
                    [0, 0, 0],
                    [10, 0, 0],
                    [10, 0, 0.4],
                    [0, 0, 0.4],
                ])}
                fill='rgb(var(--raised))'
            />
            <polygon
                points={poligono(V, [
                    [0, 0, 0],
                    [0, 10, 0],
                    [0, 10, 0.4],
                    [0, 0, 0.4],
                ])}
                fill='rgb(var(--raised))'
            />

            {/* Pared izquierda: ventana con cielo nocturno */}
            <g transform={planoY(V, 0, 4.6, 5)}>
                <rect x={0} y={0} width={3} height={2.4} rx={0.18} fill={C.pizarraOsc} stroke={C.madera} strokeWidth={0.16} />
                <rect x={0.15} y={0.15} width={2.7} height={2.1} rx={0.1} fill='#1d2040' />
                <circle cx={2.2} cy={0.7} r={0.32} fill={C.crema} opacity={0.9} />
                <circle cx={2.32} cy={0.62} r={0.3} fill='#1d2040' />
                {[
                    [0.5, 0.5],
                    [1.1, 1.2],
                    [0.7, 1.7],
                    [1.6, 0.4],
                    [1.9, 1.6],
                    [0.35, 1.1],
                ].map(([sx, sy], i) => (
                    <circle key={i} cx={sx} cy={sy} r={0.05} fill={C.crema} className='titila' style={{ animationDelay: `${i * 0.45}s` }} />
                ))}
                <line x1={1.5} y1={0.15} x2={1.5} y2={2.25} stroke={C.madera} strokeWidth={0.1} />
                <line x1={0.15} y1={1.2} x2={2.85} y2={1.2} stroke={C.madera} strokeWidth={0.1} />
            </g>

            {/* Pared izquierda: cuadro con la actividad de GitHub */}
            <g transform={planoY(V, 0, 9.2, 4.6)}>
                <rect x={0} y={0} width={3.4} height={1.9} rx={0.15} fill={C.tinta} stroke='rgb(var(--line-strong))' strokeWidth={0.08} />
                {Array.from({ length: 4 }).map((_, f) =>
                    Array.from({ length: 9 }).map((__, c) => {
                        const n = (f * 7 + c * 3) % 5;
                        const color = [C.pizarra, C.salvia, C.arena, C.terra, C.pizarra][n];
                        return <rect key={`${f}-${c}`} x={0.25 + c * 0.33} y={0.3 + f * 0.36} width={0.26} height={0.26} rx={0.05} fill={color} className={n === 3 ? 'titila' : ''} style={{ animationDelay: `${(f + c) * 0.2}s` }} />;
                    }),
                )}
            </g>

            {/* Pared derecha: letrero de neón */}
            <g transform={planoX(V, 1.1, 0, 5.3)} filter='url(#taller-neon)' className='neon'>
                <rect x={0} y={0} width={3.6} height={1.25} rx={0.25} fill='none' stroke='var(--brand, #e07a5f)' strokeWidth={0.07} />
                <text x={1.8} y={0.9} textAnchor='middle' fontFamily='"Geist Mono Variable", monospace' fontWeight={700} fontSize={0.8} fill='var(--brand, #e07a5f)'>
                    {'<JM/>'}
                </text>
            </g>

            {/* Pared derecha: repisa con libros y una suculenta */}
            <Caja x={5.9} y={0} z={3.75} w={2.5} d={0.6} h={0.1} tapa={C.madera} izq={C.maderaOsc} der={C.maderaOsc} />
            {[
                [6.05, 0.6, C.terra],
                [6.36, 0.78, C.salvia],
                [6.66, 0.66, C.arena],
                [6.96, 0.84, C.pizarra],
            ].map(([bx, bh, color], i) => (
                <Caja key={i} x={bx as number} y={0.08} z={3.85} w={0.27} d={0.46} h={bh as number} tapa={color as string} izq={color as string} der={C.tinta} />
            ))}
            <Caja x={7.45} y={0.12} z={3.85} w={0.62} d={0.42} h={0.14} tapa={C.crema} izq='#e3dfc6' der='#cbc6ab' />
            <Caja x={7.75} y={0.12} z={3.99} w={0.42} d={0.42} h={0.3} tapa='#c9744f' izq={C.terra} der='#b95c43' />
            {(() => {
                const [sx, sy] = punto(V, 7.96, 0.33, 4.29);
                return (
                    <g>
                        <ellipse cx={sx - 4} cy={sy - 5} rx={3.2} ry={7} fill={C.salvia} transform={`rotate(-24 ${sx - 4} ${sy - 5})`} />
                        <ellipse cx={sx + 4} cy={sy - 5} rx={3.2} ry={7} fill='#6ea088' transform={`rotate(24 ${sx + 4} ${sy - 5})`} />
                        <ellipse cx={sx} cy={sy - 8} rx={3.2} ry={8} fill={C.salvia} />
                    </g>
                );
            })()}

            {/* Suelo */}
            <polygon points={suelo.der} fill='rgb(var(--line-strong))' />
            <polygon points={suelo.izq} fill='rgb(var(--line))' />
            <polygon points={suelo.tapa} fill='rgb(var(--raised))' />
            <g stroke='rgb(var(--ink) / 0.06)' strokeWidth={1}>
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

            {/* Alfombra redonda bajo Michi */}
            <polygon points={circulo(5.6, 6.2, 2.3)} fill={C.terra} opacity={0.2} />
            <polygon points={circulo(5.6, 6.2, 1.95)} fill='none' stroke={C.arena} strokeOpacity={0.45} strokeWidth={1.2} strokeDasharray='4 4' />
            <polygon points={circulo(5.6, 6.2, 1.1)} fill={C.terra} opacity={0.12} />

            {/* Planta grande en la esquina */}
            <Caja x={0.3} y={0.3} z={0} w={0.85} d={0.85} h={0.8} tapa='#c9744f' izq={C.terra} der='#b95c43' />
            {(() => {
                const [px, py] = punto(V, 0.72, 0.72, 0.8);
                return (
                    <g className='respira' style={{ animationDuration: '5s' }}>
                        <ellipse cx={px - 13} cy={py - 22} rx={9} ry={22} fill={C.salvia} transform={`rotate(-34 ${px - 13} ${py - 22})`} />
                        <ellipse cx={px + 13} cy={py - 24} rx={9} ry={23} fill='#6ea088' transform={`rotate(30 ${px + 13} ${py - 24})`} />
                        <ellipse cx={px - 3} cy={py - 34} rx={9.5} ry={26} fill={C.salvia} transform={`rotate(-8 ${px - 3} ${py - 34})`} />
                        <ellipse cx={px + 7} cy={py - 30} rx={7} ry={20} fill='#5f8f78' transform={`rotate(14 ${px + 7} ${py - 30})`} />
                    </g>
                );
            })()}

            {/* Escritorio bajo el <JM/>: cajonera, pata y tablero */}
            <Caja x={1.5} y={0.15} z={0} w={1} d={1.3} h={1.18} tapa={C.madera} izq={C.maderaOsc} der='#6f4a30' />
            {[0.32, 0.72].map((dz) => (
                <g key={dz} transform={planoX(V, 1.55, 1.45, 1.18 - dz + 0.25)}>
                    <rect x={0} y={0} width={0.9} height={0.32} rx={0.04} fill='#000000' opacity={0.12} />
                    <rect x={0.35} y={0.13} width={0.2} height={0.05} rx={0.025} fill={C.arena} />
                </g>
            ))}
            <Caja x={5.05} y={0.15} z={0} w={0.14} d={1.3} h={1.18} tapa={C.maderaOsc} izq={C.maderaOsc} der='#6f4a30' />
            <Caja x={1.4} y={0.1} z={1.18} w={3.9} d={1.45} h={0.12} tapa={C.madera} izq={C.maderaOsc} der='#6f4a30' />

            {/* Monitor con código */}
            <Caja x={3.25} y={0.4} z={1.3} w={0.36} d={0.3} h={0.32} tapa={C.pizarraOsc} izq={C.pizarra} der={C.pizarraOsc} />
            <Caja x={2.2} y={0.35} z={1.55} w={2.45} d={0.18} h={1.5} tapa={C.pizarraOsc} izq={C.pizarra} der={C.pizarraOsc} />
            <g transform={planoX(V, 2.3, 0.54, 2.95)}>
                <rect x={0} y={0} width={2.25} height={1.3} rx={0.06} fill='#11131f' />
                {[
                    [0.14, 0.2, 1.0, C.neonVioleta],
                    [0.28, 0.38, 1.35, C.neonCian],
                    [0.28, 0.56, 0.8, C.arena],
                    [0.42, 0.74, 1.15, C.salvia],
                    [0.28, 0.92, 0.6, C.terra],
                    [0.14, 1.1, 0.9, C.neonCian],
                ].map(([lx, ly, lw, color], i) => (
                    <rect key={i} x={lx as number} y={ly as number} width={lw as number} height={0.08} rx={0.04} fill={color as string} className='codigo' style={{ animationDelay: `${i * 0.35}s` }} />
                ))}
                <rect x={0.14} y={1.1} width={0.05} height={0.12} fill={C.crema} className='titila' style={{ animationDuration: '1s' }} />
            </g>
            {/* Teclado, taza humeante y celular con notificaciones */}
            <Caja x={2.55} y={0.95} z={1.3} w={1.6} d={0.42} h={0.06} tapa={C.pizarra} izq={C.pizarraOsc} der={C.tinta} />
            <Caja x={4.35} y={1.0} z={1.3} w={0.32} d={0.32} h={0.38} tapa={C.crema} izq='#e3dfc6' der='#cbc6ab' />
            {[0, 1].map((i) => {
                const [vx, vy] = punto(V, 4.51, 1.16, 1.75);
                return <ellipse key={i} cx={vx + i * 4} cy={vy} rx={3.5} ry={5.5} fill={C.crema} className='vapor' style={{ animationDelay: `${i * 1.3}s` }} />;
            })}
            <Caja x={1.75} y={0.95} z={1.3} w={0.34} d={0.56} h={0.05} tapa='#0f1a24' izq={C.tinta} der={C.tinta} />
            {(() => {
                const [tx, ty] = punto(V, 1.92, 1.23, 1.36);
                return (
                    <g>
                        <circle cx={tx} cy={ty} r={3} fill={C.neonCian} opacity={0.7} />
                        <circle cx={tx + 5} cy={ty - 4} r={2.6} fill={C.terra} className='notificacion' />
                        {[0, 1, 2].map((i) => {
                            const color = i === 1 ? C.crema : C.neonVerde;
                            const bx = tx + (i - 1) * 12;
                            return (
                                <g key={i} className='burbuja' style={{ animationDelay: `${i * 1.2}s` }}>
                                    <rect x={bx - 12} y={ty - 26} width={24} height={14} rx={7} fill={color} />
                                    <path d={`M${bx - 5} ${ty - 13} l-3 5 l8 -5 z`} fill={color} />
                                    <g fill={C.tinta} opacity={0.55}>
                                        <circle cx={bx - 5} cy={ty - 19} r={1.4} />
                                        <circle cx={bx} cy={ty - 19} r={1.4} />
                                        <circle cx={bx + 5} cy={ty - 19} r={1.4} />
                                    </g>
                                </g>
                            );
                        })}
                    </g>
                );
            })()}

            {/* Banca bajo la ventana, con cojines: el sitio de Michi para mirar afuera */}
            <Caja x={0.2} y={1.7} z={0} w={1.25} d={2.9} h={0.55} tapa={C.madera} izq={C.maderaOsc} der='#6f4a30' />
            <Caja x={0.25} y={1.8} z={0.55} w={1.15} d={2.7} h={0.18} tapa='#ea9478' izq={C.terra} der='#b95c43' />
            <Caja x={0.3} y={3.7} z={0.73} w={0.55} d={0.7} h={0.42} tapa={C.arena} izq='#d9b277' der='#c19a62' />
            <Caja x={0.3} y={1.95} z={0.73} w={0.5} d={0.6} h={0.36} tapa={C.salvia} izq='#5f8f78' der='#4c7562' />

            {/* Silla del escritorio */}
            {(() => {
                const [bx, by] = punto(V, 3.4, 2.4, 0);
                const [sx, sy] = punto(V, 3.4, 2.4, 0.62);
                return (
                    <g>
                        <ellipse cx={bx} cy={by} rx={16} ry={7} fill={C.pizarraOsc} />
                        <line x1={bx} y1={by} x2={sx} y2={sy} stroke={C.pizarra} strokeWidth={4} />
                    </g>
                );
            })()}
            <Caja x={2.9} y={1.9} z={0.62} w={1} d={1} h={0.16} tapa={C.pizarra} izq={C.pizarraOsc} der='#20222f' />
            <Caja x={2.95} y={2.78} z={0.78} w={0.9} d={0.14} h={0.85} tapa={C.pizarra} izq={C.pizarraOsc} der='#20222f' />

            {/* Servidor compacto con LEDs */}
            <Caja x={8.5} y={0.3} z={0} w={1.1} d={1.1} h={2.5} tapa={C.pizarra} izq={C.pizarraOsc} der='#20222f' />
            <g transform={planoX(V, 8.5, 1.4, 2.35)}>
                {Array.from({ length: 5 }).map((_, f) => (
                    <g key={f}>
                        <rect x={0.1} y={0.08 + f * 0.44} width={0.9} height={0.32} rx={0.05} fill='#161824' />
                        {[0, 1, 2].map((l) => (
                            <circle key={l} cx={0.24 + l * 0.16} cy={0.24 + f * 0.44} r={0.045} fill={[C.neonVerde, C.neonCian, C.terra][(f + l) % 3]} className='led' style={{ animationDelay: `${(f * 3 + l) * 0.17}s` }} />
                        ))}
                        <rect x={0.66} y={0.21 + f * 0.44} width={0.26} height={0.05} rx={0.025} fill='rgb(255 255 255 / 0.15)' />
                    </g>
                ))}
            </g>

            {/* Rascador de Michi, con un juguete colgando */}
            <Caja x={0.45} y={7.1} z={0} w={1.6} d={1.6} h={0.24} tapa='#e3dac0' izq='#cfc5a8' der='#b9ae90' />
            <Caja x={1.05} y={7.7} z={0.24} w={0.42} d={0.42} h={2.05} tapa={C.arena} izq='#d9b277' der='#c19a62' />
            {[0.5, 0.9, 1.3, 1.7].map((dz) => (
                <polyline
                    key={dz}
                    points={poligono(V, [
                        [1.05, 8.12, 0.24 + dz],
                        [1.47, 8.12, 0.24 + dz],
                        [1.47, 7.7, 0.24 + dz],
                    ])}
                    fill='none'
                    stroke='#b48a52'
                    strokeWidth={1}
                    opacity={0.6}
                />
            ))}
            <Caja x={0.55} y={7.2} z={2.29} w={1.4} d={1.4} h={0.2} tapa='#e3dac0' izq='#cfc5a8' der='#b9ae90' />
            <Caja x={0.7} y={7.35} z={2.49} w={1.1} d={1.1} h={0.12} tapa='#ea9478' izq={C.terra} der='#b95c43' />
            {(() => {
                const [hx, hy] = punto(V, 1.95, 8.3, 2.29);
                return (
                    <g className='colgante' style={{ transformOrigin: `${hx}px ${hy}px` }}>
                        <line x1={hx} y1={hy} x2={hx} y2={hy + 26} stroke={C.crema} strokeWidth={1} opacity={0.8} />
                        <circle cx={hx} cy={hy + 30} r={4.5} fill={C.neonVioleta} />
                        <path d={`M${hx - 3} ${hy + 28} q3 2 6 0`} stroke='#8a44b3' strokeWidth={1} fill='none' />
                    </g>
                );
            })()}

            {/* Michi en el centro, jugando con su estambre */}
            <MichiTaller x={rx} y={ry} activo={visible} />

            {/* Canasta de estambres */}
            <Caja x={2.9} y={8.3} z={0} w={1.2} d={0.95} h={0.45} tapa={C.maderaOsc} izq={C.madera} der={C.maderaOsc} />
            {(() => {
                const [gx, gy] = punto(V, 3.5, 8.78, 0.45);
                return (
                    <g>
                        {[
                            [-8, -5, 8, C.salvia, '#5f8f78'],
                            [8, -4, 7.5, C.terra, '#b95c43'],
                            [0, -13, 7, C.neonVioleta, '#8a44b3'],
                        ].map(([dx, dy, r, color, raya], i) => (
                            <g key={i}>
                                <circle cx={gx + (dx as number)} cy={gy + (dy as number)} r={r as number} fill={color as string} />
                                <path d={`M${gx + (dx as number) - (r as number) * 0.7} ${gy + (dy as number) - 2} q${(r as number) * 0.7} -5 ${(r as number) * 1.4} 2 M${gx + (dx as number) - (r as number) * 0.6} ${gy + (dy as number) + 3} q${(r as number) * 0.6} -4 ${(r as number) * 1.2} 1`} stroke={raya as string} strokeWidth={1.3} fill='none' strokeLinecap='round' />
                            </g>
                        ))}
                        <path d={`M${gx + 14} ${gy - 2} q12 6 4 13 t12 8`} stroke={C.terra} strokeWidth={1.3} fill='none' strokeLinecap='round' />
                    </g>
                );
            })()}

            {/* Platos de comida y agua */}
            {[
                [8.1, 7.9, '#c9744f', C.arena],
                [8.95, 7.1, C.pizarra, '#9fd3e0'],
            ].map(([bx, by, plato, dentro], i) => {
                const [px, py] = punto(V, bx as number, by as number, 0);
                return (
                    <g key={i}>
                        <ellipse cx={px} cy={py} rx={13} ry={6.5} fill={plato as string} />
                        <ellipse cx={px} cy={py - 2} rx={10} ry={4.5} fill='#000000' opacity={0.25} />
                        <ellipse cx={px} cy={py - 1.5} rx={8.5} ry={3.6} fill={dentro as string} />
                    </g>
                );
            })}
        </svg>
    );
};
