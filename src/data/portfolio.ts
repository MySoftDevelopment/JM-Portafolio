import type { Gesto } from '@/lib/michi';

/*
 * Todo el contenido del portafolio vive aquí. Las vistas solo lo pintan.
 * Las cifras salen de los propios proyectos (servidores.json de SEVE, perfil de GitHub, etc.):
 * si cambian, se actualizan aquí y en ningún otro sitio.
 */

export const PERFIL = {
    nombre: 'Juan Molina',
    rol: 'Desarrollador Fullstack',
    correo: 'juan@mysoft.live',
    github: 'https://github.com/OuisVN',
    githubUsuario: 'OuisVN',
    instagram: 'https://www.instagram.com/juanmolinadev/',
    sitio: 'https://juanmolina.dev',
};

/** Cada cifra lleva la carita de Michi con un gesto que la acompaña. */
export const METRICAS: { valor: string; texto: string; tono: Tono; gesto: Gesto }[] = [
    { tono: 'sand', gesto: 'concentrado', valor: '2.854', texto: 'contribuciones en GitHub entre 2025 y 2026' },
    { tono: 'sage', gesto: 'maullando', valor: '500K+', texto: 'contactos gestionados en un CRM con envío por WhatsApp' },
    { tono: 'accent', gesto: 'feliz', valor: '10+', texto: 'años construyendo software para empresas reales' },
];

/** Color de la paleta que acompaña a cada proyecto (brillo, detalles). */
export type Tono = 'accent' | 'sand' | 'sage' | 'slate';

export interface Destacado {
    /** También es el id de su escena (lib/escena.ts): define el color y lo que dice Bit. */
    id: 'inces' | 'seve' | 'fevel' | 'mysoft';
    tono: Tono;
    nombre: string;
    /** Nombre corto para el riel de capítulos. */
    corto: string;
    cliente: string;
    resumen: string;
    piezas: { titulo: string; texto: string }[];
    stack: string[];
    /** Captura del sitio; sin ella el escenario dibuja una ilustración. */
    imagen?: string;
    alt?: string;
    enlaces: { texto: string; url: string }[];
    /** Etiquetas que flotan alrededor del escenario. */
    insignias: string[];
}

