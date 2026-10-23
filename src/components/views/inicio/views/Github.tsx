import { Animation } from '@components/includes';
import { PERFIL } from '@/data/portfolio';
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import { FC, useEffect, useMemo, useState } from 'react';

interface Dia {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

// Totales del perfil a la fecha de esta versión; se usan si la API no responde.
const RESPALDO: Record<string, number> = { '2025': 1432, '2026': 1422 };
const API = `https://github-contributions-api.jogruber.de/v4/${PERFIL.githubUsuario}?y=2025&y=2026`;
// Niveles con la paleta completa: de pizarra (poco) a terracota (mucho).
const NIVELES = ['bg-raised', 'bg-slate/35 dark:bg-slate', 'bg-sage', 'bg-sand', 'bg-accent'];
const SEMANAS = 53;

const formato = new Intl.NumberFormat('es-CO');
const fechaLarga = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });

/** Agrupa los últimos días en columnas de semana (domingo a sábado), como el perfil de GitHub. */
function semanas(dias: Dia[]): (Dia | null)[][] {
    const hoy = new Date().toISOString().slice(0, 10);
    const pasados = dias.filter((d) => d.date <= hoy);
    const recientes = pasados.slice(-(SEMANAS * 7 - 6));
    if (!recientes.length) return [];

    const relleno = new Date(`${recientes[0].date}T12:00:00`).getDay();
    const celdas: (Dia | null)[] = [...Array(relleno).fill(null), ...recientes];
    const columnas: (Dia | null)[][] = [];
    for (let i = 0; i < celdas.length; i += 7) columnas.push(celdas.slice(i, i + 7));
    return columnas.slice(-SEMANAS);
}

export const Github: FC = () => {
    const [dias, setDias] = useState<Dia[] | null>(null);
    const [totales, setTotales] = useState(RESPALDO);
    const [estado, setEstado] = useState<'cargando' | 'listo' | 'error'>('cargando');

    useEffect(() => {
        const control = new AbortController();
        fetch(API, { signal: control.signal })
            .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
            .then((d: { total: Record<string, number>; contributions: Dia[] }) => {
                setDias(d.contributions);
                setTotales({ ...RESPALDO, ...d.total });
                setEstado('listo');
            })
            .catch((e) => {
                if (!control.signal.aborted) setEstado('error');
                return e;
            });
        return () => control.abort();
    }, []);

    const columnas = useMemo(() => (dias ? semanas(dias) : []), [dias]);
    const ultimoAnio = useMemo(() => columnas.flat().reduce((t, d) => t + (d?.count ?? 0), 0), [columnas]);

    return (
        <section aria-labelledby='github-titulo' data-escena='github' className='border-t border-line py-24 md:py-36'>
            <div className='container-page'>
                <Animation className='flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>
                    <div className='max-w-2xl'>
                        <h2 id='github-titulo' className='text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl'>
                            Programo todos los <em className='not-italic text-sand'>días</em>
                        </h2>
                        <p className='mt-4 text-lg leading-relaxed text-muted'>La mayoría de mis repositorios son privados porque son de clientes, pero la actividad se ve en mi perfil.</p>
                    </div>
                    <dl className='flex gap-10'>
                        {Object.entries(totales).map(([anio, total]) => (
                            <div key={anio}>
                                <dt className='font-mono text-[11px] uppercase tracking-[0.18em] text-faint'>{anio}</dt>
                                <dd className='mt-1 font-mono text-4xl font-medium tabular-nums'>{formato.format(total)}</dd>
                            </div>
                        ))}
                    </dl>
                </Animation>

                <Animation delay={0.1} percha className='card mt-12 p-5 md:p-7'>
                    <div className='mb-5 flex flex-wrap items-center justify-between gap-3'>
                        <p className='font-mono text-[11px] uppercase tracking-[0.14em] text-muted'>{estado === 'listo' ? `${formato.format(ultimoAnio)} contribuciones en los últimos 12 meses` : estado === 'cargando' ? 'Cargando actividad…' : 'No se pudo cargar la actividad en este momento.'}</p>
                        <a href={PERFIL.github} target='_blank' rel='noopener noreferrer' className='btn-ghost group h-9 px-4'>
                            <GithubLogo size={18} weight='fill' />@{PERFIL.githubUsuario}
                            <ArrowUpRight size={14} weight='bold' className='transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                        </a>
                    </div>

                    <div className='overflow-x-auto pb-1'>
                        {estado === 'listo' ? (
                            <div className='grid min-w-[680px] gap-[3px]' style={{ gridTemplateColumns: `repeat(${columnas.length}, minmax(0, 1fr))` }} role='img' aria-label={`Mapa de contribuciones: ${formato.format(ultimoAnio)} en los últimos 12 meses`}>
                                {columnas.map((col, i) => (
                                    <div key={i} className='flex flex-col gap-[3px]'>
                                        {col.map((d, j) => (d ? <span key={d.date} className={`aspect-square w-full rounded-[3px] ${NIVELES[d.level]}`} title={`${d.count} contribuciones el ${fechaLarga.format(new Date(`${d.date}T12:00:00`))}`} /> : <span key={`v${j}`} className='aspect-square w-full' />))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Esqueleto con la misma forma del mapa mientras carga (o si falla).
                            <div className={`grid min-w-[680px] grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px] ${estado === 'cargando' ? 'animate-pulse motion-reduce:animate-none' : 'opacity-50'}`} aria-hidden>
                                {Array.from({ length: SEMANAS }).map((_, i) => (
                                    <div key={i} className='flex flex-col gap-[3px]'>
                                        {Array.from({ length: 7 }).map((__, j) => (
                                            <span key={j} className='aspect-square w-full rounded-[3px] bg-raised' />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className='mt-5 flex items-center justify-end gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint' aria-hidden>
                        Menos
                        {NIVELES.map((n) => (
                            <span key={n} className={`h-[11px] w-[11px] rounded-[3px] ${n}`} />
                        ))}
                        Más
                    </div>
                </Animation>
            </div>
        </section>
    );
};
