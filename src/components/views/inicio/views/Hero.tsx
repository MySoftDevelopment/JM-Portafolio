import { FC } from 'react';

export const Hero: FC = () => {
    return (
        <section id='hero' className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            <div className='absolute inset-0 z-0'>
                <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-950/60 via-slate-950 to-slate-950' />
                <div className='absolute inset-0 opacity-[0.04]' style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
                <div className='absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(109,40,217,0.08),transparent)]' />
            </div>
            <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-violet-700/10 rounded-full blur-3xl animate-pulse' />
            <div className='absolute bottom-1/3 right-1/4 w-56 h-56 bg-indigo-600/10 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '2s' }} />

            <div className='relative z-10 max-w-4xl mx-auto px-6 text-center'>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-900/40 border border-violet-700/40 text-violet-300 text-sm mb-8 backdrop-blur-sm'>
                    <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
                    Disponible para proyectos freelance
                </div>
                <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight'>
                    Juan <span className='bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent'>Molina</span>
                </h1>
                <p className='text-xl md:text-2xl text-slate-400 mb-4 font-light'>Desarrollador de Software Fullstack</p>
                <p className='text-slate-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed'>Construyo aplicaciones web y sistemas empresariales robustos desde Colombia 🇨🇴</p>
                <div className='flex flex-wrap items-center justify-center gap-4'>
                    <a href='#projects' className='px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg shadow-violet-900/50'>
                        Ver proyectos
                    </a>
                    <a href='#contact' className='px-8 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium transition-all duration-200 hover:scale-105'>
                        Hablemos
                    </a>
                </div>
                <div className='mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-600'>
                    {[
                        { n: '6+', label: 'Años exp.' },
                        { n: '10+', label: 'Proyectos' },
                        { n: '1,658', label: 'Commits 2025' },
                        { n: '500K+', label: 'Contactos CRM' },
                    ].map(({ n, label }) => (
                        <div key={label} className='text-center'>
                            <div className='text-2xl font-bold text-slate-300'>{n}</div>
                            <div className='text-xs mt-1'>{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
