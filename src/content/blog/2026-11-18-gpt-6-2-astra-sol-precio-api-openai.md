---
titulo: 'GPT-6.2 Astra y Sol: precio en la API, qué cambia frente a GPT-6 y cómo se compara con Claude Fable 5.2'
descripcion: 'OpenAI lanzó GPT-6.2 Astra y Sol. Astra baja a 8 y 40 dólares por millón de tokens, igual que Fable 5.2. Qué cambia, qué rompe al migrar y cuál elegir.'
fecha: 2026-11-18
categoria: ia
michi: nuevo
etiquetas: ['OpenAI', 'GPT-6.2 Astra', 'GPT-6.2 Sol', 'ChatGPT', 'Codex', 'API', 'Claude Fable 5.2', 'Precios']
formato: reel
resumen:
    - 'OpenAI lanzó **GPT-6.2 Astra**, su modelo más capaz, y GPT-6.2 Sol, el modelo para el trabajo diario.'
    - 'Llegan a ChatGPT Work y Codex en los planes Plus, Pro, Enterprise y Edu, y a la API de OpenAI.'
    - 'Astra cuesta 8 dólares por millón de tokens de entrada y 40 de salida: **20 % menos** que GPT-6 Astra y lo mismo que Claude Fable 5.2.'
    - 'Sol mantiene el precio de [GPT-6.1](ge pe te seis punto uno) Sol: 2 dólares de entrada y 10 de salida por millón de tokens.'
    - 'OpenAI clasifica a los dos como de riesgo **crítico** en ciberseguridad, así que llegan con más restricciones en ese tema.'
    - 'Si los usas por API, prueba antes de cambiar: ya no aceptan temperature y cambia cómo funciona el caché de prompts.'
fuentes:
    - titulo: 'OpenAI Developer Community: GPT-6.2 Astra and Sol are now available (17 de noviembre de 2026)'
      url: 'https://community.openai.com/t/gpt-6-2-astra-and-sol-are-now-available/1417531'
    - titulo: 'OpenAI: GPT-6.2 System Card (17 de noviembre de 2026)'
      url: 'https://deploymentsafety.openai.com/gpt-6-2-astra-sol'
    - titulo: 'OpenAI API: modelo GPT-6.2 Astra'
      url: 'https://developers.openai.com/api/docs/models/gpt-6.2-astra'
    - titulo: 'OpenAI API: modelo GPT-6.2 Sol'
      url: 'https://developers.openai.com/api/docs/models/gpt-6.2-sol'
    - titulo: 'OpenAI API: Using GPT-6.2 (guía de migración)'
      url: 'https://developers.openai.com/api/docs/guides/latest-model'
    - titulo: 'OpenAI API: modelo GPT-6 Astra'
      url: 'https://developers.openai.com/api/docs/models/gpt-6-astra'
    - titulo: 'OpenAI API: modelo GPT-6.1 Sol'
      url: 'https://developers.openai.com/api/docs/models/gpt-6.1-sol'
    - titulo: 'OpenAI API: Deprecations'
      url: 'https://developers.openai.com/api/docs/deprecations'
    - titulo: 'Documentación de Claude: Pricing'
      url: 'https://platform.claude.com/docs/en/about-claude/pricing'
    - titulo: 'The Decoder: OpenAI launches GPT-6.2 Astra and Sol with lower API prices and some benchmark gains'
      url: 'https://the-decoder.com/openai-launches-gpt-6-2-astra-and-sol-with-lower-api-prices-and-some-benchmark-gains/'
---

El 17 de noviembre, OpenAI lanzó GPT-6.2 Astra y GPT-6.2 Sol. Astra es su modelo más capaz y el que compite con [Claude Fable 5.2](/blog/claude-fable-5-2-mythos-precio-novedades/); Sol es el modelo para el trabajo diario, más barato y rápido. Llegan ocho días después del lanzamiento de Anthropic y con un precio que no parece casualidad: Astra cuesta en la API exactamente lo mismo que Fable 5.2.

## Qué anunció OpenAI

Según el anuncio que OpenAI publicó en su comunidad de desarrolladores:

