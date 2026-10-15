import { Animation } from '@components/includes';
import { SERVICIOS, TONOS, Tono } from '@/data/portfolio';
import { ArrowsLeftRight, Browser, DeviceMobile, HardDrives, Icon, PlugsConnected } from '@phosphor-icons/react';
import { FC } from 'react';

const ICONOS: Record<string, Icon> = {
    browser: Browser,
    phone: DeviceMobile,
    plug: PlugsConnected,
    arrows: ArrowsLeftRight,
    server: HardDrives,
};

const ORDEN: Tono[] = ['accent', 'sand', 'sage', 'accent', 'sand'];

export const Services: FC = () => {
    return (
        <section id='servicios' data-escena='servicios' className='border-t border-line py-24 md:py-36'>
            <div className='container-page grid gap-14 lg:grid-cols-12 lg:gap-16'>
                <div className='lg:col-span-5'>
                    <Animation className='lg:sticky lg:top-28'>
                        <h2 className='text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl'>
                            En qué te puedo <em className='not-italic text-sand'>ayudar</em>
                        </h2>
                        <p className='mt-6 max-w-[42ch] text-lg leading-relaxed text-muted'>Me encargo de todo el ciclo: entender el problema, diseñar la solución, programarla, ponerla en producción y mantenerla funcionando.</p>
                        <a href='#contacto' className='btn-primary mt-9'>
                            Escríbeme
                        </a>
                    </Animation>
                </div>

                <ul className='grid gap-3 lg:col-span-7'>
                    {SERVICIOS.map((s, i) => {
                        const Icono = ICONOS[s.icono];
                        const tono = TONOS[ORDEN[i]];
                        return (
                            <Animation as='li' key={s.titulo} delay={i * 0.05} className='card flex gap-5 p-6 md:p-7' style={{ ['--tono' as string]: tono.var }}>
                                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[12px] border border-line bg-canvas ${tono.texto}`}>
                                    <Icono size={21} weight='duotone' />
                                </span>
                                <div>
                                    <h3 className='text-[17px] font-semibold tracking-tight'>{s.titulo}</h3>
                                    <p className='mt-1.5 max-w-[56ch] text-[15px] leading-relaxed text-muted'>{s.texto}</p>
                                </div>
                            </Animation>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
