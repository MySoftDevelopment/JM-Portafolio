---
titulo: 'Caída de Microsoft 365: qué falló en Outlook y Teams, qué dijo Microsoft y cómo preparar tu proyecto'
descripcion: 'Outlook y otros servicios de Microsoft 365 fallaron más de un día. La cronología oficial, la causa preliminar y qué revisar si tu app usa su correo.'
fecha: 2026-11-15
categoria: tecnologia
michi: desconectado
etiquetas: ['Microsoft 365', 'Outlook', 'Exchange Online', 'Teams', 'Caídas', 'Laravel']
formato: carrusel
resumen:
    - 'Microsoft 365 tuvo una caída de más de un día: Outlook y otros servicios que dependen de Exchange Online fallaron desde el 12 de noviembre.'
    - 'Microsoft dio por restablecido el servicio en la madrugada del 14 de noviembre, **más de 36 horas** después del primer aviso.'
    - 'Según Microsoft, fue un problema técnico y no un ciberataque. El informe completo del incidente aún no se publica.'
    - 'Si tu app envía correos por Microsoft 365, revisa qué pasó con los mensajes que fallaron esos días y reintenta los pendientes.'
    - 'Configura un **correo de respaldo**: Laravel trae un transporte de conmutación por error que cambia de proveedor si uno cae.'
fuentes:
    - titulo: 'Microsoft 365 Status en X: primer aviso del incidente EX1550543 (12 de noviembre de 2026)'
      url: 'https://x.com/MSFT365Status/status/2120938282204688468'
    - titulo: 'Microsoft 365 Status en X: la carga no viene de más tráfico sino de servidores no disponibles'
      url: 'https://x.com/MSFT365Status/status/2120962673911181437'
    - titulo: 'Microsoft 365 Status en X: un proceso central de los servidores se satura'
      url: 'https://x.com/MSFT365Status/status/2121002505911857577'
    - titulo: 'Charles Lamanna (Microsoft) en X: sin indicios de actividad maliciosa'
      url: 'https://x.com/clamanna/status/2121085008966529423'
    - titulo: 'Microsoft 365 Status en X: servicio restablecido (14 de noviembre de 2026)'
      url: 'https://x.com/MSFT365Status/status/2121485746334777593'
    - titulo: 'Corte Suprema de Filipinas en X: la caída afecta su correo'
      url: 'https://x.com/SCPh_PIO/status/2121057073912070300'
    - titulo: 'Policía de Dorset en X: no puede recibir formularios en línea'
      url: 'https://x.com/dorsetpolice/status/2121155938962825258'
    - titulo: 'Azure: historial de informes posteriores a incidentes (PIR 7Q30-010, 30 de septiembre de 2026)'
      url: 'https://azure.status.microsoft/en-us/status/history/'
    - titulo: 'Downdetector en X: reportes en 74 países y territorios'
      url: 'https://x.com/downdetector/status/2120981125145174504'
    - titulo: 'StatusStack: Microsoft 365 and Exchange Online outage, November 12, 2026'
      url: 'https://statusstack.com/blog/microsoft-365-exchange-online-outage-november-12-2026'
    - titulo: 'BleepingComputer: Massive Microsoft 365 outage disrupts Outlook, Teams, Copilot worldwide'
      url: 'https://www.bleepingcomputer.com/news/microsoft/massive-microsoft-365-outage-disrupts-outlook-teams-copilot-worldwide/'
    - titulo: 'Microsoft Graph: serviceHealthIssue incidentReport (informe posterior al incidente)'
      url: 'https://learn.microsoft.com/en-us/graph/api/servicehealthissue-incidentreport'
    - titulo: 'Laravel 13.x: Mail, configuración de failover'
      url: 'https://laravel.com/docs/13.x/mail'
---

Entre el jueves 12 y la madrugada del sábado 14 de noviembre, Microsoft 365 estuvo caído o inestable durante más de un día. Outlook dejó de conectarse a los buzones, el correo se represó y varios servicios que dependen de Exchange Online fallaron en América, Europa y Asia. Hubo de todo entre los afectados: según sus propias cuentas oficiales, desde la Corte Suprema de Filipinas hasta policías del Reino Unido que no podían recibir formularios en línea.

El servicio ya está restablecido. Queda entender qué pasó, qué falta saber y qué revisar si tu empresa o tu aplicación dependen del correo de Microsoft.

