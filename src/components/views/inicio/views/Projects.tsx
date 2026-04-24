import { Animation, Observer } from '@components/includes';
import { FC } from 'react';

const PROJECTS = [
    {
        id: 1,
        title: 'Academia INCES',
        subtitle: 'Plataforma web + ERP académico',
        description: 'Página web institucional para una academia de belleza profesional, complementada con un software de gestión empresarial completo: sistema de notas, matrículas, inventario, caja, facturación, control de asistencia y administración de estudiantes.',
        tags: ['PHP', 'Laravel', 'MySQL', 'React', 'ERP'],
        links: [{ label: 'Ver sitio', url: 'https://www.academiainces.com' }],
        color: 'rose',
        icon: '🎓',
        highlight: true,
    },
    {
        id: 2,
        title: 'Lilac by INCES',
        subtitle: 'E-commerce de productos de belleza',
        description: 'Submarca de Academia INCES orientada a la venta de productos cosméticos y de belleza. Plataforma de comercio electrónico con catálogo de productos, carrito de compras y gestión de pedidos.',
        tags: ['PHP', 'E-commerce', 'MySQL'],
        links: [{ label: 'Ver tienda', url: 'https://lilacbyinces.com' }],
        color: 'purple',
        icon: '🌸',
    },
    {
        id: 3,
        title: 'SEVE',
        subtitle: 'Sistema de Valoración Estudiantil',
        description: 'Plataforma académica integral para la gestión educativa: manejo de notas y calificaciones, hojas de vida estudiantiles, consolidados académicos, plan de aula, gestión de clases, tareas y actividades, observador del alumno y generación de reportes.',
        tags: ['PHP', 'Laravel', 'MySQL', 'React', 'Educación'],
        links: [],
        color: 'teal',
        icon: '📊',
    },
    {
        id: 4,
        title: 'MySoft',
        subtitle: 'ERP para PYMEs y Ópticas',
        description: 'Sistema de gestión empresarial para pequeñas y medianas empresas con módulos de inventarios, caja, compras, recibos y facturación electrónica, historial de ventas, historial de caja. Versión especializada para ópticas con módulo de citas y historias clínicas.',
        tags: ['PHP', 'Laravel', 'MySQL', 'React', 'ERP', 'Ópticas'],
        links: [{ label: 'Ver demo', url: 'https://demo.mysoft.live' }],
        color: 'blue',
        icon: '🏢',
        highlight: true,
    },
    {
        id: 5,
        title: 'MySoft CRM + WhatsApp Bot',
        subtitle: 'Envío masivo & CRM con +500K contactos',
        description: 'Selfbot de WhatsApp dinámico que soporta N líneas simultáneas para envío masivo de mensajes, con panel en PHP para escanear QR. Integrado con CRM propio que gestiona más de 500.000 números de Colombia. API disponible para integración con cualquier plataforma.',
        tags: ['PHP', 'WhatsApp API', 'CRM', 'Node.js', 'MySQL'],
        links: [{ label: 'Ver CRM', url: 'https://crm.mysoft.live' }],
        color: 'green',
        icon: '💬',
    },
    {
        id: 6,
        title: 'Ganadores con Suerte',
        subtitle: 'Plataforma de sorteos online',
        description: 'Plataforma completa para la gestión de sorteos en línea con interfaz pública y panel administrativo. Permite crear y editar sorteos, gestionar pedidos, consultar clientes y personalizar todo el contenido visual desde el panel de administración.',
        tags: ['PHP', 'MySQL', 'JavaScript', 'Admin Panel'],
        links: [{ label: 'Ver plataforma', url: 'https://ganadoresconsuerte.com' }],
        color: 'amber',
        icon: '🎰',
    },
];

const COLOR_MAP: Record<string, { bg: string; border: string; badge: string; text: string; glow: string }> = {
    rose: { bg: 'bg-rose-950/40', border: 'border-rose-800/40', badge: 'bg-rose-900/60 text-rose-300', text: 'text-rose-300', glow: 'shadow-rose-900/30' },
    purple: { bg: 'bg-purple-950/40', border: 'border-purple-800/40', badge: 'bg-purple-900/60 text-purple-300', text: 'text-purple-300', glow: 'shadow-purple-900/30' },
    teal: { bg: 'bg-teal-950/40', border: 'border-teal-800/40', badge: 'bg-teal-900/60 text-teal-300', text: 'text-teal-300', glow: 'shadow-teal-900/30' },
    blue: { bg: 'bg-blue-950/40', border: 'border-blue-800/40', badge: 'bg-blue-900/60 text-blue-300', text: 'text-blue-300', glow: 'shadow-blue-900/30' },
    green: { bg: 'bg-green-950/40', border: 'border-green-800/40', badge: 'bg-green-900/60 text-green-300', text: 'text-green-300', glow: 'shadow-green-900/30' },
    amber: { bg: 'bg-amber-950/40', border: 'border-amber-800/40', badge: 'bg-amber-900/60 text-amber-300', text: 'text-amber-300', glow: 'shadow-amber-900/30' },
};

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
    const c = COLOR_MAP[project.color];
    const { ref, inView } = Observer();
    return (
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 80}ms` }}>
            <div className={`relative h-full ${c.bg} border ${c.border} rounded-2xl p-6 flex flex-col gap-4 hover:shadow-xl ${c.glow} transition-all duration-300 hover:-translate-y-1 ${project.highlight ? 'ring-1 ring-violet-700/40' : ''}`}>
                {project.highlight && (
                    <div className='absolute -top-3 right-6'>
                        <span className='px-3 py-1 text-xs rounded-full bg-violet-700 text-violet-100 font-medium shadow-lg'>Destacado</span>
                    </div>
                )}
                <div className='flex items-start gap-4'>
                    <div className='text-3xl'>{project.icon}</div>
                    <div>
                        <h3 className={`text-lg font-bold text-white`}>{project.title}</h3>
                        <p className={`text-sm ${c.text} font-medium`}>{project.subtitle}</p>
                    </div>
                </div>
                <p className='text-slate-400 text-sm leading-relaxed flex-1'>{project.description}</p>
                <div className='flex flex-wrap gap-1.5'>
                    {project.tags.map((t) => (
                        <span key={t} className={`px-2 py-0.5 text-xs rounded-md ${c.badge} font-mono`}>
                            {t}
                        </span>
                    ))}
                </div>
                {project.links.length > 0 && (
                    <div className='flex gap-3 pt-1'>
                        {project.links.map((l) => (
                            <a key={l.url} href={l.url} target='_blank' rel='noopener noreferrer' className={`inline-flex items-center gap-1.5 text-sm ${c.text} hover:text-white border ${c.border} px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/5`}>
                                {l.label}
                                <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                                </svg>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export const Projects: FC = () => {
    return (
        <section id='projects' className='py-24 px-6'>
            <div className='max-w-6xl mx-auto'>
                <Animation>
                    <div className='text-center mb-14'>
                        <p className='text-violet-400 text-sm font-mono mb-3 tracking-widest uppercase'>Portafolio</p>
                        <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Proyectos destacados</h2>
                        <p className='text-slate-500 max-w-xl mx-auto'>Sistemas reales en producción, construidos con tecnología moderna y orientados a resolver problemas empresariales.</p>
                    </div>
                </Animation>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};
