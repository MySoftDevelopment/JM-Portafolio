---
titulo: 'nginx2root: fallas críticas en Nginx con HTTP/2 permiten ejecutar código, actualiza a 1.30.7 o 1.31.9'
descripcion: 'Nginx corrigió diez vulnerabilidades, cinco con CVSS 9.2. La de HTTP/2 viene desde 2015. Cómo saber si te afecta, qué hacer en Debian y cómo mitigar hoy.'
fecha: 2026-11-19
categoria: seguridad
michi: servidor
etiquetas: ['Nginx', 'HTTP/2', 'Debian', 'Ubuntu', 'servidores', 'nginx2root', 'CVE-2026-123007', 'CVE-2026-123633']
formato: carrusel
resumen:
    - 'Nginx publicó las versiones [1.30.7](uno punto treinta punto siete) y [1.31.9](uno punto treinta y uno punto nueve) con **diez correcciones de seguridad**.'
    - 'La más grave está en HTTP/2, existe desde 2015 y los investigadores lograron ejecutar código en el servidor con ella.'
    - 'Te afecta si tu sitio usa HTTP/2, una opción que se suele activar junto con HTTPS.'
    - 'No hay reportes de explotación, pero Debian estable **aún no tenía parche** al momento de escribir esto.'
    - 'Qué hacer hoy: actualiza Nginx y reinícialo. Si no hay parche para tu sistema, apaga HTTP/2 mientras llega.'
fuentes:
    - titulo: 'nginx.org: nginx security advisories'
      url: 'https://nginx.org/en/security_advisories.html'
    - titulo: 'nginx.org: CHANGES (nginx 1.31.9)'
      url: 'https://nginx.org/en/CHANGES'
    - titulo: 'nginx.org: CHANGES-1.30 (nginx 1.30.7)'
      url: 'https://nginx.org/en/CHANGES-1.30'
    - titulo: 'CVE.org: CVE-2026-123007'
      url: 'https://www.cve.org/CVERecord?id=CVE-2026-123007'
    - titulo: 'CVE.org: CVE-2026-123633'
      url: 'https://www.cve.org/CVERecord?id=CVE-2026-123633'
    - titulo: 'CVE.org: CVE-2026-118899'
      url: 'https://www.cve.org/CVERecord?id=CVE-2026-118899'
    - titulo: 'F5: K000163926 (CVE-2026-123007)'
      url: 'https://my.f5.com/manage/s/article/K000163926'
    - titulo: 'Wiz Research: NGINX HTTP/2 remote code execution vulnerabilities'
      url: 'https://www.wiz.io/blog/nginx-http2-rce-vulnerabilities'
    - titulo: 'Xint: NGINX2Root, remote code execution'
      url: 'https://xint.io/blog/nginx2root-remote-code-execution'
    - titulo: 'Debian Security Tracker: CVE-2026-123007'
      url: 'https://security-tracker.debian.org/tracker/CVE-2026-123007'
    - titulo: 'Ubuntu Security: CVE-2026-123007'
      url: 'https://ubuntu.com/security/CVE-2026-123007'
    - titulo: 'nginx.org: módulo ngx_http_v2_module'
      url: 'https://nginx.org/en/docs/http/ngx_http_v2_module.html'
---

El 18 de noviembre, Nginx publicó las versiones **1.30.7** (rama estable) y **1.31.9** (rama *mainline*) con diez correcciones de seguridad. Es el segundo paquete grande en cinco semanas: en octubre ya [había corregido cinco fallas](/blog/nginx-cinco-cve-octubre-2026/) que dependían de configuraciones poco comunes. Esta vez es distinto. La falla más grave está en HTTP/2, una opción que se suele activar junto con HTTPS, y dos equipos de investigación dicen haber logrado ejecutar código en el servidor con ella.

Xint, una de las firmas que la reportó, bautizó el conjunto como **nginx2root**.

## Qué se corrigió

F5, la empresa dueña de Nginx, calificó cinco de las diez fallas con **9.2 en CVSS 4.0 (crítica)** y 8.1 en CVSS 3.1. nginx.org, con su propia escala, marca tres como de severidad «major».

| CVE | Qué es | Cuándo te afecta | Versiones vulnerables (nginx.org) |
| --- | --- | --- | --- |
| CVE-2026-123007 | Corrupción de memoria en el control de flujo de HTTP/2 | HTTP/2 activo | 1.9.5 a 1.31.8 |
| CVE-2026-123633 | Uso de memoria liberada en HTTP/2 | HTTP/2 con `proxy_pass` hacia un backend | 1.19.7 a 1.31.8 |
| CVE-2026-121810 | Uso de memoria liberada en HTTP/3 | HTTP/3 (QUIC) activo | 1.25.0 a 1.31.8 |
| CVE-2026-123634 | Uso de memoria liberada en el `resolver` | `resolver` con `proxy_pass` que usa variables, y subpeticiones por SSI o `mirror` | 0.6.18 a 1.31.8 |
| CVE-2026-113425 | Uso de memoria liberada en el proxy de correo | Bloque `mail` configurado | 0.5.33 a 1.31.8 |
| CVE-2026-118899 | Bucle infinito al leer el cuerpo de la petición | `listen ... ssl` con TLS 1.3 | 1.13.0 a 1.31.8 |

