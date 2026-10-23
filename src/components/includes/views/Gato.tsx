import { GatoPose, Gesto, Mirada } from '@/lib/michi';
import { useId } from 'react';

/*
 * Michi, el gato del taller. SVG propio (viewBox 120 x 150, como antes Bit) con tres vistas
 * que comparten la misma cabeza:
 *  - de frente, sentado: orejas que se mueven, ojos que parpadean y siguen el cursor, collar
 *    con un cascabel del color de la escena (--brand), cola que se mece y patas con pivote;
 *  - de perfil, para saltar como un gato real: se agacha y menea la cola, vuela estirado
 *    y aterriza amortiguando;
 *  - panza arriba, rodando de un lado a otro.
 * Las poses cambian con transiciones CSS (interrumpibles) y un poco de rebote.
 * La bola de estambre y los adornos pueden salirse del viewBox (overflow visible).
 */

// Atigrado naranja claro: cara inspirada en un gato de ojos enormes y hocico abultado.
const C = {
    naranja: '#eb9a52',
    naranjaOsc: '#c9702f',
    claro: '#f6c88e',
    crema: '#f8ead2',
    rosa: '#e07a5f',
    nariz: '#eba1a0',
    ojo: '#17100c',
    iris: '#6e4a2a',
    tinta: '#1b1a19',
    salvia: '#81b29a',
    salviaOsc: '#5f8f78',
};

const DE_PERFIL: GatoPose[] = ['preparar', 'saltar', 'aterrizar'];

// Ángulo de cada pata delantera en la vista de frente (izquierda, derecha). Positivo = horario.
const PATAS: Partial<Record<GatoPose, [number, number]>> = {
    jugar: [26, 0],
    teclear: [-10, 10],
};

type Cara = 'normal' | 'feliz' | 'dormido' | 'concentrado';

const CARA: Partial<Record<GatoPose, Cara>> = {
    maullar: 'feliz',
    teclear: 'concentrado',
    dormir: 'dormido',
    panza: 'feliz',
};

const muelle = 'transform 650ms cubic-bezier(0.34, 1.45, 0.64, 1)';

function Pata({ lado, angulo, jugando }: { lado: 'izq' | 'der'; angulo: number; jugando: boolean }) {
    const x = lado === 'izq' ? 50 : 70;
    return (
        <g style={{ transform: `rotate(${angulo}deg)`, transformOrigin: `${x}px 106px`, transformBox: 'view-box', transition: muelle }}>
            {/* La pata que juega da zarpazos al estambre, en un grupo interior. */}
            <g className={jugando ? 'gato-zarpazo' : ''} style={{ transformOrigin: `${x}px 106px`, transformBox: 'view-box' }}>
                <rect x={x - 5} y={104} width={10} height={34} rx={5} fill={C.naranja} />
                <rect x={x - 5} y={104} width={4} height={30} rx={2} fill='#ffffff' opacity={0.12} />
                <ellipse cx={x} cy={138.5} rx={6.8} ry={4.4} fill={C.crema} />
                <path d={`M${x - 2} 136.5 v3 M${x + 2} 136.5 v3`} stroke={C.naranjaOsc} strokeWidth={1} strokeLinecap='round' opacity={0.5} />
            </g>
        </g>
    );
}

