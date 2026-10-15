import { Animation, TechLogo } from '@components/includes';
import { DESTACADOS, Destacado } from '@/data/portfolio';
import { useEscena } from '@/lib/escena';
import { caras, Iso, punto } from '@/lib/iso';
import { ArrowUpRight } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CSSProperties, FC, useRef } from 'react';
import { siInstagram, siWhatsapp } from 'simple-icons';

const BRAND = 'var(--brand, #e07a5f)';
const mezcla = (pct: number, con = 'transparent') => `color-mix(in srgb, ${BRAND} ${pct}%, ${con})`;

const V: Iso = { s: 30, cx: 300, cy: 300 };

/** Pedestal isométrico con borde de neón del color de la escena. */
function Pedestal() {
    const c = caras(V, 0, 0, 0, 7, 7, 1);
    const anillo = (r: number) => {
        const [x, y] = punto(V, 3.5, 3.5, 1);
        return { cx: x, cy: y, rx: r * 0.866 * V.s * 1.41, ry: r * 0.5 * V.s * 1.41 };
    };

    return (
        <svg viewBox='0 0 600 520' className='absolute inset-0 h-full w-full' aria-hidden>
            <defs>
                <filter id='pedestal-neon' x='-20%' y='-20%' width='140%' height='140%'>
                    <feGaussianBlur stdDeviation='3' result='b' />
                    <feMerge>
                        <feMergeNode in='b' />
                        <feMergeNode in='SourceGraphic' />
                    </feMerge>
                </filter>
            </defs>
            <polygon points={c.der} fill='rgb(var(--surface-2))' />
            <polygon points={c.izq} fill='rgb(var(--surface))' />
            <polygon points={c.tapa} style={{ fill: mezcla(16, 'rgb(var(--raised))') }} />
            <polygon points={c.tapa} fill='none' style={{ stroke: BRAND }} strokeWidth={2} strokeOpacity={0.9} filter='url(#pedestal-neon)' />
            <ellipse {...anillo(2.6)} fill='none' style={{ stroke: BRAND }} strokeOpacity={0.35} strokeWidth={1.5} strokeDasharray='6 8' className='anillo' />
            <ellipse {...anillo(1.6)} fill='none' style={{ stroke: BRAND }} strokeOpacity={0.5} strokeWidth={1.5} />
        </svg>
    );
}

/** FEVEL no tiene captura pública: su escena es un almacén con cajas y chats saliendo. */
function Almacen() {
    const W: Iso = { s: 30, cx: 300, cy: 300 };
    const cajas: [number, number, number][] = [
        [0.8, 0.8, 0],
        [2, 0.8, 0],
        [0.8, 2, 0],
        [0.8, 0.8, 1.1],
        [2, 0.8, 1.1],
        [0.8, 0.8, 2.2],
        [4.4, 1.2, 0],
        [4.4, 1.2, 1.1],
    ];

    return (
        <svg viewBox='0 0 600 520' className='taller absolute inset-0 h-full w-full' role='img' aria-label='Ilustración de un almacén con cajas y mensajes de WhatsApp saliendo de un teléfono'>
            {cajas.map(([x, y, z], i) => {
                const c = caras(W, x, y, z + 1, 1.05, 1.05, 1.05);
                return (
                    <g key={i}>
                        <polygon points={c.der} fill='#a8744a' />
                        <polygon points={c.izq} fill='#c48a59' />
                        <polygon points={c.tapa} fill='#ddb07c' />
                        <polygon points={caras(W, x + 0.42, y, z + 2.04, 0.2, 1.05, 0.02).tapa} fill='#b98a5c' />
                    </g>
                );
            })}
            {/* Teléfono con WhatsApp */}
            {(() => {
                const c = caras(W, 4.3, 4.6, 1, 1.1, 0.22, 2);
                const [px, py] = punto(W, 4.85, 4.82, 3.3);
                return (
                    <g>
                        <polygon points={c.der} fill='#1b1a19' />
                        <polygon points={c.izq} fill='#2b2d42' />
                        <polygon points={c.tapa} fill='#3d405b' />
                        {[0, 1, 2].map((i) => (
                            <g key={i} className='burbuja' style={{ animationDelay: `${i * 1.2}s` }}>
                                <rect x={px - 30 + (i - 1) * 22} y={py - 34} width={46} height={26} rx={13} fill={i === 1 ? '#f4f1de' : '#25d366'} />
                                <g fill='#1b1a19' opacity={0.5}>
                                    <circle cx={px - 17 + (i - 1) * 22} cy={py - 21} r={2.2} />
                                    <circle cx={px - 7 + (i - 1) * 22} cy={py - 21} r={2.2} />
                                    <circle cx={px + 3 + (i - 1) * 22} cy={py - 21} r={2.2} />
                                </g>
                            </g>
                        ))}
                    </g>
                );
            })()}
            <g transform='translate(392 150)'>
                <g className='flotar' style={{ color: '#25d366' }}>
                    <rect x={-22} y={-22} width={44} height={44} rx={13} fill='#1b1a19' stroke='rgb(255 255 255 / 0.1)' />
                    <g transform='translate(-12 -12)'>
                        <TechLogo icon={siWhatsapp} size={24} />
                    </g>
                </g>
            </g>
            <g transform='translate(470 214)'>
                <g className='flotar' style={{ color: '#e1306c', animationDelay: '0.8s' }}>
                    <rect x={-19} y={-19} width={38} height={38} rx={11} fill='#1b1a19' stroke='rgb(255 255 255 / 0.1)' />
                    <g transform='translate(-10 -10)'>
                        <TechLogo icon={siInstagram} size={20} />
                    </g>
                </g>
            </g>
        </svg>
    );
}

