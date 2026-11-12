---
titulo: 'APT29 infectó sitios web para robar datos de iPhone y Android: por qué actualizar el celular te protege'
descripcion: 'Sekoia descubrió una campaña rusa que atacaba celulares desde sitios web legítimos y un script de analítica hackeado. Qué robaba, a quién afecta y qué hacer.'
fecha: 2026-11-05
actualizado: 2026-11-11
categoria: ciberataques
michi: antifaz
etiquetas: ['APT29', 'Rusia', 'iOS', 'Android', 'Chrome', 'watering hole', 'cadena de suministro', 'CVE-2024-27834']
formato: carrusel
resumen:
    - 'Sekoia descubrió una campaña de **APT29**, grupo ligado a la inteligencia rusa, que atacaba celulares desde sitios web legítimos.'
    - 'Bastaba con abrir la página: sin hacer clic en nada, se robaban cookies, contraseñas, mensajes y fotos.'
    - 'Uno de los caminos fue un script de analítica, Plerdy, que hackearon durante una semana y que cargan miles de sitios.'
    - 'Todas las fallas usadas ya tenían parche: con el sistema **al día**, el ataque no funciona.'
    - 'Si programas: cada script de terceros que cargas en tu sitio corre con los mismos permisos que tu propio código.'
fuentes:
    - titulo: 'Sekoia: Poisoned source, APT29 watering holes targets mobile devices with n-day exploits (4 nov 2026)'
      url: 'https://www.sekoia.com/blog/poisoned-source-apt29-watering-holes-targets-mobile-devices-with-n-day-exploits'
    - titulo: 'CISA: Known Exploited Vulnerabilities Catalog (CVE-2024-27834, añadida el 4 nov 2026)'
      url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog'
    - titulo: 'Apple: About the security content of iOS 17.5 and iPadOS 17.5'
      url: 'https://support.apple.com/en-us/120905'
    - titulo: 'Apple: About the security content of iOS 18.7.3 and iPadOS 18.7.3'
      url: 'https://support.apple.com/en-us/125885'
    - titulo: 'Apple: About the security content of iOS 26.3 and iPadOS 26.3'
      url: 'https://support.apple.com/en-us/126346'
---

El 4 de noviembre la firma de ciberseguridad **Sekoia** publicó el análisis de una campaña que atacaba celulares desde páginas web normales. No hacía falta descargar nada ni hacer clic en un enlace raro: bastaba con abrir el sitio desde un iPhone o un Android desactualizado para que el atacante se llevara cookies, contraseñas guardadas y, en el peor caso, mensajes, fotos y ubicación.

Sekoia atribuye la operación, con confianza «moderada a alta», a **APT29**, el grupo que se asocia con el Servicio de Inteligencia Exterior de Rusia (SVR). Ese mismo día, CISA agregó una de las fallas usadas, **CVE-2024-27834**, a su catálogo de vulnerabilidades explotadas.

La buena noticia es la que más importa: todas las fallas ya tenían parche. Con el sistema al día, el ataque no funciona.

## Qué es un ataque de abrevadero

A esta técnica se le llama *watering hole* (abrevadero): en lugar de perseguir a la víctima, el atacante contamina un sitio que la víctima visita y espera. Sekoia detectó la campaña a mediados de octubre de 2026, cuando encontró código JavaScript malicioso en el sitio de una empresa ucraniana de producción de gas.

El informe describe tres formas de llegar a los celulares:

1. **Inyección directa de JavaScript** en sitios legítimos que los atacantes lograron comprometer.
2. **Dominios que imitan sitios reales** y funcionan como intermediarios. Uno se hacía pasar por America250, la iniciativa por los 250 años de la independencia de Estados Unidos, y otro por el sitio del hotel Raffles London at The OWO.
3. **Un ataque a la cadena de suministro**: entre el 27 de agosto y el 3 de septiembre de 2026 comprometieron Plerdy, un servicio ucraniano de analítica web. Metieron código malicioso en su script, que según Sekoia cargan miles de sitios, la gran mayoría ucranianos.