export const DESTACADOS: Destacado[] = [
    {
        id: 'inces',
        tono: 'accent',
        nombre: 'Ecosistema Academia INCES',
        corto: 'INCES',
        cliente: 'Instituto técnico de belleza',
        resumen: 'Toda la operación de una academia en una sola plataforma: sitio web con matrícula en línea, app móvil para estudiantes, sistema de notas, ERP administrativo, tienda virtual y control de asistencia por QR.',
        piezas: [
            { titulo: 'Sitio web y landings', texto: 'SPA en React con landing por curso, editor visual en vivo y formularios de matrícula por línea formativa.' },
            { titulo: 'App iOS y Android', texto: 'Expo y React Native: cursos, aula virtual, ingreso con huella o Face ID, notificaciones push y un color por línea formativa.' },
            { titulo: 'Sistema de notas', texto: 'Los docentes califican por asignatura y la app le muestra a cada estudiante su consolidado, la definitiva y las materias en riesgo.' },
            { titulo: 'Expediente en la app', texto: 'Por cada programa: matrícula, QR de asistencia, carnet virtual, historial de pagos y el horario de la semana.' },
            { titulo: 'ERP administrativo', texto: 'Más de 120 módulos: matrículas, facturación, evaluación docente, carnetización, gastos y PQR.' },
            { titulo: 'Tienda Lilac by INCES', texto: 'E-commerce de productos de belleza con pagos por Wompi y Mercado Pago.' },
        ],
        stack: ['React', 'TypeScript', 'Expo', 'React Native', 'PHP 8.3', 'MariaDB', 'Tailwind'],
        imagen: '/images/projects/inces.webp',
        alt: 'Página de inicio de academiainces.com con la oferta de programas técnicos',
        enlaces: [
            { texto: 'academiainces.com', url: 'https://www.academiainces.com' },
            { texto: 'academiainces.edu.co', url: 'https://academiainces.edu.co' },
            { texto: 'notas.academiainces.edu.co', url: 'https://notas.academiainces.edu.co' },
            { texto: 'lilacbyinces.com', url: 'https://lilacbyinces.com' },
        ],
        insignias: ['App Store y Google Play', '120+ módulos', 'Pagos en línea'],
    },
    {
        id: 'seve',
        tono: 'sage',
        nombre: 'SEVE',
        corto: 'SEVE',
        cliente: 'Ecosistema de gestión escolar K-12 en Colombia',
        resumen: 'Plataforma con la que colegios públicos y privados califican, llevan el observador, controlan la asistencia y reportan a SIMAT, ajustada al Decreto 1290. A su alrededor construí un ecosistema propio: videoclases, soporte por chat y por videollamada con control remoto, y la plataforma de cartera de tesorería.',
        piezas: [
            { titulo: 'Académico y convivencia', texto: 'Notas, boletines, observador, PIAR, fichas de matrícula y alertas por tope de inasistencia, con reportes a SIMAT.' },
            { titulo: 'Portal de acudientes', texto: 'Agenda digital con notas, tareas y circulares, y avisos por el canal oficial de WhatsApp con plantillas aprobadas por Meta.' },
            { titulo: 'Videoclases y reuniones', texto: 'Clases y reuniones institucionales con cámara, pantalla y chat, moderación y registro de asistencia en Excel y PDF, sobre LiveKit propio.' },
            { titulo: 'Soporte en vivo', texto: 'Chat tipo WhatsApp con casos numerados, notas de voz e histórico que no se borra, y videollamada de soporte con control remoto del equipo.' },
            { titulo: 'Cartera y facturación', texto: 'Reemplazo web del programa de Access de tesorería: cartera por edades, facturación masiva, recibos e informes, validada contra el original.' },
            { titulo: 'Operación de la flota', texto: 'Panel de despliegue a todos los colegios, backups por institución y un vigilante que reinicia servicios caídos y avisa al panel de soporte.' },
        ],
        stack: ['PHP', 'Node.js', 'TypeScript', 'MySQL', 'Access ODBC', 'LiveKit', 'RustDesk', 'WhatsApp Cloud API', 'PowerShell', 'IIS'],
        imagen: '/images/projects/seve.webp',
        alt: 'Sitio público de SEVE con el titular "El colegio entero, en un solo expediente"',
        enlaces: [{ texto: 'seveweb.com', url: 'https://seveweb.com' }],
        insignias: ['Videoclases', 'Soporte en vivo', 'Cartera'],
    },
    {
        id: 'fevel',
        tono: 'sage',
        nombre: 'FEVEL',
        corto: 'FEVEL',
        cliente: 'Fábrica y tiendas de moda',
        resumen: 'Dos sistemas para una marca con fábrica y sucursales: un ERP de inventario que audita cada movimiento y una plataforma de mensajería donde todo el equipo atiende WhatsApp e Instagram desde una sola bandeja.',
        piezas: [
            { titulo: 'Inventario multisede', texto: 'Fábrica y sucursales con reservas, traslados, promociones y alturas de producción.' },
            { titulo: 'Cartera y comisiones', texto: 'Caja por persona, cartera de clientes, comisiones de vendedores y registro de auditoría.' },
            { titulo: 'WhatsApp e Instagram', texto: 'Canal oficial de Meta y mensajes directos de Instagram en la misma bandeja, con adjuntos, notas de voz y acuses de lectura.' },
            { titulo: 'Equipo de ventas', texto: 'Usuarios con perfiles: el primero que contesta se queda el chat, con etiquetas, notas internas y reasignación.' },
            { titulo: 'Atajos y plantillas', texto: 'Respuestas rápidas con «/» y adjuntos, y plantillas que se crean y editan desde el panel y se aprueban en Meta.' },
            { titulo: 'Avisos al celular', texto: 'App instalable con notificaciones push de cada mensaje nuevo, aunque el panel esté cerrado.' },
        ],
        stack: ['PHP', 'Node.js', 'TypeScript', 'WebSocket', 'Meta Cloud API', 'Instagram API', 'Web Push', 'MySQL'],
        enlaces: [],
        insignias: ['WhatsApp oficial', 'Instagram', 'Multiagente'],
    },
    {
        id: 'mysoft',
        tono: 'accent',
        nombre: 'MySoft',
        corto: 'MySoft',
        cliente: 'ERP propio para PYMEs, ópticas y bares',
        resumen: 'Mi propio producto: un ERP que se instala por cliente, con su base de datos, su logo y sus módulos, y que cambia según el tipo de empresa. Las ópticas suman citas e historias clínicas; los bares y discotecas, mesas, catálogo y cuentas abiertas. Renovado por completo en lo visual.',
        piezas: [
            { titulo: 'Ventas y caja', texto: 'Recibos, abonos, cotizaciones, métodos de pago e historial de caja y de ventas.' },
            { titulo: 'Inventario y compras', texto: 'Productos, proveedores, laboratorios, movimientos y cuentas por pagar.' },
            { titulo: 'Para ópticas', texto: 'Agenda de citas por profesional e historias clínicas con su PDF.' },
            { titulo: 'Para bares y discotecas', texto: 'Croquis de zonas y mesas, catálogo con fotos y categorías, cuentas por mesa con propina y entradas de inventario.' },
            { titulo: 'Crédito y saldo a favor', texto: 'Cuentas por cobrar con abonos y recargas de saldo que el cliente consume en las mesas, con devoluciones y su historial.' },
            { titulo: 'Una instalación por cliente', texto: 'Base de datos propia, permisos por módulo, respaldos y reportes en Excel y PDF.' },
        ],
        stack: ['PHP', 'MariaDB', 'jQuery', 'Bootstrap', 'FPDF', 'PHPExcel'],
        imagen: '/images/projects/mysoft.webp',
        alt: 'Pantalla de ingreso de MySoft',
        enlaces: [{ texto: 'demo.mysoft.live', url: 'https://demo.mysoft.live' }],
        insignias: ['Desde 2020', 'Ópticas y bares', 'Permisos por módulo'],
    },
];

