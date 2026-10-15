import { Animation } from '@components/includes';
import { METRICAS, TONOS } from '@/data/portfolio';
import { FC } from 'react';

// Bordes entre celdas: 1 columna en móvil, 2 en tablet y 4 en escritorio.
const celda = (i: number) =>
    [
        'py-9 sm:py-11',
        i % 2 === 0 ? 'sm:pr-8' : 'sm:border-l sm:border-line sm:pl-8',
        i >= 2 ? 'sm:border-t sm:border-line lg:border-t-0' : '',
        i > 0 ? 'lg:border-l lg:border-line lg:pl-8' : '',
    ].join(' ');

export const Metrics: FC = () => {
    return (
        <section aria-label='Cifras' data-escena='cifras' className='border-y border-line'>
            <div className='container-page grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4'>
                {METRICAS.map((m, i) => (
                    <Animation key={m.valor} delay={i * 0.06} className={celda(i)}>
                        <div className='flex items-center gap-3'>
                            <span className={`h-[18px] w-[18px] rounded-[5px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] ${TONOS[m.tono].fondo}`} aria-hidden />
                            <p className='font-mono text-[2.5rem] font-medium leading-none tracking-tight tabular-nums'>{m.valor}</p>
                        </div>
                        <p className='mt-4 max-w-[28ch] text-sm leading-relaxed text-muted'>{m.texto}</p>
                    </Animation>
                ))}
            </div>
        </section>
    );
};
