---
titulo: 'Comisión Europea confirma un ciberataque hecho con IA: qué se sabe de ARTEX y qué revisar en tu servidor'
descripcion: 'La Comisión Europea apagó aplicaciones por un ataque hecho con una herramienta de IA pública. Qué confirmó, qué dice el FBI de ARTEX y qué revisar.'
fecha: 2026-11-21
categoria: ciberataques
michi: antifaz
etiquetas: ['Comisión Europea', 'ARTEX', 'CERT-EU', 'FBI', 'agentes de IA', 'ciberataques', 'PHP', 'MySQL']
formato: carrusel
resumen:
    - 'La **Comisión Europea** confirmó que sufrió una campaña de ciberataques generada con una herramienta de IA disponible al público.'
    - 'La detectó el 22 de octubre y apagó varias aplicaciones como precaución. Dice que la mayoría ya volvió a funcionar.'
    - 'Según Politico, la herramienta fue [ARTEX](ártex) y cayeron sistemas de nómina, reembolsos médicos y traducción por más de 10 días.'
    - 'El [FBI](efe be i) advierte que ARTEX ataca justo lo que nadie mira: portales de empleados, sistemas viejos e integraciones con terceros.'
    - 'Revisa tu servidor: nada interno expuesto, **límite de peticiones**, sin errores detallados en producción y busca archivos PHP extraños.'
fuentes:
    - titulo: 'Comisión Europea: Cyber campaign against the European Commission, Q&A (rueda de prensa del 19 de noviembre de 2026)'
      url: 'https://audiovisual.ec.europa.eu/en/media/video/I-298222'
    - titulo: 'CERT-EU: From penetration testing to cyber threat, beware of ARTEX (5 de noviembre de 2026)'
      url: 'https://www.cert.europa.eu/blog/from-penetration-testing-to-cyber-threat-beware-of-artex'
    - titulo: 'FBI: Threat Overview of ARTEX Autonomous Penetration Testing Framework (FLASH-20261113-001, 13 de noviembre de 2026)'
      url: 'https://www.ic3.gov/CSA/2026/261113.pdf'
    - titulo: 'The Register: European Commission scrambles to contain AI-assisted cyberattack (19 de noviembre de 2026)'
      url: 'https://www.theregister.com/cyber-crime/2026/11/19/european-commission-scrambles-to-contain-ai-assisted-cyberattack/5311103'
    - titulo: 'Help Net Security: European Commission confirms AI-generated cyberattack disrupted its systems (20 de noviembre de 2026)'
      url: 'https://www.helpnetsecurity.com/2026/11/20/european-commission-ai-generated-cyberattack-publicly-available-tool/'
    - titulo: 'RTÉ (Reuters): AI tools used in cyberattack on European Commission (19 de noviembre de 2026)'
      url: 'https://www.rte.ie/news/technology/2026/1119/1599850-eu-cyberattack/'
---

El 19 de noviembre, en la rueda de prensa diaria en Bruselas, el portavoz de la Comisión Europea, Thomas Regnier, confirmó algo que hasta ese día solo se conocía por la prensa: el órgano ejecutivo de la Unión Europea sufrió una campaña de ciberataques **generada con inteligencia artificial**, usando una herramienta que cualquiera puede descargar.

Hace dos semanas contamos cómo [un agente basado en ARTEX terminó sacando datos de WorkOS](/blog/agente-ia-artex-workos-filtracion-credencial/). Ahora el objetivo es una de las instituciones públicas más grandes del mundo, y el patrón se repite: los agentes no buscan la puerta principal, buscan el sistema que nadie está mirando.

## Qué confirmó la Comisión

Esto es lo que dijo el portavoz en la rueda de prensa, que está publicada en el archivo audiovisual de la Comisión:

| Fecha | Qué pasó |
| --- | --- |
| 22 de octubre | La Comisión detecta el incidente |
| 26 de octubre | Lo confirma tras una investigación inicial |
| Desde entonces | Apaga temporalmente varias aplicaciones como medida de protección y prevención |
| 19 de noviembre | Confirma en público que fue una campaña «generada con IA» con una herramienta disponible al público |

Lo demás que dijo:

