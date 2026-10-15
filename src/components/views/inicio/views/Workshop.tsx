import { Robot } from '@components/includes';
import { caras, Iso, planoX, planoY, poligono, punto } from '@/lib/iso';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

/*
 * El taller de Juan: diorama isométrico dibujado con código (ver lib/iso.ts).
 * Suelo de 10 x 10 unidades con dos paredes, cuatro estaciones (web, servidor, móvil, mensajes)
 * y detalles vivos. Paredes y suelo usan los tokens del tema; los objetos, la paleta Atelier
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

/** Letrero colgante legible (no deformado), anclado a un punto del espacio. */
function Letrero({ x, y, z, texto, color }: { x: number; y: number; z: number; texto: string; color: string }) {
    const [px, py] = punto(V, x, y, z);
    const ancho = texto.length * 6.6 + 22;
    return (
        <g transform={`translate(${px.toFixed(1)} ${py.toFixed(1)})`}>
            <line x1={0} y1={0} x2={0} y2={10} stroke='rgb(var(--line-strong))' strokeWidth={1.2} />
            <rect x={-ancho / 2} y={10} width={ancho} height={18} rx={9} fill={C.tinta} stroke='rgb(255 255 255 / 0.12)' />
            <circle cx={-ancho / 2 + 10} cy={19} r={3} fill={color} className='titila' />
            <text x={-ancho / 2 + 18} y={22.5} fontFamily='"Geist Mono Variable", monospace' fontSize={9.5} letterSpacing={1.2} fill={C.crema}>
                {texto}
            </text>
        </g>
    );
}

