---
titulo: 'Qwen4-Max: el nuevo modelo de Alibaba, cuánto cuesta en la API y cómo se compara con Claude y Gemini'
descripcion: 'Alibaba lanzó Qwen4-Max: 1M de tokens de contexto, 1,50 y 4,50 dólares por millón de tokens y API compatible con OpenAI y Anthropic. Qué cambia y qué revisar.'
fecha: 2026-11-16
categoria: ia
michi: mundo
etiquetas: ['Alibaba', 'Qwen', 'Qwen4-Max', 'China', 'Modelos de IA', 'Precios']
formato: carrusel
resumen:
    - 'Alibaba lanzó **Qwen4-Max**, su modelo más potente: 2,4 billones de parámetros, visión nativa y un millón de tokens de contexto.'
    - 'En la región de Singapur cuesta 1,50 dólares por millón de tokens de entrada y 4,50 de salida, 25 % menos que Qwen3.8-Max.'
    - 'Se usa con los SDK de OpenAI y de Anthropic: cambiar de proveedor es casi cambiar la URL y el nombre del modelo.'
    - 'Ojo con la región: en el alcance **Global** la inferencia puede correr en China continental. Singapur la corre fuera.'
    - 'Antes de cambiar, prueba con tus prompts: los benchmarks del anuncio son de Alibaba y Max no tiene pesos abiertos.'
fuentes:
    - titulo: 'Qwen: Qwen4-Max: Your New Teammate Has Arrived (16 de noviembre de 2026)'
      url: 'https://qwen.ai/blog?id=qwen4-max'
    - titulo: 'Alibaba Cloud: Alibaba Unveils Qwen4-Max (comunicado)'
      url: 'https://www.alibabacloud.com/blog/qwen4-max-new-ai-teammate-for-work-creativity-and-discovery_603783'
    - titulo: 'QwenCloud: ficha y precios de qwen4-max'
      url: 'https://www.qwencloud.com/models/qwen4-max'
    - titulo: 'QwenCloud Docs: Latest model: Qwen4-Max'
      url: 'https://docs.qwencloud.com/developer-guides/getting-started/latest-model'
    - titulo: 'QwenCloud Docs: Regions, deployment scopes, and endpoints'
      url: 'https://docs.qwencloud.com/developer-guides/getting-started/regions'
    - titulo: 'QwenCloud Docs: Free quota'
      url: 'https://docs.qwencloud.com/resources/free-quota'
    - titulo: 'QwenCloud Docs: Anthropic Messages API'
      url: 'https://docs.qwencloud.com/api-reference/chat/anthropic'
    - titulo: 'Claude: precios de la API'
      url: 'https://platform.claude.com/docs/en/about-claude/pricing'
    - titulo: 'Gemini API: precios'
      url: 'https://aistudio.google.com/docs/pricing'
---

El 16 de noviembre Alibaba lanzó **Qwen4-Max**, el primer modelo de la familia Qwen4 y, según la empresa, el más capaz que ha hecho. Llega a la API de QwenCloud con un precio más bajo que su antecesor, Qwen3.8-Max, y con compatibilidad con los SDK de OpenAI y de Anthropic.

Llega una semana después de [Claude Fable 5.2](/blog/claude-fable-5-2-mythos-precio-novedades/) y [Gemini 4 Hydrogen](/blog/gemini-4-hydrogen-precio-api-migrar-flash/), pero viene de China, y eso agrega una pregunta que con los otros dos no aparece: dónde se procesan tus datos.

## Qué anunció Alibaba

Según el anuncio del equipo de Qwen y la documentación de QwenCloud:

- **Tamaño:** es un modelo de mezcla de expertos (MoE) con 2,4 billones de parámetros en total, de los que activa 71.000 millones por token. Son 25 % menos parámetros activos que Qwen3.8-Max, que tiene el mismo tamaño total.
- **Contexto:** un millón de tokens. La salida máxima es de 131.072 tokens sin razonamiento y de 262.144 sumando razonamiento y respuesta.
- **Entrada y salida:** entra texto, imagen y video; sale texto. También entiende PDF.
- **Razonamiento:** viene activado por defecto en el nivel `high`. Se puede bajar a `low`, subir a `xhigh` o apagar con `enable_thinking=false`.
- **Identificador en la API:** `qwen4-max`.
- **Dónde está:** en la API de QwenCloud, en el plan de créditos Token Plan y en los productos de Alibaba QwenWork, QwenStudio y Qoder.
- **Pesos abiertos:** Max no los tiene. Alibaba dice que los modelos pequeños de la familia Qwen4 saldrán como código abierto, pero no dio fecha.
- **Lo que no soporta:** procesamiento por lotes (*batch*), ajuste fino (*fine-tuning*) ni despliegue propio.

