---
titulo: 'node-forge corrige 17 vulnerabilidades, ocho altas: revisa si está en tu proyecto y actualiza a 1.4.2'
descripcion: 'node-forge 1.4.1 corrige firmas RSA falsificables, PKCS#12 sin contraseña real y fallos que tumban procesos de Node.js. Cómo saber si la usas y qué actualizar.'
fecha: 2026-11-02T08:00:00-05:00
actualizado: 2026-11-11
categoria: seguridad
michi: paquete
etiquetas: ['npm', 'Node.js', 'node-forge', 'TLS', 'CVE-2026-85393', 'CVE-2026-119191', 'CVE-2026-118779']
formato: carrusel
resumen:
    - 'La librería de criptografía **node-forge** publicó 17 avisos de seguridad juntos, ocho de ellos de severidad alta. Todos están corregidos en la versión 1.4.1.'
    - 'Los más serios: firmas RSA que se pueden falsificar con llaves de exponente 3, archivos PKCS#12 que pasan la verificación sin la contraseña y certificados que se cuelan como autoridad.'
    - 'Varios permiten **tumbar un proceso de Node.js** con un PEM, un certificado o unos pocos bytes de TLS, sin autenticación.'
    - 'Muchas veces llega como dependencia de otra librería. Revisa con [npm ls node-forge](ene pe eme ele ese node forge) qué versión tienes.'
    - 'Instala **1.4.2**, no 1.4.1: la 1.4.1 rompió la lectura de PEM cuando se le pasa un Buffer.'
fuentes:
    - titulo: 'node-forge: CHANGELOG (1.4.1 y 1.4.2, 27 oct 2026)'
      url: 'https://github.com/digitalbazaar/forge/blob/main/CHANGELOG.md'
    - titulo: 'node-forge: avisos de seguridad del repositorio'
      url: 'https://github.com/digitalbazaar/forge/security/advisories'
    - titulo: 'GHSA-2g46-22mc-6gwp: falsificación de firmas RSA PKCS#1 v1.5 (CVE-2026-85393)'
      url: 'https://github.com/digitalbazaar/forge/security/advisories/GHSA-2g46-22mc-6gwp'
    - titulo: 'GHSA-6qrw-m8cv-hcxf: DigestInfo no canónico (CVE-2026-119192)'
      url: 'https://github.com/digitalbazaar/forge/security/advisories/GHSA-6qrw-m8cv-hcxf'
    - titulo: 'GHSA-rhr8-3pm8-cq29: agotamiento de recursos al decodificar BIT STRING (CVE-2026-119191)'
      url: 'https://github.com/digitalbazaar/forge/security/advisories/GHSA-rhr8-3pm8-cq29'
    - titulo: 'GHSA-7wch-p9px-956x: ReDoS en pem.decode (CVE-2026-118779)'
      url: 'https://github.com/digitalbazaar/forge/security/advisories/GHSA-7wch-p9px-956x'
    - titulo: 'GHSA-hqq3-7jhf-c5jx: TLS, agotamiento de la pila (CVE-2026-119187)'
      url: 'https://github.com/digitalbazaar/forge/security/advisories/GHSA-hqq3-7jhf-c5jx'
    - titulo: 'GHSA-8hrf-8g6f-7xwp: TLS, registro intercalado en un handshake fragmentado (CVE-2026-119188)'
      url: 'https://github.com/digitalbazaar/forge/security/advisories/GHSA-8hrf-8g6f-7xwp'
    - titulo: 'GHSA-jc66-7q78-782g: PKCS#12 con cero iteraciones (CVE-2026-118782)'
      url: 'https://github.com/digitalbazaar/forge/security/advisories/GHSA-jc66-7q78-782g'
    - titulo: 'GHSA-5x38-2vff-x55p: basicConstraints con OID obsoletos (CVE-2026-119190)'
      url: 'https://github.com/digitalbazaar/forge/security/advisories/GHSA-5x38-2vff-x55p'
    - titulo: 'npm Docs: overrides en package.json'
      url: 'https://docs.npmjs.com/cli/v11/configuring-npm/package-json#overrides'
    - titulo: 'npm Docs: npm update'
      url: 'https://docs.npmjs.com/cli/v11/commands/npm-update'
---