Entre los sitios comprometidos, Sekoia menciona una asociación estadounidense de la industria química, un partido político europeo, una organización ligada al ejército de Bulgaria y una clínica en Australia.

## Cómo funcionaba el ataque

Las tres vías cargaban un script externo que revisaba el navegador y el dispositivo del visitante. Según lo que encontraba, el servidor entregaba una cadena de exploits para esa plataforma, sin que el usuario tuviera que hacer nada. Si los datos del dispositivo parecían falsos, devolvía una respuesta vacía.

| Objetivo | Fallas usadas | Qué robaba |
| --- | --- | --- |
| iPhone con iOS 16.7 (Sekoia cree que sirve de 16.0 a 17.4) | CVE-2025-43529 y CVE-2024-27834 | Cookies del navegador y de apps, con las que se puede entrar a cuentas ya iniciadas |
| iPhone con iOS 18.5 (kit conocido como DarkSword) | CVE-2025-43529, CVE-2026-20700, CVE-2025-14174, CVE-2025-43510 y CVE-2025-43520 | SMS, iMessage, WhatsApp, Telegram, contraseñas del llavero, contactos, historial de llamadas, ubicación, datos de salud, fotos y archivos de iCloud Drive |
| Android con Chrome 139 a 145 (excepto 143) | CVE-2026-3910 (Chrome) y CVE-2025-27038 (controlador gráfico Adreno de Qualcomm) | Cookies, contraseñas guardadas e historial de Chrome, y claves de Wi-Fi |

Un detalle importante: según Sekoia, los programas que robaban la información **no se quedaban instalados** en el celular. Sacaban los datos y desaparecían. Eso significa que reiniciar o actualizar no devuelve lo que ya se llevaron: las cookies y contraseñas robadas siguen sirviendo hasta que las cambies o cierres esas sesiones.

## Las fallas ya tenían parche

Todas las vulnerabilidades de la tabla aparecen en el catálogo KEV de CISA, que solo incluye fallas con explotación confirmada. Varias tenían parche desde hace meses o años:

- **CVE-2024-27834** (WebKit) se corrigió en iOS 17.5, en mayo de 2024. CISA la agregó al catálogo el 4 de noviembre de 2026.
- **CVE-2025-43529** (WebKit) se corrigió en iOS 26.2 y en iOS 18.7.3, en diciembre de 2025.
- **CVE-2026-20700** (dyld) se corrigió en iOS 26.3, en febrero de 2026.
- **CVE-2026-3910** (motor V8 de Chrome) se corrigió en la actualización estable de Chrome del 12 de marzo de 2026.

Por eso Sekoia es clara: un usuario con el sistema operativo actualizado está a salvo de estos ataques. La campaña funcionaba con quienes llevaban meses sin actualizar.

## Qué hacer si eres usuario

### 1. Actualiza el sistema del celular

En iPhone: **Ajustes > General > Actualización de software**. Instala la versión más reciente que tu equipo admita. Si tu iPhone ya no recibe iOS 26, instala la última versión de iOS 18 disponible.

En Android: actualiza el sistema desde los ajustes del teléfono y **actualiza Chrome** desde Google Play. La falla del controlador Adreno depende del fabricante del celular, así que revisa también las actualizaciones de seguridad de tu marca.

### 2. Si estuviste desactualizado mucho tiempo, cierra sesiones

Si tu celular estaba en una de las versiones de la tabla, no hay forma sencilla de saber si visitaste un sitio contaminado. Lo prudente es cerrar las sesiones abiertas desde la configuración de seguridad de tu correo y redes sociales, y cambiar las contraseñas más importantes. El riesgo es mayor si trabajas con temas relacionados con Ucrania, gobierno o defensa, que eran el foco de la campaña.

## Qué lección deja si programas