const POS_INSIGNIA = ['left-[4%] top-[10%]', 'right-[2%] top-[38%]', 'left-[8%] bottom-[14%]'];

/** Escena de un proyecto: brillo, pedestal, captura flotando en 3D (o ilustración) e insignias. */
function Escenario3D({ caso }: { caso: Destacado }) {
    return (
        <div className='relative aspect-[6/5] w-full'>
            <div className='absolute inset-[-8%] rounded-full blur-2xl' style={{ background: `radial-gradient(closest-side, ${mezcla(28)}, transparent)` }} aria-hidden />
            <div className='stage absolute inset-0' style={{ '--tono': '0 0 0' } as CSSProperties} aria-hidden />
            <Pedestal />
            {/* Sombra de la ventana sobre el pedestal */}
            {caso.imagen && <div className='absolute left-1/2 top-[66%] h-[9%] w-[46%] -translate-x-1/2 rounded-[50%] blur-xl' style={{ background: mezcla(45) }} aria-hidden />}

            {caso.imagen ? (
                <div className='absolute inset-x-[15%] top-[3%] [perspective:1400px]'>
                    <div className='flotar'>
                        <figure className='overflow-hidden rounded-[14px] border border-line-strong bg-surface [transform:rotateX(9deg)_rotateY(-17deg)_rotateZ(2deg)]' style={{ boxShadow: `0 40px 90px -35px ${mezcla(70)}, 0 0 0 1px ${mezcla(25)}` }}>
                            <div className='flex items-center gap-1.5 border-b border-line px-3.5 py-2'>
                                <span className='h-2 w-2 rounded-full' style={{ background: BRAND }} />
                                <span className='h-2 w-2 rounded-full bg-line-strong' />
                                <span className='h-2 w-2 rounded-full bg-line-strong' />
                                <span className='ml-2 truncate font-mono text-[10.5px] text-faint'>{caso.enlaces[0]?.texto}</span>
                            </div>
                            <img src={caso.imagen} alt={caso.alt} width={1280} height={800} loading='lazy' className='block aspect-[16/10] w-full object-cover object-top' />
                        </figure>
                    </div>
                </div>
            ) : (
                <Almacen />
            )}

            {caso.insignias.map((texto, i) => (
                <span key={texto} className={`flotar absolute ${POS_INSIGNIA[i]} inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/90 px-3.5 py-2 font-mono text-[11px] tracking-wide text-ink shadow-[0_14px_30px_-14px_rgb(0_0_0/0.6)] backdrop-blur`} style={{ animationDelay: `${i * 0.7}s` }}>
                    <span className='h-2 w-2 rounded-full' style={{ background: BRAND, boxShadow: `0 0 10px ${BRAND}` }} />
                    {texto}
                </span>
            ))}
        </div>
    );
}