/** Engranaje plano (se dibuja dentro de un plano de pared). */
function Engranaje({ cx, cy, r, dientes, color, clase }: { cx: number; cy: number; r: number; dientes: number; color: string; clase: string }) {
    const d: string[] = [];
    for (let i = 0; i < dientes; i++) {
        const a = (i / dientes) * Math.PI * 2;
        d.push(`M${cx + Math.cos(a) * r * 0.82} ${cy + Math.sin(a) * r * 0.82} L${cx + Math.cos(a) * r * 1.15} ${cy + Math.sin(a) * r * 1.15}`);
    }
    return (
        <g className={clase}>
            <path d={d.join(' ')} stroke={color} strokeWidth={r * 0.32} strokeLinecap='round' />
            <circle cx={cx} cy={cy} r={r * 0.85} fill={color} />
            <circle cx={cx} cy={cy} r={r * 0.32} fill={C.tinta} />
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
    const [rx, ry] = punto(V, 5.2, 5.6, 0);

    return (
        <svg ref={ref} viewBox='0 0 660 560' className={`taller h-auto w-full ${visible ? '' : 'pausado'}`} role='img' aria-label='Ilustración del taller de Juan: Bit, un robot, saluda rodeado de estaciones de web, servidores, móvil y mensajería.'>
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
            <polygon points={poligono(V, [[0, 0, 0], [0, 10, 0], [0, 10, ALTO], [0, 0, ALTO]])} fill='rgb(var(--surface))' />
            <polygon points={poligono(V, [[0, 0, 0], [10, 0, 0], [10, 0, ALTO], [0, 0, ALTO]])} fill='rgb(var(--surface-2))' />
            <polyline points={poligono(V, [[0, 10, ALTO], [0, 0, ALTO], [10, 0, ALTO]])} fill='none' stroke='rgb(var(--line-strong))' strokeWidth={2} />
            <polyline points={poligono(V, [[0, 0, 0], [0, 0, ALTO]])} fill='none' stroke='rgb(var(--line-strong))' strokeWidth={1} />
            {/* Zócalo */}
            <polygon points={poligono(V, [[0, 0, 0], [10, 0, 0], [10, 0, 0.4], [0, 0, 0.4]])} fill='rgb(var(--raised))' />
            <polygon points={poligono(V, [[0, 0, 0], [0, 10, 0], [0, 10, 0.4], [0, 0, 0.4]])} fill='rgb(var(--raised))' />

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

            {/* Pared derecha: engranajes */}
            <g transform={planoX(V, 5.2, 0, 4.9)}>
                <Engranaje cx={0.8} cy={0.8} r={0.6} dientes={10} color={C.arena} clase='giro' />
                <Engranaje cx={1.85} cy={1.45} r={0.42} dientes={8} color={C.terra} clase='giro-inverso' />
                <Engranaje cx={1.65} cy={0.35} r={0.28} dientes={7} color={C.salvia} clase='giro' />
            </g>

            {/* Pared derecha: repisa con libros */}
            <Caja x={7.2} y={0} z={3.6} w={2.6} d={0.7} h={0.12} tapa={C.madera} izq={C.maderaOsc} der={C.maderaOsc} />
            {[
                [7.35, 0.55, C.terra],
                [7.68, 0.75, C.salvia],
                [7.98, 0.62, C.arena],
                [8.28, 0.8, C.pizarra],
                [8.62, 0.5, C.crema],
            ].map(([bx, bh, color], i) => (
                <Caja key={i} x={bx as number} y={0.1} z={3.72} w={0.26} d={0.5} h={bh as number} tapa={color as string} izq={color as string} der={C.tinta} />
            ))}
            <Caja x={9.05} y={0.15} z={3.72} w={0.45} d={0.45} h={0.35} tapa={C.salvia} izq='#5f8f78' der='#4c7562' />

            {/* Suelo */}
            <polygon points={suelo.der} fill='rgb(var(--line-strong))' />
            <polygon points={suelo.izq} fill='rgb(var(--line))' />
            <polygon points={suelo.tapa} fill='rgb(var(--raised))' />
            <g stroke='rgb(var(--ink) / 0.06)' strokeWidth={1}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <g key={i}>
                        <polyline points={poligono(V, [[i + 1, 0, 0], [i + 1, 10, 0]])} />
                        <polyline points={poligono(V, [[0, i + 1, 0], [10, i + 1, 0]])} />
                    </g>
                ))}
            </g>
            {/* Alfombra bajo el robot */}
            <polygon points={poligono(V, [[3.6, 4, 0.01], [7, 4, 0.01], [7, 7.4, 0.01], [3.6, 7.4, 0.01]])} fill={C.terra} opacity={0.22} />
            <polygon points={poligono(V, [[3.9, 4.3, 0.02], [6.7, 4.3, 0.02], [6.7, 7.1, 0.02], [3.9, 7.1, 0.02]])} fill='none' stroke={C.arena} strokeOpacity={0.45} strokeWidth={1.2} strokeDasharray='4 4' />

            {/* Estación WEB: escritorio, monitor con código y taza humeante */}
            <Caja x={0.6} y={1.1} z={0} w={3.2} d={1.7} h={1.35} tapa={C.madera} izq={C.maderaOsc} der='#6f4a30' />
            <Caja x={1.2} y={1.3} z={1.35} w={2.1} d={0.22} h={1.45} tapa={C.pizarraOsc} izq={C.pizarra} der={C.pizarraOsc} />
            <g transform={planoX(V, 1.32, 1.52, 2.7)}>
                <rect x={0} y={0} width={1.86} height={1.22} rx={0.06} fill='#11131f' />
                {[
                    [0.12, 0.18, 0.9, C.neonVioleta],
                    [0.24, 0.36, 1.2, C.neonCian],
                    [0.24, 0.54, 0.7, C.arena],
                    [0.36, 0.72, 1.0, C.salvia],
                    [0.12, 0.9, 0.55, C.terra],
                ].map(([lx, ly, lw, color], i) => (
                    <rect key={i} x={lx as number} y={ly as number} width={lw as number} height={0.08} rx={0.04} fill={color as string} className='codigo' style={{ animationDelay: `${i * 0.35}s` }} />
                ))}
                {/* Nota adhesiva: el ciclo del agente */}
                <rect x={1.42} y={-0.12} width={0.5} height={0.5} fill={C.arena} transform='rotate(6 1.67 0.13)' />
                <text x={1.47} y={0.1} fontSize={0.12} fontFamily='"Geist Mono Variable", monospace' fill={C.tinta} transform='rotate(6 1.67 0.13)'>
                    pensar
                </text>
                <text x={1.47} y={0.24} fontSize={0.12} fontFamily='"Geist Mono Variable", monospace' fill={C.tinta} transform='rotate(6 1.67 0.13)'>
                    actuar ↻
                </text>
            </g>
            <Caja x={1.9} y={1.62} z={1.35} w={0.6} d={0.5} h={0.05} tapa={C.pizarraOsc} izq={C.tinta} der={C.tinta} />
            <Caja x={3.15} y={2.15} z={1.35} w={0.36} d={0.36} h={0.42} tapa={C.crema} izq='#e3dfc6' der='#cbc6ab' />
            {[0, 1].map((i) => {
                const [vx, vy] = punto(V, 3.33, 2.33, 1.95);
                return <ellipse key={i} cx={vx + i * 4} cy={vy} rx={4} ry={6} fill={C.crema} className='vapor' style={{ animationDelay: `${i * 1.3}s` }} />;
            })}
            <Letrero x={2.2} y={2.8} z={1.35} texto='WEB' color={C.neonVioleta} />

            {/* Estación SERVIDOR: rack con LEDs */}
            <Caja x={7.7} y={0.8} z={0} w={1.5} d={1.4} h={3.3} tapa={C.pizarra} izq={C.pizarraOsc} der='#20222f' />
            <g transform={planoX(V, 7.7, 2.2, 3.15)}>
                {Array.from({ length: 6 }).map((_, f) => (
                    <g key={f}>
                        <rect x={0.12} y={0.1 + f * 0.48} width={1.26} height={0.36} rx={0.05} fill='#161824' />
                        {[0, 1, 2].map((l) => (
                            <circle key={l} cx={0.28 + l * 0.18} cy={0.28 + f * 0.48} r={0.05} fill={[C.neonVerde, C.neonCian, C.terra][(f + l) % 3]} className='led' style={{ animationDelay: `${(f * 3 + l) * 0.17}s` }} />
                        ))}
                        <rect x={0.86} y={0.25 + f * 0.48} width={0.4} height={0.06} rx={0.03} fill='rgb(255 255 255 / 0.15)' />
                    </g>
                ))}
            </g>
            {[0, 1, 2].map((i) => {
                const [vx, vy] = punto(V, 8.4, 1.5, 3.4);
                return <circle key={i} cx={vx + (i - 1) * 7} cy={vy} r={5} fill='rgb(var(--ink) / 0.25)' className='vapor' style={{ animationDelay: `${i * 0.9}s` }} />;
            })}
            <Letrero x={8.45} y={2.2} z={3.3} texto='SERVIDOR' color={C.neonVerde} />

            {/* Estación MÓVIL: mesa con teléfono */}
            <Caja x={7} y={5.4} z={0} w={1.7} d={1.7} h={1.15} tapa={C.salvia} izq='#5f8f78' der='#4c7562' />
            <Caja x={7.6} y={6.1} z={1.15} w={0.62} d={0.14} h={1.1} tapa={C.tinta} izq={C.pizarraOsc} der={C.tinta} />
            <g transform={planoX(V, 7.65, 6.24, 2.2)}>
                <rect x={0} y={0} width={0.52} height={1} rx={0.07} fill='#0f1a24' />
                <rect x={0.07} y={0.12} width={0.38} height={0.1} rx={0.03} fill={C.neonCian} />
                <rect x={0.07} y={0.3} width={0.38} height={0.24} rx={0.04} fill={C.neonCian} opacity={0.35} />
                <rect x={0.07} y={0.62} width={0.24} height={0.06} rx={0.03} fill={C.crema} opacity={0.6} />
                <circle cx={0.5} cy={0.02} r={0.11} fill={C.terra} className='notificacion' />
            </g>
            <Letrero x={7.85} y={7.1} z={1.15} texto='MÓVIL' color={C.neonCian} />

            {/* Estación MENSAJES: buzón con burbujas de chat */}
            <Caja x={1} y={6.3} z={0} w={1.3} d={1.2} h={1.9} tapa='#ea9478' izq={C.terra} der='#b95c43' />
            <g transform={planoX(V, 1, 7.5, 1.6)}>
                <rect x={0.25} y={0.15} width={0.8} height={0.12} rx={0.06} fill={C.tinta} />
            </g>
            {[0, 1, 2].map((i) => {
                const [bx, by] = punto(V, 1.7, 6.9, 2.3);
                const color = i === 1 ? C.crema : C.neonVerde;
                return (
                    <g key={i} className='burbuja' style={{ animationDelay: `${i * 1.2}s` }}>
                        <rect x={bx - 14 + (i - 1) * 14} y={by - 12} width={28} height={16} rx={8} fill={color} />
                        <path d={`M${bx - 6 + (i - 1) * 14} ${by + 3} l-4 6 l9 -5 z`} fill={color} />
                        <g fill={C.tinta} opacity={0.55}>
                            <circle cx={bx - 6 + (i - 1) * 14} cy={by - 4} r={1.6} />
                            <circle cx={bx + (i - 1) * 14} cy={by - 4} r={1.6} />
                            <circle cx={bx + 6 + (i - 1) * 14} cy={by - 4} r={1.6} />
                        </g>
                    </g>
                );
            })}
            <Letrero x={1.65} y={7.5} z={1.9} texto='MENSAJES' color={C.neonVerde} />

            {/* Planta */}
            <Caja x={5.3} y={0.7} z={0} w={0.8} d={0.8} h={0.75} tapa='#c9744f' izq={C.terra} der='#b95c43' />
            {(() => {
                const [px, py] = punto(V, 5.7, 1.1, 0.75);
                return (
                    <g className='respira' style={{ animationDuration: '5s' }}>
                        <ellipse cx={px - 9} cy={py - 14} rx={7} ry={15} fill={C.salvia} transform={`rotate(-28 ${px - 9} ${py - 14})`} />
                        <ellipse cx={px + 9} cy={py - 15} rx={7} ry={16} fill='#6ea088' transform={`rotate(26 ${px + 9} ${py - 15})`} />
                        <ellipse cx={px} cy={py - 22} rx={7} ry={18} fill={C.salvia} />
                    </g>
                );
            })()}

            {/* Gato durmiendo sobre su cojín */}
            <Caja x={3.4} y={8.3} z={0} w={1.6} d={1.1} h={0.28} tapa={C.arena} izq='#d9b277' der='#c19a62' />
            {(() => {
                const [gx, gy] = punto(V, 4.2, 8.85, 0.28);
                return (
                    <g>
                        <g className='respira'>
                            <ellipse cx={gx} cy={gy - 7} rx={19} ry={10} fill={C.pizarra} />
                            <circle cx={gx + 14} cy={gy - 12} r={8} fill={C.pizarra} />
                            <path d={`M${gx + 9} ${gy - 18} l2 -7 l4 5 z M${gx + 16} ${gy - 19} l4 -6 l2 7 z`} fill={C.pizarra} />
                            <path d={`M${gx + 11} ${gy - 12} q2 1.5 4 0 M${gx + 16} ${gy - 12} q2 1.5 4 0`} stroke={C.crema} strokeWidth={1} fill='none' strokeLinecap='round' />
                            <path d={`M${gx - 18} ${gy - 4} q-10 -2 -6 -12`} stroke={C.pizarra} strokeWidth={4} fill='none' strokeLinecap='round' />
                        </g>
                        {[0, 1].map((i) => (
                            <text key={i} x={gx + 22} y={gy - 24} fontFamily='"Geist Mono Variable", monospace' fontSize={9 + i * 2} fill='rgb(var(--muted))' className='zzz' style={{ animationDelay: `${i * 1.6}s` }}>
                                z
                            </text>
                        ))}
                    </g>
                );
            })()}

            {/* Bit en el centro, saludando */}
            <ellipse cx={rx} cy={ry} rx={32} ry={11} fill='#000000' opacity={0.3} className='robot-sombra' style={{ transformOrigin: `${rx}px ${ry}px` }} />
            <svg x={rx - 76} y={ry - 184} width={152} height={190} viewBox='0 0 120 150' overflow='visible'>
                <Robot pose='saludar' sinSombra />
            </svg>
        </svg>
    );
};
