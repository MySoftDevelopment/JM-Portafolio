import { FC, useEffect, useState } from 'react';

export const Navbar: FC = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const NAV_LINKS = [
        { label: 'Inicio', href: '#hero' },
        { label: 'Sobre mí', href: '#about' },
        { label: 'Habilidades', href: '#skills' },
        { label: 'Proyectos', href: '#projects' },
        { label: 'Contacto', href: '#contact' },
    ];

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);

        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/60 shadow-lg' : ''}`}>
            <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
                <a href='#hero' className='font-bold text-lg tracking-tight text-white font-mono'>
                    <span className='text-violet-400'>&lt;</span>JM
                    <span className='text-violet-400'>/&gt;</span>
                </a>
                <div className='hidden md:flex items-center gap-8'>
                    {NAV_LINKS.map((l) => (
                        <a key={l.href} href={l.href} className='text-sm text-slate-400 hover:text-white transition-colors duration-200'>
                            {l.label}
                        </a>
                    ))}
                    <a href='mailto:juan@mysoft.live' className='text-sm px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors duration-200 font-medium'>
                        Contactar
                    </a>
                </div>
                <button className='md:hidden text-slate-400 hover:text-white' onClick={() => setOpen(!open)}>
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        {open ? <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /> : <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />}
                    </svg>
                </button>
            </div>
            {open && (
                <div className='md:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800/60 px-6 py-4 flex flex-col gap-4'>
                    {NAV_LINKS.map((l) => (
                        <a key={l.href} href={l.href} className='text-slate-300 hover:text-white' onClick={() => setOpen(false)}>
                            {l.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};
