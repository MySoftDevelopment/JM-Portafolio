---
titulo: 'PHP2Shell: las dos fallas críticas de PHP que ya se están explotando y cómo parchear tu servidor'
descripcion: 'CVE-2026-109618 y CVE-2026-109619 permiten ejecutar código en tu servidor sin autenticación. Qué versiones de PHP están afectadas y qué hacer hoy.'
fecha: 2026-10-28
categoria: seguridad
etiquetas: ['PHP', 'CVE-2026-109618', 'CVE-2026-109619', 'Laravel', 'PHP-FPM', 'Apache']
fuentes:
    - titulo: 'php.net: Security advisory, critical remote code execution vulnerabilities (21 oct 2026)'
      url: 'https://www.php.net/archive/2026.php#2026-10-21-5'
    - titulo: 'GHSA-w8hw-w9fx-j79w: RCE via OOM corruption (CVE-2026-109618)'
      url: 'https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w'
    - titulo: 'GHSA-6wmf-4rv5-p3rp: RCE via stale global state (CVE-2026-109619)'
      url: 'https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp'
    - titulo: 'CISA: Critical Vulnerabilities in PHP Require Immediate Patching'
      url: 'https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching'
    - titulo: 'CISA: CISA Adds Two Known Exploited Vulnerabilities to Catalog (26 oct 2026)'
      url: 'https://www.cisa.gov/news-events/alerts/2026/10/26/cisa-adds-two-known-exploited-vulnerabilities-catalog'
---

El 21 de octubre el equipo de PHP publicó las versiones **8.5.12, 8.4.27, 8.3.36 y 8.2.35** para corregir dos vulnerabilidades críticas, bautizadas como **PHP2Shell**. Las dos permiten que alguien ejecute código en tu servidor **sin iniciar sesión**, con los permisos del usuario del servidor web. Tienen una puntuación CVSS 4.0 de 9.2.

No es una alerta teórica más. El 26 de octubre la CISA (la agencia de ciberseguridad de Estados Unidos) las añadió a su catálogo de vulnerabilidades **explotadas activamente**. Si tienes un sitio en PHP, sea un Laravel, un WordPress o un sistema hecho a mano, esto te afecta.

## Qué está roto

El fallo no está en tu código ni en un paquete de Composer: está **en el propio intérprete de PHP**. Por eso un `composer update` no lo arregla.

- **CVE-2026-109618, corrupción por falta de memoria.** Cuando PHP se queda sin memoria mientras prepara una petición, puede abortar con datos internos a medio construir. La limpieza posterior los trata como válidos, y eso abre la puerta a ejecutar código. Se dispara con peticiones `multipart` (formularios y subidas de archivos) diseñadas para eso.
- **CVE-2026-109619, estado global obsoleto.** Parte del estado interno de una petición puede sobrevivir después de que su memoria se liberó. Una petición posterior, atendida por el mismo proceso, puede usar ese estado antes de que se reinicie.

## A quién afecta

Según el aviso oficial de PHP, **toda instalación que atiende peticiones web**: PHP-FPM, Apache con `mod_php`, `php-cgi`, FrankenPHP y LiteSpeed.

El riesgo más alto lo tiene **Apache con `mod_php`**: PHP demostró un ataque en el que una petición sin autenticar logra su objetivo **antes de que se ejecute una sola línea de tu aplicación**. Da igual lo bien escrito que esté tu código.

| Rama | Versión corregida |
| --- | --- |
| PHP 8.5 | 8.5.12 |
| PHP 8.4 | 8.4.27 |
| PHP 8.3 | 8.3.36 |
| PHP 8.2 | 8.2.35 |
| PHP 8.1, 8.0 y 7.4 | Sin versión oficial: solo parches en código fuente o paquetes de tu distribución |
| PHP 7.3 o anterior | Sin corrección |

## Qué hacer hoy

### 1. Mira qué versión corres de verdad

```bash
php -v
```

Ojo: la versión de la terminal (CLI) puede no ser la que usa tu sitio. Para estar seguro, revisa la que atiende la web, por ejemplo con un `phpinfo()` temporal (bórralo después) o el binario de FPM (`php-fpm8.3 -v`, según tu versión).

Si usas paquetes de Debian o Ubuntu, el número puede seguir siendo el "viejo" aunque el paquete ya traiga el parche: las distribuciones aplican la corrección sin cambiar la versión de PHP. En ese caso busca los CVE en el registro de cambios del paquete:

```bash
apt changelog php8.2-fpm | grep -E "CVE-2026-10961(8|9)"
```

### 2. Actualiza y reinicia los procesos

```bash
sudo apt update && sudo apt upgrade
sudo systemctl restart php8.3-fpm   # o apache2 si usas mod_php
```

**El reinicio es obligatorio.** La segunda falla vive en procesos que siguen corriendo: si actualizas el paquete pero no reinicias PHP-FPM o Apache, los procesos viejos siguen siendo vulnerables.

Con **Docker**, bajar la imagen no basta: hay que reconstruir tus imágenes con `--pull` y volver a desplegar los contenedores. Después, confirma la versión dentro del contenedor con `docker exec <contenedor> php -v`.

En **hosting compartido** (Hostinger, cPanel y similares) la versión la controla el proveedor. Entra al panel, elige la versión más reciente de tu rama y confirma con `phpinfo()` que sea una de la tabla. Si no lo es, abre un ticket de soporte.

### 3. Si no puedes actualizar hoy

PHP aclara que **ningún cambio de configuración elimina el riesgo por completo**. Actualizar es lo único seguro. Mientras tanto, el aviso oficial recomienda:

- Para CVE-2026-109619: poner `session.upload_progress.enabled=0` y, en PHP 8.5, `fatal_error_backtraces=0`. Luego, reiniciar todos los procesos.
- Para CVE-2026-109618: poner `memory_limit=-1` de forma que la aplicación no lo pueda cambiar (por ejemplo, con `php_admin_value` en el pool de FPM) y bajar `post_max_size`: `8M` si no recibes archivos, `32M` si los recibes.
- Si el servidor no se puede actualizar en absoluto, **quitarle el acceso desde internet** hasta que se pueda.

Una advertencia: `memory_limit=-1` quita el tope de memoria de PHP, así que conviene ponerle un límite al contenedor o al servicio para que un proceso descontrolado no tumbe todo el servidor. Es una medida temporal, no una configuración para dejar.

## Si sigues en PHP 7.4 o 8.1

Este es el momento de migrar. PHP publicó parches mínimos en código fuente para 7.4, 8.0 y 8.1 por la gravedad del caso, pero **no habrá versiones compiladas**: tendrías que compilar PHP tú mismo o depender de un proveedor con soporte extendido. La próxima falla grave puede no tener ni eso.

En la práctica, pasar un proyecto de 7.4 a 8.3 o 8.4 suele implicar revisar funciones obsoletas y actualizar dependencias de Composer. Es trabajo, pero bastante menos que recuperarse de un servidor comprometido.

## En resumen

1. Comprueba la versión que usa tu sitio, no solo la de la terminal.
2. Actualiza a 8.5.12, 8.4.27, 8.3.36 o 8.2.35 (o al paquete parcheado de tu distribución).
3. Reinicia PHP-FPM o Apache.
4. Si estás en 8.1 o anterior, planea la migración ya.
