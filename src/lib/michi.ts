/**
 * Poses de Michi, el gato del taller (ver components/includes/views/Gato.tsx).
 * "preparar", "saltar" y "aterrizar" son las fases del salto, de perfil.
 */
export type GatoPose = 'sentado' | 'mirar' | 'alerta' | 'maullar' | 'jugar' | 'teclear' | 'dormir' | 'panza' | 'preparar' | 'saltar' | 'aterrizar';
export type Mirada = -1 | 0 | 1;

/** Gestos de la carita de Michi cuando se usa como icono. */
export type Gesto = 'normal' | 'concentrado' | 'maullando' | 'feliz';
