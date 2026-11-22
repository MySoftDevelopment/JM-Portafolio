---
titulo: 'PHP 8.5.13, 8.4.28, 8.3.37 y 8.2.36: siete fallas críticas, una en PHP-FPM, y cómo saber si te afecta'
descripcion: 'PHP corrigió siete vulnerabilidades críticas el 19 de noviembre, entre ellas un request smuggling en PHP-FPM que permite ejecutar código. Qué revisar y cómo actualizar.'
fecha: 2026-11-22
categoria: seguridad
michi: escudo
etiquetas: ['PHP', 'PHP-FPM', 'CVE-2026-129289', 'CVE-2026-126714', 'Nginx', 'Debian', 'Laravel']
formato: carrusel
resumen:
    - 'PHP publicó [8.5.13, 8.4.28, 8.3.37 y 8.2.36](las nuevas versiones de seguridad) con **siete fallas críticas**, varias de ejecución de código.'
    - 'La más grave está en [PHP-FPM](pe ache pe efe pe eme): con conexiones reutilizadas entre el servidor web y PHP, alguien sin cuenta puede ejecutar código.'
    - 'Nginx y Apache no reutilizan esas conexiones por defecto. Revisa que no tengas **fastcgi_keep_conn on** en tu configuración.'
    - 'Otra falla toca las sesiones en archivos, que son las de PHP por defecto. No depende de tu servidor web.'
    - 'Actualiza PHP en cada servidor, reinicia PHP-FPM y tus workers de colas, y confirma la versión que quedó corriendo.'
fuentes:
    - titulo: 'php.net: PHP 8.5.13, 8.4.28, 8.3.37 y 8.2.36 Released (19 de noviembre de 2026)'
      url: 'https://www.php.net/archive/2026.php'
    - titulo: 'php.net: ChangeLog de PHP 8'
      url: 'https://www.php.net/ChangeLog-8.php'
    - titulo: 'GHSA-qc49-hpvq-g2w6: PHP-FPM request smuggling through an unread HTTP request body (CVE-2026-129289)'
      url: 'https://github.com/php/php-src/security/advisories/GHSA-qc49-hpvq-g2w6'
    - titulo: 'GHSA-fm2m-fjf5-v3cp: Partially overwritten session files can lead to remote code execution (CVE-2026-126714)'
      url: 'https://github.com/php/php-src/security/advisories/GHSA-fm2m-fjf5-v3cp'
    - titulo: 'GHSA-658j-r8rw-q6mx: Session serializer mismatch (CVE-2026-115560)'
      url: 'https://github.com/php/php-src/security/advisories/GHSA-658j-r8rw-q6mx'
    - titulo: 'GHSA-8mjj-2r7p-4hg2: Use-after-free in magic method backtraces (CVE-2026-129474)'
      url: 'https://github.com/php/php-src/security/advisories/GHSA-8mjj-2r7p-4hg2'
    - titulo: 'GHSA-gr4f-wgx5-jpfv: Timezone cache use-after-free (CVE-2026-129496)'
      url: 'https://github.com/php/php-src/security/advisories/GHSA-gr4f-wgx5-jpfv'
    - titulo: 'GHSA-g3vh-838c-65v7: Use-after-free after interrupted session shutdown (CVE-2026-129481)'
      url: 'https://github.com/php/php-src/security/advisories/GHSA-g3vh-838c-65v7'
    - titulo: 'GHSA-2fjv-p558-g82m: Use-after-free via repopulation of last_fatal_error_backtrace (CVE-2026-129182)'
      url: 'https://github.com/php/php-src/security/advisories/GHSA-2fjv-p558-g82m'
    - titulo: 'Laravel Forge: PHP security advisory (November 2026)'
      url: 'https://laravel.com/forge/docs/knowledge-base/php-security-advisory-november-2026'
    - titulo: 'Debian Security Tracker: CVE-2026-129289'
      url: 'https://security-tracker.debian.org/tracker/CVE-2026-129289'
    - titulo: 'nginx.org: documentación de fastcgi_keep_conn'
      url: 'https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_keep_conn'
---

El 19 de noviembre el equipo de PHP publicó **PHP 8.5.13, 8.4.28, 8.3.37 y 8.2.36**, versiones de seguridad para todas las ramas con soporte. Un día antes había avisado que la severidad más alta era **crítica**. Según el aviso de Laravel Forge, son siete vulnerabilidades críticas, todas con 9,2 en CVSS 4.0, y cuatro altas.

Es el segundo mes seguido. En octubre contamos [PHP2Shell](/blog/php2shell-actualiza-php/), dos fallas que sí se explotaron y que obligaron a pasar a 8.5.12, 8.4.27, 8.3.36 u 8.2.35. Dos de las críticas de ahora son, según sus propios avisos, correcciones incompletas de una de aquellas (CVE-2026-109619). Si actualizaste en octubre, te toca otra vez.

