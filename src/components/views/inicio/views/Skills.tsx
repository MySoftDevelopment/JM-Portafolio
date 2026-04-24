import { Animation } from '@components/includes';
import { FC } from 'react';

export const Skills: FC = () => {
    const SKILLS = {
        Backend: ['PHP', 'Laravel', 'Python', 'Java', 'Node.js'],
        Frontend: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'SCSS', 'Bootstrap'],
        'Bases de datos': ['MySQL', 'PostgreSQL', 'SQLite'],
        Otros: ['Git', 'REST APIs', 'WhatsApp API', 'Linux', 'Docker'],
    };

    return (
        <section id='skills' className='py-24 px-6 bg-slate-900/40'>
            <div className='max-w-5xl mx-auto'>
                <Animation>
                    <div className='text-center mb-14'>
                        <p className='text-violet-400 text-sm font-mono mb-3 tracking-widest uppercase'>Tecnologías</p>
                        <h2 className='text-3xl md:text-4xl font-bold text-white'>Stack tecnológico</h2>
                    </div>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {Object.entries(SKILLS).map(([cat, items]) => (
                            <div key={cat} className='bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 hover:border-violet-800/50 transition-colors duration-300'>
                                <h3 className='text-sm font-mono text-violet-400 mb-4 uppercase tracking-wider'>{cat}</h3>
                                <div className='flex flex-wrap gap-2'>
                                    {items.map((skill) => (
                                        <span key={skill} className='px-3 py-1 text-xs rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50'>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Animation>
            </div>
        </section>
    );
};
