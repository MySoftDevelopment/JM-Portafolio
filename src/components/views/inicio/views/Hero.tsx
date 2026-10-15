import { ArrowDown } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { FC } from 'react';
import { Workshop } from './Workshop';

const ease = [0.23, 1, 0.32, 1] as const;

export const Hero: FC = () => {
    const reduce = useReducedMotion();
    const entrada = (delay: number) => (reduce ? {} : { initial: { opacity: 0, transform: 'translateY(16px)' }, animate: { opacity: 1, transform: 'translateY(0px)' }, transition: { duration: 0.9, delay, ease } });

    return (
        <section id='inicio' data-escena='inicio' className='relative pt-28 md:pt-32'>
            <div className='container-page grid items-center gap-10 pb-16 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:pb-20'>
                <div>
                    <motion.p {...entrada(0)} className='kicker mb-8'>
                        Desarrollador fullstack · Colombia
                    </motion.p>

                    <motion.h1 {...entrada(0.06)} className='text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-[4.2rem] lg:text-[5.4rem]'>
                        Software que funciona en el mundo <em className='not-italic text-sand'>real</em>
                        <span className='puntos ml-[0.06em] inline-flex gap-[0.09em]' aria-hidden>
                            <i />
                            <i />
                            <i />
                        </span>
                    </motion.h1>

                    <motion.p {...entrada(0.14)} className='mt-8 max-w-[46ch] text-[17px] leading-relaxed text-muted'>
                        Soy <strong className='font-semibold text-ink'>Juan Molina</strong>. Construyo plataformas web, apps móviles y ERPs para colegios, academias y empresas en Colombia.
                    </motion.p>

                    <motion.div {...entrada(0.22)} className='mt-10 flex flex-wrap items-center gap-3'>
                        <a href='#contacto' className='btn-primary'>
                            Escríbeme
                        </a>
                        <a href='#proyectos' className='btn-ghost'>
                            <ArrowDown size={14} weight='bold' />
                            Ver proyectos
                        </a>
                        <span className='ml-1 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint'>
                            <span className='relative flex h-2 w-2'>
                                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60 motion-reduce:animate-none' />
                                <span className='relative inline-flex h-2 w-2 rounded-full bg-sage' />
                            </span>
                            Disponible
                        </span>
                    </motion.div>
                </div>

                <motion.div className='relative mx-auto w-full max-w-[680px] lg:-mr-6' initial={reduce ? false : { opacity: 0, transform: 'translateY(28px) scale(0.97)' }} animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }} transition={{ duration: 1.1, delay: 0.15, ease }}>
                    <Workshop />
                </motion.div>
            </div>
        </section>
    );
};