La diferencia con octubre: casi todas las fallas nuevas necesitan una configuración que no es la de fábrica o una aplicación con condiciones particulares. El mismo equipo de PHP lo dijo en su anuncio previo. Y a la fecha del catálogo de CISA del 20 de noviembre, ninguno de estos CVE aparece como explotado activamente. Aun así, hay que actualizar.

## Las críticas, una por una

| CVE | Qué es | Ramas | Cuándo se puede explotar |
| --- | --- | --- | --- |
| CVE-2026-129289 | *Request smuggling* en PHP-FPM, ejecución de código sin autenticación | 8.2 a 8.5 | El servidor web reutiliza las conexiones FastCGI y la aplicación abre el cuerpo de la petición sin leerlo completo |
| CVE-2026-126714 | Archivos de sesión sobrescritos a medias | 8.2 a 8.5 | Sesiones en archivos (lo normal), una escritura interrumpida y una cadena de deserialización en la aplicación |
| CVE-2026-115560 | Serializadores de sesión que no coinciden | 8.2 a 8.5 | `session.upload_progress` activo y dos serializadores distintos leyendo las mismas sesiones |
| CVE-2026-129496 | *Use-after-free* en la caché de zonas horarias | 8.2 a 8.5 | Errores escritos en un archivo de log y una advertencia al arrancar PHP |
| CVE-2026-129481 | *Use-after-free* al cerrar la sesión | 8.3 a 8.5 | Un error fatal dentro de un *callback* de sesión |
| CVE-2026-129474 | *Use-after-free* en trazas de métodos mágicos | Solo 8.5 | `zend.exception_ignore_args` en `Off` |
| CVE-2026-129182 | *Use-after-free* en trazas de errores fatales | Solo 8.5 | Combinaciones específicas de configuración |

Las cuatro altas, según Forge: una escalada de privilegios local en PHP-FPM (CVE-2026-129291), una forma de saltarse la verificación de firma de archivos PHAR, URL con el esquema en mayúsculas mezcladas (como `HTTPS://`) que se envían sin cifrar y una denegación de servicio con cabeceras HTTP partidas en varias líneas.

## La de PHP-FPM, explicada

Es la que más llama la atención, porque el aviso la describe como ejecución de código **sin autenticación**. El problema viene, según el aviso, desde PHP 5.6.

Cuando una aplicación abre `php://input` (el cuerpo crudo de la petición) pero no lo lee hasta el final, PHP debería descartar los bytes que sobran al terminar. No lo hacía si el *stream* ya existía. Con un `multipart/form-data` malformado, el atacante deja bytes suyos sin leer. Si el servidor web mantiene abierta la conexión con PHP-FPM para la siguiente petición, PHP-FPM interpreta esos bytes como una petición FastCGI nueva, con parámetros elegidos por el atacante. Con eso puede activar `allow_url_include` y `auto_prepend_file` y, si conoce la ruta de algún script que exista, ejecutar su propio código PHP.

La condición clave es la reutilización de conexiones. El aviso dice que las configuraciones estándar de Nginx y Apache, que cierran la conexión FastCGI después de cada petición, no están afectadas por el ataque demostrado. La documentación de Nginx lo confirma: `fastcgi_keep_conn` viene en `off`. Quedan expuestos:

- Nginx con `fastcgi_keep_conn on`. Según su documentación, esa directiva es necesaria para usar conexiones *keepalive* con PHP-FPM, así que revisa sobre todo las configuraciones afinadas para rendimiento.
- Apache con `mod_proxy_fcgi` y `enablereuse=on`.
- HAProxy u otros frentes FastCGI que mantienen conexiones abiertas.

## Cómo comprobarlo en tu servidor

Para un VPS con Debian o Ubuntu, Nginx o Apache y PHP-FPM. Estos pasos miden la urgencia; no reemplazan la actualización.

### 1. Busca la reutilización de conexiones

```bash
sudo grep -rn "fastcgi_keep_conn" /etc/nginx/
sudo grep -rn "enablereuse" /etc/apache2/
```

Si alguna línea dice `fastcgi_keep_conn on;` o `enablereuse=on`, ese servidor es el que más prisa tiene. Mientras actualizas, quita la directiva (o déjala en `off`) y recarga el servidor web. Es la mitigación que da el propio aviso. Si usas plantillas de Nginx para crear sitios, quítala también de ahí.

### 2. Revisa las sesiones

La falla de los serializadores necesita `session.upload_progress` activo. Las versiones nuevas lo apagan por defecto, pero una línea explícita en tu `php.ini` lo vuelve a prender:

```bash
grep -rn "session.upload_progress.enabled" /etc/php/*/fpm/
```