function Capitulo({ caso }: { caso: Destacado }) {
    return (
        <article id={`proyecto-${caso.id}`} data-escena={caso.id} className='py-16 lg:flex lg:min-h-[88vh] lg:items-center lg:py-0'>
            <div>
                <div className='mb-10 lg:hidden'>
                    <Escenario3D caso={caso} />
                </div>

                <Animation>
                    <p className='font-mono text-[11px] uppercase tracking-[0.18em]' style={{ color: BRAND }}>
                        {caso.cliente}
                    </p>
                    <h3 className='mt-3 text-4xl font-semibold tracking-[-0.03em] md:text-[3.2rem] md:leading-[1.02]'>{caso.nombre}</h3>
                    <p className='mt-5 max-w-[54ch] text-[17px] leading-relaxed text-muted'>{caso.resumen}</p>

                    <dl className='mt-9 grid gap-x-7 gap-y-6 sm:grid-cols-2'>
                        {caso.piezas.map((p) => (
                            <div key={p.titulo} className='border-l-2 pl-4' style={{ borderColor: mezcla(75) }}>
                                <dt className='text-sm font-semibold'>{p.titulo}</dt>
                                <dd className='mt-1.5 text-sm leading-relaxed text-muted'>{p.texto}</dd>
                            </div>
                        ))}
                    </dl>

                    <ul className='mt-8 flex flex-wrap gap-1.5' aria-label='Tecnologías'>
                        {caso.stack.map((s) => (
                            <li key={s} className='chip'>
                                {s}
                            </li>
                        ))}
                    </ul>

                    {caso.enlaces.length > 0 ? (
                        <div className='mt-8 flex flex-wrap gap-2'>
                            {caso.enlaces.map((e, i) => (
                                <a key={e.url} href={e.url} target='_blank' rel='noopener noreferrer' className={i === 0 ? 'btn-primary' : 'btn-ghost'}>
                                    {e.texto}
                                    <ArrowUpRight size={14} weight='bold' />
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p className='mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-faint'>Sistema interno del cliente</p>
                    )}
                </Animation>
            </div>
        </article>
    );
}

export const Projects: FC = () => {
    const escena = useEscena();
    const reduce = useReducedMotion();
    const ultimo = useRef<Destacado>(DESTACADOS[0]);
    const enCurso = DESTACADOS.find((c) => c.id === escena);
    if (enCurso) ultimo.current = enCurso;
    const caso = ultimo.current;

    const ir = (id: string) => document.getElementById(`proyecto-${id}`)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });

    return (
        <section id='proyectos' className='pb-16 pt-24 md:pb-24 md:pt-36'>
            <div className='container-page'>
                <Animation className='max-w-3xl'>
                    <div data-escena='proyectos'>
                        <p className='kicker mb-6'>Trabajo seleccionado</p>
                        <h2 className='text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl'>
                            Proyectos en <em className='not-italic text-sand'>producción</em>
                        </h2>
                        <p className='mt-5 max-w-[52ch] text-lg leading-relaxed text-muted'>Sistemas que mis clientes usan todos los días. Los diseño, los programo, los despliego y los mantengo.</p>
                    </div>
                </Animation>

                <div className='grid lg:grid-cols-12 lg:gap-14'>
                    {/* Escena fija (solo escritorio): cambia con el capítulo visible */}
                    <div className='hidden lg:col-span-6 lg:block'>
                        <div className='sticky top-0 flex h-[100dvh] flex-col justify-center py-24'>
                            <div className='relative'>
                                <AnimatePresence mode='popLayout' initial={false}>
                                    <motion.div key={caso.id} initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }} exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04, y: -16, filter: 'blur(6px)', transition: { duration: 0.3 } }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
                                        <Escenario3D caso={caso} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Riel de capítulos: indica el actual y permite saltar */}
                            <nav aria-label='Proyectos' className='mt-8 grid grid-cols-4 gap-2'>
                                {DESTACADOS.map((c) => {
                                    const activo = c.id === caso.id;
                                    return (
                                        <button key={c.id} type='button' onClick={() => ir(c.id)} aria-current={activo ? 'true' : undefined} className='group text-left'>
                                            <span className='block h-[3px] overflow-hidden rounded-full bg-line-strong'>
                                                <span className='block h-full origin-left rounded-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]' style={{ background: BRAND, transform: `scaleX(${activo ? 1 : 0})` }} />
                                            </span>
                                            <span className={`mt-2.5 block font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${activo ? 'text-ink' : 'text-faint group-hover:text-muted'}`}>{c.corto}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    <div className='lg:col-span-6'>
                        {DESTACADOS.map((c) => (
                            <Capitulo key={c.id} caso={c} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
