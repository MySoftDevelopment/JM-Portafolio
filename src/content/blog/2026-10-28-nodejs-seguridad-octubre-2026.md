---
titulo: 'Node.js corrige 10 vulnerabilidades, una con ejecución de código: actualiza a 22.23.4, 24.22.1 o 26.12.1'
descripcion: 'La actualización de octubre de Node.js corrige un fallo de Brotli que permite ejecutar código y tres fallos de TLS y DNS. Qué versión instalar y cómo revisarlo.'
fecha: 2026-10-28T10:00:00-05:00
categoria: seguridad
michi: escudo
etiquetas: ['Node.js', 'CVE-2026-111497', 'TLS', 'SSRF', 'Docker']
fuentes:
    - titulo: 'Node.js: Wednesday, October 21, 2026 Security Releases'
      url: 'https://nodejs.org/en/blog/vulnerability/october-2026-security-releases'
    - titulo: 'Node.js 24.22.1 (LTS): notas de la versión'
      url: 'https://nodejs.org/en/blog/release/v24.22.1'
    - titulo: 'Node.js 26.12.1 (Current): notas de la versión'
      url: 'https://nodejs.org/en/blog/release/v26.12.1'
---

El mismo 21 de octubre en que PHP publicó sus parches para PHP2Shell, el proyecto Node.js sacó actualizaciones de seguridad para todas sus versiones con soporte. Corrigen **diez vulnerabilidades**: cuatro de severidad alta, tres media y tres baja. La más seria permite **ejecutar código** al descomprimir datos Brotli manipulados.

Las versiones corregidas son:

| Línea | Versión corregida |
| --- | --- |
| Node.js 26 (Current) | 26.12.1 |
| Node.js 24 (LTS) | 24.22.1 |
| Node.js 22 (LTS) | 22.23.4 |
| Node.js 20 o anterior | Sin parche: estas versiones ya no tienen soporte y **están afectadas** |

## Las cuatro de severidad alta

### CVE-2026-111497: escritura fuera de límites en Brotli

Datos Brotli malformados pueden escribir más allá del final de un búfer interno del descompresor y **corromper la memoria del proceso**. El resultado puede ser un cierre inesperado, la filtración de memoria o la ejecución de código. Afecta a `zlib.createBrotliDecompress()` y `zlib.brotliDecompressSync()` en las versiones 22, 24 y 26.

Te importa sobre todo si tu aplicación **descomprime datos que no controlas**: archivos que suben tus usuarios, respuestas de servicios externos o cualquier librería que use esas funciones por debajo.

### CVE-2026-105482: nombres de dominio cortados por un carácter nulo

`dns.resolve*()` y `dns.reverse()` cortaban sin avisar los nombres que contenían un byte nulo. Si validas un dominio contra una lista de permitidos y luego lo resuelves, podrías estar consultando **un dominio distinto del que validaste**. Este es un arreglo incompleto de un CVE anterior y afecta a las tres líneas.

### CVE-2026-105483 y CVE-2026-106069: verificación de certificados TLS saltada con IP "disfrazadas"

Son dos fallos en `tls.checkServerIdentity()`:

- Con una IP escrita en **dígitos de ancho completo** (caracteres Unicode que se ven como números), la verificación no la reconocía como IP y la comparaba contra los nombres DNS del certificado. Afecta a las líneas 24 y 26.
- Con una IP con **ceros a la izquierda** (`0127.0.0.1`), unas partes del sistema la leían como octal y otras como decimal, así que el certificado se validaba contra una IP distinta de la real. Afecta a las tres líneas.

Estos fallos le importan a cualquier aplicación que **se conecta a direcciones que le pasa el usuario**: webhooks configurables, vistas previas de enlaces, importación de URL o proxys. Es justo el código donde se suele poner una protección contra SSRF (que alguien te obligue a hacer peticiones a tu red interna), y estos fallos ayudan a esquivarla.

## Las de severidad media y baja

- **CVE-2026-105481 (media):** el agente HTTP podía aceptar, en una conexión reutilizada, una respuesta enviada **antes** de la petición.
- **CVE-2026-106072 (media):** otras formas no canónicas de escribir una IPv4 (`0x7f.0.0.1`, `2130706433`, `127.1`) permitían que un certificado con solo nombres DNS autenticara una IP.
- **CVE-2026-106074 (media):** si generas *snapshots* con `--build-snapshot` o empaquetas aplicaciones ejecutables únicas (SEA), cada proceso podía devolver **los mismos** valores de `crypto.randomUUID()` y `crypto.randomInt()` al arrancar.
- **CVE-2026-106070, CVE-2026-106071 y CVE-2026-106073 (baja):** afectan a `zlib.ZipFile` y al modelo de permisos experimental (`--permission`, `--allow-fs-read`).

Además, la actualización trae nuevas versiones de c-ares, OpenSSL, SQLite y Undici, y actualiza la lista de certificados raíz por el **compromiso de una CA intermedia de eMudhra**.

## Qué hacer

### 1. Mira qué versión corres en cada sitio

```bash
node -v
```

Revisa todos los lugares donde corre Node, no solo tu equipo: el servidor, las imágenes de Docker, el pipeline de CI y las funciones *serverless*. Es común actualizar en local y olvidar la imagen de producción.

### 2. Actualiza

- **Con nvm:** `nvm install 24` instala la versión más reciente de la línea 24.
- **Con Docker:** reconstruye la imagen bajando la base nueva (`docker build --pull .`) y vuelve a desplegar. Si fijaste una versión exacta en el `Dockerfile` (por ejemplo, `node:24.22.0`), cámbiala a la corregida.
- **En GitHub Actions:** con `actions/setup-node` y `node-version: 24`, añade `check-latest: true`. Sin esa opción, el runner puede usar una versión 24 que ya tenga en caché, aunque sea anterior al parche. Si fijaste una versión exacta, súbela.
- **En plataformas administradas** (Vercel, Netlify, Railway, etc.), revisa en su documentación o su panel qué versión exacta te asignan y si debes volver a desplegar.

Después de actualizar, **reinicia los procesos** (PM2, systemd o el contenedor). Un proceso que sigue corriendo mantiene el binario viejo en memoria.

### 3. Si sigues en Node.js 20

Node.js 20 ya no tiene soporte y está afectado por estos fallos: no recibirá parche. Es el momento de pasar a la 22 o la 24, que son las LTS. En la mayoría de proyectos el salto es directo, pero corre tus pruebas y revisa las dependencias con binarios nativos (`bcrypt`, `sharp`, `sqlite3`), que deben recompilarse.

## En resumen

1. Comprueba `node -v` en todos tus entornos.
2. Actualiza a 22.23.4, 24.22.1 o 26.12.1 y reinicia los procesos.
3. Reconstruye tus imágenes de Docker con `--pull`.
4. Si estás en Node.js 20 o anterior, planea la migración a una LTS.