### Lo que dice Alibaba de su rendimiento

Estas cifras son de Alibaba y varias salen de pruebas propias, así que tómalas como lo que la empresa afirma, no como una medición independiente:

- En **Work360**, un benchmark que creó Alibaba con tareas de 721 especialidades, Qwen4-Max saca 52,69 puntos contra 47,74 de Qwen3.8-Max.
- En esa misma prueba, el costo promedio por tarea baja de 4,43 a 1,67 dólares (62 % menos) y usa entre 24 % y 35 % menos tokens, según el nivel de razonamiento.
- Alibaba dice que quedó sexto en Code Arena, una clasificación de programación con tareas reales.
- En seguridad, dice que filtró los datos de entrenamiento para quitar material de ataque y dejar el de defensa, y que en una prueba de código seguro la tasa de funciones correctas y sin vulnerabilidades subió de 22 % a 31,8 %.

## Cuánto cuesta

QwenCloud cobra distinto según la región. Estos son los precios de la región de Singapur, en dólares por millón de tokens, sacados de la ficha del modelo y de la tabla de precios el 16 de noviembre:

| Concepto | Qwen4-Max | Qwen3.8-Max |
| --- | --- | --- |
| Entrada | 1,50 | 2 |
| Salida (razonamiento + respuesta) | 4,50 | 6 |
| Entrada en caché implícita | 0,075 | 0,25 |
| Lectura de caché explícita | 0,075 | 0,17 |
| Escritura de caché explícita (5 minutos) | 1,875 | 2,50 |

La bajada es de 25 % en entrada y salida, y de 70 % en la caché implícita. Eso importa si tu aplicación repite en cada petición un prompt de sistema largo, definiciones de herramientas o documentos de referencia.

En Singapur hay una cuota gratuita de un millón de tokens para este modelo, que por lo general vence a los 90 días: si ya tenías cuenta, se cuentan desde el lanzamiento del modelo; si eres nuevo, desde que activas la cuenta. Solo aplica a llamadas en tiempo real hechas con una clave de Singapur, y hay que registrar un medio de pago para activarla.

## Comparación con Claude y Gemini

Con los precios estándar publicados por cada empresa, en dólares por millón de tokens:

| Modelo | Entrada | Salida |
| --- | --- | --- |
| Qwen4-Max (Singapur) | 1,50 | 4,50 |
| Gemini 4 Hydrogen | 1,50 | 7,50 |
| Gemini 4 Carbon (desde el 1 de diciembre) | 4 | 20 |
| Claude Sonnet 5.5 | 2 | 10 |
| Claude Opus 5.5 | 4 | 20 |

Un ejemplo con números redondos: 1.000 peticiones al día de 5.000 tokens de entrada y 1.000 de salida suman 5 millones de entrada y 1 millón de salida diarios. Con Qwen4-Max serían 7,50 + 4,50 = 12 dólares al día; con Gemini 4 Hydrogen, 15; con Claude Opus 5.5, 40. Es una cuenta ilustrativa: en la práctica cambia según cuántos tokens de razonamiento gaste cada modelo para la misma tarea, y eso solo lo sabes probando.

Lo que la tabla no dice: Hydrogen es el modelo rápido de Google y Qwen4-Max es el grande de Alibaba. Que el grande de uno cueste menos que el rápido de otro llama la atención, pero no garantiza la misma calidad en tus tareas.

## Dónde se procesan tus datos: la región importa

Este es el punto que el anuncio no menciona y que más debería revisar quien trabaja con datos de clientes.

En QwenCloud cada región tiene su propia URL, sus propias claves y su lista de modelos. Además, existe el **alcance de despliegue**, que decide dónde corre la inferencia. Según la documentación:

| Región | Alcance | Dónde corre la inferencia |
| --- | --- | --- |
| Singapur | Internacional | Nodos fuera de China continental |
| Pekín | China continental | China continental |
| Fráncfort, Hong Kong, Tokio, Virginia (EE. UU.) | Global | Cualquier nodo disponible, incluida China continental |
| Fráncfort, Hong Kong, Tokio, Virginia (EE. UU.) | Local (UE, Hong Kong, Japón o EE. UU.) | Solo ese territorio |

