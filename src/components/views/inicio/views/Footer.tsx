import { PERFIL } from '@/data/portfolio';
import { FC } from 'react';

interface Props {
    pagina?: 'inicio' | 'blog';
}

export const Footer: FC<Props> = ({ pagina = 'inicio' }) => {
    return (
        <footer className='border-t border-line py-10'>
            <div className='container-page flex flex-col gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-faint sm:flex-row sm:items-center sm:justify-between'>
                <p>
                    <span className='text-[13px] font-semibold normal-case tracking-normal text-ink'>
                        <span className='text-accent'>&lt;</span>JM<span className='text-accent'>/&gt;</span>
                    </span>
                    <span className='ml-3'>
                        © {new Date().getFullYear()} {PERFIL.nombre}
                    </span>
                </p>
                <nav className='flex flex-wrap gap-x-6 gap-y-3' aria-label='Pie de página'>
                    <a href='/blog/' className='hover:text-ink'>
                        Blog
                    </a>
                    <a href='/sobre-mi/' className='hover:text-ink'>
                        Sobre mí
                    </a>
                    <a href='/contacto/' className='hover:text-ink'>
                        Contacto
                    </a>
                    <a href={PERFIL.github} target='_blank' rel='noopener noreferrer' className='hover:text-ink'>
                        GitHub
                    </a>
                    <a href='/privacidad/' className='hover:text-ink'>
                        Privacidad
                    </a>
                    <a href='/terminos/' className='hover:text-ink'>
                        Términos
                    </a>
                    <a href={pagina === 'inicio' ? '#inicio' : '#'} className='hover:text-ink'>
                        Volver arriba
                    </a>
                </nav>
            </div>
        </footer>
    );
};
