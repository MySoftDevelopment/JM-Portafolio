import type { Pose } from '@/lib/escena';
import { useId } from 'react';

/*
 * Bit, el robot del taller. SVG propio (viewBox 120 x 150) con:
 * cabeza-pantalla y ojos que parpadean, antena y pecho con el color de la escena (--brand),
 * mochila (su "memoria"), brazos con pivote en el hombro y un propulsor en vez de piernas.
 * Las poses cambian con transiciones CSS (interrumpibles) y un poco de rebote.
 */

// Ángulo de cada brazo (izquierdo, derecho). Positivo = horario: el izquierdo se abre, el derecho se cierra.
const BRAZOS: Record<Pose, [number, number]> = {
    saludar: [16, -152],
    senalar: [98, -12],
    mostrar: [64, -64],
    pensar: [14, 124],
    teclear: [-28, 28],
    celebrar: [156, -156],
};

type Cara = 'normal' | 'feliz' | 'pensar' | 'abajo';

const CARA: Record<Pose, Cara> = {
    saludar: 'feliz',
    senalar: 'normal',
    mostrar: 'feliz',
    pensar: 'pensar',
    teclear: 'abajo',
    celebrar: 'feliz',
};

const muelle = 'transform 650ms cubic-bezier(0.34, 1.45, 0.64, 1)';

function Brazo({ lado, angulo, pose }: { lado: 'izq' | 'der'; angulo: number; pose: Pose }) {
    const x = lado === 'izq' ? 36 : 84;
    // El brazo que saluda o teclea tiene además un vaivén propio, en un grupo interior.
    const vaiven = (pose === 'saludar' && lado === 'der') || pose === 'celebrar' ? 'robot-saludo' : pose === 'teclear' ? 'robot-tecleo' : '';

    return (
        <g style={{ transform: `rotate(${angulo}deg)`, transformOrigin: `${x}px 82px`, transformBox: 'view-box', transition: muelle }}>
            <g className={vaiven} style={{ transformOrigin: `${x}px 82px`, transformBox: 'view-box', animationDelay: lado === 'der' ? '0.15s' : '0s' }}>
                <rect x={x - 4.5} y={80} width={9} height={28} rx={4.5} fill='#3d405b' />
                <rect x={x - 4.5} y={80} width={4} height={28} rx={2} fill='#ffffff' opacity={0.08} />
                <circle cx={x} cy={110} r={6.5} fill='#f4f1de' />
                <circle cx={x - 1.5} cy={108.5} r={2} fill='#ffffff' opacity={0.6} />
            </g>
        </g>
    );
}

function Ojos({ cara, filtro }: { cara: Cara; filtro: string }) {
    const color = 'var(--brand, #e07a5f)';

    if (cara === 'feliz') {
        return (
            <g filter={`url(#${filtro})`} fill='none' stroke={color} strokeWidth={3.6} strokeLinecap='round'>
                <path d='M39 44 q6 -8 12 0' />
                <path d='M69 44 q6 -8 12 0' />
            </g>
        );
    }

    if (cara === 'pensar') {
        return (
            <g filter={`url(#${filtro})`} fill={color}>
                <rect x={40.5} y={35} width={9} height={12} rx={4.5} className='robot-parpadeo' />
                <rect x={68} y={40} width={14} height={3.6} rx={1.8} />
            </g>
        );
    }

    const dy = cara === 'abajo' ? 4 : 0;
    return (
        <g filter={`url(#${filtro})`} fill={color} className='robot-parpadeo'>
            <rect x={40.5} y={34 + dy} width={9} height={13} rx={4.5} />
            <rect x={70.5} y={34 + dy} width={9} height={13} rx={4.5} />
            <circle cx={47} cy={37.5 + dy} r={1.6} fill='#ffffff' opacity={0.9} />
            <circle cx={77} cy={37.5 + dy} r={1.6} fill='#ffffff' opacity={0.9} />
        </g>
    );
}

interface Props {
    pose?: Pose;
    className?: string;
    /** Sin sombra ni propulsor, para cuando el robot va sobre otra ilustración que ya los dibuja. */
    sinSombra?: boolean;
}

