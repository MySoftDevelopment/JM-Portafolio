# Rutina del blog

Instrucciones para el agente programado que escribe las entradas del blog de juanmolina.dev.
El agente **publica solo**: cuando la entrada está verificada y el build pasa, la fusiona en `main`. GitHub Actions construye el sitio y Hostinger lo publica en unos minutos. Como nadie la revisa antes de salir, la verificación del paso 3 es obligatoria.

## 1. Buscar noticias

El blog cubre **tecnología en general**, no solo seguridad web. Revisa lo publicado desde la última entrada (la fecha más reciente en `src/content/blog/`) en estas líneas, cada una con su categoría:

| Categoría | Qué cubre | Fuentes primarias |
| --- | --- | --- |
| `seguridad` | Vulnerabilidades y parches en el stack de la portada (PHP, Laravel, Node.js, React, React Native/Expo, TypeScript, Vite, Tailwind, MySQL/MariaDB, Nginx, IIS, Windows Server, Debian, WhatsApp Cloud API) | Catálogo KEV de CISA, GitHub Advisory Database (npm y composer, alta o crítica), avisos de php.net y nodejs.org, MSRC |
| `ciberataques` | Hackeos, filtraciones y ataques a empresas o servicios grandes (exchanges, bancos, telecomunicaciones, plataformas con millones de usuarios), ransomware con impacto real | Comunicado de la empresa afectada, avisos de CISA, CERT o autoridades, informes de la firma que investigó |
| `ia` | Modelos y productos de IA: Anthropic (Claude), OpenAI (ChatGPT), Google (Gemini), Meta, xAI, Mistral, DeepSeek, Qwen y otros; lanzamientos, precios, regulación, investigación relevante | Blog, notas de versión o documentación oficial de cada empresa, papers, textos regulatorios |
| `tecnologia` | Actualidad y tendencias: robótica, innovación china, chips y hardware, big tech, internet, telecomunicaciones, redes sociales, regulación digital | Anuncio oficial de la empresa o institución, comunicado de prensa, documento público |
| `lanzamientos` | Versiones de herramientas del stack | Blogs y notas de versión oficiales de PHP, Node.js, React, TypeScript, Vite, Laravel, Expo y React Native, Tailwind CSS, MySQL y MariaDB, Nginx, IIS y Windows Server |
| `ecosistema` | Cambios en la industria del desarrollo: fin de soporte, cambios de licencia, deprecaciones, encuestas grandes (Stack Overflow, State of JS), movimientos de GitHub, npm o Vercel | Anuncio oficial del proyecto o empresa |

`guias` **no es de la rutina**: las guías y los cursos los prepara Juan a mano. Nunca escribas una.

Puedes usar medios de tecnología para **descubrir** noticias, pero la entrada se escribe y se cita a partir de la **fuente primaria**. En `ciberataques`, `ia` y `tecnologia` a veces la fuente primaria es solo el comunicado de la empresa: si un medio reconocido aporta un dato que la empresa no confirmó, puedes citarlo como medio y atribuirlo («según Reuters…»), pero nunca lo presentes como hecho confirmado.

## 2. Elegir

Escribe **una entrada por ejecución**: la noticia más relevante, sea de la categoría que sea. Dos solo si, además de esa, hay una vulnerabilidad del stack que se está explotando activamente.

No hay cuotas por categoría. Manda la relevancia; la variedad solo decide los empates.

### Paso 1: reunir candidatas de todas las categorías

Busca en **todas** las categorías del paso 1 antes de decidir, no solo en la primera que dé resultados. Anota la mejor candidata de cada una, si la hay.

### Paso 2: medir la relevancia

Para cada candidata, responde:

- **Alcance:** ¿a cuánta gente afecta o cuánta gente está hablando de ella? Millones de usuarios, una plataforma que todos usan, una noticia que está en todos los medios de tecnología.
- **Impacto:** ¿cambia algo concreto? Hay que actuar (parchear, cambiar contraseñas, migrar), cambia lo que se puede hacer (un modelo o producto nuevo con capacidades reales) o cambian las reglas (precios, regulación, fin de soporte).
- **Novedad:** ¿es un hecho nuevo y confirmado, o el seguimiento de algo ya conocido sin datos nuevos?

Una candidata solo es publicable si tiene **alcance o impacto altos** y es nueva. Lo demás se descarta, aunque sea la única de su categoría.