Este es el análisis, no parte del informe: el punto que más debería preocupar a quien hace sitios web es Plerdy. Las víctimas no hicieron nada mal. Instalaron un script de analítica de un proveedor legítimo, y durante una semana ese script entregó exploits a sus visitantes.

Cada `<script src="...">` de un tercero corre en tu página con los mismos permisos que tu propio código. Algunas medidas que reducen el riesgo:

- **Haz inventario** de los scripts externos que cargas (analítica, chat, mapas de calor, píxeles de publicidad) y quita los que ya no usas.
- **Usa Subresource Integrity (SRI)** cuando el script sea un archivo con versión fija. Si alguien lo modifica, el navegador no lo ejecuta:

```html
<script
    src="https://cdn.ejemplo.com/libreria-1.2.3.min.js"
    integrity="sha384-HASH_DEL_ARCHIVO"
    crossorigin="anonymous"
></script>
```

  SRI no sirve con scripts que el proveedor cambia todo el tiempo, como la mayoría de herramientas de analítica. En esos casos, pregúntate si de verdad lo necesitas.

- **Define una Content Security Policy** que limite desde qué dominios se pueden cargar scripts y hacia dónde puede enviar datos la página. No evita que un proveedor permitido sea hackeado, pero sí dificulta cargar código desde dominios del atacante.
- **Vigila los cambios**: si un script externo empieza a cargar otros dominios que no conoces, es una señal de alerta.

Si ya leíste sobre el [hackeo a Binance](/blog/hackeo-binance-entrevista-falsa-corea-del-norte), el patrón se repite: los grupos patrocinados por Estados atacan a los proveedores y a las herramientas de confianza, no solo al objetivo final.

## Cómo hacer el inventario de scripts de tu sitio

Esto es análisis, no parte del informe. «Haz inventario» suena fácil, pero en un sitio con varios años nadie recuerda qué se instaló. Tres formas de sacarlo, de la más rápida a la más completa.

Desde afuera, lo que carga la página de inicio:

```bash
curl -s https://tusitio.com | grep -oE 'src="https?://[^"]+"' | sort -u
```

Desde el código, lo que está escrito en las plantillas:

```bash
grep -rnoE "<script[^>]+src=[\"']https?://[^\"']+" --include=*.html --include=*.php .
```

Y lo que carga de verdad el navegador: abre las herramientas de desarrollo, ve a la pestaña de red, recarga y filtra por peticiones de terceros. Esta es la única que muestra lo que agregan **otros scripts**.

Ese último punto es el que más se escapa. Si el sitio usa un gestor de etiquetas, alguien de mercadeo puede agregar un píxel o un mapa de calor sin pasar por el código ni por un despliegue. El inventario del repositorio queda incompleto por diseño: hay que revisar también el contenedor del gestor de etiquetas y decidir quién puede publicar en él. En WordPress pasa lo mismo con los plugins, que insertan sus propios scripts.

Para empezar con CSP sin romper el sitio, usa primero el modo de solo reporte. El navegador no bloquea nada, pero deja en la consola cada script que la política habría rechazado:

```nginx
add_header Content-Security-Policy-Report-Only "script-src 'self' https://www.googletagmanager.com" always;
```

Déjalo unos días, navega el sitio completo, agrega los dominios que sí necesitas y solo entonces cambia la cabecera a `Content-Security-Policy`. Cada dominio que tengas que agregar es una pregunta: ¿este proveedor todavía lo usamos?

## Resumen

1. APT29 contaminó sitios web y el script de analítica Plerdy para atacar celulares desactualizados, sin que la víctima hiciera clic.
2. Robaba cookies, contraseñas y, en iOS 18.5, mensajes, fotos y ubicación.
3. Todas las fallas ya tenían parche: actualiza iOS, Android y Chrome hoy.
4. Si estuviste meses sin actualizar, cierra sesiones y cambia tus contraseñas principales.
5. Si programas, revisa los scripts de terceros de tu sitio y usa SRI y CSP donde se pueda.
