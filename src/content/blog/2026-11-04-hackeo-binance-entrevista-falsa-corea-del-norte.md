---
titulo: 'Hackeo a Binance: cómo una entrevista de trabajo falsa terminó en el robo de 6.340 millones de dólares'
descripcion: 'Binance publicó su informe del robo más grande de la historia cripto. Empezó con una prueba técnica falsa a un ingeniero. Qué pasó y qué aprender si programas.'
fecha: 2026-11-04T09:00:00-05:00
categoria: ciberataques
michi: alerta
etiquetas: ['Binance', 'Corea del Norte', 'TraderTraitor', 'ingeniería social', 'Ethereum', 'EIP-7702', 'criptomonedas']
formato: reel
resumen:
    - 'El 29 de octubre robaron a Binance cerca de **6.340 millones de dólares**: el robo más grande de la historia cripto.'
    - 'El [FBI](efe be i) dice que fue Corea del Norte, el mismo grupo que robó 1.500 millones a Bybit en 2025.'
    - 'Todo empezó con una **entrevista de trabajo falsa**: a un ingeniero le pidieron descargar una prueba técnica con código malicioso.'
    - 'Desde ese computador usaron una herramienta interna de IA para saltar a otros ingenieros y robar un permiso de despliegue.'
    - 'Binance dice que cubre las pérdidas y que los usuarios no pierden su dinero.'
    - 'Si programas: haz las pruebas técnicas en una máquina aislada, **nunca en tu computador de trabajo**.'
fuentes:
    - titulo: 'Binance: 29 October Binance Security Incident, Initial Findings and Response Update (3 nov 2026)'
      url: 'https://x.com/binance/article/2117626126214504729'
    - titulo: 'FBI: North Korea Responsible for $6 Billion+ Binance Attack (31 oct 2026)'
      url: 'https://www.fbi.gov/investigate/cyber/alerts/2026/north-korea-responsible-for-6-billion-binance-attack'
    - titulo: 'FBI IC3: North Korea Responsible for $1.5 Billion Bybit Hack (26 feb 2025)'
      url: 'https://www.ic3.gov/PSA/2025/PSA250226'
---

El 29 de octubre salieron de Binance cerca de **6.340 millones de dólares** en criptomonedas en unas pocas horas. Es el robo más grande de la historia del sector: el récord anterior era el de Bybit, con unos 1.500 millones en febrero de 2025. El 31 de octubre el FBI dijo que el responsable es **Corea del Norte**, con la actividad que llama **TraderTraitor**, el mismo nombre que le dio al robo a Bybit.

El 3 de noviembre Binance publicó su informe inicial. Lo más interesante no es la cifra sino cómo empezó todo: **una entrevista de trabajo falsa** y una "prueba técnica" que un ingeniero descargó en su computador de trabajo. Si programas, este ataque te habla directamente a ti.

## Qué pasó el 29 de octubre

Según Binance, el atacante tenía acceso a un **servicio interno de firma de las billeteras** y lo usó para mandar transacciones por fuera del proceso normal de retiros:

| Hora (UTC) | Qué pasó |
| --- | --- |
| 17:15 a 19:56 | El atacante entra al computador de un ingeniero, despliega un contenedor y lanza el script del ataque |
| 20:05 a 20:09 | Cinco billeteras calientes envían 233,46 millones de XRP a una dirección del atacante |
| Después | Salen cerca de 970.500 SOL, 44,2 millones de OP y 18.270 BTC |
| 23:56 | Se confirma la última transferencia no autorizada: 2.961,9 ETH |
| 00:10 del 30 de oct. | Binance borra la delegación maliciosa de la billetera Binance14 |

Binance suspendió los retiros apenas vio las alertas, pero eso no bastó. El atacante usó **EIP-7702**, un mecanismo de Ethereum que permite que una cuenta delegue parte de su ejecución a un contrato inteligente sin entregar la llave privada. Con 50 transacciones firmadas, le dio a un contrato suyo permisos sobre una billetera caliente de Binance. Esa autorización vivía en la cadena de bloques, así que **siguió funcionando aunque Binance apagara sus propios sistemas de retiro**.

Para revocarla hacía falta firmar otra transacción. Pero la billetera usaba **MPC** (computación multiparte): no existe una sola llave privada que alguien pueda usar de inmediato. El equipo tuvo que armar un procedimiento especial, y eso alargó el ataque varias horas.

## Cómo entraron: cuatro meses de preparación

Binance insiste en que no fue un phishing simple. Fue una campaña de varios meses:

### Junio: un instalador alterado

