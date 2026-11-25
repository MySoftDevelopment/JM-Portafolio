---
titulo: 'OpenRouter saca a tres proveedores de IA por filtrar prompts: qué se expuso y qué claves rotar'
descripcion: 'Un experimento de Dragos con dos millones de prompts trampa probó que varios proveedores de IA filtraban datos. Qué pasó en OpenRouter y qué revisar hoy.'
fecha: 2026-11-25
categoria: ciberataques
michi: candado
etiquetas: ['OpenRouter', 'Dragos', 'Together AI', 'MiniMax', 'Zero Data Retention', 'API keys', 'Agentes de IA', 'ARTEX']
formato: carrusel
resumen:
    - 'La firma Dragos envió cerca de **dos millones** de prompts con credenciales falsas a proveedores de IA para ver quién las usaba.'
    - 'Encontró tres proveedores hackeados y otros que abrían enlaces de los prompts, incluso en peticiones marcadas como [ZDR](cero retención de datos).'
    - '[OpenRouter](open ráuter) sacó a tres proveedores, quitó la etiqueta ZDR a **125** endpoints y avisó a los clientes afectados.'
    - 'Together AI, Phala, GMI Cloud, Novita, Atlas Cloud y MiniMax publicaron sus propios informes, con fechas y modelos.'
    - 'Si pusiste claves, contraseñas o enlaces privados en prompts a esos modelos, trátalos como expuestos y **rótalos hoy**.'
fuentes:
    - titulo: 'OpenRouter: Data Processing Incidents on Inference Providers (22 de noviembre de 2026)'
      url: 'https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/'
    - titulo: 'Dragos (HD Moore): Three breaches, endless leaks: Your AI supply chain needs canaries (19 de noviembre de 2026)'
      url: 'https://www.dragos.com/blog/ai-supply-chain-security-canary-tokens'
    - titulo: 'Together AI: Security event, prompt leakage for requests in June and July of 2026'
      url: 'https://www.together.ai/blog/security-event-prompt-leakage-for-requests-in-june-and-july-of-2026'
    - titulo: 'Phala: November 2026 Preliminary Incident Report'
      url: 'https://phala.com/posts/phala-november-preliminary-incident-report'
    - titulo: 'GMI Cloud: Security incident affecting GMI Cloud endpoints on OpenRouter'
      url: 'https://www.gmicloud.ai/en/blog/security-incident-affecting-gmi-cloud-endpoints-on-openrouter'
    - titulo: 'Novita AI: MiniMax requests privacy notice'
      url: 'https://novita.ai/blog/minimax-requests-privacy-notice/'
    - titulo: 'Atlas Cloud: Security and privacy commitment'
      url: 'https://www.atlascloud.ai/blog/ai-updates/security-and-privacy-commitment'
    - titulo: 'MiniMax: Update on URL access in forwarded API requests (24 de noviembre de 2026)'
      url: 'https://www.minimax.io/blog/update-on-url-access-in-forwarded-api-requests-20261124'
    - titulo: 'OpenRouter Docs: Provider selection'
      url: 'https://openrouter.ai/docs/guides/routing/provider-selection'
    - titulo: 'OpenRouter Docs: Zero Data Retention'
      url: 'https://openrouter.ai/docs/guides/features/zdr'
    - titulo: 'OpenRouter Docs: Get generation'
      url: 'https://openrouter.ai/docs/api/api-reference/generations/get-generation'
---

OpenRouter es un intermediario: con una sola clave de API te deja usar modelos de muchas empresas, y por detrás reparte tus peticiones entre decenas de proveedores que alojan esos modelos. Esta semana quedó claro el costo oculto: no siempre sabes quién lee tus prompts.

El 22 de noviembre OpenRouter anunció que sacó de su plataforma a tres proveedores, que quitó la etiqueta de cero retención de datos (ZDR) a 125 endpoints y que avisó a todos los clientes que pudieron verse afectados. Lo hizo después de un experimento de la firma de seguridad Dragos que demostró, con credenciales trampa, que varios proveedores estaban filtrando lo que recibían.

## Cómo se descubrió: dos millones de prompts trampa

HD Moore, jefe de investigación de Dragos, publicó el 19 de noviembre los resultados. Entre julio y noviembre de 2026 su equipo envió cerca de dos millones de prompts a proveedores de IA. Cada uno llevaba algo único que nadie debía usar: claves de AWS de cuentas vacías con registro completo, credenciales de git, SSH, bases de datos y correo, nombres de dominio y enlaces secretos. Son *canary tokens*: si alguien los usa, sabes de qué prompt salieron.