/** Cómo se ilustra cada proyecto: captura del sitio o icono de la app. */
export type Variante = 'imagen' | 'icono';

/** Color del papel de cada nota: los tonos de la paleta y el lila de Lilac. */
export type TonoNota = Tono | 'lila';

export interface Proyecto {
    id: string;
    tono: TonoNota;
    nombre: string;
    tipo: string;
    texto: string;
    stack: string[];
    variante: Variante;
    imagen: string;
    alt?: string;
    /** Sitios públicos; un enlace que empieza por # lleva a una sección de la página (p. ej. Contacto). */
    enlaces?: { texto: string; url: string }[];
    /** Etiqueta cuando no hay enlaces; sin ella se muestra "Privado" (sistema interno de un cliente). */
    insignia?: string;
}

/*
 * Las notas de la pared de la sala: los mismos proyectos y en el mismo orden que la pared del video
 * ("Y en la pared hay más": plataformas operativas, soluciones del día a día y sitios funcionales).
 */
export const PROYECTOS: Proyecto[] = [
    {
        id: 'lilac',
        tono: 'lila',
        nombre: 'Lilac by INCES',
        tipo: 'Tienda en línea',
        texto: 'Tienda de cosméticos de la Academia de Belleza INCES, con catálogo, carrito, pedidos y pagos en línea por Wompi y Mercado Pago.',
        stack: ['PHP', 'MySQL', 'Wompi', 'Mercado Pago'],
        variante: 'imagen',
        imagen: '/images/projects/lilac.webp',
        alt: 'Tienda Lilac by INCES con el aviso de envío gratis',
        enlaces: [{ texto: 'lilacbyinces.com', url: 'https://lilacbyinces.com' }],
    },
    {
        id: 'sorteos',
        tono: 'accent',
        nombre: 'Plataforma de sorteos',
        tipo: 'Rifas en línea',
        texto: 'Controla las ventas de tu sorteo y muéstralo 24/7, desde que inicia hasta que finaliza: compra de números con pago por Wompi, abonos, vendedores, lista de ganadores y panel administrativo.',
        stack: ['PHP', 'MySQL', 'Wompi'],
        variante: 'imagen',
        imagen: '/images/projects/ilus/sorteos.svg',
        alt: 'Ilustración: tablero de números vendidos, avance de ventas, boleto y el sorteo visible 24/7',
        enlaces: [{ texto: 'Cuéntame tu sorteo', url: '#contacto' }],
    },
    {
        id: 'eventos',
        tono: 'sand',
        nombre: 'Plataforma de eventos',
        tipo: 'Eventos e invitaciones',
        texto: 'Crea tu evento y muéstralo al público; desde el panel decides a quiénes vas a invitar.',
        stack: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'DataTables'],
        variante: 'imagen',
        imagen: '/images/projects/ilus/eventos.svg',
        alt: 'Ilustración: escenario con focos, la tarjeta del evento e invitados confirmados',
        enlaces: [{ texto: 'Cuéntame tu evento', url: '#contacto' }],
    },
    {
        id: 'citas',
        tono: 'sage',
        nombre: 'Plataforma de citas',
        tipo: 'Reservas en línea',
        texto: '¿Tu negocio trabaja con reservas? Página para que tus clientes agenden y panel para administrar las citas, para que su experiencia sea óptima.',
        stack: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'PHPMailer'],
        variante: 'imagen',
        imagen: '/images/projects/ilus/citas.svg',
        alt: 'Ilustración: agenda semanal con las horas reservadas y una reserva nueva',
        enlaces: [{ texto: 'Cuéntame tu negocio', url: '#contacto' }],
    },
    {
        id: 'migraciones',
        tono: 'slate',
        nombre: 'Migraciones',
        tipo: 'De WordPress a sitio propio',
        texto: 'La I.E. Diocesana Juan XXIII y las Hermanas Franciscanas tenían su WordPress comprometido: los pasé a PHP propio con panel, conservando el contenido y las funciones. Juan XXIII pasó de 2,8 GB de archivos a 330 MB.',
        stack: ['PHP 8.3', 'MySQL', 'HTMLPurifier', 'CKEditor 5'],
        variante: 'imagen',
        imagen: '/images/projects/ilus/migraciones.svg',
        alt: 'Ilustración: del sitio viejo y roto al sitio limpio, con los datos de siempre a salvo',
        enlaces: [
            { texto: 'iedjuanxxiii.edu.co', url: 'https://iedjuanxxiii.edu.co' },
            { texto: 'hermanasfranciscanasdelasagradafamilia.com', url: 'https://hermanasfranciscanasdelasagradafamilia.com' },
        ],
    },
];