El 27 de octubre los mantenedores de **node-forge**, una librería de criptografía escrita en JavaScript puro para Node.js y el navegador, publicaron 17 avisos de seguridad de una sola vez. Ocho son de severidad alta, cuatro moderada y cinco baja. Todos quedan corregidos en la versión **1.4.1**, y unas horas después salió la **1.4.2** para arreglar un problema que la propia 1.4.1 introdujo.

Es fácil pensar "yo no uso node-forge". Pero muchas veces no la instalas tú: llega como dependencia de otra librería que maneja certificados, llaves o TLS. Por eso vale la pena revisar el árbol de dependencias de tus proyectos en Node.js hoy.

## Qué está roto

Según el changelog, la versión 1.4.1 reunió reportes que se acumularon durante mucho tiempo. Estos son los que más pesan:

### Firmas y certificados que se pueden falsificar

- **CVE-2026-85393 y CVE-2026-119192 (CVSS 3.1: 7.5).** Al verificar firmas RSA PKCS#1 v1.5, node-forge aceptaba campos de más o codificaciones no canónicas dentro del bloque que identifica el hash. Con eso, un atacante puede armar una firma que pasa como válida sin tener la llave privada. Afecta a `publicKey.verify()` con el esquema por defecto y a la verificación de certificados X.509 y firmas PKCS#7. El aviso aclara que en la práctica solo se explota con llaves RSA de exponente público pequeño (e=3).
- **CVE-2026-118782 (7.5).** Un archivo PKCS#12 (.p12 o .pfx) con el contador de iteraciones en cero hace que la llave derivada sea constante e ignore la contraseña. Resultado: un archivo manipulado pasa la verificación con cualquier contraseña. Afecta si importas PKCS#12 de fuentes que no controlas.
- **CVE-2026-119190 (7.4).** node-forge trataba dos identificadores obsoletos como si fueran la extensión `basicConstraints`. Un certificado con una extensión falsa puesta antes de la real podía pasar como autoridad certificadora en `pki.verifyCertificateChain()`. Requiere que una CA de confianza emita ese certificado, por ejemplo si copia extensiones de la solicitud.

### Fallos que tumban tu proceso

- **CVE-2026-119191 (7.5).** Al decodificar estructuras ASN.1, las BIT STRING anidadas se saltaban el límite de profundidad y la memoria crecía de forma cuadrática. Un PEM o DER pequeño enviado a `pki.certificateFromPem()`, `pki.publicKeyFromPem()` o los cargadores de PKCS#7, #8 y #12 dispara el uso de CPU y memoria. Según el aviso, unos 198 KB bastan para un error fatal de memoria.
- **CVE-2026-118779 (7.5).** La expresión regular que lee PEM en `pem.decode()` podía bloquear el event loop de Node.js entre segundos y minutos por cada petición con un PEM mal formado.
- **CVE-2026-119187 y CVE-2026-119188 (7.5).** Dos fallos en la implementación de TLS de node-forge (`forge.tls`). Sin autenticación y con muy poco tráfico (18 bytes en un caso, menos de 20 KB en el otro, según los avisos), el otro extremo de la conexión provoca una excepción que, con la conexión típica de sockets de Node.js, termina el proceso. Afecta tanto a servidores como a clientes TLS armados con forge.

Ninguno de los avisos menciona explotación activa. Pero los fallos de denegación de servicio son sencillos de reproducir y los avisos traen las pruebas de concepto.

## A quién afecta

| Versión de node-forge | Estado |
| --- | --- |
| 1.4.0 y anteriores | Vulnerables a los 17 avisos |
| 1.4.1 | Corregida, pero con un fallo al leer PEM desde un `Buffer` |
| 1.4.2 | Recomendada |

El riesgo real depende de cómo la use tu aplicación o la dependencia que la trae:

- **Riesgo alto:** tu servidor recibe certificados, llaves, PEM o archivos PKCS#12 desde usuarios o sistemas externos, o usa `forge.tls` para conexiones con terceros.
- **Riesgo medio:** verificas firmas RSA o cadenas de certificados con node-forge.
- **Riesgo bajo:** solo aparece en herramientas de desarrollo, por ejemplo para generar un certificado autofirmado local. Igual conviene actualizar, pero no es una emergencia.

## Qué hacer hoy

### 1. Busca node-forge en tu proyecto

En la raíz del proyecto, según tu gestor de paquetes:

```bash
npm ls node-forge
yarn why node-forge
pnpm why node-forge
```

La salida te muestra qué versión está instalada y qué paquete la trae. Si no aparece, este problema no te toca en ese proyecto. Repite en cada proyecto que tengas en producción.