Las cinco primeras son las de 9.2. Según F5, pueden tumbar el proceso *worker* de Nginx o corromper su memoria, y llevar a ejecución remota de código si la protección ASLR está desactivada o el atacante logra saltársela. La sexta, CVE-2026-118899, es de denegación de servicio (7.5 en CVSS 3.1), pero merece atención porque la condición es muy común: HTTPS con TLS 1.3. Un atacante sin credenciales puede dejar un *worker* atascado sin atender conexiones.

Las otras cuatro son de severidad media o baja y solo afectan configuraciones específicas del módulo `stream`, PROXY protocol v2 y `try_files` con `alias` y `map`.

## Por qué la de HTTP/2 es la que importa

CVE-2026-123007 tiene tres características que la separan del resto:

- **Lleva once años ahí.** Según Xint, existe desde que Nginx incorporó HTTP/2 en 2015 (versión 1.9.5).
- **No necesita una configuración rara.** Wiz Research dice que la explotó en un Nginx que solo servía archivos estáticos, sin aplicación detrás ni módulos de terceros. Basta con tener HTTP/2 activo.
- **Hay demostraciones de ejecución de código.** Wiz reporta que la logró en las compilaciones oficiales 1.31.7 y 1.31.8 sobre HTTP/2 con TLS en sistemas de 64 bits. Xint dice que la validó en AWS, Google Cloud y Azure, incluso contra un servidor HTTPS público con tráfico normal.

Aquí hay un matiz con ASLR. F5 condiciona la ejecución de código a que ASLR esté desactivado o se pueda evadir. Wiz va más allá y dice que ASLR no protege en este caso, porque el mismo fallo sirve primero para leer memoria y descubrir las direcciones. Wiz aclara que explotarla no es sencillo y exige adaptarse a cada versión y compilación.

Xint agrega una pieza más: encadenó las fallas de Nginx con un fallo del kernel Linux en el protocolo SCTP, todavía sin parche ni CVE público, para pasar de los permisos del *worker* a **root**, incluso con Nginx dentro de un contenedor Docker.

## Lo que se sabe del riesgo real

- **No hay explotación reportada.** Ni Wiz ni Xint reportan ataques reales, y la evaluación de CISA que aparece en los registros CVE marca «Exploitation: none» para todas.
- **Los exploits no son públicos.** Wiz dice que no publicará los suyos por ahora, y Xint omitió los pasos finales en su artículo.
- **La exposición es enorme.** Según Xint, el 10 de noviembre Shodan mostraba 56,7 millones de equipos con Nginx; de los que revelaban versión, el 98,9 % estaba en el rango afectado. Es una cifra por número de versión, no confirma que tengan HTTP/2 activo ni que sean vulnerables.

Un dato de contexto: varias de estas fallas se encontraron con ayuda de IA. Wiz usó su herramienta de análisis Wiz Atlas, y el registro de CVE-2026-123007 reconoce a un equipo que trabajó con GPT-6 Astra. Es la misma tendencia que vimos con [GPT-6 Cyber y las fallas del kernel Linux](/blog/gpt-6-cyber-openai-fallas-kernel-linux/): los fallos de memoria en software maduro se están encontrando más rápido, y el plazo entre aviso y exploit tiende a acortarse.

## Cómo saber si te afecta

### 1. Mira la versión y de dónde salió

```bash
nginx -v
apt policy nginx
```

Si tu Nginx viene del repositorio de nginx.org, la versión te dice todo: necesitas **1.30.7 o superior** (estable) o **1.31.9 o superior** (*mainline*). Si viene de Debian o Ubuntu, la versión no basta, porque las distribuciones aplican parches sin cambiar el número. Revisa el registro de cambios del paquete:

```bash
apt changelog nginx | grep -E "CVE-2026-(123007|123633|118899)"
```

Si no aparece nada, tu paquete todavía no tiene la corrección.

### 2. Busca HTTP/2, HTTP/3 y las otras condiciones

```bash
sudo nginx -T 2>/dev/null | grep -nE "http2|http3|quic|resolver|mirror|ssl_preread|^\s*mail\b"
```

Cómo leer el resultado:

