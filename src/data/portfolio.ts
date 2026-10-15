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
    instagram: 'https://www.instagram.com/mysoftsolutions/',
    sitio: 'https://juanmolina.dev',
};

export const METRICAS: { valor: string; texto: string; tono: Tono }[] = [
    { tono: 'accent', valor: '100+', texto: 'instancias de SEVE operando en colegios de Colombia' },
    { tono: 'sand', valor: '2.854', texto: 'contribuciones en GitHub entre 2025 y 2026' },
    { tono: 'sage', valor: '500K+', texto: 'contactos gestionados en un CRM con envío por WhatsApp' },
    { tono: 'slate', valor: '10+', texto: 'años construyendo software para empresas reales' },
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
        resumen: 'Toda la operación de una academia en una sola plataforma: sitio web con matrícula en línea, app móvil para estudiantes, ERP administrativo, tienda virtual y control de asistencia por QR.',
        piezas: [
            { titulo: 'Sitio web y landings', texto: 'SPA en React con landing por curso, editor visual en vivo y formularios de matrícula por línea formativa.' },
            { titulo: 'App iOS y Android', texto: 'Expo y React Native: cursos, aula virtual, pagos, carnet, ingreso con huella o Face ID y notificaciones push.' },
            { titulo: 'ERP administrativo', texto: 'Más de 120 módulos: matrículas, facturación, notas, evaluación docente, carnetización, gastos y PQR.' },
            { titulo: 'Tienda Lilac by INCES', texto: 'E-commerce de productos de belleza con pagos por Wompi y Mercado Pago.' },
        ],
        stack: ['React', 'TypeScript', 'Expo', 'React Native', 'PHP 8.3', 'MariaDB', 'Tailwind'],
        imagen: '/images/projects/inces.webp',
        alt: 'Página de inicio de academiainces.com con la oferta de programas técnicos',
        enlaces: [
            { texto: 'academiainces.com', url: 'https://www.academiainces.com' },
            { texto: 'lilacbyinces.com', url: 'https://lilacbyinces.com' },
        ],
        insignias: ['App Store y Google Play', '120+ módulos', 'Pagos en línea'],
    },
    {
        id: 'seve',
        tono: 'sage',
        nombre: 'SEVE',
        corto: 'SEVE',
        cliente: 'Gestión escolar K-12 en Colombia',
        resumen: 'Plataforma con la que colegios públicos y privados califican, llevan el observador, controlan la asistencia y reportan a SIMAT, ajustada al Decreto 1290. Cada institución tiene su propia instancia y base de datos.',
        piezas: [
            { titulo: 'Académico y convivencia', texto: 'Notas, boletines, observador del alumno, PIAR, consolidados y planes de aula.' },
            { titulo: 'Portal de acudientes', texto: 'Agenda digital con notas, tareas y circulares, y avisos el mismo día por WhatsApp.' },
            { titulo: 'Videoclases', texto: 'Reuniones docente-estudiantes con cámara, pantalla compartida y chat sobre un servidor LiveKit propio.' },
            { titulo: 'Operación de la flota', texto: 'Panel de despliegue a más de 100 sitios, backups por colegio y un vigilante que reinicia servicios caídos.' },
        ],
        stack: ['PHP', 'Node.js', 'TypeScript', 'MySQL', 'Access ODBC', 'LiveKit', 'WhatsApp API', 'IIS'],
        imagen: '/images/projects/seve.webp',
        alt: 'Sitio público de SEVE con el titular "El colegio entero, en un solo expediente"',
        enlaces: [{ texto: 'seveweb.com', url: 'https://seveweb.com' }],
        insignias: ['100+ instancias', 'Decreto 1290', 'Videoclases'],
    },
    {
        id: 'fevel',
        tono: 'sage',
        nombre: 'FEVEL',
        corto: 'FEVEL',
        cliente: 'Fábrica y tiendas de moda',
        resumen: 'Dos sistemas para una marca con fábrica y tres sucursales: un ERP de inventario que audita cada movimiento y un panel para vender por WhatsApp e Instagram con todo el equipo a la vez.',
        piezas: [
            { titulo: 'Inventario multisede', texto: 'Fábrica y tres sucursales con reservas, traslados, promociones y alturas de producción.' },
            { titulo: 'Cartera y comisiones', texto: 'Caja por persona, cartera de clientes, comisiones de vendedores y registro de auditoría.' },
            { titulo: 'WhatsApp Cloud API', texto: 'Canal oficial de Meta con plantillas aprobadas, adjuntos, notas de voz y acuses de lectura.' },
            { titulo: 'Panel multiagente', texto: 'Chats de WhatsApp e Instagram asignados por vendedor, con etiquetas, atajos y notas internas.' },
        ],
        stack: ['PHP', 'Node.js', 'TypeScript', 'WebSocket', 'Meta Cloud API', 'MySQL'],
        enlaces: [],
        insignias: ['4 sedes', 'WhatsApp oficial', 'Instagram'],
    },
    {
        id: 'mysoft',
        tono: 'accent',
        nombre: 'MySoft',
        corto: 'MySoft',
        cliente: 'ERP propio para PYMEs y ópticas',
        resumen: 'Mi propio producto: un ERP que se instala por cliente, con su base de datos, su logo y sus módulos. La versión para ópticas suma citas e historias clínicas.',
        piezas: [
            { titulo: 'Ventas y caja', texto: 'Recibos, abonos, cotizaciones, métodos de pago e historial de caja y de ventas.' },
            { titulo: 'Inventario y compras', texto: 'Productos, proveedores, laboratorios, movimientos y cuentas por pagar.' },
            { titulo: 'Para ópticas', texto: 'Agenda de citas por profesional e historias clínicas con su PDF.' },
            { titulo: 'Una instalación por cliente', texto: 'Base de datos propia, permisos por módulo, respaldos y reportes en Excel y PDF.' },
        ],
        stack: ['PHP', 'MariaDB', 'jQuery', 'FPDF', 'PHPExcel'],
        imagen: '/images/projects/mysoft.webp',
        alt: 'Pantalla de ingreso de MySoft',
        enlaces: [{ texto: 'demo.mysoft.live', url: 'https://demo.mysoft.live' }],
        insignias: ['Desde 2020', 'Permisos por módulo', 'Historias clínicas'],
    },
];

