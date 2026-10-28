import { EntradaResumen } from '@/lib/blog';
import { FC } from 'react';
import { About, Blog, Contact, Footer, Github, Hero, Metrics, MoreProjects, Navbar, Projects, Services, Skills } from './inicio';

interface Props {
    /** Últimas entradas del blog; las lee la página de Astro en el build. */
    entradas: EntradaResumen[];
}

/** Michi (Companion) no va aquí: se monta aparte, solo en el navegador (ver pages/index.astro). */
export const Index: FC<Props> = ({ entradas }) => {
    return (
        <>
            <a href='#contenido' className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas'>
                Saltar al contenido
            </a>
            <Navbar />
            <main id='contenido'>
                <Hero />
                <Metrics />
                <Projects />
                <MoreProjects />
                <Services />
                <Skills />
                <Github />
                <Blog entradas={entradas} />
                <About />
                <Contact />
            </main>
            <Footer />
        </>
    );
};
