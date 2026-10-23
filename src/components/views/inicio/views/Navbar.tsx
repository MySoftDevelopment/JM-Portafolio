import { ThemeToggle } from '@components/includes';
import { List, X } from '@phosphor-icons/react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { FC, useEffect, useState } from 'react';

const ENLACES = [
    { texto: 'Proyectos', href: '#proyectos' },
    { texto: 'Servicios', href: '#servicios' },
    { texto: 'Stack', href: '#stack' },
    { texto: 'Sobre mí', href: '#sobre-mi' },
];

export const Navbar: FC = () => {
    const [abierto, setAbierto] = useState(false);
    const [desplazado, setDesplazado] = useState(false);
    const [activo, setActivo] = useState('');
    const { scrollY } = useScroll();
    const reduce = useReducedMotion();

    useMotionValueEvent(scrollY, 'change', (y) => setDesplazado(y > 24));

    // Resalta la sección visible sin escuchar el scroll en cada fotograma.
    useEffect(() => {
        const secciones = ENLACES.map((e) => document.querySelector(e.href)).filter(Boolean) as Element[];
        const obs = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((e) => {
                    if (e.isIntersecting) setActivo(`#${e.target.id}`);
                });
            },
            { rootMargin: '-45% 0px -50% 0px' },
        );

        secciones.forEach((s) => obs.observe(s));
        return () => obs.disconnect();
    }, []);

    return (
        <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${desplazado || abierto ? 'border-b border-line bg-canvas/80 backdrop-blur-xl' : 'border-b border-transparent'}`}>
            <nav className='container-page flex h-16 items-center justify-between gap-6' aria-label='Principal'>
                <a href='#inicio' className='font-mono text-[15px] font-semibold tracking-tight' aria-label='Juan Molina, ir al inicio'>
                    <span className='text-accent'>&lt;</span>JM<span className='text-accent'>/&gt;</span>
                </a>

                <div className='hidden items-center gap-1 md:flex'>
                    {ENLACES.map((e) => (
                        <a key={e.href} href={e.href} aria-current={activo === e.href ? 'true' : undefined} className={`relative rounded-full px-3.5 py-2 font-mono text-[11.5px] uppercase tracking-[0.14em] transition-colors duration-200 ${activo === e.href ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                            {e.texto}
                            <span className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-sand transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${activo === e.href ? 'scale-x-100' : 'scale-x-0'}`} aria-hidden />
                        </a>
                    ))}
                </div>

                <div className='flex items-center gap-3'>
                    <ThemeToggle />
                    <a href='#contacto' className='btn-primary hidden h-[34px] [--relieve:transparent] sm:inline-flex'>
                        Escríbeme
                    </a>
                    <button type='button' className='grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink transition-transform active:scale-95 md:hidden' onClick={() => setAbierto(!abierto)} aria-expanded={abierto} aria-controls='menu-movil' aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}>
                        {abierto ? <X size={18} /> : <List size={18} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {abierto && (
                    <motion.div id='menu-movil' className='overflow-hidden md:hidden' initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                        <div className='container-page flex flex-col gap-1 pb-6 pt-2'>
                            {[...ENLACES, { texto: 'Contacto', href: '#contacto' }].map((e) => (
                                <a key={e.href} href={e.href} onClick={() => setAbierto(false)} className='rounded-[12px] px-3 py-3 text-lg text-ink hover:bg-surface'>
                                    {e.texto}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