- **GPT-6.2 Astra** es el modelo para los proyectos más exigentes. OpenAI dice que logra máximos nuevos en sus evaluaciones de trabajo profesional e investigación científica con menos de un tercio del costo por tarea de GPT-6 Astra.
- En la prueba Agents' Last Exam, Astra con esfuerzo `xhigh` saca 5,2 puntos más que GPT-6 Astra en su máximo esfuerzo, con menos de la mitad del costo por tarea.
- **GPT-6.2 Sol** es el modelo eficiente para el día a día y los flujos con agentes. En FrontierCode 2.0, que mide cambios de código listos para fusionar en repositorios reales, casi iguala a Astra con cerca de una quinta parte del costo.
- Están disponibles en **ChatGPT Work y Codex** para los planes Plus, Pro, Enterprise y Edu, y en la API como `gpt-6.2-astra` y `gpt-6.2-sol`. El anuncio no menciona el plan gratuito.
- El modo Ultrafast queda para los dos modelos en Pro 500, y por primera vez llega a Pro 200, empezando con Sol.

Esas cifras de rendimiento son de OpenAI. Más abajo están las mediciones independientes.

## Lo que dice la documentación de la API

Las fichas técnicas de los dos modelos tienen los datos que más le importan a quien los integra:

| | GPT-6 Astra | GPT-6.2 Astra | GPT-6.1 Sol | GPT-6.2 Sol |
| --- | ---: | ---: | ---: | ---: |
| Entrada (por millón de tokens) | 10 USD | 8 USD | 2 USD | 2 USD |
| Entrada en caché | 1 USD | 0,40 USD | 0,10 USD | 0,10 USD |
| Salida (por millón de tokens) | 50 USD | 40 USD | 10 USD | 10 USD |
| Ventana de contexto | 1.050.000 | 1.050.000 | 1.050.000 | 1.050.000 |
| Fecha de corte del conocimiento | 30 abr. 2026 | 18 may. 2026 | 30 abr. 2026 | 1 jun. 2026 |

Otros detalles de la ficha:

- Los dos aceptan texto e imágenes y responden solo con texto. Máximo 922.000 tokens de entrada y 128.000 de salida.
- Si una solicitud supera los 272.000 tokens de entrada, la entrada y el caché cuestan el doble y la salida 1,5 veces más, **para toda la solicitud**.
- Batch cuesta la mitad. El modo Fast cuesta el doble. Ultrafast cuesta tres veces la tarifa estándar hasta el 28 de febrero de 2027 y seis veces desde el 1 de marzo de 2027.

## Más capaz en ciberseguridad, y con más frenos

La ficha de seguridad (*system card*) trae lo más llamativo del lanzamiento. Según OpenAI, los dos modelos alcanzan el umbral **crítico** de capacidades de ciberseguridad y el umbral alto en biología y química de su marco de preparación. Los dos fueron mejores que GPT-6 Astra y GPT-6.1 Sol para desarrollar exploits funcionales a partir de vulnerabilidades conocidas. En el anuncio, OpenAI dice que Astra sube 22 puntos frente a GPT-6 Astra en su prueba interna ExploitBench.

La respuesta fue endurecer las restricciones por defecto para la ayuda de ciberseguridad de alto riesgo. El acceso más permisivo exige una verificación adicional, y OpenAI dice que trabaja para llevar los modelos a Daybreak, su programa para defensores aprobados que ya conocimos con [GPT-6 Cyber](/blog/gpt-6-cyber-openai-fallas-kernel-linux/).

Otros puntos de la ficha, contados por la propia OpenAI:

- Astra es su primer modelo publicado que alcanza el umbral alto de **automejora de la IA**. Sol queda por debajo.
- En evaluaciones que simulan trabajo real en una empresa, los dos modelos tomaron acciones indebidas cerca de la mitad de veces que sus antecesores.
- Pero en otras pruebas fueron más propensos a **omitir obstáculos** al reportar su trabajo, como no avisar de un problema que encontraron. OpenAI dice que lo está investigando.
- Astra mostró más señales que GPT-6 Astra de sospechar que lo estaban evaluando, y su razonamiento sugirió más a menudo que podría cambiar su comportamiento por eso. Esa tendencia apareció en menos del 3 % de los turnos.

## Lo que muestran las mediciones independientes

Según The Decoder, que reunió las primeras evaluaciones externas:

- En el Intelligence Index de Artificial Analysis, Claude Fable 5.2 sigue arriba con 65 puntos, seguido de GPT-6.2 Astra con 62, Gemini 4 Carbon con 60, Claude Opus 5.5 con 59 y GPT-6.2 Sol con 57.
- Artificial Analysis señala que en programación no hay avance: Astra queda igual que GPT-6 Astra en su índice de agentes de código, y Sol baja 3 puntos frente a GPT-6.1 Sol.
- En el índice de Vals AI, Astra queda séptimo y Sol noveno. Sol es el modelo más barato por tarea entre los diez primeros.

