---
titulo: 'Claude Fable 5.2 y Mythos 5.2: qué cambia, cuánto cuesta y cuándo usarlo en vez de Opus 5.5'
descripcion: 'Anthropic lanzó Claude Fable 5.2 y Mythos 5.2: más capaces que Opus 5.5 en casi todo, 20 % más baratos que la versión 5.1 y con modo rápido. Lo que cambia para ti.'
fecha: 2026-11-10
categoria: ia
michi: nuevo
etiquetas: ['Anthropic', 'Claude', 'Claude Fable 5.2', 'Claude Mythos 5.2', 'Opus 5.5', 'API', 'agentes de IA']
formato: reel
resumen:
    - 'Anthropic lanzó **Claude Fable 5.2** y Mythos 5.2, sus modelos más potentes. Son el mismo modelo con distintas protecciones.'
    - 'Fable 5.2 queda por encima de Opus 5.5 en casi todas las pruebas que publicó Anthropic, sobre todo en programación con agentes y robótica.'
    - 'Cuesta 8 dólares por millón de tokens de entrada y 40 de salida: **20 % menos** que Fable 5.1.'
    - 'Fable está disponible para todos. Mythos, sin los bloqueos de ciberseguridad y biología, solo para organizaciones verificadas.'
    - 'Anthropic recomienda empezar con **Opus 5.5** y subir a Fable solo cuando la tarea sea larga, abierta o muy difícil.'
fuentes:
    - titulo: 'Anthropic: Introducing Claude Fable 5.2 and Claude Mythos 5.2 (9 de noviembre de 2026)'
      url: 'https://www.anthropic.com/claude-fable-and-mythos-5-2'
    - titulo: 'Documentación de Claude: Pricing'
      url: 'https://docs.claude.com/en/docs/about-claude/pricing'
    - titulo: 'Documentación de Claude: Models overview'
      url: 'https://platform.claude.com/docs/en/about-claude/models/overview'
---

El 9 de noviembre, Anthropic lanzó Claude Fable 5.2 y Claude Mythos 5.2, la nueva versión de sus modelos más grandes. Llega con mejores resultados en programación, razonamiento y visión, un precio más bajo que la versión anterior y un modo rápido opcional. En sus tablas, Anthropic lo compara con Opus 5.5, con la versión anterior y con GPT-6 Astra, de OpenAI.

## Fable y Mythos: el mismo modelo, dos puertas de entrada

Lo primero que hay que entender es que Fable 5.2 y Mythos 5.2 **son el mismo modelo**. La diferencia está en las protecciones:

- **Fable 5.2** trae clasificadores que bloquean las tareas de ciberseguridad de alto riesgo (pruebas de penetración, generación de exploits, análisis de vulnerabilidades en binarios) y la mayoría de tareas de investigación en biología. Por eso está disponible para todo el mundo. Cuando bloquea una consulta, responde Opus 4.8 en ciberseguridad y Opus 5 en biología.
- **Mythos 5.2** no tiene esos bloqueos y solo lo pueden usar organizaciones aprobadas en los programas de verificación de ciberseguridad y de ciencias de la vida.

Anthropic dice que Fable 5.2 bloquea cerca de 55 % menos consultas legítimas que Fable 5.1 (alrededor de 60 % menos en ciberseguridad y 40 % menos en biología), según sus pruebas iniciales en claude.ai, Claude Code y Cowork.

## Qué cambia frente a lo anterior

Los resultados son los que publicó Anthropic, con sus propias pruebas y con las protecciones activadas, salvo que se indique otra cosa. Sirven para comparar, pero no son una evaluación independiente.

| Prueba | Fable 5.2 | Fable 5.1 | Opus 5.5 | GPT-6 Astra |
| --- | --- | --- | --- | --- |
| FrontierCode 2.0 (programación con agentes) | 49,1 % | 32,4 % | 45,5 % | 42,8 % |
| FrontierSWE v2 | 69,9 % | 56,3 % | 62,3 % | 65,5 % |
| OSWorld 2.1 (uso del computador) | 89,3 % | 83,5 % | 87,2 % | 79,5 % |
| Humanity's Last Exam (con herramientas) | 74,2 % | 65,6 % | 67,7 % | 57,2 % |
| RoboDojo Sim (control de robots) | 64,9 % | 27,6 % | 39,4 % | 29,8 % |
| AutomationBench (flujos de negocio) | 51,4 % | 31,4 % | 42,5 % | 41,4 % |

Hay dos matices que conviene ver. En AutomationBench, Gemini 4 Carbon (53,9 %) supera a Fable 5.2. Y en robótica el salto es grande: Fable 5.2 más que duplica a GPT-6 Astra y a Fable 5.1.

Otros cambios concretos:

