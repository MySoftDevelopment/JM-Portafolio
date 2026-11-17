---
titulo: 'Hackeo a Fireworks AI: cómo llegó a Uber, Notion y Cursor, y qué revisar en tu equipo'
descripcion: 'Credenciales robadas en Fireworks AI expusieron licencias de conductores de Uber, chats de Notion AI y una extensión troyanizada en Cursor. Qué pasó y qué revisar.'
fecha: 2026-11-17
categoria: ciberataques
michi: paquete
etiquetas: ['Fireworks AI', 'Uber', 'Notion', 'Cursor', 'Claude Code', 'Cadena de suministro', 'Filtración de datos']
formato: carrusel
resumen:
    - 'Atacantes robaron credenciales de **Fireworks AI**, un proveedor que sirve modelos de IA, y con ellas llegaron a datos de sus clientes.'
    - 'Uber avisó a conductores de Estados Unidos que les robaron fotos de la licencia de conducción, nombre, dirección y fecha de nacimiento.'
    - 'Notion confirmó que se expusieron chats de Notion AI de menos del 1 % de los espacios de trabajo.'
    - 'En Cursor, el atacante subió una copia troyanizada de la extensión de Claude Code que estuvo unas 11 horas en su marketplace.'
    - 'Si usas Cursor en macOS o Windows, busca la clave **svc-telemetry** en tus llaves SSH autorizadas, como indica Cursor.'
    - 'La lección: cada proveedor de IA con acceso a tus datos es una puerta más. Dale solo lo necesario y con credenciales propias.'
fuentes:
    - titulo: 'Fireworks AI: Update on the October 2026 security incident'
      url: 'https://fireworks.ai/security/bulletins/october-2026-security-incident-update'
    - titulo: 'Uber: notificación al fiscal general de Iowa y modelo de carta a los afectados (10 de noviembre de 2026)'
      url: 'https://www.iowaattorneygeneral.gov/media/cms/11102026_Uber_Technologies_Inc_089721E61CBAB.pdf'
    - titulo: 'Fiscal general de California: registro de la filtración de Uber Technologies'
      url: 'https://oag.ca.gov/ecrime/databreach/reports/sb24-632751'
    - titulo: 'Notion: Fireworks AI incident (aviso de seguridad)'
      url: 'https://www.notion.com/security/advisories/security-incident-involving-a-third-party-ai-vendor-nov9'
    - titulo: 'Cursor: Security incident update (13 de noviembre de 2026)'
      url: 'https://cursor.com/blog/security-incident-update'
    - titulo: 'Cursor: Security notice, malicious Anthropic.claude-code 2.1.312 y 2.1.313'
      url: 'https://cursor.com/blog/claude-code-extension-security-notice'
    - titulo: 'TechCrunch: Uber says hackers stole information on close to 150,000 driver''s licenses'
      url: 'https://techcrunch.com/2026/11/16/uber-confirms-hackers-stole-thousands-of-drivers-license-information-in-data-breach/'
---

Fireworks AI es una empresa que muchos usuarios finales no conocen, pero que está detrás de productos que sí usan: sirve modelos de IA de pesos abiertos a otras empresas por API. En octubre, unos atacantes se metieron en sus sistemas, y en las últimas semanas sus clientes han ido contando lo que perdieron. Uber notificó a conductores que les robaron datos de la licencia de conducción, Notion confirmó que se expusieron chats de Notion AI y Cursor terminó con una versión troyanizada de la extensión de Claude Code en su marketplace.

Es el mismo patrón que vimos con [el hackeo a Railway](/blog/railway-hackeo-claves-ia-variables-entorno/): el objetivo no es la empresa grande, sino el proveedor de infraestructura de IA que tiene llaves para entrar a ella.

## Qué pasó en Fireworks AI

Según el boletín de seguridad de Fireworks, actualizado el 9 de noviembre:

