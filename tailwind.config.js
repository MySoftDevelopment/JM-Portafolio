/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: ['selector', '[data-theme="dark"]'],
    // Los hover: solo aplican con mouse; en pantallas táctiles no se quedan pegados.
    future: { hoverOnlyWhenSupported: true },
    theme: {
        extend: {
            colors: {
                canvas: token('canvas'),
                surface: token('surface'),
                'surface-2': token('surface-2'),
                raised: token('raised'),
                ink: token('ink'),
                muted: token('muted'),
                faint: token('faint'),
                line: token('line'),
                'line-strong': token('line-strong'),
                accent: token('accent'),
                'accent-ink': token('accent-ink'),
                sand: token('sand'),
                sage: token('sage'),
                slate: token('slate'),
            },
            fontFamily: {
                sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
                mono: ['"Geist Mono Variable"', 'ui-monospace', 'monospace'],
            },
            maxWidth: {
                page: '1320px',
            },
            transitionTimingFunction: {
                out: 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
};
