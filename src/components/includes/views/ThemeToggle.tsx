import { Moon, Sun } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

type Tema = 'light' | 'dark';

/**
 * El tema inicial lo fija el script del layout: el guardado, o el oscuro por defecto.
 * El HTML se genera en el build sin saber el tema del visitante, así que el icono lo
 * elige el CSS (variante dark:) y el estado solo se sincroniza al montar.
 */
export function ThemeToggle() {
    const [tema, setTema] = useState<Tema>('dark');

    useEffect(() => {
        setTema(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    }, []);

    const cambiar = () => {
        const nuevo: Tema = tema === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = nuevo;
        try {
            localStorage.setItem('tema', nuevo);
        } catch {
            // Sin almacenamiento: el cambio dura solo esta visita.
        }
        setTema(nuevo);
    };

    return (
        <button type='button' onClick={cambiar} className='grid h-10 w-10 place-items-center rounded-full border border-line-strong text-muted transition-[color,transform] duration-200 hover:text-ink active:scale-95' aria-label={tema === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}>
            <Sun size={17} className='hidden dark:block' />
            <Moon size={17} className='dark:hidden' />
        </button>
    );
}