- **`http2 on;` o `listen 443 ssl http2;`**: estás en el caso de CVE-2026-123007. Si además tienes `proxy_pass`, también en el de CVE-2026-123633.
- **`quic` o `http3`**: CVE-2026-121810.
- **`resolver` junto con `mirror` o SSI**: revisa CVE-2026-123634.
- **Un bloque `mail`**: CVE-2026-113425. Es raro en un servidor web.

Si tienes un `server` con `listen 443 ssl` y TLS 1.3, que es lo normal hoy, te toca CVE-2026-118899 aunque no uses HTTP/2.

## Qué hacer

### En Ubuntu: actualiza y reinicia

Ubuntu ya publicó paquetes corregidos, entre ellos **1.24.0-2ubuntu7.20** para 24.04 (noble) y **1.18.0-6ubuntu14.23** para 22.04 (jammy):

```bash
sudo apt update && sudo apt install --only-upgrade nginx
sudo nginx -t && sudo systemctl restart nginx
```

Usa `restart` y no solo `reload`: Xint advierte que una recarga no reemplaza el ejecutable que está corriendo y que los *workers* viejos siguen vivos mientras tengan conexiones abiertas.

### En Debian: mitiga mientras llega el parche

Al momento de escribir esta entrada, el rastreador de seguridad de Debian marcaba como **vulnerables** las versiones de bookworm (12) y trixie (13); solo la rama inestable (sid) tenía la corrección. Mientras sale el parche, la mitigación que proponen Wiz y Xint es apagar HTTP/2. Desde Nginx 1.25.1 es una directiva; en versiones anteriores, como la 1.22.1 de bookworm, hay que quitar `http2` de la línea `listen`:

```nginx
# Nginx 1.25.1 o superior (por ejemplo, 1.26.3 en trixie)
server {
    listen 443 ssl;
    http2 off;
}

# Nginx anterior a 1.25.1 (por ejemplo, 1.22.1 en bookworm)
server {
    listen 443 ssl;   # antes: listen 443 ssl http2;
}
```

Hazlo en todos los bloques `server` que tengan HTTP/2, prueba y reinicia:

```bash
sudo nginx -t && sudo systemctl restart nginx
```

El sitio sigue funcionando con HTTP/1.1. Cuando Debian publique el paquete, actualiza y vuelve a activar HTTP/2. Esta mitigación no cubre CVE-2026-118899: para esa solo sirve actualizar.

Si usas el repositorio de nginx.org o la imagen oficial de Docker, ya tienes 1.30.7 y 1.31.9 disponibles. En Docker, reconstruye con `--pull` y vuelve a desplegar.

### Si usas HTTP/3, el resolver o el proxy de correo

Xint recomienda quitar los `listen ... quic` que no necesites, usar grupos `upstream` fijos en vez de `proxy_pass` con variables y cerrar con el firewall los puertos del proxy de correo. Para la cadena con el kernel, propone bloquear el módulo SCTP en equipos que no lo usan con la línea `install sctp /bin/false` en un archivo de `/etc/modprobe.d/`.

## Qué cambia en un servidor típico de aquí

Esto es análisis a partir de los avisos.

- **Un VPS con Debian, Nginx y un Laravel o un WordPress.** Es justo el caso más incómodo hoy: HTTP/2 suele estar activo para el sitio con HTTPS y el paquete de Debian estable aún no trae el parche. Apagar HTTP/2 es un cambio de dos minutos y se revierte igual de fácil. Si tu sitio pasa por `proxy_pass` hacia PHP-FPM o Node.js, cuentas para las dos fallas de HTTP/2, no solo para una.
- **Un sitio detrás de Cloudflare u otra CDN.** Wiz dice que una CDN o un WAF que termina HTTP/2 puede mitigar en parte la explotación, porque la conexión HTTP/2 del atacante llega a la CDN y no a tu Nginx. Pero si tu servidor responde directamente por su IP pública, sigue expuesto. Revisa que el firewall solo acepte tráfico de la CDN o aplica la mitigación igual.
- **Hosting compartido.** No administras el servidor web, así que no tienes nada que cambiar.

## En resumen

1. **Qué pasó:** Nginx 1.30.7 y 1.31.9 corrigen diez fallas; cinco tienen CVSS 9.2 y la peor está en HTTP/2 desde 2015.
2. **Qué tan grave es:** Wiz y Xint lograron ejecutar código con ella; no hay explotación reportada ni exploits públicos.
3. **Cómo saber si te afecta:** ejecuta `nginx -v`, `apt changelog nginx` y busca `http2` en la salida de `nginx -T`.
4. **En Ubuntu o con el repositorio de nginx.org:** actualiza y reinicia con `systemctl restart`.
5. **En Debian estable:** mientras sale el parche, apaga HTTP/2 y reinicia; actualiza en cuanto llegue el paquete.
