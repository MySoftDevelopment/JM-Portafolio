import { Animation } from '@components/includes';
import { PERFIL } from '@/data/portfolio';
import { Check, Copy, GithubLogo, InstagramLogo, PaperPlaneTilt } from '@phosphor-icons/react';
import { FC, FormEvent, useEffect, useRef, useState } from 'react';

const TIPOS = ['Plataforma web o ERP', 'App móvil', 'Integración (WhatsApp, pagos...)', 'Mantenimiento o mejora', 'Otro'];

const campo = 'w-full rounded-[12px] border border-line-strong bg-canvas px-4 py-3 text-[16px] text-ink placeholder:text-faint transition-[border-color,box-shadow] duration-200 focus:border-sand focus:outline-none focus:ring-2 focus:ring-sand/25';

/** No hay backend: el formulario arma el correo y lo abre en la app de correo del visitante. */
export const Contact: FC = () => {
    const [toast, setToast] = useState(false);
    const [error, setError] = useState('');
    const temporizador = useRef<number>();

    useEffect(() => () => window.clearTimeout(temporizador.current), []);

    const copiar = async () => {
        try {
            await navigator.clipboard.writeText(PERFIL.correo);
            setToast(true);
            window.clearTimeout(temporizador.current);
            temporizador.current = window.setTimeout(() => setToast(false), 2200);
        } catch {
            window.location.href = `mailto:${PERFIL.correo}`;
        }
    };

    const enviar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const datos = new FormData(e.currentTarget);
        const nombre = String(datos.get('nombre') ?? '').trim();
        const tipo = String(datos.get('tipo') ?? '');
        const mensaje = String(datos.get('mensaje') ?? '').trim();

        if (!nombre || !mensaje) {
            setError('Escribe tu nombre y cuéntame un poco del proyecto.');
            return;
        }

        setError('');
        const asunto = `Proyecto: ${tipo} (${nombre})`;
        const cuerpo = `Hola Juan,\n\n${mensaje}\n\n${nombre}`;
        window.location.href = `mailto:${PERFIL.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    };

    return (
        <section id='contacto' data-escena='contacto' className='border-t border-line py-24 md:py-36'>
            <div className='container-page grid gap-14 lg:grid-cols-2 lg:gap-20'>
                <Animation>
                    <p className='kicker mb-7'>Contacto</p>
                    <h2 className='max-w-[13ch] text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.035em] md:text-[4.6rem]'>
                        ¿Tienes un proyecto en <em className='not-italic text-sand'>mente</em>?
                    </h2>
                    <p className='mt-7 max-w-[44ch] text-lg leading-relaxed text-muted'>Cuéntame qué necesitas. Te respondo con preguntas concretas y una propuesta clara, sin compromiso.</p>

                    <div className='mt-10 flex flex-wrap items-center gap-2'>
                        <a href={`mailto:${PERFIL.correo}`} className='btn-primary'>
                            {PERFIL.correo}
                        </a>
                        <button type='button' onClick={copiar} className='btn-ghost w-11 px-0' aria-label='Copiar correo'>
                            <Copy size={16} />
                        </button>
                    </div>

                    <div className='mt-8 flex flex-wrap gap-2'>
                        <a href={PERFIL.github} target='_blank' rel='noopener noreferrer' className='btn-ghost h-9 px-4'>
                            <GithubLogo size={15} /> GitHub
                        </a>
                        <a href={PERFIL.instagram} target='_blank' rel='noopener noreferrer' className='btn-ghost h-9 px-4'>
                            <InstagramLogo size={15} /> MySoft
                        </a>
                    </div>
                </Animation>

                <Animation delay={0.08}>
                    <form onSubmit={enviar} noValidate className='card p-6 md:p-8'>
                        <div className='grid gap-5'>
                            <div className='grid gap-2'>
                                <label htmlFor='nombre' className='font-mono text-[11px] uppercase tracking-[0.14em] text-muted'>
                                    Nombre
                                </label>
                                <input id='nombre' name='nombre' autoComplete='name' className={campo} />
                            </div>
                            <div className='grid gap-2'>
                                <label htmlFor='tipo' className='font-mono text-[11px] uppercase tracking-[0.14em] text-muted'>
                                    Tipo de proyecto
                                </label>
                                <select id='tipo' name='tipo' className={campo} defaultValue={TIPOS[0]}>
                                    {TIPOS.map((t) => (
                                        <option key={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='grid gap-2'>
                                <label htmlFor='mensaje' className='font-mono text-[11px] uppercase tracking-[0.14em] text-muted'>
                                    Cuéntame del proyecto
                                </label>
                                <textarea id='mensaje' name='mensaje' rows={5} className={`${campo} resize-y`} aria-describedby='mensaje-ayuda' />
                                <p id='mensaje-ayuda' className='text-sm text-muted'>
                                    Qué hace tu negocio, qué te gustaría resolver y para cuándo.
                                </p>
                            </div>
                            {error && (
                                <p className='text-sm text-accent' role='alert'>
                                    {error}
                                </p>
                            )}
                            <button type='submit' className='btn-primary w-full sm:w-auto sm:justify-self-start'>
                                Enviar mensaje
                                <PaperPlaneTilt size={16} weight='bold' />
                            </button>
                        </div>
                    </form>
                </Animation>
            </div>

            {/* Toast de "copiado": transición (no keyframes) para que se pueda interrumpir si se copia de nuevo. */}
            <div role='status' aria-live='polite' className={`fixed bottom-6 left-1/2 z-50 flex items-center gap-2.5 rounded-[14px] bg-[#f4f1de] py-2.5 pl-3 pr-4 text-[13px] font-semibold text-[#141414] shadow-[0_20px_50px_-15px_rgb(0_0_0/0.6)] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity ${toast ? 'translate-x-[-50%] translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-x-[-50%] translate-y-3 scale-95 opacity-0'}`}>
                <span className='grid h-[22px] w-[22px] place-items-center rounded-full bg-[#81b29a]'>
                    <Check size={12} weight='bold' />
                </span>
                {toast ? 'Correo copiado' : ''}
                {toast && <small className='font-mono text-[10.5px] font-normal text-[#5a574e]'>{PERFIL.correo}</small>}
            </div>
        </section>
    );
};