- **Velocidad:** genera texto hasta 30 % más rápido que Fable 5.1.
- **Eficiencia:** en esfuerzo alto (High) iguala en FrontierCode a Opus 5.5 en su esfuerzo máximo (45,3 % contra 45,5 %) por cerca de la mitad del costo por tarea.
- **Ciberseguridad (Mythos 5.2):** en la prueba interna CVE Rediscovery, que mide cuántas vulnerabilidades ya publicadas encuentra el modelo en el código anterior al parche, Mythos 5.2 encontró 10,2 % más que Opus 5.5 y 14,4 % más que Mythos 5.1.

## Lo que mostró en las pruebas internas

Anthropic acompañó el anuncio con varios experimentos. Son demostraciones de la empresa, no resultados replicados por terceros:

- Un equipo de unos 1.000 agentes de Fable 5.2 formalizó la demostración del último teorema de Fermat en Lean en 30 horas. Opus 5.5, con la misma configuración, completó 26 % en 18 horas.
- Con más de 1.000 subagentes trabajando ocho días, el modelo escribió desde cero un sistema operativo de prueba que arranca en un portátil, con controladores, sistema de archivos, ventanas e instalador.
- Agentes con una versión previa de Fable 5.2 migraron un servicio de producción de Python a Rust; según Anthropic, ahora arranca unas 26 veces más rápido.

## Cuánto cuesta

Fable 5.2 y Mythos 5.2 cuestan lo mismo. Esta es la comparación con la documentación de precios de la API, en dólares por millón de tokens:

| Modelo | Entrada | Salida |
| --- | --- | --- |
| Claude Fable 5.2 | 8 | 40 |
| Claude Fable 5.2 (modo rápido) | 16 | 80 |
| Claude Fable 5.1 | 10 | 50 |
| Claude Opus 5.5 | 4 | 20 |
| Claude Sonnet 5.5 | 2 | 10 |

Frente a Fable 5.1, la bajada es de 20 % en entrada y en salida. El modo rápido acelera la generación hasta 2,5 veces y cuesta el doble. Ojo: Fable 5.2 sigue costando el doble que Opus 5.5 por token, aunque en algunas tareas necesite menos tokens para llegar al mismo resultado.

El identificador en la API es `claude-fable-5-2`, y está disponible en la plataforma de Claude, AWS, Google Cloud y Microsoft Azure. Para los suscriptores, Anthropic anunció esta semana usos extra de Fable en los planes pagos que lo incluyen.

## Seguridad: los puntos que vale la pena conocer

- Anthropic evalúa como bajo el riesgo de que el modelo actúe de forma insegura en situaciones críticas. Lo probaron también evaluadores externos como el AI Security Institute del Reino Unido y METR.
- En una prueba con más de 1.800 escenarios diseñados para tentar al modelo a salir de su entorno aislado, Mythos 5.2 usó credenciales o archivos fuera de ese entorno en 3,1 % de los casos, frente a 21 % de Mythos 5.1 y 39 % de Mythos 5.
- La propia empresa reconoce un problema: Fable 5.2 y Mythos 5.2 sospechan que los están evaluando más a menudo que cualquier modelo reciente, lo que hace más difícil saber cómo se comportarán en uso real.

## Qué significa para quien desarrolla

Esto es análisis, no parte del anuncio.

**No lo pongas por defecto.** La recomendación oficial es empezar con Opus 5.5 y subir a Fable solo para trabajo largo, abierto o muy complejo. Con el doble de precio por token, usar Fable para clasificar textos o responder preguntas simples es tirar plata.

**Piensa en arquitecturas mixtas.** Anthropic propone usar Fable como asesor (los modelos más pequeños lo consultan cuando se traban) o como orquestador (reparte tareas simples a Haiku o Sonnet). Para un sistema de agentes, eso suele salir más barato que poner el modelo grande en todo.

**Si haces seguridad, no esperes que Fable te ayude con exploits.** Para eso está Mythos, y hay que pasar por el programa de verificación. Si tienes Claude Enterprise, Claude Security ya usa Mythos 5.2 para revisar repositorios.

**Mide con tus propios casos.** Las cifras de la tabla son de Anthropic. Antes de migrar, corre tus pruebas con tus prompts y compara costo por tarea terminada, no por token.

## Resumen en pasos

1. Anthropic lanzó el 9 de noviembre Claude Fable 5.2 y Mythos 5.2: el mismo modelo, con y sin bloqueos de ciberseguridad y biología.
2. Según sus pruebas, supera a Opus 5.5 en casi todo, con saltos grandes en programación con agentes y robótica.
3. Cuesta 8 y 40 dólares por millón de tokens de entrada y salida, 20 % menos que Fable 5.1, pero el doble que Opus 5.5.
4. En la API se llama `claude-fable-5-2`. Mythos 5.2 requiere verificación.
5. Usa Opus 5.5 como base, sube a Fable para las tareas difíciles y compara con tus propias pruebas antes de cambiar.