## Qué pasó, según Microsoft

Microsoft fue contando el incidente en la cuenta Microsoft 365 Status de X y en el centro de administración de Microsoft 365, bajo los códigos **EX1550543** (Exchange Online) y **MO1550821** (varios servicios de Microsoft 365). Esta es la cronología a partir de esas publicaciones, en hora de Colombia (UTC-5):

| Fecha y hora | Qué dijo Microsoft |
| --- | --- |
| 12 nov, 10:40 a. m. | Investiga fallas de Teams en Norteamérica (TM1550488). A las 12:09 p. m. lo da por resuelto. Es un incidente aparte. |
| 12 nov, 12:54 p. m. | Investiga problemas para acceder a buzones de Exchange Online por varios métodos de conexión en las Américas. |
| 12 nov, 1:07 p. m. | Confirma que puede afectar la conectividad de Microsoft 365 en cualquier región. |
| 12 nov, 2:12 p. m. | Pausa todos los despliegues, saca tráfico de la infraestructura afectada y reinicia servidores. |
| 12 nov, 2:31 p. m. | La carga alta no viene de más tráfico, sino de servidores que quedaron no disponibles de forma inesperada. |
| 12 nov, 4:40 p. m. | Evalúa revertir unas pocas actualizaciones de configuración recientes. |
| 12 nov, 5:09 p. m. | Lo hecho no dio el alivio esperado: un proceso central de los servidores se satura y les quita capacidad. |
| 12 nov, 7:06 p. m. | Los servidores que vuelven al servicio pueden dejar de responder otra vez apenas reciben tráfico. |
| 13 nov, 4:24 a. m. | Amplía a 48 horas el tiempo de espera del correo para no perder mensajes demorados. |
| 13 nov, 9:17 a. m. | Las colas de correo bajan y se acercan a niveles normales. |
| 13 nov, 3:05 p. m. | Sigue vaciando colas. El acceso puede volver antes que el flujo normal de correo. |
| 14 nov, 1:09 a. m. | Termina de corregir el problema de fondo y restablece el servicio a los clientes y regiones que faltaban. |

Entre el primer aviso sobre Exchange Online y el cierre pasaron algo más de 36 horas. Downdetector, que mide reportes de usuarios, contó quejas en 74 países y territorios en cerca de una hora el primer día.

## ¿Fue un ciberataque?

No, según Microsoft. Charles Lamanna, directivo de Microsoft, escribió en X la noche del 12 que no había «ningún indicio» de actividad maliciosa o cibernética, y el 13 la cuenta de Microsoft presentó disculpas y habló de un problema técnico.

La causa preliminar aparece en la entrada final del incidente en el centro de administración, que no es público. Según StatusStack, que la reprodujo, Microsoft la atribuye a un problema introducido durante una ampliación anterior de capacidad de red, que salió a la luz tras un cambio reciente en la red. La misma entrada promete un informe preliminar en dos días hábiles y uno final en cinco.

## Lo que todavía no cuadra

Esto es análisis a partir de las publicaciones de Microsoft, no un hecho confirmado.

La tarde del 12, Microsoft dijo que no había identificado ningún cambio reciente relacionado con el inicio del problema. La causa preliminar, en cambio, habla justo de un cambio de red. No es necesariamente una contradicción: en una falla así es común que el origen aparezca tarde, porque el síntoma (servidores que no pasan los controles de salud) estaba lejos de la causa. Pero es la pregunta que debe responder el informe final: qué cambio fue, por qué no se detectó antes y por qué los servidores volvían a caer cuando recibían tráfico.

Tampoco es la primera vez este año. Según el informe posterior de Azure sobre el incidente del 30 de septiembre, ese día una actualización de los gateways de red que se reanudó en muchas regiones a la vez saturó el plano de control y afectó servicios como ExpressRoute, Application Gateway y Azure Firewall. Son incidentes distintos con el mismo patrón: no un ataque, sino un cambio de infraestructura que se propaga más de lo previsto. Por eso una de las primeras medidas de Microsoft esta vez fue pausar todos los despliegues.

## Qué cambia en un caso típico

Muchas pymes usan Microsoft 365 para el correo corporativo, y muchas aplicaciones Laravel o Node.js envían sus correos por el servidor SMTP de Microsoft (`smtp.office365.com`, puerto 587). En esos dos días pudieron pasar tres cosas:

