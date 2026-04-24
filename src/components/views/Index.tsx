import { FC } from 'react';
import { About, Contact, Footer, Github, Hero, Navbar, Projects, Skills } from './inicio';

export const Index: FC = () => {
    return (
        <div className='min-h-screen bg-slate-950 text-white antialiased'>
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Github />
            <Contact />
            <Footer />
        </div>
    );
};
