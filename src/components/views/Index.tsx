import { Companion } from '@components/includes';
import { FC } from 'react';
import { About, Contact, Footer, Github, Hero, Metrics, MoreProjects, Navbar, Projects, Services, Skills } from './inicio';

export const Index: FC = () => {
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
                <About />
                <Contact />
            </main>
            <Footer />
            <Companion />
        </>
    );
};
