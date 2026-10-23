import { Animation } from '@components/includes';
import { FC } from 'react';

export const About: FC = () => {
    return (
        <section id='sobre-mi' data-escena='sobre' className='border-t border-line py-24 md:py-36'>
            <div className='container-page grid gap-8 lg:grid-cols-12 lg:gap-16'>
                <Animation className='lg:col-span-4'>
                    <h2 data-percha className='text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl'>
                        Sobre <em className='not-italic text-sand'>mí</em>
                    </h2>
                </Animation>

                <Animation delay={0.08} className='lg:col-span-8'>
                    <div className='max-w-[60ch] space-y-6 text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed'>
                        <p><strong className='font-semibold text-ink'>Soy desarrollador fullstack en Colombia.</strong> Llevo más de diez años construyendo software para negocios que dependen de él todos los días: colegios, academias, fábricas, ópticas y tiendas.</p>
                        <p>No entrego un proyecto y desaparezco. Me quedo para desplegarlo, vigilarlo y hacerlo crecer. Varios de los sistemas de esta página llevan años en producción y siguen sumando módulos.</p>
                        <p>
                            También soy el creador de <span className='font-medium text-ink'>MySoft</span>, mi marca de software para pequeñas y medianas empresas.
                        </p>
                    </div>
                </Animation>
            </div>
        </section>
    );
};
