import { Animation } from '@components/includes';
import { FC } from 'react';

export const Contact: FC = () => {
    return (
        <section id='contact' className='py-24 px-6 bg-slate-900/40'>
            <div className='max-w-2xl mx-auto text-center'>
                <Animation>
                    <p className='text-violet-400 text-sm font-mono mb-3 tracking-widest uppercase'>Contacto</p>
                    <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>¿Tienes un proyecto en mente?</h2>
                    <p className='text-slate-400 mb-10 leading-relaxed'>Estoy disponible para proyectos freelance, consultorías y desarrollo de software a medida. Construyamos algo juntos.</p>
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                        <a href='mailto:juan@mysoft.live' className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg shadow-violet-900/40'>
                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                                <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                            </svg>
                            juan@mysoft.live
                        </a>
                        <a href='https://juanmolina.dev' className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-xl font-medium transition-all duration-200 hover:scale-105'>
                            juanmolina.dev
                        </a>
                    </div>
                </Animation>
            </div>
        </section>
    );
};