- La empresa publicó el primer aviso el **9 de octubre**. En ese momento dijo que el atacante había accedido a secretos guardados en su plataforma, como los que se usan en trabajos de evaluación de modelos.
- El **23 de octubre**, un proveedor de nube externo que alojaba máquinas de investigación de Fireworks sufrió su propio incidente. El **24 de octubre**, el atacante usó ese proveedor para entrar a máquinas de desarrollo de Fireworks y ejecutó una carga de trabajo no autorizada que afectó más datos de clientes.
- Lo expuesto incluye metadatos de recursos, información de facturación (direcciones, historial de facturas y pagos, saldo y consumo de créditos) y, para algunos clientes, secretos, conjuntos de datos y pesos de modelos sin terminar. Fireworks dice que no guarda números de tarjeta.
- Atribuye el ataque a un grupo criminal con fines económicos que vende acceso robado a modelos de lenguaje a pasarelas ilegales, una práctica conocida como *LLMJacking*. No dice qué grupo es ni cómo entró la primera vez.

Fireworks no publicó cuántos clientes fueron afectados.

## Uber: licencias de conducción de conductores

En la carta que envió al fiscal general de Iowa el 10 de noviembre, Uber cuenta su parte. El 9 de octubre un proveedor le avisó que le habían robado credenciales internas y que con ellas habían entrado a la cuenta de Uber en ese servicio. El 13 de octubre, su investigación concluyó que el acceso a los datos ocurrió el **7 de octubre**.

Lo robado: **imágenes de licencias de conducción** y el texto extraído de ellas, con nombre, dirección, fecha de nacimiento y número de licencia. Solo en Iowa son unas 2.999 personas. TechCrunch, que identificó al proveedor como Fireworks, reporta que en una notificación a Oregon Uber habló de 149.346 personas en total; Uber no ha publicado esa cifra por su cuenta.

El detalle técnico más útil de la carta: los datos estaban en un almacenamiento en la nube que Uber creó solo para el trabajo del proveedor, con alertas activas. Pero como el atacante usó credenciales válidas y los flujos de datos normales de ese proveedor, **no se disparó ninguna alerta**. Uber cortó la conexión, rotó credenciales y ofrece monitoreo de crédito con Cyberscout.

## Notion: chats de Notion AI

Según el aviso de Notion del 9 de noviembre, Fireworks le avisó el 2 y el 6 de noviembre, y el 8 de noviembre Notion confirmó qué datos salieron. El incidente tocó a **menos del 1 % de los espacios de trabajo**. El primer conjunto era de datos sintéticos de prueba; el segundo, transcripciones de chats de Notion AI usadas en la función Insights. Notion dice que la mayoría no permiten identificar al usuario ni a la empresa.

Notion se desconectó de Fireworks, borró sus datos allí, apagó Insights mientras investiga y dejó de servir modelos abiertos a través de ese proveedor. Su recomendación: tratar esos datos como expuestos y rotar cualquier contraseña o clave de API que alguien haya pegado en Notion AI durante ese periodo.

## Cursor: de una llave filtrada a una extensión troyanizada

El caso de Cursor es el que más le importa a quien programa. Según su actualización del 13 de noviembre, el atacante usó una llave de acceso que Cursor le había dado a Fireworks y copió datos de un bucket de solo lectura compartido con ese proveedor. Ahí había trazas de agentes de programación, sobre todo de 2025, de sesiones sin modo privacidad. Algunas tenían credenciales sin ocultar, y con ellas el atacante entró a herramientas SaaS que usa Cursor.

Con una de esas credenciales, el **29 de octubre** puso copias modificadas de la extensión `Anthropic.claude-code`, versiones **2.1.312 y 2.1.313**, en la caché del marketplace de extensiones de Cursor. Estuvieron disponibles unas 11 horas, entre las 2:27 a. m. y la 1:35 p. m., hora del Pacífico, solo para macOS y Windows. Cursor calcula que como mucho 5.000 usuarios pudieron recibirlas.

Cursor aclara que Anthropic no publicó esas versiones, que no fue una falla del producto de Anthropic y que Open VSX nunca tuvo el malware. Según su aviso, la versión troyanizada:

- Enviaba al atacante datos del equipo: nombre del host, usuario, sistema operativo, nombres de variables de entorno, el correo de Git y la IP pública.
- Intentaba agregar una llave SSH del atacante a `authorized_keys`, activar el servicio SSH y abrir un túnel SSH inverso.
- Se quedaba en el equipo con un LaunchAgent en macOS o una tarea programada en Windows, así que **desinstalar la extensión puede no ser suficiente**.