export const SERVICIOS: { icono: string; titulo: string; texto: string; enlace?: { texto: string; href: string } }[] = [
    {
        icono: 'shield',
        titulo: 'Revisión de seguridad',
        texto: 'Reviso tu sitio o tu servidor contra las vulnerabilidades recientes de PHP, Laravel, Node.js y Nginx, y te entrego qué corregir y en qué orden.',
        enlace: { texto: 'Ver planes y precios', href: '/servicios/revision-seguridad/' },
    },
    {
        icono: 'browser',
        titulo: 'Plataformas web y ERPs a medida',
        texto: 'Sistemas administrativos, portales y tiendas en línea pensados para cómo trabaja tu equipo, no para una plantilla.',
    },
    {
        icono: 'phone',
        titulo: 'Apps móviles para iOS y Android',
        texto: 'Apps con Expo y React Native, publicadas en App Store y Google Play, con notificaciones, biometría y cámara.',
    },
    {
        icono: 'plug',
        titulo: 'Integraciones',
        texto: 'WhatsApp Cloud API, Instagram, Wompi, Mercado Pago, notificaciones push y APIs propias para conectar tus sistemas.',
    },
    {
        icono: 'arrows',
        titulo: 'Migraciones y modernización',
        texto: 'De Access a web, de un WordPress vulnerable a un sitio seguro, sin perder datos ni detener la operación.',
    },
    {
        icono: 'server',
        titulo: 'Servidores y despliegue',
        texto: 'IIS, Nginx, Debian y Proxmox. Despliegues a muchos servidores a la vez, backups y monitoreo con reinicio automático.',
    },
];

