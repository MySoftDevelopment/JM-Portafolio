import { ESCENAS, observarEscenas, useEscena } from '@/lib/escena';
import { X } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Robot } from './Robot';

const CLAVE = 'bit-oculto';

function leerOculto() {
    try {
        return localStorage.getItem(CLAVE) === '1';
    } catch {
        return false;
    }
}

/**
 * Bit acompaña el recorrido: aparece al salir del hero (allí ya está dentro del taller),
 * cambia de pose y de mensaje según la sección y se puede ocultar.
 */
export function Companion() {
    const escena = useEscena();
    const reduce = useReducedMotion();
    const [oculto, setOculto] = useState(leerOculto);
    const [globo, setGlobo] = useState(true);
    const temporizador = useRef<number>();
    const datos = ESCENAS[escena] ?? ESCENAS.inicio;
    const enHero = escena === 'inicio';

    useEffect(() => observarEscenas(), []);

    // El globo aparece en cada cambio de escena y se esconde solo para no tapar el contenido
    // (más rápido en móvil). Tocar a Bit lo vuelve a mostrar.
    useEffect(() => {
        setGlobo(true);
        window.clearTimeout(temporizador.current);
        const espera = window.matchMedia('(max-width: 767px)').matches ? 4500 : 7000;
        temporizador.current = window.setTimeout(() => setGlobo(false), espera);
        return () => window.clearTimeout(temporizador.current);
    }, [escena]);

    const cambiarOculto = (valor: boolean) => {
        setOculto(valor);
        try {
            localStorage.setItem(CLAVE, valor ? '1' : '0');
        } catch {
            // Sin almacenamiento: dura solo esta visita.
        }
    };

    const muelle = reduce ? { duration: 0 } : { type: 'spring' as const, duration: 0.7, bounce: 0.25 };

    return (
        <div className='pointer-events-none fixed bottom-3 right-3 z-30 flex items-end gap-2 sm:bottom-5 sm:right-5'>
            <AnimatePresence>
                {!enHero && !oculto && (
                    <motion.div key='bit' className='pointer-events-auto flex items-end gap-1' initial={{ opacity: 0, y: 120 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 120 }} transition={muelle}>
                        <AnimatePresence mode='wait'>
                            {globo && (
                                <motion.div key={escena} role='status' aria-live='polite' className='relative mb-16 max-w-[220px] rounded-[16px] rounded-br-[4px] bg-[#f4f1de] px-4 py-3 text-[13px] font-medium leading-snug text-[#1b1a19] shadow-[0_18px_40px_-16px_rgb(0_0_0/0.6)] sm:mb-20 sm:max-w-[250px]' initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, filter: 'blur(4px)', transition: { duration: 0.15 } }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
                                    <span className='mb-1 flex items-center justify-between gap-3'>
                                        <span className='font-mono text-[10px] uppercase tracking-[0.18em] text-[#6d6a60]'>
                                            <span className='mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle' style={{ background: 'var(--brand)' }} />
                                            Bit
                                        </span>
                                        <button type='button' onClick={() => cambiarOculto(true)} className='-mr-1.5 grid h-6 w-6 place-items-center rounded-full text-[#6d6a60] transition-colors hover:bg-black/5 hover:text-[#1b1a19]' aria-label='Ocultar a Bit'>
                                            <X size={12} weight='bold' />
                                        </button>
                                    </span>
                                    {datos.mensaje}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <button type='button' onClick={() => setGlobo((g) => !g)} className='relative h-[100px] w-[80px] transition-transform active:scale-95 sm:h-[150px] sm:w-[120px]' aria-label={globo ? 'Esconder el mensaje de Bit' : 'Ver el mensaje de Bit'}>
                            <Robot pose={datos.pose} className='h-full w-full' />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!enHero && oculto && (
                    <motion.button key='volver' type='button' onClick={() => cambiarOculto(false)} className='pointer-events-auto flex h-10 items-center gap-2 rounded-full border border-line-strong bg-surface/90 pl-2 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted shadow-lg backdrop-blur transition-colors hover:text-ink' initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                        <span className='grid h-6 w-6 place-items-center rounded-full' style={{ background: 'var(--brand)' }}>
                            <span className='h-2 w-2 rounded-full bg-[#1b1a19]' />
                        </span>
                        Traer a Bit
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