/** Cómo se ilustra cada proyecto: captura del sitio o icono de la app. */
export type Variante = 'imagen' | 'icono';

export type Categoria = 'web' | 'apps';

export const CATEGORIAS: { id: Categoria | 'todos'; texto: string }[] = [
    { id: 'todos', texto: 'Todos' },
    { id: 'web', texto: 'Sitios web' },
    { id: 'apps', texto: 'Apps' },
];

export interface Proyecto {
    id: string;
    tono: Tono;
    categoria: Categoria;
    nombre: string;
    tipo: string;
    texto: string;
    stack: string[];
    variante: Variante;
    imagen: string;
    alt?: string;
    url?: string;
    /** Etiqueta cuando no hay enlace público; sin ella se muestra "Privado" (sistema interno de un cliente). */
    insignia?: string;
}

const LISTA: Proyecto[] = [
    {
        id: 'lilac',
        tono: 'sand',
        categoria: 'web',
        nombre: 'Lilac by INCES',
        tipo: 'E-commerce',
        texto: 'Tienda de cosméticos con catálogo, carrito, pedidos y pagos en línea por Wompi y Mercado Pago.',
        stack: ['PHP', 'MySQL', 'Wompi'],
        variante: 'imagen',
        imagen: '/images/projects/lilac.webp',
        alt: 'Tienda Lilac by INCES con el aviso de envío gratis',
        url: 'https://lilacbyinces.com',
    },
    {
        id: 'sorteos',
        tono: 'accent',
        categoria: 'web',
        nombre: 'Plataforma de sorteos',
        tipo: 'Rifas en línea',
        texto: 'Compra de números con pago por Wompi, abonos, vendedores, lista de ganadores y panel administrativo.',
        stack: ['PHP', 'MySQL', 'Wompi'],
        variante: 'imagen',
        imagen: '/images/projects/sorteos.webp',
        alt: 'Página pública de sorteos con el afiche de la rifa activa',
        url: 'https://sorteos.mysoft.live',
    },
    {
        id: 'juanxxiii',
        tono: 'sage',
        categoria: 'web',
        nombre: 'I.E. Diocesana Juan XXIII',
        tipo: 'Migración desde WordPress',
        texto: 'Reemplazo de un WordPress comprometido por PHP propio con panel. Pasó de 2,8 GB de archivos a 330 MB, sin perder contenido.',
        stack: ['PHP 8.3', 'MySQL', 'HTMLPurifier', 'TinyMCE'],
        variante: 'imagen',
        imagen: '/images/projects/juanxxiii.webp',
        alt: 'Sitio de la Institución Educativa Diocesana Juan XXIII',
        url: 'https://iedjuanxxiii.edu.co',
    },
    {
        id: 'boveda',
        tono: 'accent',
        categoria: 'apps',
        nombre: 'Bóveda',
        tipo: 'Extensión de navegador',
        texto: 'Gestor de contraseñas 100% local con cifrado AES-256-GCM, generador, evaluador de fortaleza y autocompletado.',
        stack: ['JavaScript', 'Manifest V3', 'Web Crypto'],
        variante: 'icono',
        imagen: '/images/projects/boveda.webp',
        alt: 'Icono de la extensión Bóveda',
        insignia: 'Extensión',
    },
    {
        id: 'hfsf',
        tono: 'sand',
        categoria: 'web',
        nombre: 'Hermanas Franciscanas',
        tipo: 'Migración desde WordPress',
        texto: 'Sitio y panel de contenidos que reemplazó un WordPress comprometido: noticias, sedes, carrusel y editor que acepta pegar desde Word.',
        stack: ['PHP 8.2', 'MySQL', 'CKEditor 5'],
        variante: 'imagen',
        imagen: '/images/projects/hfsf.webp',
        alt: 'Sitio de las Hermanas Franciscanas de la Sagrada Familia',
        url: 'https://hermanasfranciscanasdelasagradafamilia.com',
    },
];

// Se muestran en orden alfabético: un proyecto nuevo cae solo en su lugar.
export const PROYECTOS = [...LISTA].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

export const SERVICIOS = [
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
