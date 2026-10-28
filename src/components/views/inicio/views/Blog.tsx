import { Animation } from '@components/includes';
import { CATEGORIAS, EntradaResumen, fechaLarga } from '@/lib/blog';
import { ArrowUpRight } from '@phosphor-icons/react';
import { FC } from 'react';

interface Props {
    entradas: EntradaResumen[];
}

/** Las últimas entradas del blog en la portada. */
export const Blog: FC<Props> = ({ entradas }) => {
    if (!entradas.length) return null;

    return (
        <section id='blog' aria-labelledby='blog-titulo' data-escena='blog' className='border-t border-line py-24 md:py-36'>
            <div className='container-page'>
                <Animation className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
                    <div className='max-w-2xl'>
                        <h2 id='blog-titulo' className='text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl'>
                            Lo que pasa en mi <em className='not-italic text-sand'>stack</em>
                        </h2>
                        <p className='mt-4 text-lg leading-relaxed text-muted'>Vulnerabilidades, lanzamientos y cambios en PHP, Node, React y TypeScript, explicados con lo que tienes que hacer en tu proyecto.</p>
                    </div>
                    <a href='/blog/' className='btn-ghost group shrink-0'>
                        Ver todo el blog
                        <ArrowUpRight size={14} weight='bold' className='transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                    </a>
                </Animation>

                <ul className='mt-12 grid gap-4 md:grid-cols-3'>
                    {entradas.map((e, i) => (
                        <Animation key={e.slug} as='li' delay={i * 0.06} percha={i === 0}>
                            <a href={`/blog/${e.slug}/`} className='card flex h-full flex-col p-6 md:p-7'>
                                <span className='flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint'>
                                    <span className='text-accent'>{CATEGORIAS[e.categoria]}</span>
                                    <time dateTime={e.fecha}>{fechaLarga(e.fecha)}</time>
                                </span>
                                <h3 className='mt-5 text-xl font-semibold leading-snug tracking-[-0.02em]'>{e.titulo}</h3>
                                <p className='mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted'>{e.descripcion}</p>
                            </a>
                        </Animation>
                    ))}
                </ul>
            </div>
        </section>
    );
};
