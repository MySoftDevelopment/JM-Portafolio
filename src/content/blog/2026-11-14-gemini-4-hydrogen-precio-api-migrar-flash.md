---
titulo: 'Gemini 4 Hydrogen: precio, plan gratuito y lo que rompe al migrar desde Gemini 3.8 Flash'
descripcion: 'Google lanzó Gemini 4 Hydrogen, su modelo rápido para código y agentes, a 1,50 y 7,50 dólares por millón de tokens. Qué cambia frente a 3.8 Flash y cómo migrar.'
fecha: 2026-11-14
categoria: ia
michi: nuevo
etiquetas: ['Google', 'Gemini', 'Gemini 4 Hydrogen', 'Gemini API', 'Agentes de IA', 'Precios']
formato: carrusel
resumen:
    - 'Google lanzó **Gemini 4 Hydrogen**, el modelo rápido de la familia Gemini 4, pensado para programar y para agentes.'
    - 'En la API cuesta 1,50 dólares por millón de tokens de entrada y 7,50 de salida, y tiene plan gratuito con límites.'
    - 'Llega a la app de Gemini, a la Búsqueda de Google, a AI Studio y a la API. Google lo recomienda para reemplazar a Gemini 3.8 Flash.'
    - 'Migrar no es solo cambiar el nombre: **ya no acepta** temperature ni el caché explícito, y piensa más por defecto.'
    - 'Antes de cambiar, prueba tus prompts y mide cuántos tokens gasta: hoy cuesta el doble que 3.8 Flash.'
fuentes:
    - titulo: 'Google: Introducing Gemini 4 Hydrogen (12 de noviembre de 2026)'
      url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/'
    - titulo: 'Gemini API: What''s new in Gemini 4 Hydrogen (guía de migración)'
      url: 'https://ai.google.dev/gemini-api/docs/whats-new-gemini-4-hydrogen'
    - titulo: 'Gemini API: ficha del modelo gemini-4-hydrogen'
      url: 'https://ai.google.dev/gemini-api/docs/models/gemini-4-hydrogen'
    - titulo: 'Gemini API: precios'
      url: 'https://ai.google.dev/gemini-api/docs/pricing'
---

El 12 de noviembre Google presentó **Gemini 4 Hydrogen**, un nuevo modelo de la familia Gemini 4. Gemini 4 Carbon y Gemini 4 Argon, presentados antes, son los modelos de razonamiento profundo y no tienen plan gratuito en la API. Hydrogen es el modelo rápido y barato de la familia, el que Google pone a trabajar en el día a día: escribir código, correr pruebas, usar herramientas y responder en la app de Gemini y en la Búsqueda.

Para quien desarrolla, Gemini 4 llega al plan gratuito de la API. Pero Google lo recomienda como reemplazo de Gemini 3.8 Flash, y esa migración rompe código y, por ahora, cuesta el doble.

## Qué anunció Google

Según el anuncio firmado por Koray Kavukcuoglu, de Google DeepMind, y la documentación de la API:

- **Identificador del modelo:** `gemini-4-hydrogen`. Entra texto, imagen, video, audio y PDF; sale texto.
- **Ventana de contexto:** 1.048.576 tokens, compartida entre entrada, razonamiento y salida. Cada respuesta normal puede tener hasta 65.536 tokens; para salidas más largas, hasta llenar la ventana, hay que usar ejecución en segundo plano (*long decode*).
- **Cuatro niveles de razonamiento:** `low`, `medium`, `high` (el predeterminado) y uno nuevo, `xhigh`.
- **Precio en la API:** 1,50 dólares por millón de tokens de entrada y 7,50 por millón de salida, igual en toda la ventana de contexto. Los tokens de razonamiento se cobran como salida.
- **Plan gratuito:** sí está disponible en el plan gratuito de la API y de AI Studio, con límites de uso.
- **Dónde está:** Gemini API y AI Studio (todos los planes), Android Studio, Gemini para empresas, Google Antigravity (para suscriptores pagos de AI Pro y Ultra), la app de Gemini y la Búsqueda de Google para todos los usuarios. En la app, los usuarios gratuitos lo reciben cuando la selección automática de modelo lo considera adecuado.
- **Agente administrado:** el agente de Antigravity en la API usa ahora Hydrogen por defecto.