### Paso 3: elegir

1. Una vulnerabilidad del stack que **ya se está explotando** (está en KEV o el proveedor lo confirma) va siempre, porque quien la lea tiene que actuar hoy.
2. Si no, gana la candidata más relevante, sin importar la categoría.
3. **Desempate:** si dos candidatas están parejas, elige la de la categoría que lleva más tiempo sin aparecer en el blog (revisa las categorías de las últimas entradas).

Dentro de `seguridad` se mantiene el orden: explotada activamente > crítica o alta en algo muy usado del stack > versión mayor con cambios que rompen.

### Qué descartar

- Lo que ya está cubierto: lee los títulos y etiquetas de `src/content/blog/`. Una continuación con datos nuevos sí vale (enlázala a la entrada anterior).
- Rumores, filtraciones de supuestos productos sin confirmar, opinión sin hechos y temas sin relación con la tecnología.
- **Si ninguna candidata es publicable, no crees nada.** Es mejor un día sin entrada que una entrada de relleno.

**Enfoque según la categoría.** La pregunta que responde la entrada cambia:

- `seguridad`: qué pasó, a quién afecta, cómo saber si me afecta y qué hago hoy.
- `ciberataques`: qué pasó, cómo entraron (si se sabe), qué datos se expusieron, qué hacer si eres usuario y qué lección deja para quien desarrolla.
- `ia` y `tecnologia`: qué se anunció, qué cambia de verdad frente a lo anterior (con datos, no con el discurso de la empresa), quién lo puede usar, cuánto cuesta si aplica y qué significa para quien trabaja en tecnología.
- `lanzamientos` y `ecosistema`: qué cambia, qué rompe y cómo migrar o decidir.

## 3. Verificar

- Cada dato concreto (número de CVE, versiones afectadas y corregidas, fechas, puntuación CVSS, configuraciones) debe estar en una fuente primaria que hayas leído. Si dos fuentes no coinciden, manda la oficial. Si no puedes confirmar algo, no lo escribas.
- No inventes comandos, opciones de configuración ni nombres de paquetes. Si das un comando, debe existir tal cual.
- No afirmes que un proveedor (Hostinger, AWS, etc.) ya aplicó un parche salvo que lo diga una fuente.

## 4. Escribir

Archivo: `src/content/blog/AAAA-MM-DD-slug.md`. El slug va en español, corto y con las palabras que buscaría alguien en Google (ejemplo: `php2shell-actualiza-php`). Usa como referencia de tono y estructura `src/content/blog/2026-10-28-php2shell-actualiza-php.md` (seguridad) y `src/content/blog/2026-11-03-nodejs-26-lts-lithium-actualizar.md` (lanzamientos).

Frontmatter (lo valida `src/content.config.ts`, y si no cumple, el build falla):

```yaml
---
titulo: 'Máximo 110 caracteres, con el nombre del producto y el problema'
descripcion: 'Entre 70 y 170 caracteres. Es la meta description: qué pasó y por qué importa.'
fecha: AAAA-MM-DD
categoria: seguridad # seguridad | ciberataques | ia | tecnologia | lanzamientos | ecosistema (guias es manual)
michi: lupa # escena de Michi para la ilustración (ver abajo)
etiquetas: ['PHP', 'CVE-AAAA-NNNNN']
formato: carrusel # imagen | carrusel | reel: la pieza de Instagram (ver abajo)
resumen: # obligatorio con carrusel o reel; 3 a 6 puntos, cada uno en una línea y entre comillas simples
    - 'Primer punto: qué pasó, en una o dos frases.'
    - 'Segundo punto: a quién afecta, con lo importante en **negrita**.'
    - 'Tercer punto: qué hacer hoy.'
fuentes:
    - titulo: 'Nombre de la fuente primaria'
      url: 'https://...'
---
```

Formato de Instagram (`formato`): según la relevancia de la noticia.

| Formato | Úsalo cuando |
| --- | --- |
| `imagen` | Relevancia baja: una versión menor, un aviso de alcance limitado. Una sola imagen con el título. |
| `carrusel` | Relevancia media: merece explicarse en varias imágenes (una por punto del resumen). |
| `reel` | Muy importante y de tendencia: se explota activamente, un hackeo o un lanzamiento de IA del que todo el mundo habla, afecta a mucha gente o es de lo que se está hablando en la comunidad. Michi lo narra con voz. Resérvalo para lo que de verdad lo merece (a lo sumo una o dos por semana). |