El ingeniero A, del equipo que opera la infraestructura de billeteras, buscó en internet cómo instalar **una herramienta popular de programación con IA**. Terminó descargando una instalación de **Homebrew** alterada. Seguridad lo detectó, cambió el equipo y rotó sus credenciales. Pero el atacante ya sabía quién era el ingeniero A y quiénes trabajaban con él.

### Septiembre: la entrevista falsa

El ingeniero B tenía un perfil en una plataforma de empleo **legítima** que mencionaba su experiencia en Binance. Lo contactó un supuesto director de proyecto:

- Primera entrevista por videollamada con una supuesta persona de recursos humanos. Para ganarse su confianza, le compartió una cuenta de redes sociales con fotos y videos personales.
- Segunda entrevista, por una app de chat, con alguien que decía ser el CEO de una empresa que no existía.
- Al final le pidieron descargar una **"tarea"**: un repositorio de código. El código malicioso se ejecutó durante la instalación del proyecto.

El malware reemplazó una herramienta legítima de desarrollo (la versión de `pyenv` instalada con Homebrew) por una maliciosa, se conectó con un servidor del atacante y borró sus rastros. Binance dice que era un **0-day**: su protección de equipos no lo detectó.

### Octubre: una herramienta interna de IA como trampolín

El 20 de octubre, desde el computador del ingeniero B, el atacante usó **una herramienta interna de IA** de Binance para tomar el control de los equipos del ingeniero A y de un tercero, el ingeniero C. En el computador de A encontró un **token con permiso para desplegar contenedores**. Nueve días después lo usó desde el equipo de C para llegar al servicio de firma.

Binance también cuenta que en 2026 detectó y frenó **57 casos** de amenazas que relaciona con Corea del Norte. Las técnicas se repiten: entrevistas falsas, herramientas de desarrollo falsas, paquetes y extensiones comprometidos y apps falsas de videollamadas.

## Qué pasa con los usuarios

Binance dice que **absorbe la pérdida**, no sus usuarios. Según el informe, ya apartó más del 100% de lo necesario, y al 31 de octubre había repuesto el **98%** de los tokens afectados (el resto son activos menos líquidos que está comprando). Además se han congelado o interceptado cerca de **2.850 millones de dólares**. La empresa dice que no encontró evidencia de que se filtraran llaves privadas de las billeteras.

Si tienes cuenta en Binance, ten cuidado con los mensajes que ofrecen "reembolsos" o "verificaciones" por el hackeo. Revisa todo directamente en la app o en el sitio oficial.

## Lo que deja para quien programa

Este ataque no empezó con un bug sofisticado, sino con cosas que haces cada semana: buscar un instalador, aceptar una entrevista, clonar un repositorio. Es la misma lección que dejó el gusano [testmetest](/blog/testmetest-gusano-npm-github/): ahora los atacantes van por **el computador del desarrollador**, porque ahí están los permisos.

### Las pruebas técnicas, en una máquina aislada

Nunca ejecutes una tarea de un proceso de selección en tu equipo de trabajo. Usa una máquina virtual, un Codespace o al menos un contenedor sin acceso a tus archivos ni a la red:

```bash
# Copia el repositorio a una carpeta aparte y ábrelo en un contenedor desechable, sin red
docker run --rm -it --network none -v "$PWD/prueba-tecnica:/app" -w /app node:22 bash
```

Lee el `package.json`, el `composer.json` o los scripts de instalación antes de ejecutar cualquier cosa. Una empresa seria no se molesta si le preguntas por qué la prueba necesita correr en tu computador.

### Las herramientas, solo desde el sitio oficial

El primer intento llegó con un instalador falso que salió en un buscador. Instala Homebrew, Node.js, PHP o cualquier asistente de IA desde su página oficial, no desde el primer resultado ni desde un anuncio.

### Nada de tokens poderosos en el portátil

El salto final fue un token de despliegue guardado en un computador. Si puedes, usa credenciales de corta duración, permisos mínimos y despliegues que pasen por CI/CD con aprobación, no desde tu máquina.

### Las herramientas de IA también son una puerta

Una herramienta interna de IA con acceso a varios equipos sirvió para moverse por dentro de la empresa. Si tu equipo conecta un agente a servidores, repositorios o computadores de otras personas, trátalo como un usuario más: con permisos mínimos y registro de lo que hace.

## En resumen

1. Corea del Norte robó cerca de 6.340 millones de dólares a Binance el 29 de octubre, según el FBI.
2. Entraron con una entrevista de trabajo falsa, un instalador alterado y una herramienta interna de IA.
3. Binance dice que cubre las pérdidas y ya repuso el 98% de los tokens.
4. Haz las pruebas técnicas en una máquina aislada y descarga las herramientas solo de su sitio oficial.
5. No guardes tokens de despliegue en tu equipo y dale a la IA los permisos mínimos.