/** Ojos grandes, redondos y casi negros (pupila dilatada), con dos brillos: la mirada tierna. */
function Ojo({ cx, cara, mirada }: { cx: number; cara: Cara; mirada: Mirada }) {
    if (cara === 'feliz') return <path d={`M${cx - 6.5} 59 q6.5 -8 13 0`} fill='none' stroke={C.ojo} strokeWidth={3} strokeLinecap='round' />;
    if (cara === 'dormido') return <path d={`M${cx - 6.5} 57 q6.5 6 13 0`} fill='none' stroke={C.ojo} strokeWidth={2.8} strokeLinecap='round' />;

    const concentrado = cara === 'concentrado';
    const dy = concentrado ? 2.6 : 0;
    // Hacia el centro de la cara: la ceja fruncida baja por ese lado.
    const adentro = cx < 60 ? 1 : -1;
    return (
        <g className='gato-parpadeo'>
            {/* Pelo claro alrededor del ojo */}
            <circle cx={cx} cy={57} r={10.4} fill={C.claro} opacity={0.75} />
            <circle cx={cx} cy={57} r={8.6} fill={C.iris} />
            <g style={{ transform: `translate(${mirada * 1.4}px, ${dy}px)`, transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)' }}>
                <circle cx={cx} cy={57} r={7.5} fill={C.ojo} />
                <circle cx={cx + 2.7} cy={53.9} r={2.7} fill='#ffffff' opacity={0.95} />
                <circle cx={cx - 2.4} cy={59.8} r={1.1} fill='#ffffff' opacity={0.7} />
            </g>
            {/* Concentrado: párpados entrecerrados mirando la pantalla y cejas fruncidas */}
            {concentrado && (
                <g>
                    <path d={`M${cx - 10.6} 55.2 A10.8 10.8 0 0 1 ${cx + 10.6} 55.2 Z`} fill={C.naranja} />
                    <path d={`M${cx - 8.6} 55.2 Q${cx} 57.6 ${cx + 8.6} 55.2`} fill='none' stroke={C.ojo} strokeWidth={1.8} strokeLinecap='round' />
                    <path d={`M${cx - adentro * 6} 45.6 Q${cx} 45.4 ${cx + adentro * 4.5} 47.2`} fill='none' stroke={C.naranjaOsc} strokeWidth={2.2} strokeLinecap='round' />
                </g>
            )}
        </g>
    );
}

interface CabezaProps {
    cara: Cara;
    mirada: Mirada;
    boca: 'cerrada' | 'abierta' | 'maullando';
    /** Orejas hacia adelante, como cuando algo le llama la atención. */
    alerta?: boolean;
    orejaQuieta?: boolean;
    collar?: boolean;
    brillo: string;
}

/** La cabeza de Michi (centrada en 60, 58), compartida por todas las vistas. */
function Cabeza({ cara, mirada, boca, alerta = false, orejaQuieta = false, collar = true, brillo }: CabezaProps) {
    const marca = 'var(--brand, #e07a5f)';
    const oreja = (lado: 1 | -1) => ({ transform: alerta ? `rotate(${-lado * 7}deg) scale(1.08)` : 'none', transformOrigin: `${60 + lado * 16}px 36px`, transformBox: 'view-box' as const, transition: muelle });

    return (
        <g>
            {/* Orejas */}
            <g style={oreja(-1)}>
                <path d='M31 48 Q27 20 35 11 Q46 18 57 32 Z' fill={C.naranja} />
                <path d='M35.5 41 Q33.5 25 37.5 18 Q44.5 24 50.5 32 Z' fill={C.nariz} opacity={0.75} />
            </g>
            <g style={oreja(1)}>
                <g className={orejaQuieta ? '' : 'gato-oreja'} style={{ transformOrigin: '76px 34px', transformBox: 'view-box' }}>
                    <path d='M89 48 Q93 20 85 11 Q74 18 63 32 Z' fill={C.naranja} />
                    <path d='M84.5 41 Q86.5 25 82.5 18 Q75.5 24 69.5 32 Z' fill={C.nariz} opacity={0.75} />
                </g>
            </g>

            {/* Cara: frente redonda y cachetes anchos y esponjosos */}
            <path d='M60 29 C81 29 93 41 94 57 C95 66 92 73 88 77 L92 80 L84 81 C78 85 70 87 60 87 C50 87 42 85 36 81 L28 80 L32 77 C28 73 25 66 26 57 C27 41 39 29 60 29 Z' fill={C.naranja} />
            <ellipse cx={47} cy={39} rx={12} ry={6} fill='#ffffff' opacity={0.07} />
            {/* Rayas de la frente, en "M" */}
            <path d='M60 30.5 v9 M53 31.5 q1.2 4.5 2.4 8.5 M67 31.5 q-1.2 4.5 -2.4 8.5 M33 52 q5 -1 8 1 M87 52 q-5 -1 -8 1' fill='none' stroke={C.naranjaOsc} strokeWidth={2.4} strokeLinecap='round' opacity={0.85} />

            <Ojo cx={45.5} cara={cara} mirada={mirada} />
            <Ojo cx={74.5} cara={cara} mirada={mirada} />

            {/* Hocico abultado: almohadillas de los bigotes y barbilla */}
            <ellipse cx={60} cy={77.6} rx={4.6} ry={2.8} fill={C.crema} />
            <ellipse cx={54.2} cy={73} rx={7} ry={5.6} fill={C.crema} />
            <ellipse cx={65.8} cy={73} rx={7} ry={5.6} fill={C.crema} />
            <g fill={C.naranjaOsc} opacity={0.45}>
                <circle cx={51.5} cy={72} r={0.7} />
                <circle cx={54} cy={74.5} r={0.7} />
                <circle cx={68.5} cy={72} r={0.7} />
                <circle cx={66} cy={74.5} r={0.7} />
            </g>
            {cara === 'concentrado' && <ellipse cx={60.6} cy={75.4} rx={1.7} ry={1.5} fill={C.rosa} />}
            {boca === 'cerrada' ? (
                <path d='M60 70.5 v2.4 M60 72.9 q-2.2 2 -4.4 0.8 M60 72.9 q2.2 2 4.4 0.8' fill='none' stroke='#8a5a3c' strokeWidth={1.2} strokeLinecap='round' />
            ) : (
                <g className={boca === 'maullando' ? 'gato-boca' : ''} style={{ transformOrigin: '60px 71px', transformBox: 'view-box' }}>
                    <ellipse cx={60} cy={75.5} rx={3.8} ry={4.4} fill={C.ojo} />
                    <ellipse cx={60} cy={77.8} rx={2.4} ry={1.7} fill={C.rosa} />
                </g>
            )}
            {/* Nariz pequeña y rosada */}
            <path d='M56.4 67.2 q3.6 -1.8 7.2 0 q-1 3 -3.6 4 q-2.6 -1 -3.6 -4 z' fill={C.nariz} />
            <ellipse cx={58.8} cy={67.6} rx={1.2} ry={0.6} fill='#ffffff' opacity={0.5} />
            {/* Bigotes largos y finos */}
            <path d='M48 71 Q34 67 18 68 M48 73.5 Q33 73 19 77 M72 71 Q86 67 102 68 M72 73.5 Q87 73 101 77' fill='none' stroke='#ffffff' strokeWidth={0.8} strokeLinecap='round' opacity={0.75} />

            {/* Collar y cascabel del color de la escena */}
            {collar && (
                <>
                    <path d='M38 84 Q60 95 82 84' fill='none' stroke={marca} strokeWidth={4.2} strokeLinecap='round' />
                    <g className='gato-cascabel' style={{ transformOrigin: '60px 89px', transformBox: 'view-box' }}>
                        <circle cx={60} cy={93.5} r={4.8} fill={C.crema} filter={`url(#${brillo})`} />
                        <circle cx={60} cy={93.5} r={3.4} fill={marca} />
                        <path d='M58 95 h4' stroke={C.tinta} strokeWidth={1} strokeLinecap='round' />
                        <circle cx={58.6} cy={92} r={1} fill='#ffffff' opacity={0.8} />
                    </g>
                </>
            )}
        </g>
    );
}

/** Coloca la cabeza (centrada en 60, 58) en otro punto, girada y a escala. */
const ubicar = (x: number, y: number, giro: number, escala: number) => `translate(${x} ${y}) rotate(${giro}) scale(${escala}) translate(-60 -58)`;

/** Pata en trazo redondeado con la almohadilla crema al final. */
function Extremidad({ d, fin, grosor = 9.5 }: { d: string; fin: [number, number]; grosor?: number }) {
    return (
        <g>
            <path d={d} fill='none' stroke={C.naranja} strokeWidth={grosor} strokeLinecap='round' />
            <circle cx={fin[0]} cy={fin[1]} r={grosor * 0.58} fill={C.crema} />
        </g>
    );
}

/** De perfil, mirando a la derecha: agachado antes de saltar, estirado en el aire o aterrizando. */
function Perfil({ pose, brillo }: { pose: GatoPose; brillo: string }) {
    if (pose === 'saltar') {
        return (
            <g>
                {/* Cola arriba, como timón */}
                <path d='M34 97 Q16 92 13 70 Q12 58 19 51' fill='none' stroke={C.naranja} strokeWidth={8.5} strokeLinecap='round' />
                <path d='M14 80 l8 -1 M13 70 l8 1' stroke={C.naranjaOsc} strokeWidth={2.4} strokeLinecap='round' />
                <circle cx={19} cy={51} r={4.4} fill={C.naranjaOsc} />
                {/* Patas traseras estiradas hacia atrás */}
                <Extremidad d='M40 106 Q27 116 12 126' fin={[12, 126]} />
                <Extremidad d='M34 102 Q20 108 6 115' fin={[6, 115]} grosor={8.5} />
                {/* Cuerpo estirado */}
                <ellipse cx={62} cy={99} rx={35} ry={13.5} fill={C.naranja} transform='rotate(-5 62 99)' />
                <ellipse cx={64} cy={106} rx={24} ry={6} fill={C.crema} transform='rotate(-5 64 106)' />
                <path d='M44 88 q3 6 1 12 M54 86.5 q3 6 1 12 M64 86 q3 6 1 12 M74 86.5 q2 5 0 10' fill='none' stroke={C.naranjaOsc} strokeWidth={2.4} strokeLinecap='round' />
                <g transform={ubicar(90, 80, 6, 0.58)}>
                    <Cabeza cara='normal' mirada={1} boca='cerrada' alerta orejaQuieta brillo={brillo} />
                </g>
                {/* Patas delanteras estiradas hacia adelante, listas para aterrizar */}
                <Extremidad d='M84 102 Q101 104 118 98' fin={[118, 98]} />
                <Extremidad d='M80 107 Q97 113 113 110' fin={[113, 110]} grosor={8.5} />
            </g>
        );
    }

    if (pose === 'aterrizar') {
        // Aterriza como un gato real: primero las patas delanteras, estiradas para frenar;
        // el trasero aún arriba y la cola levantada para equilibrarse.
        return (
            <g>
                <path d='M36 110 Q19 104 16 87 Q15 78 22 73' fill='none' stroke={C.naranja} strokeWidth={8.5} strokeLinecap='round' />
                <circle cx={22} cy={73} r={4.4} fill={C.naranjaOsc} />
                {/* Patas traseras recogidas, bajando */}
                <Extremidad d='M42 116 Q32 124 38 134' fin={[38, 134]} />
                <ellipse cx={62} cy={115} rx={31} ry={13} fill={C.naranja} transform='rotate(16 62 115)' />
                <ellipse cx={64} cy={122} rx={21} ry={5.5} fill={C.crema} transform='rotate(16 64 122)' />
                <path d='M46 101 q3 6 1 11 M56 104 q3 6 1 11 M66 107 q2 5 0 10' fill='none' stroke={C.naranjaOsc} strokeWidth={2.4} strokeLinecap='round' />
                {/* Patas delanteras ya en el suelo, abiertas para amortiguar */}
                <Extremidad d='M80 122 L82 140' fin={[82, 140]} />
                <Extremidad d='M88 120 L94 140' fin={[94, 140]} grosor={8.5} />
                <g transform={ubicar(93, 104, 5, 0.6)}>
                    <Cabeza cara='normal' mirada={1} boca='cerrada' alerta orejaQuieta brillo={brillo} />
                </g>
            </g>
        );
    }

    // Agachado: el cuerpo pegado al suelo, el trasero listo para impulsarse.
    return (
        <g className={pose === 'preparar' ? 'gato-meneo' : ''} style={{ transformOrigin: '86px 142px', transformBox: 'view-box' }}>
            <g className={pose === 'preparar' ? 'gato-cola-punta' : ''} style={{ transformOrigin: '32px 128px', transformBox: 'view-box' }}>
                <path d='M32 128 Q16 131 6 124' fill='none' stroke={C.naranja} strokeWidth={8} strokeLinecap='round' />
                <circle cx={6} cy={124} r={4.2} fill={C.naranjaOsc} />
            </g>
            <ellipse cx={40} cy={127} rx={16} ry={14} fill={C.naranja} />
            <path d='M32 120 q6 -3 10 2 M30 128 q6 -2 9 2' fill='none' stroke={C.naranjaOsc} strokeWidth={2.4} strokeLinecap='round' />
            <ellipse cx={47} cy={141} rx={8} ry={3.6} fill={C.crema} />
            <ellipse cx={64} cy={127} rx={30} ry={12.5} fill={C.naranja} />
            <ellipse cx={66} cy={134} rx={18} ry={5} fill={C.crema} />
            <rect x={80} y={126} width={10} height={16} rx={5} fill={C.naranja} />
            <ellipse cx={88} cy={141.5} rx={7} ry={3.8} fill={C.crema} />
            <g transform={ubicar(93, 109, 0, 0.6)}>
                <Cabeza cara='normal' mirada={1} boca='cerrada' alerta orejaQuieta brillo={brillo} />
            </g>
        </g>
    );
}

/** Panza arriba, con las cuatro patas al aire, rodando de un lado a otro. */
function Panza({ brillo }: { brillo: string }) {
    return (
        <g className='gato-rodar' style={{ transformOrigin: '64px 142px', transformBox: 'view-box' }}>
            <path d='M96 132 Q110 140 117 132' fill='none' stroke={C.naranja} strokeWidth={8} strokeLinecap='round' />
            <circle cx={117} cy={132} r={4.2} fill={C.naranjaOsc} />
            <g className='gato-pedaleo' style={{ transformOrigin: '88px 126px', transformBox: 'view-box' }}>
                <Extremidad d='M90 126 Q93 110 101 104' fin={[101, 104]} />
                <Extremidad d='M98 128 Q107 116 111 108' fin={[111, 108]} grosor={8.5} />
            </g>
            <ellipse cx={74} cy={129} rx={30} ry={13.5} fill={C.naranja} />
            <ellipse cx={76} cy={123.5} rx={21} ry={7.5} fill={C.crema} />
            <path d='M60 137 q4 -4 9 0 M73 139 q4 -4 9 0 M86 138 q4 -4 9 0' fill='none' stroke={C.naranjaOsc} strokeWidth={2.4} strokeLinecap='round' />
            <g className='gato-pedaleo' style={{ transformOrigin: '58px 122px', transformBox: 'view-box', animationDelay: '0.3s' }}>
                <Extremidad d='M55 121 Q51 106 58 97' fin={[58, 97]} />
                <Extremidad d='M65 119 Q67 105 75 99' fin={[75, 99]} grosor={8.5} />
            </g>
            <g transform={ubicar(26, 114, -64, 0.7)}>
                <Cabeza cara='feliz' mirada={0} boca='abierta' orejaQuieta brillo={brillo} />
            </g>
        </g>
    );
}

interface Props {
    pose?: GatoPose;
    mirada?: Mirada;
    /** Voltea el gato (juega o salta hacia el otro lado). Los textos no se voltean. */
    voltear?: boolean;
    /** Cada vez que cambia, salen corazones (por ejemplo, al acariciarlo). */
    mimos?: number;
    className?: string;
    /** Sin sombra, para cuando el gato va sobre otra ilustración que ya la dibuja. */
    sinSombra?: boolean;
}

export function Gato({ pose = 'sentado', mirada = 0, voltear = false, mimos = 0, className = '', sinSombra = false }: Props) {
    const id = useId().replace(/:/g, '');
    const brillo = `brillo-${id}`;
    const [izq, der] = PATAS[pose] ?? [0, 0];
    const cara = CARA[pose] ?? 'normal';
    const ojos: Mirada = pose === 'jugar' ? -1 : mirada;
    const duerme = pose === 'dormir';
    const alerta = pose === 'alerta';
    const perfil = DE_PERFIL.includes(pose);
    const marca = 'var(--brand, #e07a5f)';

    // Ladeo de la cabeza en la vista de frente.
    const cabeza = duerme ? 'translateY(6px) rotate(-8deg)' : pose === 'mirar' && !mirada ? 'rotate(-5deg)' : 'none';

    return (
        <svg viewBox='0 0 120 150' className={`overflow-visible ${className}`} role='img' aria-label='Michi, el gato naranja del taller'>
            <defs>
                <filter id={brillo} x='-80%' y='-80%' width='260%' height='260%'>
                    <feGaussianBlur stdDeviation='1.8' result='b' />
                    <feMerge>
                        <feMergeNode in='b' />
                        <feMergeNode in='SourceGraphic' />
                    </feMerge>
                </filter>
            </defs>

            {!sinSombra && pose !== 'saltar' && <ellipse cx={60} cy={144} rx={pose === 'panza' || perfil ? 46 : 30} ry={4.5} fill='#000000' opacity={0.3} />}

            <g style={{ transform: voltear ? 'scaleX(-1)' : 'none', transformOrigin: '60px 0px', transformBox: 'view-box' }}>
                {perfil && <Perfil pose={pose} brillo={brillo} />}
                {pose === 'panza' && <Panza brillo={brillo} />}

                {!perfil && pose !== 'panza' && (
                    <g>
                        {/* Bola de estambre: la pata la golpea y rueda */}
                        {pose === 'jugar' && (
                            <g>
                                <path d='M14 141 q9 5 18 0 t16 1' fill='none' stroke={C.salvia} strokeWidth={1.4} strokeLinecap='round' />
                                <g className='gato-estambre'>
                                    <circle cx={6} cy={134} r={10} fill={C.salvia} />
                                    <g fill='none' stroke={C.salviaOsc} strokeWidth={1.5} strokeLinecap='round'>
                                        <path d='M-2 128 q8 3 15 -2' />
                                        <path d='M-4 134 q10 5 19 -1' />
                                        <path d='M-1 140 q7 2 13 -3' />
                                        <path d='M2 125 q-4 8 0 18' />
                                    </g>
                                    <circle cx={3} cy={130} r={2.4} fill='#ffffff' opacity={0.25} />
                                </g>
                            </g>
                        )}

                        {/* Cola (detrás del cuerpo); en alerta se agita rápido */}
                        {!duerme && (
                            <g className={alerta ? 'gato-cola-alerta' : 'gato-cola'} style={{ transformOrigin: '80px 134px', transformBox: 'view-box' }}>
                                <path d='M78 134 Q106 134 104 108 Q103 94 95 89' fill='none' stroke={C.naranja} strokeWidth={9} strokeLinecap='round' />
                                <path d='M103 113 l-8 1 M104 103 l-8 -1' stroke={C.naranjaOsc} strokeWidth={2.6} strokeLinecap='round' />
                                <circle cx={95} cy={89} r={4.6} fill={C.naranjaOsc} />
                            </g>
                        )}

                        {/* Cuerpo sentado: muslos, torso y pecho crema. En alerta se yergue un poco. */}
                        <ellipse cx={40} cy={127} rx={14} ry={15} fill={C.naranja} />
                        <ellipse cx={80} cy={127} rx={14} ry={15} fill={C.naranja} />
                        <path d='M30 121 q6 -4 11 1 M28 129 q6 -3 10 2 M90 121 q-6 -4 -11 1 M92 129 q-6 -3 -10 2' fill='none' stroke={C.naranjaOsc} strokeWidth={2.4} strokeLinecap='round' />
                        <g style={{ transform: alerta ? 'scaleY(1.05)' : 'none', transformOrigin: '60px 140px', transformBox: 'view-box', transition: muelle }}>
                            <ellipse cx={60} cy={110} rx={24} ry={31} fill={C.naranja} />
                            <ellipse cx={52} cy={100} rx={9} ry={18} fill='#ffffff' opacity={0.07} />
                            <ellipse cx={60} cy={114} rx={13} ry={23} fill={C.crema} />
                        </g>

                        <Pata lado='izq' angulo={izq} jugando={pose === 'jugar'} />
                        <Pata lado='der' angulo={der} jugando={false} />

                        {/* Durmiendo, la cola le rodea las patas */}
                        {duerme && <path d='M84 138 Q104 146 82 146.5 Q62 147.5 42 143' fill='none' stroke={C.naranja} strokeWidth={8} strokeLinecap='round' />}

                        <g style={{ transform: alerta ? 'translateY(-4px)' : cabeza, transformOrigin: '60px 84px', transformBox: 'view-box', transition: muelle }}>
                            {/* En alerta ladea la cabeza, curioso, como quien pregunta "¿y eso?" */}
                            <g className={alerta ? 'gato-ladeo' : ''} style={{ transformOrigin: '60px 84px', transformBox: 'view-box' }}>
                                <Cabeza cara={cara} mirada={ojos} boca={pose === 'maullar' ? 'maullando' : 'cerrada'} alerta={alerta} orejaQuieta={duerme || alerta} brillo={brillo} />
                            </g>
                        </g>

                        {/* Portátil delante: Michi teclea por detrás (solo asoman las patitas) */}
                        {pose === 'teclear' && (
                            <g>
                                <ellipse cx={51} cy={100} rx={5.4} ry={3.6} fill={C.crema} className='gato-tecla' />
                                <ellipse cx={69} cy={100} rx={5.4} ry={3.6} fill={C.crema} className='gato-tecla' style={{ animationDelay: '0.16s' }} />
                                <path d='M34 124 l4 -24 h44 l4 24 z' fill='#2b2d42' />
                                <path d='M38 124 l3.4 -21 h37.2 l3.4 21 z' fill='#ffffff' opacity={0.04} />
                                <circle cx={60} cy={112} r={4} fill={marca} filter={`url(#${brillo})`} />
                                <path d='M26 124 h68 l5 7 h-78 z' fill='#3d405b' />
                            </g>
                        )}
                    </g>
                )}
            </g>

            {/* Adornos que no se voltean */}
            {pose === 'maullar' && (
                <text x={voltear ? 22 : 98} y={22} textAnchor='middle' fontFamily='"Geist Mono Variable", monospace' fontWeight={700} fontSize={11} fill={marca} className='gato-miau'>
                    miau!
                </text>
            )}
            {alerta && (
                <text x={voltear ? 28 : 92} y={18} textAnchor='middle' fontFamily='"Geist Variable", sans-serif' fontWeight={800} fontSize={16} fill={marca} className='gato-signo'>
                    !
                </text>
            )}
            {duerme &&
                [0, 1, 2].map((i) => (
                    <text key={i} x={voltear ? 26 : 88} y={34} fontFamily='"Geist Mono Variable", monospace' fontSize={8 + i * 2.5} fill='rgb(var(--muted))' className='gato-zzz' style={{ animationDelay: `${i * 1.1}s` }}>
                        z
                    </text>
                ))}
            {mimos > 0 && (
                <g key={mimos}>
                    {[
                        [42, 30, 0],
                        [62, 22, 0.15],
                        [80, 32, 0.3],
                    ].map(([x, y, d], i) => (
                        <path key={i} d={`M${x} ${y} c0 -3.2 -5.5 -3.2 -5.5 0.6 c0 3.2 5.5 6.4 5.5 6.4 c0 0 5.5 -3.2 5.5 -6.4 c0 -3.8 -5.5 -3.8 -5.5 -0.6 z`} fill={C.rosa} className='gato-corazon' style={{ animationDelay: `${d}s` }} />
                    ))}
                </g>
            )}
        </svg>
    );
}


/** Solo la cara de Michi, para usarla como icono (sin collar ni cuerpo). */
export function CaraMichi({ gesto = 'normal', className = '' }: { gesto?: Gesto; className?: string }) {
    const id = useId().replace(/:/g, '');
    const cara: Cara = gesto === 'concentrado' ? 'concentrado' : gesto === 'normal' ? 'normal' : 'feliz';
    return (
        <svg viewBox='22 8 76 84' className={className} aria-hidden>
            <defs>
                <filter id={`brillo-${id}`} />
            </defs>
            <Cabeza cara={cara} mirada={0} boca={gesto === 'maullando' ? 'maullando' : 'cerrada'} collar={false} orejaQuieta={gesto === 'concentrado'} brillo={`brillo-${id}`} />
        </svg>
    );
}