- **Datos personales.** «En esta etapa» de la investigación no han detectado evidencia de una filtración que afecte al personal de la Comisión en su conjunto.
- **Servicios.** La mayoría de las aplicaciones que se apagaron ya volvieron a funcionar. No dijo cuáles fueron.
- **Rescate y autoría.** No sabe de ninguna petición de rescate y no quiso atribuir el ataque a ningún grupo ni país.
- **Investigación.** Sigue abierta, con CERT-EU (el equipo de respuesta a incidentes de las instituciones europeas) y el Supervisor Europeo de Protección de Datos.
- **Alcance.** No quiso calificar la magnitud del ataque ni decir si ya terminó. Según Help Net Security, dijo que «muchos elementos» están contenidos.

## Lo que reportó la prensa y la Comisión no confirmó

La noticia la dio Politico la misma mañana del 19 de noviembre. Según su reporte, recogido por The Register y Help Net Security:

- CERT-EU detectó que los atacantes usaron **ARTEX**, el marco de pruebas de penetración con agentes de IA. La Comisión no nombró la herramienta.
- Entre los sistemas afectados estuvieron **Sysper**, la plataforma de recursos humanos que el personal usa para colillas de pago, horarios y vacaciones; **MyPMO**, para reembolsos médicos, y los sistemas de traducción. Las interrupciones pasaron de diez días, aunque los salarios se pagaron normalmente.
- El órgano interno de gestión de crisis de la Comisión tuvo una reunión de emergencia y la comisaria de Soberanía Tecnológica y Seguridad, Henna Virkkunen, informó a los demás comisarios.

Politico también dijo que el ataque pudo comprometer grandes cantidades de datos personales. La Comisión, por ahora, dice lo contrario para el personal «en su conjunto». Esa frase deja abierta la posibilidad de que algunas personas sí estén afectadas, pero no hay confirmación.

## Qué es ARTEX, según CERT-EU y el FBI

Dos semanas antes de la confirmación, el 5 de noviembre, CERT-EU había publicado una alerta sobre ARTEX. Dijo que había visto actividad automatizada con IA contra las instituciones que protege, «muy probablemente» con esa herramienta, y que su disponibilidad pública acelerará su uso por parte de atacantes.

El 13 de noviembre el FBI publicó una alerta (FLASH) más detallada. Lo principal:

- **Qué es.** Una plataforma de código abierto escrita en Go en la que varios agentes convierten un objetivo en lenguaje natural en comandos reales. Se conecta a modelos externos; en las instancias de atacantes predominan los chinos, sobre todo la familia DeepSeek Flash.
- **De dónde salió.** Se publicó en GitHub en julio de 2026 y su autor la retiró el 8 de octubre por el abuso, pero sigue circulando en copias, variantes y una versión comercial.
- **Qué tan rápido es.** Algunas intrusiones pasaron de elegir el objetivo a tener acceso privilegiado en menos de tres horas.
- **Qué tan extendido está.** A comienzos de noviembre había más de 1.600 consolas de ARTEX expuestas a internet. Entre los casos citados, un robo de datos de unas 67.000 personas a entidades financieras de Corea del Sur.

El dato más útil del documento es **dónde ataca**. El FBI dice que ARTEX es especialmente bueno explotando sistemas periféricos que reciben menos atención que el producto principal: portales de proveedores, *backends* de apps móviles, aplicaciones de empleados, sistemas de apoyo a ventas, servicios heredados e integraciones con terceros. Una plataforma de nómina y vacaciones encaja en esa lista. Una herramienta interna de ventas, como la de WorkOS, también.

## Lo que hizo ARTEX en otros ataques

La tabla de técnicas del FBI parece una lista de errores comunes: contraseñas de administrador dentro del JavaScript de una SPA, APIs sin autenticación, referencias a registros sin control de acceso (IDOR), inyección SQL, credenciales débiles y peticiones automáticas que enumeran en secuencia pantallas de inicio de sesión y de búsqueda. También *web shells* en PHP, en un caso instaladas **envenenando el log de MySQL**: el atacante hace que MySQL escriba su registro en un `.php` dentro de la carpeta pública y luego lo ejecuta desde el navegador.

Nada de eso es nuevo. Lo nuevo, y esto ya es análisis, es que un agente sí se toma el trabajo de probar cien detalles menores en el portal de vacaciones de una institución, y en paralelo contra muchos objetivos.

## Qué revisar en un servidor típico de aquí