Cursor dice que la última actividad del atacante fue el 1 de noviembre, que rotó sus credenciales, sacó toda la inferencia de Fireworks y considera el incidente contenido.

### Cómo comprobarlo en tu equipo

Si usas Cursor, este es el paso a paso según su aviso de seguridad:

1. **Revisa si instalaste o actualizaste** `Anthropic.claude-code` a la 2.1.312 o la 2.1.313 desde el marketplace de Cursor el 29 de octubre. Según Cursor, el resto de extensiones de su marketplace eran auténticas y Open VSX nunca tuvo el malware.
2. **Busca la llave del atacante**, que se identifica con el comentario `svc-telemetry`. En macOS:

```bash
grep -qs svc-telemetry ~/.ssh/authorized_keys && echo "svc-telemetry key found" || echo "No key found; machine not impacted"
```

En Windows, desde PowerShell:

```powershell
$files = "$HOME\.ssh\authorized_keys", "C:\ProgramData\ssh\administrators_authorized_keys" | Where-Object { Test-Path $_ }
if ($files -and (Select-String svc-telemetry $files)) { "svc-telemetry key found" } else { "No key found; machine not impacted" }
```

3. **Si aparece la llave o instalaste esas versiones**, aísla el equipo, quita la llave, la persistencia y los procesos del túnel, y decide si conviene reinstalarlo. Cursor publica scripts de limpieza para macOS y Windows en su aviso.
4. **Rota desde otro equipo** las credenciales y sesiones que había en esa máquina: llaves SSH, tokens de GitHub, claves de API y los `.env` de tus proyectos.

## La lección para quien desarrolla

Lo que sigue es análisis a partir de los avisos de las empresas.

**El proveedor de IA es parte de tu superficie de ataque.** Uber hizo varias cosas bien: un almacenamiento separado, solo para el proveedor, con alertas. Aun así perdió los datos, porque el atacante entró con credenciales legítimas. Cuando le das a un tercero acceso a tus datos, su seguridad pasa a ser la tuya.

**Comparte lo mínimo y por el menor tiempo.** La pregunta que deja el caso de Uber es por qué imágenes completas de licencias estaban en un espacio al que llegaba un proveedor de IA. Si integras un modelo para extraer datos de documentos, como facturas, cédulas o RUT en un proyecto colombiano, borra lo procesado en cuanto ya no se necesite y no dejes un bucket con todo el histórico. Si manejas datos personales, recuerda que la Ley 1581 sigue aplicando aunque quien los procese sea un proveedor de IA; revísalo con quien te asesore en protección de datos.

**Las credenciales terminan en lugares que no esperas.** En Cursor, el salto vino de credenciales pegadas en conversaciones con agentes. En Notion, de lo que la gente escribió en el chat. Una clave pegada en un prompt queda en registros, trazas y conjuntos de datos que pueden compartirse con terceros. Usa variables de entorno y gestores de secretos, nunca el chat.

**Un marketplace de extensiones es un punto de entrada a tu máquina.** Ya lo vimos con [el gusano testmetest](/blog/testmetest-gusano-npm-github/). Revisa qué extensiones tienes, quita las que no uses y desconfía de una actualización que llega en un momento raro.

## Resumen

1. **Qué pasó:** atacantes robaron credenciales y datos de Fireworks AI, un proveedor que sirve modelos de IA, entre octubre y noviembre.
2. **A quién afectó:** a Uber (licencias de conducción de conductores en Estados Unidos), a Notion (chats de Notion AI de menos del 1 % de los espacios de trabajo) y a Cursor (trazas de agentes, herramientas internas y una extensión troyanizada).
3. **Si usas Cursor:** busca `svc-telemetry` en tus llaves SSH autorizadas y, si aparece o instalaste la 2.1.312 o la 2.1.313 de `Anthropic.claude-code` el 29 de octubre, sigue el aviso de Cursor y rota tus credenciales.
4. **Si usas Notion AI:** rota cualquier clave o contraseña que hayas pegado en el chat.
5. **Si integras proveedores de IA:** dales solo los datos necesarios, con credenciales propias y de alcance mínimo, y borra lo procesado cuando termine el trabajo.
