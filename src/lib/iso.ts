/*
 * Proyección isométrica para los dioramas en SVG.
 * Ejes: x baja hacia la derecha, y baja hacia la izquierda, z sube. El espectador mira desde (+x, +y).
 */
export interface Iso {
    s: number;
    cx: number;
    cy: number;
}

const COS = 0.866;

export const punto = (v: Iso, x: number, y: number, z = 0): [number, number] => [v.cx + (x - y) * COS * v.s, v.cy + (x + y) * 0.5 * v.s - z * v.s];

export const poligono = (v: Iso, pts: [number, number, number][]) => pts.map(([x, y, z]) => punto(v, x, y, z).map((n) => n.toFixed(1)).join(',')).join(' ');

/** Caras visibles de una caja: tapa, cara frontal izquierda (plano y+d) y frontal derecha (plano x+w). */
export function caras(v: Iso, x: number, y: number, z: number, w: number, d: number, h: number) {
    return {
        tapa: poligono(v, [
            [x, y, z + h],
            [x + w, y, z + h],
            [x + w, y + d, z + h],
            [x, y + d, z + h],
        ]),
        izq: poligono(v, [
            [x, y + d, z],
            [x + w, y + d, z],
            [x + w, y + d, z + h],
            [x, y + d, z + h],
        ]),
        der: poligono(v, [
            [x + w, y, z],
            [x + w, y + d, z],
            [x + w, y + d, z + h],
            [x + w, y, z + h],
        ]),
    };
}

/**
 * Matrices para dibujar en 2D sobre un plano vertical (letreros, pantallas, engranajes).
 * Unidad local = 1 unidad isométrica; el origen local es el punto (x, y, z) dado y el eje Y local baja.
 */
export const planoX = (v: Iso, x: number, y: number, z: number) => {
    // Plano y = constante (pared derecha y caras frontales izquierdas): el eje local x sigue a +x.
    const [e, f] = punto(v, x, y, z);
    return `matrix(${COS * v.s} ${0.5 * v.s} 0 ${v.s} ${e.toFixed(1)} ${f.toFixed(1)})`;
};

export const planoY = (v: Iso, x: number, y: number, z: number) => {
    // Plano x = constante (pared izquierda y caras frontales derechas): el eje local x sigue a -y.
    const [e, f] = punto(v, x, y, z);
    return `matrix(${COS * v.s} ${-0.5 * v.s} 0 ${v.s} ${e.toFixed(1)} ${f.toFixed(1)})`;
};