Esta sección es análisis propio a partir de las recomendaciones de CERT-EU y el FBI, aterrizado a un VPS con Debian, Nginx, PHP y MySQL, o a un proyecto Laravel.

### 1. Haz la lista de lo que no es tu producto principal

El FBI pide inventariar todo lo que da a internet, incluido lo periférico: el panel de administración, la API de la app móvil, el subdominio de pruebas que quedó vivo, el phpMyAdmin que instalaste una vez. Lo que no necesite estar en internet, ciérralo por red o detrás de una VPN, como pide CERT-EU para los paneles de administración.

### 2. Revisa que MySQL no pueda escribir en tu carpeta pública

Por la técnica de envenenamiento de logs, confirma dónde escribe MySQL su registro general y que esté apagado si no lo usas:

```sql
SHOW VARIABLES LIKE 'general_log%';
SHOW VARIABLES LIKE 'secure_file_priv';
```

`general_log` debería estar en `OFF` y `general_log_file` nunca debería apuntar dentro de `public/` o `public_html`. `secure_file_priv` limita dónde puede escribir MySQL con `SELECT ... INTO OUTFILE`, otra forma conocida de dejar un archivo en el servidor: lo ideal es que apunte a una carpeta propia, nunca a la pública, y que no esté vacío (vacío significa sin restricción). Además, el usuario de MySQL de tu aplicación no necesita privilegios de administrador: si puede cambiar variables globales, tiene más permisos de los que debe.

### 3. Busca archivos PHP que no reconoces

Un *web shell* suele ser un `.php` suelto en una carpeta donde no debería haber código, como la de archivos subidos. Este comando lista los PHP de la carpeta pública modificados en los últimos 45 días:

```bash
find /var/www/miapp/public -name "*.php" -mtime -45 -ls
```

En un proyecto Laravel, la carpeta `public/` normalmente solo tiene `index.php`. Cualquier otro archivo PHP ahí, sobre todo dentro de `storage` o de carpetas de imágenes, merece una revisión.

### 4. Ponle límite a lo que se puede enumerar

El FBI recomienda limitar peticiones y alertar cuando alguien consulta registros en secuencia o demasiados por sesión. En Laravel eso es el middleware `throttle` en inicio de sesión, búsqueda y consultas. Y valida en el servidor el permiso sobre cada registro: un `/api/clientes/1`, `/2`, `/3` sin esa validación es el IDOR que el agente encuentra en minutos.

### 5. No regales información en los errores

Las dos alertas piden no mostrar trazas, errores SQL, rutas internas ni detalles del framework a usuarios sin autenticar. En Laravel eso significa `APP_DEBUG=false` en producción, sin excepciones.

### 6. Mira tus logs como lo haría el agente

ARTEX hace mucho ruido. Para ver qué IP hizo más peticiones en el log de acceso de Nginx (con el formato por defecto):

```bash
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -20
```

Y un detalle que trae el FBI: entre los indicadores de red recomienda investigar llamadas salientes inesperadas a APIs de modelos como `api.anthropic.com` o `api.deepseek.com`. Si tu servidor no usa IA y aparecen esas conexiones, puede que alguien esté corriendo un agente desde tu propia máquina.

## La lección para quien desarrolla

También es análisis. En WorkOS fue una herramienta interna de ventas; en la Comisión, según Politico, nómina, reembolsos y traducción. Ninguno era el producto estrella. Revisar un sistema olvidado ya no le cuesta tiempo a nadie, así que la pregunta no es si alguien se fijará en ese panel viejo, sino si aguanta cuando lo haga una máquina que no se cansa.

## En resumen

1. La Comisión Europea confirmó el 19 de noviembre una campaña de ciberataques generada con una herramienta de IA pública, detectada el 22 de octubre.
2. Apagó varias aplicaciones como precaución y dice que la mayoría ya funciona; no ha encontrado evidencia de filtración que afecte a su personal en conjunto.
3. Según Politico, la herramienta fue ARTEX y cayeron sistemas de nómina, reembolsos médicos y traducción; la Comisión no lo confirmó.
4. El FBI y CERT-EU advierten que ARTEX se sigue usando pese a que su autor lo retiró, y que ataca sistemas periféricos con fallas comunes.
5. En tu servidor: cierra lo interno, revisa el log de MySQL, busca PHP extraños, limita peticiones, apaga los errores detallados y vigila tus logs.
