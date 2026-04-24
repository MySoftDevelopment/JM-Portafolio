import { Animation } from '@components/includes';
import { FC } from 'react';

export const About: FC = () => {
    return (
        <section id='about' className='py-24 px-6'>
            <div className='max-w-5xl mx-auto'>
                <Animation>
                    <div className='grid md:grid-cols-2 gap-12 items-center'>
                        <div>
                            <p className='text-violet-400 text-sm font-mono mb-3 tracking-widest uppercase'>Sobre mí</p>
                            <h2 className='text-3xl md:text-4xl font-bold text-white mb-6 leading-tight'>
                                Soluciones de software que <span className='text-violet-400'>realmente funcionan</span>
                            </h2>
                            <p className='text-slate-400 leading-relaxed mb-4'>Soy un desarrollador fullstack colombiano con especialización en PHP y un amplio ecosistema tecnológico. Me apasiona construir sistemas empresariales completos: desde ERPs hasta plataformas SaaS, siempre enfocado en la robustez y la experiencia de usuario.</p>
                            <p className='text-slate-400 leading-relaxed mb-6'>Mi stack principal gira en torno a PHP/Laravel en el backend y React/TypeScript en el frontend, combinado con experiencia en Python, Java y arquitecturas de API. He desarrollado sistemas con miles de usuarios activos y bases de datos con más de 500.000 registros.</p>
                            <div className='flex gap-4'>
                                <a href='mailto:juan@mysoft.live' className='inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors'>
                                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                        <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                                        <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                                    </svg>
                                    juan@mysoft.live
                                </a>
                                <a href='https://juanmolina.dev' className='inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors'>
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9' />
                                    </svg>
                                    juanmolina.dev
                                </a>
                            </div>
                        </div>
                        <div className='space-y-4'>
                            {[
                                { label: 'PHP / Laravel', pct: 95 },
                                { label: 'React / TypeScript', pct: 88 },
                                { label: 'MySQL / Bases de datos', pct: 90 },
                                { label: 'Python', pct: 72 },
                                { label: 'Java', pct: 70 },
                            ].map((s) => (
                                <div key={s.label}>
                                    <div className='flex justify-between text-sm mb-1.5'>
                                        <span className='text-slate-300'>{s.label}</span>
                                        <span className='text-slate-500'>{s.pct}%</span>
                                    </div>
                                    <div className='h-1.5 bg-slate-800 rounded-full overflow-hidden'>
                                        <div className='h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full transition-all duration-1000' style={{ width: `${s.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Animation>
            </div>
        </section>
    );
};
