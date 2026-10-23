import { Animation, CaraMichi } from '@components/includes';
import { METRICAS, TONOS } from '@/data/portfolio';
import { CSSProperties, FC } from 'react';

/** Separa el sufijo ("+", "K+") para pintarlo del color de la cifra. */
function partes(valor: string): [string, string] {
    const m = valor.match(/^([\d.,]+)(.*)$/);
    return m ? [m[1], m[2]] : [valor, ''];
}

export const Metrics: FC = () => {
    return (
        <section aria-label='Cifras' data-escena='cifras' className='border-y border-line'>
            <div className='container-page grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
                {METRICAS.map((m, i) => {
                    const tono = TONOS[m.tono];
                    const [numero, sufijo] = partes(m.valor);
                    return (
                        <Animation key={m.valor} delay={i * 0.07} className='group flex items-center gap-5 py-9 sm:px-6 sm:py-11 sm:first:pl-0 lg:px-10'>
                            {/* Placa con la carita de Michi y un brillo del color de la cifra */}
                            <span className='relative grid h-[68px] w-[68px] shrink-0 place-items-center rounded-[22px] border border-line bg-surface shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]' style={{ '--tono': tono.var } as CSSProperties}>
                                <span className='absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_50%_70%,rgb(var(--tono)/0.22),transparent_70%)]' aria-hidden />
                                <CaraMichi gesto={m.gesto} className='relative h-[50px] w-[50px] transition-transform duration-500 ease-[cubic-bezier(0.34,1.45,0.64,1)] group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] motion-reduce:transition-none' />
                            </span>
                            <div className='min-w-0'>
                                <p className='font-mono text-[2.6rem] font-medium leading-none tracking-tight tabular-nums'>
                                    {numero}
                                    <span className={tono.texto}>{sufijo}</span>
                                </p>
                                <p className='mt-2.5 max-w-[30ch] text-sm leading-relaxed text-muted'>{m.texto}</p>
                            </div>
                        </Animation>
                    );
                })}
            </div>
        </section>
    );
};
