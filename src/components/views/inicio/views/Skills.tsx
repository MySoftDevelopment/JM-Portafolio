import { Animation, TechLogo } from '@components/includes';
import { STACK } from '@/data/portfolio';
import { LOGOS } from '@/data/tech';
import { FC } from 'react';

export const Skills: FC = () => {
    return (
        <section id='stack' data-escena='stack' className='overflow-hidden border-t border-line py-24 md:py-36'>
            <div className='container-page'>
                <Animation className='max-w-3xl'>
                    <h2 className='text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl'>Herramientas de trabajo</h2>
                    <p className='mt-5 max-w-[52ch] text-lg leading-relaxed text-muted'>PHP y React son mi base. Alrededor, lo que cada proyecto necesite: apps nativas, tiempo real, mensajería y servidores propios.</p>
                </Animation>
            </div>

            <div className='group relative mt-16 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]' aria-hidden>
                <div className='animate-marquee flex w-max gap-4'>
                    {[...LOGOS, ...LOGOS].map((icon, i) => (
                        <span key={`${icon.slug}-${i}`} className='grid h-20 w-20 place-items-center rounded-[18px] border border-line bg-surface text-faint transition-colors duration-200 hover:text-ink'>
                            <TechLogo icon={icon} size={30} />
                        </span>
                    ))}
                </div>
            </div>

            <div className='container-page mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8'>
                {STACK.map((g, i) => (
                    <Animation key={g.grupo} delay={i * 0.05}>
                        <h3 className='font-mono text-[11px] uppercase tracking-[0.18em] text-faint'>{g.grupo}</h3>
                        <ul className='mt-4 space-y-2.5'>
                            {g.items.map((item) => (
                                <li key={item} className='text-[15px] text-ink/85'>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Animation>
                ))}
            </div>
        </section>
    );
};