Lo que encontraron:

- **Tres proveedores hackeados.** Atacantes robaban datos de tres empresas que alojan modelos. El caso más antiguo empezó a mediados de julio y ninguna lo sabía hasta que Dragos les avisó.
- **Cientos de claves robadas.** En el caso más grande se robaron un par de cientos de claves de AWS en unas pocas ventanas de finales de octubre. Algunas venían de peticiones rechazadas antes de llegar al modelo, señal de que el robo ocurría en la entrada del proveedor.
- **Uso real de las claves.** Los atacantes probaban si las claves servían, a veces en horas, y luego listaban buckets de S3, buscaban en Secrets Manager e intentaban activar modelos de Bedrock y crear usuarios. En total hubo decenas de miles de llamadas a la API de AWS con las claves sembradas.
- **ARTEX otra vez.** Desde el 1 de noviembre, el atacante usó ARTEX, el marco de pruebas de penetración con IA del que ya hablamos [en el ataque a la Comisión Europea](/blog/comision-europea-ataque-ia-artex/), para comprobar qué claves seguían vivas.
- **Revendedores que leen.** En un mercado de inferencia, vendedores que parecían personas con conexión de hogar veían y guardaban prompts con el registro normal de peticiones, sin necesidad de hackear nada.
- **ZDR que no se cumple.** Los sistemas de un laboratorio chino abrieron enlaces secretos de más de la mitad de los prompts enviados a sus modelos entre julio y octubre, incluidas cerca de dos tercios de las peticiones marcadas como «sin recolección de datos» o ZDR. Dragos no nombra al laboratorio.

## Qué confirmó cada proveedor

OpenRouter dice que los hallazgos no muestran ninguna intrusión en sus propios sistemas, que el problema está en proveedores concretos y que no todos los afectados han publicado algo. No nombra a los tres que sacó. Estos son los que sí publicaron un informe:

| Proveedor | Qué pasó, según su informe | Ventana | Qué pide hacer |
| --- | --- | --- | --- |
| Together AI | Un agente de IA de programación subió a un repositorio público de GitHub una credencial que daba acceso a muestras de prompts guardadas en Hugging Face. Alguien las descargó y buscó credenciales dentro. Modelos: MiniMax M3, GLM-5.2 y Kimi K2.6 | Sobre todo 24 de junio y 4, 8 y 14 de julio de 2026 | Activar ZDR si manejas datos sensibles |
| Phala | Un atacante controló el servidor que procesaba DeepSeek V4 Flash 0731 para peticiones que llegaban desde OpenRouter | 21 de octubre a 8 de noviembre (confirmado el 21 y 22 de octubre) | Rotar toda clave o contraseña que iba en esas peticiones |
| GMI Cloud | Accedieron a un sistema de registro y monitoreo que guardaba unos tres días de prompts y respuestas | Peticiones del 18 de octubre al 18 de noviembre | Rotar secretos enviados en ese periodo y revisar su uso |
| Novita | Un error de enrutamiento mandó peticiones de modelos MiniMax a la API oficial de MiniMax en vez de procesarlas en su infraestructura | 28 de mayo a 11 de noviembre | Revocar o rotar credenciales incluidas en las peticiones |
| Atlas Cloud | Prompts a MiniMax M3 y M2.7 enviados por Atlas Cloud llegaron a la API de MiniMax, donde se abrieron enlaces. Retiró todos sus modelos de OpenRouter | Tercer trimestre y comienzo del cuarto de 2026 | Tratar como expuesto cualquier secreto enviado a MiniMax M3, M2.7 o M3.1 Flash |
| MiniMax | Su monitoreo de seguridad, activo por defecto, extraía URL de las peticiones y un análisis automático visitó algunas, incluso en tráfico ZDR | No la precisa | No da recomendaciones; dice que apagó ese proceso y borró las URL |

Un detalle de Together AI vale oro: lo que abrió la puerta fue **un agente de IA que hizo commit de una credencial**. Un escáner automático la detectó y revirtieron el commit, pero en esa ventana alguien ya la había usado.

## Lo que este caso enseña sobre los prompts

Esto es análisis, a partir de los informes anteriores.

**Un prompt es un dato que viaja, no una conversación privada.** Pasa por el intermediario, por el proveedor, a veces por otro proveedor detrás y por sus sistemas de registro. Cada salto es un lugar donde se puede guardar, leer o robar. Dragos lo resume así: la bandera de privacidad solo obliga al primer salto.

