import { Moon, Sun } from '@phosphor-icons/react';
import { useState } from 'react';

type Tema = 'light' | 'dark';

/** El tema inicial lo fija el script de index.html: el guardado, o el oscuro por defecto. */
export function ThemeToggle() {
    const [tema, setTema] = useState<Tema>(() => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'));

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
            {tema === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
    );
}