export function Robot({ pose = 'saludar', className = '', sinSombra = false }: Props) {
    const id = useId().replace(/:/g, '');
    const brillo = `brillo-${id}`;
    const [izq, der] = BRAZOS[pose];
    const cara = CARA[pose];
    const marca = 'var(--brand, #e07a5f)';

    return (
        <svg viewBox='0 0 120 150' className={`overflow-visible ${className}`} role='img' aria-label='Bit, el robot del taller'>
            <defs>
                <filter id={brillo} x='-50%' y='-50%' width='200%' height='200%'>
                    <feGaussianBlur stdDeviation='1.6' result='b' />
                    <feMerge>
                        <feMergeNode in='b' />
                        <feMergeNode in='SourceGraphic' />
                    </feMerge>
                </filter>
                <radialGradient id={`llama-${id}`} cx='50%' cy='0%' r='100%'>
                    <stop offset='0%' stopColor={marca} stopOpacity='0.95' />
                    <stop offset='100%' stopColor={marca} stopOpacity='0' />
                </radialGradient>
            </defs>

            {!sinSombra && <ellipse cx={60} cy={144} rx={24} ry={4.5} fill='#000000' opacity={0.35} className='robot-sombra' />}

            <g className='robot-flota'>
                {/* Propulsor y su llama */}
                <ellipse cx={60} cy={131} rx={11} ry={8} fill={`url(#llama-${id})`} className='robot-llama' />
                <path d='M48 116 h24 l-4 10 h-16 z' fill='#2b2d42' />
                <rect x={51} y={124} width={18} height={4} rx={2} fill={marca} opacity={0.9} />

                {/* Mochila (detrás del cuerpo) */}
                <rect x={27} y={78} width={12} height={32} rx={5} fill='#f2cc8f' />
                <rect x={29} y={84} width={8} height={3} rx={1.5} fill='#e07a5f' opacity={0.8} />

                <Brazo lado='izq' angulo={izq} pose={pose} />

                {/* Cuerpo */}
                <rect x={34} y={72} width={52} height={46} rx={17} fill='#3d405b' />
                <rect x={38} y={74} width={20} height={40} rx={10} fill='#ffffff' opacity={0.06} />
                <rect x={44} y={85} width={32} height={17} rx={6} fill='#141414' />
                <g fill={marca} filter={`url(#${brillo})`}>
                    {[0, 1, 2, 3].map((i) => (
                        <rect key={i} x={48 + i * 6.5} y={89} width={4} height={9} rx={2} className='robot-barra' style={{ animationDelay: `${i * 0.18}s`, transformOrigin: `${50 + i * 6.5}px 98px`, transformBox: 'view-box' }} />
                    ))}
                </g>
                <circle cx={60} cy={110} r={2.5} fill='#f2cc8f' />

                <Brazo lado='der' angulo={der} pose={pose} />

                {/* Cuello y cabeza */}
                <rect x={53} y={63} width={14} height={11} rx={4} fill='#2b2d42' />
                <g className={pose === 'pensar' ? 'robot-ladeo' : ''} style={{ transformOrigin: '60px 66px', transformBox: 'view-box' }}>
                    <rect x={15} y={31} width={9} height={18} rx={4} fill='#f2cc8f' />
                    <rect x={96} y={31} width={9} height={18} rx={4} fill='#f2cc8f' />
                    <rect x={21} y={13} width={78} height={55} rx={21} fill='#f4f1de' />
                    <rect x={25} y={15} width={40} height={20} rx={10} fill='#ffffff' opacity={0.35} />
                    <rect x={29} y={21} width={62} height={39} rx={14} fill='#1b1a19' />
                    <Ojos cara={cara} filtro={brillo} />
                    <circle cx={36} cy={53} r={3.4} fill='#e07a5f' opacity={0.75} />
                    <circle cx={84} cy={53} r={3.4} fill='#e07a5f' opacity={0.75} />
                    {cara === 'feliz' ? <path d='M53 51 q7 6 14 0' fill='none' stroke={marca} strokeWidth={2.6} strokeLinecap='round' /> : <path d='M55 53 h10' stroke={marca} strokeWidth={2.4} strokeLinecap='round' opacity={0.85} />}

                    {/* Antena */}
                    <path d='M60 13 V4' stroke='#3d405b' strokeWidth={2.6} strokeLinecap='round' />
                    <circle cx={60} cy={3.5} r={4.6} fill={marca} filter={`url(#${brillo})`} className='robot-antena' style={{ transformOrigin: '60px 3.5px', transformBox: 'view-box' }} />
                </g>

                {/* Accesorios por pose */}
                {pose === 'pensar' && (
                    <g fill='#f4f1de'>
                        <circle cx={104} cy={10} r={2.2} className='robot-idea' />
                        <circle cx={111} cy={2} r={3} className='robot-idea' style={{ animationDelay: '0.2s' }} />
                        <circle cx={120} cy={-8} r={4} className='robot-idea' style={{ animationDelay: '0.4s' }} />
                    </g>
                )}
                {pose === 'teclear' && (
                    <g>
                        <path d='M30 112 h60 l6 12 h-72 z' fill='#2b2d42' />
                        <path d='M36 112 l4 -20 h40 l4 20 z' fill='#1b1a19' stroke={marca} strokeWidth={1.2} />
                        <g fill={marca} opacity={0.85}>
                            <rect x={44} y={97} width={18} height={2} rx={1} className='robot-codigo' />
                            <rect x={44} y={102} width={26} height={2} rx={1} className='robot-codigo' style={{ animationDelay: '0.3s' }} />
                            <rect x={44} y={107} width={12} height={2} rx={1} className='robot-codigo' style={{ animationDelay: '0.6s' }} />
                        </g>
                    </g>
                )}
                {pose === 'celebrar' && (
                    <g>
                        {['#e07a5f', '#f2cc8f', '#81b29a', '#f4f1de', '#e07a5f', '#81b29a'].map((c, i) => (
                            <rect key={i} x={30 + i * 12} y={30} width={4} height={7} rx={1} fill={c} className='robot-confeti' style={{ animationDelay: `${i * 0.12}s`, ['--dx' as string]: `${(i - 2.5) * 14}px` }} />
                        ))}
                    </g>
                )}
            </g>
        </svg>
    );
}
