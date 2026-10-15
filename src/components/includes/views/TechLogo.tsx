import type { SimpleIcon } from 'simple-icons';

/** Logo monocromo: toma el color del texto para verse bien en ambos temas. */
export function TechLogo({ icon, size = 28 }: { icon: SimpleIcon; size?: number }) {
    return (
        <svg role='img' viewBox='0 0 24 24' width={size} height={size} fill='currentColor' aria-label={icon.title}>
            <title>{icon.title}</title>
            <path d={icon.path} />
        </svg>
    );
}
