import { Observer } from './Observer';

export function Animation({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const { ref, inView } = Observer();

    return (
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
            {children}
        </div>
    );
}
