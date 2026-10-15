import { Animation } from '@components/includes';
import { CATEGORIAS, Categoria, PROYECTOS, Proyecto, TONOS } from '@/data/portfolio';
import { ArrowUpRight, LockSimple } from '@phosphor-icons/react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { CSSProperties, FC, useState } from 'react';

const ease = [0.23, 1, 0.32, 1] as const;

/** Sombra difusa bajo los objetos del escenario, como en la referencia. */
function Piso() {
    return <span className='absolute bottom-[42px] left-1/2 h-3 w-24 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(0_0_0/0.45),transparent)] transition-transform duration-500 ease-out group-hover:scale-x-90' aria-hidden />;
}

/** Parte superior de la tarjeta: rejilla de puntos y la ilustración del proyecto. */
function Escenario({ p }: { p: Proyecto }) {
    if (p.variante === 'imagen') {
        // La captura asoma desde abajo como una ventana y sube un poco al pasar el mouse.
        return (
            <div className='stage h-[232px] px-6 pt-7'>
                <div className='overflow-hidden rounded-t-[12px] border border-b-0 border-line-strong bg-surface shadow-[0_-12px_40px_-20px_rgb(0_0_0/0.5)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1.5 motion-reduce:transition-none'>
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
        <div className='stage grid h-[232px] place-items-center'>
            <img src={p.imagen} alt={p.alt} width={88} height={88} loading='lazy' className='relative z-[1] h-[88px] w-[88px] rounded-[24px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-2 motion-reduce:transition-none' />
            <Piso />
        </div>
    );
}

function Tarjeta({ p, numero }: { p: Proyecto; numero: number }) {
    const tono = TONOS[p.tono];

    return (
        <article className={`card group flex h-full flex-col ${p.url ? 'interactiva' : ''}`} style={{ '--tono': tono.var } as CSSProperties}>
            <Escenario p={p} />

            <div className='grid grid-cols-[auto_1fr_auto] items-start gap-3 border-t border-line px-5 py-4'>
                <span className={`pt-0.5 font-mono text-[11px] tracking-wide ${tono.texto}`}>{String(numero).padStart(2, '0')}</span>
                <div className='min-w-0'>
                    <h3 className='text-[15px] font-semibold leading-snug tracking-tight'>
                        {p.url ? (
                            <a href={p.url} target='_blank' rel='noopener noreferrer' className='after:absolute after:inset-0 after:rounded-[20px] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-sand'>
                                {p.nombre}
                            </a>
                        ) : (
                            p.nombre
                        )}
                    </h3>
                    <p className='mt-0.5 font-mono text-[10.5px] tracking-wide text-faint'>{p.tipo}</p>
                </div>
                {p.url ? (
                    <span className='grid h-8 w-8 place-items-center rounded-[10px] border border-line text-muted transition-colors duration-200 group-hover:border-line-strong group-hover:text-ink' aria-hidden>
                        <ArrowUpRight size={14} weight='bold' className='transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px' />
                    </span>
                ) : (
                    <span className='inline-flex h-8 items-center gap-1.5 rounded-[10px] border border-line px-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint' title={p.insignia ? undefined : 'Sistema interno de un cliente'}>
                        {!p.insignia && <LockSimple size={12} weight='bold' />}
                        {p.insignia ?? 'Privado'}
                    </span>
                )}
            </div>

            <div className='flex flex-1 flex-col px-5 pb-5'>
                <p className='text-sm leading-relaxed text-muted'>{p.texto}</p>
                <ul className='mt-auto flex flex-wrap gap-1.5 pt-4' aria-label='Tecnologías'>
                    {p.stack.map((s) => (
                        <li key={s} className='chip'>
                            {s}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

/**
 * Centra la última fila cuando queda incompleta: la rejilla tiene el doble de columnas
 * (4 en tablet, 6 en escritorio) y cada tarjeta ocupa 2, así se puede correr media tarjeta.
 */
function columna(i: number, total: number) {
    const clases: string[] = [];
    const ultimo = i === total - 1;

    if (total % 2 === 1 && ultimo) clases.push('md:col-start-2');
    if (total % 3 === 2 && i === total - 2) clases.push('lg:col-start-2');
    else if (total % 3 === 1 && ultimo) clases.push('lg:col-start-3');
    else if (clases.length) clases.push('lg:col-start-auto');

    return clases.join(' ');
}

export const MoreProjects: FC = () => {
    const [filtro, setFiltro] = useState<Categoria | 'todos'>('todos');
    const reduce = useReducedMotion();
    const visibles = PROYECTOS.filter((p) => filtro === 'todos' || p.categoria === filtro);
    const cuantos = (id: Categoria | 'todos') => (id === 'todos' ? PROYECTOS.length : PROYECTOS.filter((p) => p.categoria === id).length);

    return (
        <section aria-labelledby='mas-proyectos' data-escena='mas' className='pb-24 md:pb-36'>
            <div className='container-page'>
                <Animation className='mb-8 flex flex-col gap-6 border-b border-line pb-6 md:flex-row md:items-end md:justify-between'>
                    <div>
                        <h2 id='mas-proyectos' className='text-3xl font-semibold tracking-[-0.03em] md:text-[2.6rem]'>
                            Más trabajo
                        </h2>
                        <p className='mt-2 text-muted'>Tiendas, sitios institucionales y apps.</p>
                    </div>

                    {/* Filtro: la pastilla activa se desliza entre opciones (layoutId). */}
                    <LayoutGroup id='filtro-proyectos'>
                        <div role='tablist' aria-label='Filtrar proyectos' className='flex gap-1 self-start overflow-x-auto rounded-full border border-line bg-surface/60 p-1 md:self-auto'>
                            {CATEGORIAS.map((c) => {
                                const activo = filtro === c.id;
                                return (
                                    <button key={c.id} type='button' role='tab' aria-selected={activo} onClick={() => setFiltro(c.id)} className={`relative h-9 shrink-0 rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 active:scale-[0.97] ${activo ? 'text-canvas' : 'text-muted hover:text-ink'}`}>
                                        {activo && <motion.span layoutId='pastilla' className='absolute inset-0 rounded-full bg-ink' transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0.15 }} />}
                                        <span className='relative'>
                                            {c.texto} <span className={activo ? 'text-canvas/60' : 'text-faint'}>{cuantos(c.id)}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </LayoutGroup>
                </Animation>

                <motion.ul layout={!reduce} className='grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6'>
                    <AnimatePresence mode='popLayout' initial={false}>
                        {visibles.map((p, i) => (
                            <motion.li key={p.id} layout={!reduce} className={`md:col-span-2 ${columna(i, visibles.length)}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }} transition={{ duration: reduce ? 0 : 0.3, ease }}>
                                <Tarjeta p={p} numero={PROYECTOS.indexOf(p) + 1} />
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </motion.ul>
            </div>
        </section>
    );
};