1. **Correos de tu aplicación que no salieron.** Si el envío falló dentro de un job en cola, el job pudo agotar sus reintentos y quedar marcado como fallido. Si se enviaba sin cola, dentro de la petición, el usuario pudo ver un error y el correo se perdió.
2. **Correos que llegaron tarde.** Microsoft amplió a 48 horas el tiempo de espera del correo demorado. Una confirmación de pago o un código de verificación que llega un día después ya no sirve.
3. **Procesos que dependen de leer un buzón.** Si tu sistema lee un buzón (por IMAP o por la API de Microsoft Graph) para procesar pedidos o facturas, esos días no recibió nada.

## Cómo comprobarlo en tu proyecto

### Revisa los envíos fallidos

En Laravel, si envías correo con colas y usas la tabla de jobs fallidos:

```bash
# Lista los jobs que fallaron
php artisan queue:failed

# Reintenta todos los jobs fallidos (revisa antes que no reenvíes correos duplicados)
php artisan queue:retry all
```

Busca en los logs de tu aplicación errores de conexión o de autenticación hacia `smtp.office365.com` entre el 12 y el 14 de noviembre.

### Configura un correo de respaldo

Laravel trae un transporte `failover`: si el primer proveedor falla, intenta con el siguiente. En `config/mail.php`:

```php
'mailers' => [
    'failover' => [
        'transport' => 'failover',
        'mailers' => [
            'smtp',     // tu cuenta de Microsoft 365
            'postmark', // o el proveedor de respaldo que tengas configurado
        ],
        'retry_after' => 60,
    ],

    // ...
],
```

Y en el `.env`:

```ini
MAIL_MAILER=failover
```

El respaldo tiene que estar autorizado en el SPF y el DKIM de tu dominio, o sus correos pueden terminar en spam. Para correo transaccional (códigos, facturas, recuperación de contraseña) conviene además un dominio o subdominio separado del correo de la oficina.

### Sigue el informe del incidente

Si administras un tenant de Microsoft 365, el informe posterior al incidente (PIR) aparecerá en el estado del servicio del centro de administración. También se puede consultar con Microsoft Graph, con el permiso `ServiceHealth.Read.All`:

```http
GET https://graph.microsoft.com/v1.0/admin/serviceAnnouncement/issues/MO1550821/incidentReport
```

La documentación de Microsoft aclara que el informe solo existe cuando el incidente tiene el estado `PostIncidentReviewPublished`. Antes de eso, la llamada devuelve error.

## Criterio para decidir

- **Si tu aplicación envía correos críticos** (pagos, accesos, citas), no dependas de un solo proveedor. El costo de un servicio de respaldo es bajo frente al de dos días sin correo.
- **Si solo usas Microsoft 365 para la oficina**, mover todo a otro proveedor por una caída no suele compensar: ningún proveedor está libre de caídas. Lo útil es tener un plan: un canal alterno para avisar a clientes y saber dónde mirar el estado del servicio.
- **Si administras el tenant**, guarda los códigos EX1550543 y MO1550821 y lee el informe final cuando salga. Revisa también si tu contrato te da derecho a algún crédito por incumplir el nivel de servicio.

Si el tema de depender de un tercero te suena, en la entrada sobre el [hackeo a Railway](/blog/railway-hackeo-claves-ia-variables-entorno/) vimos el otro lado del mismo problema: lo que pasa cuando falla la plataforma en la que confías.

## Resumen en pasos

1. **Qué pasó:** Exchange Online y los servicios de Microsoft 365 que dependen de él fallaron desde el 12 de noviembre. Microsoft dio el servicio por restablecido en la madrugada del 14.
2. **Por qué:** según Microsoft, fue un problema técnico, no un ciberataque. La causa preliminar es un problema de una ampliación de capacidad de red que apareció tras un cambio reciente. El informe completo está pendiente.
3. **Qué revisar hoy:** los jobs de correo fallidos (`php artisan queue:failed`) y los logs de envío hacia Microsoft entre el 12 y el 14 de noviembre.
4. **Qué preparar:** un mailer `failover` con un proveedor de respaldo autorizado en el SPF y el DKIM de tu dominio.
5. **Qué seguir:** el informe posterior al incidente MO1550821, en el centro de administración o por Microsoft Graph.
