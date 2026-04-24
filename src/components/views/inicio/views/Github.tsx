import { Animation } from '@components/includes';
import { FC } from 'react';

export const Github: FC = () => {
    const weeks = 20;
    const days = 7;

    const seed = (w: number, d: number) => {
        const v = Math.sin(w * 13 + d * 7) * 43758.5453;
        return v - Math.floor(v);
    };

    const getLevel = (w: number, d: number) => {
        if (d === 0 || d === 6) {
            return Math.random() < 0.3 ? 1 : 0;
        }

        const r = seed(w, d);

        if (r > 0.85) {
            return 4;
        }

        if (r > 0.65) {
            return 3;
        }

        if (r > 0.4) {
            return 2;
        }

        if (r > 0.2) {
            return 1;
        }

        return 0;
    };

    const colors = ['bg-slate-800', 'bg-violet-900/70', 'bg-violet-700/70', 'bg-violet-500/80', 'bg-violet-400'];

    return (
        <section id='github' className='py-24 px-6'>
            <div className='max-w-5xl mx-auto'>
                <Animation>
                    <div className='text-center mb-10'>
                        <p className='text-violet-400 text-sm font-mono mb-3 tracking-widest uppercase'>Open Source</p>
                        <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Actividad en GitHub</h2>
                        <p className='text-slate-500 max-w-lg mx-auto'>Contribuciones constantes a lo largo del año. Código que habla por sí solo.</p>
                    </div>
                    <div className='bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 md:p-8'>
                        <div className='flex items-center justify-between mb-6'>
                            <div>
                                <p className='text-white font-semibold text-lg'>@OuisVN</p>
                                <p className='text-slate-500 text-sm'>github.com/OuisVN</p>
                            </div>
                            <div className='text-right'>
                                <p className='text-violet-400 font-bold text-2xl'>1,658</p>
                                <p className='text-slate-500 text-sm'>contribuciones en 2025</p>
                            </div>
                        </div>
                        <div className='overflow-x-auto'>
                            <div className='flex gap-1 min-w-max'>
                                {Array.from({ length: weeks }).map((_, w) => (
                                    <div key={w} className='flex flex-col gap-1'>
                                        {Array.from({ length: days }).map((_, d) => {
                                            const level = getLevel(w, d);
                                            return <div key={d} className={`w-3 h-3 rounded-sm ${colors[level]}`} title={`${level * 3} contribuciones`} />;
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex items-center gap-2 mt-4 justify-end'>
                            <span className='text-xs text-slate-600'>Menos</span>
                            {colors.map((c, i) => (
                                <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                            ))}
                            <span className='text-xs text-slate-600'>Más</span>
                        </div>
                        <div className='mt-6 pt-6 border-t border-slate-800/60 flex flex-wrap gap-6 text-sm'>
                            {[
                                { label: 'Repos públicos', value: '20+' },
                                { label: 'Lenguaje principal', value: 'PHP' },
                                { label: 'Streak actual', value: 'Activo' },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <p className='text-slate-500 text-xs mb-0.5'>{label}</p>
                                    <p className='text-slate-200 font-medium'>{value}</p>
                                </div>
                            ))}
                            <div className='ml-auto'>
                                <a href='https://github.com/OuisVN' target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 hover:border-violet-700 text-slate-300 hover:text-white text-sm transition-all duration-200 hover:bg-violet-900/20'>
                                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                                        <path d='M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z' />
                                    </svg>
                                    Ver perfil
                                </a>
                            </div>
                        </div>
                    </div>
                </Animation>
            </div>
        </section>
    );
};