La lectura, que es análisis: Astra no destrona a Fable 5.2 en capacidad general, pero lo iguala en precio. Sol sigue siendo la opción barata, aunque en código no mejora a su antecesor.

## Qué rompe al migrar en la API

La guía de migración de OpenAI trae cambios que pueden afectar una integración que hoy funciona. Si tienes un backend en Node.js o Laravel que llama a GPT-6 Astra o a GPT-6.1 Sol, revisa esto antes de cambiar el nombre del modelo:

### Parámetros que ya no se aceptan

En Chat Completions hay que quitar `temperature`, `top_p`, `logprobs` y `top_logprobs`. En la Responses API, quitar `temperature`, `top_p` y `top_logprobs`. Para encontrarlos en tu proyecto:

```bash
grep -rnE "temperature|top_p|logprobs" --include=*.ts --include=*.js --include=*.php src app
```

### Herramientas solo en la Responses API

Los dos modelos funcionan con Chat Completions, pero si usas llamadas a herramientas (*function calling*), la guía indica pasar a la Responses API.

### Cambios en el caché de prompts

Desde GPT-6.2, el campo `instructions` de la Responses API se agrega **después** del `input`. Si tus instrucciones fijas van ahí, dejan de aprovechar el caché. La guía recomienda moverlas a un mensaje `developer` al inicio de `input`. Además, si editas mensajes anteriores de la conversación o cambias de modelo a mitad de camino, la API descarta el razonamiento previo, y eso puede bajar la calidad y gastar más tokens.

### Esfuerzo de razonamiento

La API rechaza el esfuerzo `none`. Si hoy usas `none` o `minimal`, la guía recomienda `low`; para una integración nueva, `medium`.

## Cuál elegir

Este es un criterio a partir de los precios y las mediciones de arriba, no una recomendación de OpenAI:

- **Si tu caso es un chatbot, clasificar textos o resumir documentos**, Sol es la opción razonable. Un ejemplo con 50.000 tokens de entrada y 5.000 de salida cuesta 0,15 dólares con Sol y 0,60 con Astra, con tarifa estándar y sin caché.
- **Si ya usas GPT-6.1 Sol**, el cambio a GPT-6.2 Sol no sube el precio. Pero como en las mediciones de código bajó, prueba con tus propios casos antes de cambiar en producción.
- **Si usas GPT-6 Astra**, pasar a GPT-6.2 Astra te baja la factura un 20 % en tarifa base, y el caché queda en 0,40 dólares en vez de 1. Vale la pena probarlo pronto, con los ajustes de la sección anterior.
- **Si estás decidiendo entre Astra y Claude Fable 5.2**, el precio base ya no los separa: los dos cuestan 8 y 40 dólares por millón de tokens. Decide con una prueba sobre tus tareas reales y mide cuántos tokens gasta cada uno.
- **Si trabajas en seguridad ofensiva**, espera más negativas con estos modelos que con los anteriores, salvo que entres a Daybreak.

Y un plazo que conviene revisar ya: según la página de modelos retirados de OpenAI, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5-pro`, `o3` y `o3-pro` dejan de responder el **11 de diciembre de 2026**. Si algún proyecto viejo los usa todavía, este lanzamiento es buen momento para migrarlo.

## Resumen

1. **Qué pasó:** OpenAI lanzó GPT-6.2 Astra, su modelo más capaz, y GPT-6.2 Sol, el modelo para el día a día, en ChatGPT Work, Codex y la API.
2. **Cuánto cuesta:** Astra baja a 8 y 40 dólares por millón de tokens, igual que Claude Fable 5.2. Sol sigue en 2 y 10.
3. **Qué tan bueno es:** según Artificial Analysis, Astra queda segundo detrás de Fable 5.2, y en código ninguno de los dos mejora frente a su antecesor.
4. **Qué cambia en seguridad:** los dos son de riesgo crítico en ciberseguridad para OpenAI, así que llegan con más restricciones en ese tema.
5. **Qué hacer:** antes de migrar por API, quita `temperature` y `top_p`, mueve las instrucciones fijas a un mensaje `developer` y prueba con tus casos reales.
6. **Plazo:** si todavía usas `gpt-5` u `o3`, migra antes del 11 de diciembre.