### 2. Actualiza a 1.4.2

Si la tienes como dependencia directa:

```bash
npm install node-forge@^1.4.2
```

Si llega por otra librería, primero intenta que npm suba la versión dentro de los rangos permitidos:

```bash
npm update node-forge
npm ls node-forge
```

Según la documentación de npm, `npm update` respeta los rangos semver de tu proyecto y de tus dependencias, así que funciona si la librería que la trae acepta 1.4.x. Si después de eso sigues viendo 1.4.0 o una anterior, puedes forzar la versión con `overrides` en el `package.json` de la raíz:

```json
{
    "overrides": {
        "node-forge": "^1.4.2"
    }
}
```

Luego ejecuta `npm install` y vuelve a revisar con `npm ls node-forge`. Haz commit del `package-lock.json` para que el servidor y tu CI instalen lo mismo.

### 3. Prueba antes de desplegar

La 1.4.1 trae cambios de comportamiento que pueden romper código que dependía de lo anterior:

- Las BIT STRING anidadas ahora se decodifican un solo nivel. Si necesitas más, llama a `asn1.fromDer()` sobre el valor interno.
- AES-GCM rechaza longitudes de tag inválidas, y lo que se haya cifrado con un tag vacío ya no se puede descifrar.
- El descifrado CBC y ECB exige relleno PKCS#7 estricto.

Si tu código usa estas funciones directamente, corre tus pruebas antes de subir a producción.

### 4. Si no puedes actualizar todavía

Los avisos traen medidas temporales parciales:

- Para TLS, envuelve cada llamada a `connection.process()` en `try`/`catch` y cierra el socket si falla. Evita que se caiga el proceso, aunque la conexión atacada se pierde.
- Para PEM, rechaza entradas no confiables de más de unos pocos kilobytes. Reduce la demora, no elimina el fallo.
- Para firmas RSA, no verifiques con llaves de exponente 3.

Para la mayoría de los fallos de PKI y PKCS no hay alternativa: la solución es actualizar.

## Dónde suele aparecer y cuándo de verdad preocupa

Esto es análisis, no parte de los avisos. `npm ls node-forge` te dice si está, pero no si corre en producción. Esta variante sí:

```bash
npm ls node-forge --omit=dev
```

Si con `--omit=dev` no aparece, solo la traen tus herramientas de desarrollo, por ejemplo las que generan un certificado autofirmado para servir HTTPS en local. Es el caso de riesgo bajo de la tabla: actualiza cuando toques el proyecto.

Si aparece, mira qué paquete la trae. Suele llegar por librerías que manejan llaves de cuentas de servicio, certificados o firmas. Ahí la pregunta que decide la urgencia es una sola: **¿de dónde viene el material criptográfico que procesa?**

- **De ti.** Un certificado propio, cargado desde el disco o desde una variable de entorno. Los fallos de PEM, ASN.1 y PKCS#12 necesitan una entrada manipulada, y tú no te la vas a enviar. Prioridad media.
- **De tus usuarios.** Este es el caso que conviene mirar con lupa en sistemas de facturación electrónica o de firma de documentos con varios clientes: cada cliente sube su propio certificado `.p12` con su contraseña, y el servidor lo abre. Eso es exactamente «importar PKCS#12 de fuentes que no controlas». Un archivo manipulado puede tumbar el proceso para todos los clientes (CVE-2026-119191) o pasar la verificación con cualquier contraseña (CVE-2026-118782). Prioridad alta: actualiza hoy.

Mientras despliegas, limita el tamaño de lo que aceptas en ese formulario de carga. El aviso habla de unos 198 KB para provocar el error de memoria, y un certificado normal pesa pocos kilobytes.

Si node-forge también va en el código del navegador, recuerda que el arreglo no llega hasta que vuelvas a construir y publicar el frontend.

## En resumen

1. Ejecuta `npm ls node-forge` (o `yarn why` o `pnpm why`) en cada proyecto de Node.js.
2. Si aparece 1.4.0 o anterior, actualiza a 1.4.2 con `npm update` o, si no sube, con `overrides`.
3. Revisa que el lockfile quede con la versión nueva y haz commit.
4. Corre tus pruebas si usas AES-GCM, CBC, ECB o ASN.1 directamente.
5. Prioriza los servicios que reciben certificados, PEM o PKCS#12 de terceros, o que usan `forge.tls`.
