import { motion, useReducedMotion } from 'motion/react';
import { CSSProperties, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    delay?: number;
    as?: 'div' | 'li' | 'section' | 'article';
    /** Michi se puede sentar encima (ver Companion). */
    percha?: boolean;
}

/**
 * Entrada suave al aparecer en pantalla. Usa el `transform` completo (acelerado por GPU)
 * en lugar de `y`, y con "reducir movimiento" solo hace un fundido.
 */
export function Animation({ children, className = '', style, delay = 0, as = 'div', percha = false }: Props) {
    const reduce = useReducedMotion();
    const Tag = motion[as];

    return (
        <Tag className={className} style={style} data-percha={percha || undefined} initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(20px)' }} whileInView={reduce ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduce ? 0.3 : 0.8, delay, ease: [0.23, 1, 0.32, 1] }}>
            {children}
        </Tag>
    );
}