Si no usas barras de progreso de subida, déjalo en `0`. El aviso aclara que hacerlo con `ini_set()` desde la aplicación llega tarde: tiene que ir en la configuración.

La de archivos de sesión sobrescritos (CVE-2026-126714) no depende de tu servidor web, porque `files` es el manejador de sesiones por defecto de PHP. Necesita, eso sí, que el atacante influya en los datos de la sesión, que una escritura se interrumpa y que la aplicación tenga una cadena de deserialización aprovechable. En Laravel, guardar las sesiones en Redis o en base de datos en vez de archivos va en la línea de lo que recomienda el aviso (un almacenamiento que reemplace los registros de forma atómica), pero no reemplaza el parche.

### 3. Si estás en PHP 8.5

Dos de las críticas solo afectan a 8.5. Para la de métodos mágicos, el aviso da un arreglo inmediato: `zend.exception_ignore_args=1` en la configuración de PHP-FPM y reiniciar los *workers*. Cambiarlo solo en la CLI no sirve.

```bash
grep -rn "zend.exception_ignore_args" /etc/php/8.5/fpm/
```

## Cómo actualizar en Debian

Debian ya publicó los paquetes corregidos, según su rastreador de seguridad:

| Debian | Paquete | Versión corregida |
| --- | --- | --- |
| 13 (trixie) | php8.4 | 8.4.28-1~deb13u1 (DSA-6641-1) |
| 12 (bookworm) | php8.2 | 8.2.36-1~deb12u1 (DLA-4916-1) |

Antes de instalar, confirma que el candidato es el corregido (cambia `8.4` por tu versión):

```bash
sudo apt update
apt-cache policy php8.4-fpm
sudo apt upgrade
```

Si instalas PHP desde los paquetes de Ondřej Surý (lo común en Ubuntu, y lo que usa Forge), el aviso de Forge advierte dos cosas: las actualizaciones automáticas de Ubuntu no tocan esos paquetes, y en esta ocasión los paquetes tardaron varias horas en llegar a un espejo. Para PHP 8.1 y anteriores, sin soporte oficial, Surý publicó revisiones de paquete con los arreglos: `php -v` mostrará el mismo número de antes, así que la forma de confirmarlo es la revisión del paquete con `dpkg -l`.

Después de actualizar, verifica lo que de verdad está corriendo:

```bash
php -v
php-fpm8.4 -v
```

Y reinicia los procesos largos, que siguen con el binario viejo hasta que mueren. En Laravel:

```bash
php artisan queue:restart
php artisan horizon:terminate
php artisan octane:reload
```

(Los dos últimos, solo si usas Horizon u Octane.)

## Qué tanta prisa tienes: criterio para decidir

Esto es análisis a partir de los avisos.

- **Hoy mismo**, si encontraste `fastcgi_keep_conn on` o `enablereuse=on`, o si estás en PHP 8.5 sin `zend.exception_ignore_args` activo. Son los casos donde los propios avisos describen ejecución de código con las condiciones cumplidas.
- **Esta semana**, en cualquier otro servidor con PHP 8.2 a 8.5. Que la configuración por defecto te proteja de la falla de FPM no te protege de las de sesiones, y las condiciones de una aplicación (un error fatal en un *callback*, un gadget en una dependencia de Composer) no siempre son fáciles de descartar desde fuera.
- **Hosting compartido**: no controlas PHP-FPM ni el `php.ini` global. Lo que sí puedes hacer es elegir 8.4 u 8.5 en el panel y revisar qué versión exacta muestra. No asumas que el proveedor ya actualizó: confírmalo con un `phpinfo()` temporal que borres enseguida, o pregúntale.
- **PHP 8.1 o anterior**: los parches de Surý son un salvavidas, no un plan. Es el momento de migrar a una rama con soporte.

El mismo 19 de noviembre salió también **PHP 8.6.0**, la nueva versión mayor. No figura entre las versiones afectadas de estos avisos, pero no la uses para tapar estas fallas: actualiza la rama que ya usas y migra a 8.6 cuando la hayas probado.

## En resumen

1. PHP publicó 8.5.13, 8.4.28, 8.3.37 y 8.2.36 con siete fallas críticas y cuatro altas. Por ahora ninguna está en el catálogo de explotadas de CISA.
2. La más grave, CVE-2026-129289, permite ejecutar código sin autenticación si el servidor web reutiliza conexiones con PHP-FPM, algo que Nginx y Apache no hacen por defecto.
3. Busca `fastcgi_keep_conn` y `enablereuse` en tu configuración y desactívalos si están en `on`.
4. Apaga `session.upload_progress` si no lo usas y, en PHP 8.5, activa `zend.exception_ignore_args`.
5. Actualiza PHP en cada servidor, reinicia PHP-FPM y los *workers*, y verifica la versión que quedó corriendo.
