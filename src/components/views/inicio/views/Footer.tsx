import { FC } from 'react';

export const Footer: FC = () => {
    return (
        <footer className='border-t border-slate-800/60 py-8 px-6'>
            <div className='max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-sm'>
                <span className='font-mono'>
                    <span className='text-violet-500'>&lt;</span>JM<span className='text-violet-500'>/&gt;</span> Juan Molina — juanmolina.dev
                </span>
                <span>Portafolio desarrollado con React + Typescript + Tailwind CSS.</span>
            </div>
        </footer>
    );
};