/*
 * Servicio de revisión de seguridad (/servicios/revision-seguridad/).
 * Los precios van en pesos colombianos; para cambiarlos basta con editar `precio`.
 */
export const REVISION = {
    /** Se descuenta de la corrección si el cliente la contrata después. */
    descuentoCorreccion: true,
    entrega: 'Entre 3 y 5 días hábiles después de recibir los accesos.',
    planes: [
        {
            id: 'esencial',
            nombre: 'Esencial',
            para: 'Un sitio en hosting compartido (Hostinger, cPanel o similar).',
            precio: 450000,
            periodo: '',
            incluye: ['Versión de PHP y del framework (Laravel, WordPress u otro) frente a los avisos de seguridad vigentes', 'Dependencias con vulnerabilidades conocidas (composer audit, npm audit)', 'Configuración expuesta: archivos .env, carpetas públicas, modo de depuración', 'Certificado TLS y cabeceras de seguridad', 'Informe con cada hallazgo, su gravedad y cómo corregirlo'],
        },
        {
            id: 'servidor',
            nombre: 'Servidor',
            para: 'Tu aplicación y el VPS donde corre (Debian, Ubuntu u otro Linux).',
            precio: 1200000,
            periodo: '',
            destacado: true,
            incluye: ['Todo lo del plan Esencial', 'Nginx o Apache, PHP-FPM o Node.js: versiones y configuración', 'Acceso SSH, firewall y servicios expuestos a internet', 'Copias de seguridad: si existen, dónde están y si se pueden restaurar', 'Videollamada de 30 minutos para repasar el informe'],
        },
        {
            id: 'mantenimiento',
            nombre: 'Mantenimiento',
            para: 'Para no volver a preocuparte por los parches.',
            precio: 350000,
            periodo: '/mes',
            desde: true,
            incluye: ['Parches y actualizaciones de seguridad cada mes', 'Revisión de los avisos que afectan a tu stack', 'Copias de seguridad verificadas', 'Aviso inmediato si sale algo crítico que te afecte'],
        },
    ],
};

export const STACK = [
    { grupo: 'Backend', items: ['PHP', 'Laravel', 'Node.js', 'TypeScript', 'Java', 'Python'] },
    { grupo: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Sass', 'Bootstrap', 'jQuery'] },
    { grupo: 'Móvil', items: ['Expo', 'React Native', 'NativeWind', 'EAS Build'] },
    { grupo: 'Datos', items: ['MySQL', 'MariaDB', 'SQLite', 'Access ODBC'] },
    { grupo: 'Infraestructura', items: ['IIS', 'Nginx', 'Debian', 'Proxmox', 'Git', 'PowerShell'] },
];

/** Clases y variable CSS de cada tono (las clases van literales para que Tailwind las genere). */
export const TONOS: Record<Tono, { var: string; fondo: string; borde: string; texto: string }> = {
    accent: { var: 'var(--accent)', fondo: 'bg-accent', borde: 'border-accent/60', texto: 'text-accent' },
    sand: { var: 'var(--sand)', fondo: 'bg-sand', borde: 'border-sand/60', texto: 'text-sand' },
    sage: { var: 'var(--sage)', fondo: 'bg-sage', borde: 'border-sage/60', texto: 'text-sage' },
    slate: { var: 'var(--slate)', fondo: 'bg-slate', borde: 'border-slate', texto: 'text-muted' },
};

/** Los tonos de las notas: los de la paleta y el lila (solo para Lilac). */
export const TONOS_NOTA: Record<TonoNota, { var: string; fondo: string; borde: string; texto: string }> = {
    ...TONOS,
    lila: { var: '154 124 196', fondo: 'bg-[#9a7cc4]', borde: 'border-[#9a7cc4]/60', texto: 'text-[#9a7cc4]' },
};