Google también presentó **Orchestrator** en Antigravity, que alterna entre Carbon (planea) e Hydrogen (ejecuta) en la misma sesión.

## Lo que dicen las cifras (y de dónde salen)

Son cifras de Google sobre su propio modelo: orientan, pero no reemplazan una prueba con tus datos.

| Dato | Gemini 4 Hydrogen | Referencia |
| --- | --- | --- |
| Terminal-Bench 4.1 | 57 % | 18,2 % de Gemini 3.8 Flash |
| Artificial Analysis Intelligence Index | 51 en `high`, 54 en `xhigh` | 50 de Gemini 4 Argon |
| Velocidad para terminar tareas | 2,5 veces más rápido en `high` | frente a Gemini 3.8 Flash |
| Afirmaciones inventadas | más de 5 veces menos | frente a Gemini 3.8 Flash |

Lo llamativo es que Hydrogen supera por un punto a Argon, un modelo de gama alta, en el índice de Artificial Analysis. Un punto es poco y un índice agregado no predice tu caso, pero indica que el modelo barato queda cerca de la gama alta.

En seguridad, Google afirma que es más de 2,3 veces más resistente a la inyección indirecta de prompts en el benchmark de Gray Swan. Eso no reemplaza limitar los permisos de tu agente desde tu propio código.

## Precios frente al resto de la familia

Estos son los precios estándar por millón de tokens, tomados de la página de precios de la Gemini API el 14 de noviembre:

| Modelo | Entrada | Salida | Plan gratuito |
| --- | --- | --- | --- |
| Gemini 4 Hydrogen | 1,50 USD | 7,50 USD | Sí |
| Gemini 3.8 Flash (hasta el 31 de diciembre de 2026) | 0,75 USD | 3,75 USD | Sí |
| Gemini 3.8 Flash (desde el 1 de enero de 2027) | 1,50 USD | 7,50 USD | Sí |
| Gemini 4 Carbon y Argon (hasta el 30 de noviembre de 2026) | 2,00 USD | 10,00 USD | No |
| Gemini 4 Carbon y Argon (desde el 1 de diciembre de 2026) | 4,00 USD | 20,00 USD | No |

Lo que el anuncio no destaca: el precio actual de 3.8 Flash es promocional y desde enero sube justo al de Hydrogen. Además, Hydrogen tiene modalidades Batch y Flex a mitad de precio (0,75 y 3,75 dólares) para procesos sin prisa.

## Lo que rompe al migrar desde Gemini 3.8 Flash

Google lo presenta como la actualización recomendada, pero su propia guía de migración enumera cambios que pueden hacer fallar código que hoy funciona:

1. **`temperature`, `top_p` y `top_k` ya no sirven.** Si mandas valores dentro del rango, el servidor los ignora. Si están fuera de rango, la API responde con error `400`. Si usabas temperatura baja para respuestas estables, ese control desaparece.
2. **No hay caché explícito.** `cachedContents` y `caches.create` no están soportados, y hay que quitar el campo `cached_content` de las peticiones. Queda el caché implícito, que se activa solo en prompts de al menos 4.096 tokens y descuenta 95 % de los tokens de entrada que coinciden.
3. **Piensa más por defecto.** El nivel predeterminado pasa de `medium` a `high`, y el nivel `minimal` ahora devuelve error. Más razonamiento significa más tokens de salida, y esos se cobran.
4. **La ventana es una sola.** En 3.8 Flash la entrada y la salida tenían presupuestos separados; en Hydrogen comparten el 1.048.576. La guía pide revisar los `max_output_tokens` muy bajos o subirlos hasta 65.536.
5. **Herramientas declaradas, no improvisadas.** Si le pedías al modelo por instrucciones de sistema que devolviera JSON crudo simulando una llamada a herramienta, puede fallar con `MALFORMED_FUNCTION_CALL`. Hay que usar *function calling* o salidas estructuradas.