Todas las piezas terminan solas con «¿Deseas más información?», el enlace a la entrada y «¿Te gusta mi contenido? Sígueme»: no lo escribas en el resumen.

Resumen (`resumen`), con `carrusel` o `reel`:

- Entre 3 y 6 puntos, máximo 200 caracteres cada uno (mejor alrededor de 120). Cuentan la noticia en orden: qué pasó, a quién afecta, qué hacer. Sin el título (ya va en la primera pieza).
- Cada punto debe entenderse solo y en voz alta: en el reel se lee tal cual.
- Los datos salen de la entrada, que ya está verificada. No agregues nada que no esté en ella.
- `**texto**` resalta una palabra o frase en pantalla (una por punto como mucho).
- `[en pantalla](para la voz)` cuando algo se lee distinto de como se escribe: `[CVE-2026-12345](esta vulnerabilidad)`, `[8.1.10](ocho punto uno punto diez)`, `[npm](ene pe eme)`. Úsalo con números de versión, CVE, siglas y comandos.
- Cada punto en una sola línea, entre comillas simples (una comilla simple dentro del texto se escribe doble: `''`).

Escena de Michi (`michi`): elige la que mejor aluda al tema, y no repitas la de la entrada anterior si otra encaja:

| Escena | Úsala para |
| --- | --- |
| `alerta` | Algo que ya se está explotando o es urgente |
| `bicho` | Un fallo o bug concreto (ejecución de código, corrupción de memoria) |
| `lupa` | Investigar, auditar o "cómo saber si te afecta" |
| `escudo` | Parches y actualizaciones de seguridad que protegen |
| `llave` | Autenticación, tokens, contraseñas, permisos |
| `paquete` | Dependencias, npm o Composer, ataques a la cadena de suministro |
| `servidor` | Servidores web e infraestructura (Nginx, IIS, Linux, Windows Server) |
| `piensa` | Lanzamientos, IA, tendencias, cambios o debates que invitan a decidir algo |

Las imágenes (portada, ilustración y piezas para Instagram) se generan después, fuera de la rutina: tú solo elige la escena, el formato y escribe el resumen.

Estilo:

- Español de Colombia, tuteando, claro y directo. Frases cortas. Sin emojis ni signos de exclamación.
- Escribe para alguien que trabaja en tecnología y quiere entender la noticia, no solo enterarse. Sigue el enfoque de la categoría (paso 2). Ese enfoque práctico es lo que diferencia la entrada de una noticia más.
- En `ia`, `tecnologia` y `ciberataques` puedes dar contexto y explicar por qué importa, pero separa claramente los hechos (con fuente) del análisis. No exageres ni hagas predicciones presentadas como hechos.
- Entre 600 y 1200 palabras. Secciones con `##`, pasos con `###`, una tabla (versiones, comparación de modelos, cronología del ataque) si aplica y bloques de código con su lenguaje (` ```bash `, ` ```php `, ` ```ts `).
- Redacción propia. No copies párrafos de las fuentes; como mucho, una cita corta entre comillas y atribuida.
- El cierre es un resumen en pasos. No añadas una llamada a contactar: la página ya la incluye.

## 5. Comprobar y publicar

1. Ejecuta `yarn install --frozen-lockfile` y `yarn build`. Si el build falla, corrige la entrada (normalmente el frontmatter). Si no logras que pase, no publiques.
2. Crea la rama `blog/AAAA-MM-DD-slug` desde `main` y haz commit solo del archivo de la entrada. Mensaje: `Blog: <titulo de la entrada>`.
3. Antes de publicar, relee la entrada contra las fuentes y decide:
    - **Todo verificado** en fuentes primarias: fusiona en `main` con avance rápido (`git checkout main && git pull && git merge --ff-only blog/...`), haz push de `main` y borra la rama.
    - **Hay algún dato que no pudiste confirmar** o las fuentes se contradicen sin que una oficial lo resuelva: no publiques. Sube la rama y abre un Pull Request con una sección **«Para revisar»** que diga qué dato quedó en duda, para que Juan decida.
4. No toques ningún otro archivo del repositorio.