**ZDR es una política, no una garantía técnica.** MiniMax visitaba enlaces de peticiones ZDR porque su monitoreo de seguridad estaba activo por defecto, y Together AI guardaba muestras de prompts para pruebas. Ninguno de los dos casos necesitó un atacante para que el dato saliera de donde debía.

**Los agentes mandan lo que pueden leer.** Si un agente de programación tiene acceso al `.env`, a la configuración de AWS o al historial de la terminal, esos secretos pueden terminar dentro de un prompt sin que nadie lo decida. Es el mismo patrón que vimos en [el hackeo a Railway](/blog/railway-hackeo-claves-ia-variables-entorno/): las claves de IA y de nube son el botín.

## Cómo comprobar si te afecta

### 1. Revisa qué proveedores atendieron tus peticiones

Si guardas el `id` que devuelve OpenRouter en cada respuesta (empieza por `gen-`), puedes consultar quién la procesó. El campo `provider_name` dice el proveedor y `created_at` la fecha:

```bash
curl -G "https://openrouter.ai/api/v1/generation" \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  --data-urlencode "id=gen-XXXXXXXX"
```

Cruza esas fechas y proveedores con la tabla de arriba. Si no guardas los `id`, revisa el correo de la cuenta: OpenRouter dice que ya notificó a los clientes potencialmente afectados.

### 2. Busca secretos en lo que mandas al modelo

Revisa el código que arma los prompts. Señales de alarma: concatenar variables de entorno, volcar archivos de configuración o pegar logs con encabezados `Authorization`. Si alguno de esos secretos viajó a los modelos y fechas de la tabla, rótalo.

### 3. Restringe el enrutamiento

OpenRouter permite fijar reglas por petición con el objeto `provider`. Según su documentación, `zdr: true` limita el enrutamiento a endpoints con política de cero retención, `data_collection: "deny"` excluye proveedores que guardan datos y `only` restringe a los proveedores que tú elijas:

```json
{
  "provider": {
    "zdr": true,
    "data_collection": "deny",
    "only": ["anthropic"]
  }
}
```

También puedes exigir ZDR para toda la cuenta en `openrouter.ai/settings/privacy`. Ojo: después de este caso, esa etiqueta vale lo que valga la verificación del proveedor. OpenRouter dice que pedirá validaciones antes de devolverla a los 125 endpoints que la perdieron.

### 4. Siembra tus propias trampas

La recomendación de Dragos que más sirve a un equipo pequeño: poner una credencial falsa en el contexto de tus agentes y pipelines, y tratar cualquier uso como un incidente. Dragos anota que un Canarytoken gratuito basta para empezar.

## Qué cambia en un caso típico de aquí

Piensa en una pyme que tiene un chatbot de WhatsApp o un asistente interno hecho en Laravel o Node.js, y que usa OpenRouter para elegir el modelo más barato porque paga en dólares y cobra en pesos. Es exactamente el perfil que más se expone: modelos abiertos alojados por terceros, enrutamiento automático hacia el proveedor más económico y, muchas veces, datos de clientes dentro del prompt.

Un criterio para decidir:

- **Si en tus prompts hay datos personales de clientes o secretos,** fija los proveedores con `only` y desactiva los respaldos con `allow_fallbacks: false`. Pagar un poco más por un proveedor conocido sale más barato que un incidente.
- **Si solo procesas textos públicos** (resumir, clasificar productos), el riesgo es menor, pero igual quita cualquier credencial del contexto.
- **Si tu agente de programación tiene acceso al repositorio,** asume que lo que lee puede salir en un prompt y en un commit. Activa el escaneo de secretos en el repositorio y no le des claves de producción.

## Resumen en pasos

1. **Confirmado:** Dragos sembró cerca de dos millones de prompts con credenciales trampa y encontró tres proveedores hackeados, revendedores que leían prompts y fallas de privacidad incluso con ZDR.
2. **Confirmado:** OpenRouter sacó a tres proveedores, quitó ZDR a 125 endpoints y avisó a los clientes afectados. Dice que su propia plataforma no fue vulnerada.
3. **Confirmado:** Together AI, Phala, GMI Cloud, Novita, Atlas Cloud y MiniMax publicaron sus informes, con modelos y fechas.
4. **Qué hacer hoy:** cruza tus peticiones con la tabla, rota cualquier secreto que haya viajado en un prompt y revisa el correo de tu cuenta de OpenRouter.
5. **Qué cambiar:** saca las credenciales del contexto de modelos y agentes, fija proveedores para datos sensibles y siembra una credencial trampa para enterarte si algo se filtra.