El detalle está en que el espacio de trabajo por defecto en Fráncfort, Hong Kong, Tokio y Virginia usa el alcance **Global**, y el alcance no se puede cambiar después de crear el espacio de trabajo. Es decir: elegir la URL de Virginia no basta para que tus datos se queden en Estados Unidos. Además, la documentación dice que Qwen4-Max está en Singapur, Pekín y en el alcance Global de las otras cuatro regiones; no lo lista en los alcances locales.

### Cómo comprobarlo en tu proyecto

Esto es análisis a partir de la documentación oficial.

1. **Mira la URL base** que usa tu código. Si empieza por `ap-southeast-1.maas.qwencloudapi.com`, estás en Singapur; la inferencia corre fuera de China continental y aplica la cuota gratuita.
2. **Si usas otra región**, entra a la consola, revisa el alcance del espacio de trabajo al que pertenece tu clave y confirma que coincide con lo que le prometiste a tu cliente.
3. **Si tu aplicación maneja datos personales** de usuarios en Colombia, la Ley 1581 tiene reglas para transferir datos fuera del país. Cambiar de proveedor de IA es un cambio de a dónde van esos datos, así que vale la pena revisarlo con quien te asesore en protección de datos antes de pasar a producción, no después.

## Qué cambia para quien desarrolla

La compatibilidad es lo práctico. QwenCloud acepta las API de Chat Completions y Responses de OpenAI, la API Messages de Anthropic y su propia API, DashScope. Si tu proyecto Node.js ya usa el SDK de OpenAI, probar Qwen4-Max es cambiar la URL base, la clave y el modelo:

```ts
import OpenAI from 'openai';

// Región Singapur. Para otra región, cambia ap-southeast-1 en la URL.
const client = new OpenAI({
    apiKey: process.env.DASHSCOPE_API_KEY,
    baseURL: 'https://ap-southeast-1.maas.qwencloudapi.com/compatible-mode/v1',
});

const respuesta = await client.chat.completions.create({
    model: 'qwen4-max',
    messages: [{ role: 'user', content: 'Resume este contrato en cinco puntos.' }],
});

console.log(respuesta.choices[0].message.content);
```

Si usas el SDK de Anthropic, la URL base es `https://ap-southeast-1.maas.qwencloudapi.com/apps/anthropic`. La documentación avisa que ese endpoint solo ofrece `/v1/messages` y no lista modelos, así que el nombre del modelo va escrito a mano.

### Criterio para decidir

Esto es análisis, no una recomendación de la empresa.

- **Si tu costo está en tokens de entrada repetidos** (prompts de sistema largos, RAG con los mismos documentos), el precio de caché de Qwen4-Max es de lo más bajo de la tabla y vale la pena medirlo.
- **Si necesitas procesar por lotes o afinar el modelo**, hoy no se puede con Qwen4-Max.
- **Si un cliente te exige que los datos no salgan de cierto territorio**, usa Singapur o descártalo hasta revisar el alcance; no asumas que la región de la URL lo resuelve.
- **Si quieres correrlo en tu propio servidor**, Max no sirve: no tiene pesos abiertos. Toca esperar los modelos pequeños de Qwen4, que no tienen fecha.
- **En todos los casos**, compara con tus propios prompts. Los benchmarks del anuncio los eligió Alibaba, como Google y Anthropic eligen los suyos.

## Resumen

1. **Qué salió:** Qwen4-Max, el modelo más grande de Alibaba, con un millón de tokens de contexto, visión nativa y razonamiento ajustable. Identificador: `qwen4-max`.
2. **Cuánto cuesta:** en Singapur, 1,50 dólares por millón de tokens de entrada y 4,50 de salida, 25 % menos que Qwen3.8-Max, con lectura de caché a 0,075.
3. **Cómo se usa:** con los SDK de OpenAI o de Anthropic, cambiando URL, clave y modelo.
4. **Qué revisar:** la región y el alcance de despliegue. En el alcance Global la inferencia puede correr en China continental.
5. **Qué falta:** pesos abiertos, procesamiento por lotes y ajuste fino. Antes de cambiar, prueba con tus casos reales.