## Cómo comprobarlo en tu proyecto

Ubica dónde usas Gemini y qué parámetros mandas. En un proyecto Laravel, Node.js o Expo, desde la raíz:

```bash
# Dónde se nombra un modelo de Gemini
grep -rnE "gemini-[0-9]" --include=*.{php,ts,tsx,js,mjs,env} . --exclude-dir={node_modules,vendor}

# Parámetros que Hydrogen ignora o rechaza
grep -rnE "temperature|top_p|topP|top_k|topK|cached_content|cachedContent|minimal" --include=*.{php,ts,tsx,js,mjs} . --exclude-dir={node_modules,vendor}
```

Si el nombre del modelo está escrito en el código, pásalo a una variable de entorno (por ejemplo, `GEMINI_MODEL` en tu `.env`). Así pruebas Hydrogen sin desplegar código nuevo y vuelves atrás en segundos.

## Criterio para decidir

Esto es análisis a partir de los precios y la documentación oficial.

**Si hoy usas Gemini 3.8 Flash y el costo es tu límite**, no hay prisa en noviembre: Flash cuesta la mitad hasta el 31 de diciembre. Un ejemplo con números redondos: 1.000 peticiones diarias de 5.000 tokens de entrada y 1.000 de salida suman 5 millones de entrada y 1 millón de salida al día. Con Hydrogen son 7,50 + 7,50 = 15 dólares diarios; con Flash al precio actual, 7,50. Desde enero los dos cuestan lo mismo por token, y ahí la comparación pasa a ser de calidad y de cuántos tokens gasta cada uno para la misma tarea. Ojo: con el nivel `high` por defecto, Hydrogen puede generar más tokens de razonamiento que tu configuración actual.

**Si tu producto es un agente o un asistente de código**, pruébalo ya: las mejoras que Google reporta (menos datos inventados, mejor recuperación cuando falla una herramienta) son justo lo que más falla ahí. Quédate con el nivel de razonamiento más bajo que cumpla tu estándar, como recomienda la guía.

**Si dependes de `temperature` o del caché explícito**, la migración es un cambio de diseño, no de configuración. Planéala con pruebas, sobre todo si cobras en pesos y pagas la API en dólares: un aumento de tokens por petición se nota en la factura antes que en las métricas.

**Si usas Carbon o Argon para todo**, según la guía Hydrogen puede tomar los pasos de ejecución sin cambiar el formato de las peticiones. Como Carbon y Argon duplican su precio el 1 de diciembre, separar planeación y ejecución puede bajar bastante el costo.

Si comparas proveedores, esta semana repasamos [Claude Fable 5.2 y Mythos 5.2](/blog/claude-fable-5-2-mythos-precio-novedades/). Compara con tus prompts, no con los benchmarks de cada empresa.

## Resumen en pasos

1. **Qué pasó:** Google lanzó Gemini 4 Hydrogen (`gemini-4-hydrogen`), el modelo rápido de la familia Gemini 4, con contexto de 1.048.576 tokens y cuatro niveles de razonamiento.
2. **Cuánto cuesta:** 1,50 dólares por millón de tokens de entrada y 7,50 de salida, con plan gratuito limitado. Es el doble del precio promocional de 3.8 Flash, que sube a ese mismo valor el 1 de enero de 2027.
3. **Qué rompe:** ignora o rechaza `temperature`, `top_p` y `top_k`, no admite caché explícito, rechaza `minimal` y razona en `high` por defecto.
4. **Qué hacer hoy:** busca en tu código el modelo y esos parámetros, pasa el nombre del modelo a una variable de entorno y prueba Hydrogen en un entorno aparte midiendo tokens y calidad.
5. **Cuándo cambiar:** ya, si haces agentes o asistentes de código; con calma, si tu prioridad es el costo, aprovechando el precio de Flash hasta fin de año.
