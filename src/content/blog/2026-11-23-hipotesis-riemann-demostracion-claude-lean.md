---
titulo: 'Hipótesis de Riemann: un matemático de Anthropic la demuestra con Claude y Lean la verifica'
descripcion: 'Levent Alpöge publicó con Claude una prueba de la hipótesis de Riemann en Lean, y la comunidad de Lean la certificó. Qué se sabe, qué falta y qué enseña.'
fecha: 2026-11-23
categoria: ia
michi: nuevo
etiquetas: ['Anthropic', 'Claude', 'hipótesis de Riemann', 'Lean', 'Mathlib', 'matemáticas', 'verificación formal']
formato: reel
resumen:
    - 'El matemático Levent Alpöge, de Anthropic, publicó una prueba de la **hipótesis de Riemann** hecha junto con Claude.'
    - 'La prueba está escrita en [Lean](lin), un lenguaje que revisa cada paso. Ocupa unos **17 millones de líneas**.'
    - 'La comunidad de Lean la revisó con varios verificadores independientes y certificó que el enunciado y la prueba son correctos.'
    - 'Falta una versión que un humano pueda leer. Entender las ideas nuevas tomará tiempo, y el premio Clay exige publicar y esperar dos años.'
    - 'La lección para quien programa: con IA, **verificar** vale más que generar. Revisa que lo que se comprueba sea lo que de verdad querías.'
fuentes:
    - titulo: 'Levent Alpöge: nota de anuncio de la prueba (20 de noviembre de 2026, PDF)'
      url: 'https://alpo.ge/remark.pdf'
    - titulo: 'Lean FRO y Mathlib Initiative: Lean verification of the Riemann Hypothesis (21 de noviembre de 2026)'
      url: 'https://leanprover-community.github.io/blog/posts/riemann-hypothesis/'
    - titulo: 'Andrew Sutherland (MIT): resumen de la verificación de la prueba'
      url: 'https://math.mit.edu/~drew/grh/'
    - titulo: 'Xena Project: And the proof is checked in Lean (12 de noviembre de 2026)'
      url: 'https://xenaproject.wordpress.com/2026/11/12/and-the-proof-is-checked-in-lean/'
    - titulo: 'Scientific American: Anthropic mathematician claims to prove Riemann hypothesis'
      url: 'https://www.scientificamerican.com/article/anthropic-mathematician-claims-to-prove-riemann-hypothesis-most-famous-problem-in-all-of-math/'
    - titulo: 'Anthropic: Claude y la función zeta de Riemann (10 de agosto de 2026)'
      url: 'https://www.anthropic.com/research/riemann-zeta'
    - titulo: 'Clay Mathematics Institute: reglas de los Problemas del Milenio'
      url: 'https://www.claymath.org/millennium-problems/rules/'
---

El 20 de noviembre, Levent Alpöge, matemático que trabaja en Anthropic, publicó en su sitio personal una nota de cuatro páginas con una frase que hace un año habría sonado a ciencia ficción: cree haber descubierto, «trabajando con Claude», una prueba de la hipótesis de Riemann. Un día después, los equipos que mantienen Lean y su biblioteca matemática, Mathlib, emitieron un comunicado conjunto en el que certifican que el enunciado y la prueba son correctos.

La hipótesis de Riemann, planteada por Bernhard Riemann en 1859, es probablemente el problema abierto más famoso de las matemáticas. Tiene que ver con cómo se distribuyen los números primos, y es uno de los siete Problemas del Milenio del Instituto Clay.

## Qué se anunció

En la nota, Alpöge cuenta que el método se extiende a la llamada hipótesis de Riemann generalizada y que espera, con más tiempo, llegar a una versión todavía más amplia. Dice que él guio el planteamiento a partir de una idea en un caso de juguete y que, cerca del final, Claude lo «dejó asombrado». La nota no dice qué modelo de Claude se usó.

Lo más llamativo es cómo presentó la prueba. En vez de un artículo, publicó solo el código en Lean, repartido en 14 archivos comprimidos. Explica que el argumento es tan largo que un documento escrito con todo el detalle sería ilegible (cuenta que una versión generada superó las 250.000 páginas) y que no quería publicar algo así. Promete escribir una versión entendible más adelante.

La nota incluye una cronología que, según aclara, preparó Claude y que él todavía podría corregir: las primeras ideas son del 6 de octubre de 2026 y el resultado completo, del 16 de noviembre. Unas seis semanas.

Alpöge también se refiere al momento del anuncio, justo después de la salida a bolsa de Anthropic (la contamos en [esta entrada](/blog/anthropic-debut-bolsa-precio-83-dolares-nasdaq/)). Escribe que existe una lectura cínica sobre esa coincidencia y que es falsa.

## Qué es Lean y por qué importa aquí

Lean es un lenguaje de programación y asistente de pruebas: cada paso de una demostración se escribe como código y un núcleo pequeño (el *kernel*) comprueba que cada paso se sigue de los anteriores. Si compila y el verificador lo acepta, la prueba es válida dentro de ese sistema lógico.

Pero compilar no basta. El 12 de noviembre, una semana antes del anuncio, el blog Xena Project publicó cuatro preguntas que hay que responder antes de decir que algo «está probado en Lean»:

1. ¿El enunciado en Lean dice lo mismo que el enunciado matemático?
2. ¿El código compila?
3. ¿El código prueba exactamente ese enunciado, sin trucos escondidos en los archivos que importa?
4. ¿La prueba se aprovecha de algún error en el núcleo de Lean?

El comunicado de Lean y Mathlib dice que las cuatro se cumplen:

- El enunciado es el que ya existía en Mathlib, revisado por expertos en Lean y en teoría de números.
- Decenas de personas compilaron la biblioteca y obtuvieron el mismo archivo exportado de la prueba.
- Dos herramientas independientes compararon el teorema de Alpöge con el enunciado de Mathlib y confirmaron que es exactamente el mismo.
- Varios verificadores, entre ellos el núcleo oficial de Lean y otros escritos en distintos lenguajes, aceptaron la prueba. Las revisiones se hicieron sobre una exportación inerte, fuera del alcance de cualquier código malicioso en las fuentes.

## Las cifras de la verificación

Andrew Sutherland, del MIT, compiló y revisó la prueba por su cuenta y publicó los detalles. Estos son algunos, según su página (actualizada el 22 de noviembre):

| Dato | Valor |
| --- | --- |
| Tamaño de la biblioteca | Unos 17 millones de líneas (según Lean y Mathlib) |
| Módulos compilados | 175.187, sin errores |
| Versión de Lean y Mathlib | v4.33.1 |
| Exportación de la prueba | 7,7 GB comprimida, unos 61,6 GB descomprimida |
| Axiomas usados | Solo los tres estándar de Lean |
| Memoria recomendada para la revisión completa | Unos 100 GB de RAM |

Sutherland aclara varios límites. La parte «generalizada» que se comprobó cubre las funciones L de Dirichlet, no todas las familias en las que piensan los matemáticos. Algunas revisiones con el núcleo de Lean sobre la exportación completa seguían en curso cuando actualizó la página. Y, como toda prueba formal, el resultado depende de que las definiciones de Mathlib y los verificadores sean correctos. Un detalle curioso: Sutherland indica que hizo las comprobaciones usando Claude Code.

## Lo que no se sabe todavía

- **No hay una prueba legible por humanos.** Sutherland le dijo a Scientific American que entender los detalles «va a tomar algo de tiempo». Héctor Pastén, de la Pontificia Universidad Católica de Chile, comparó lo que podría significar con una «piedra de Rosetta» entre ramas de las matemáticas, si la prueba se confirma y se entiende.
- **No hay premio todavía.** El Instituto Clay ofrece un millón de dólares, según Scientific American. Sus reglas exigen que la solución se publique en un medio aceptado, que pasen al menos dos años y que tenga aceptación general en la comunidad matemática.
- **No es un producto nuevo.** No hay un modelo que puedas usar mañana con esta capacidad anunciada. El anuncio es personal de Alpöge.

## Contexto que el anuncio no cuenta

Hace apenas tres meses, el 10 de agosto, Anthropic publicó que una versión de investigación de Claude había subido del 41,6 % al 67,2 % la proporción de ceros de la función zeta que se sabe que cumplen la hipótesis. En esa nota, la empresa escribió que no esperaba que esas técnicas llevaran a probar la hipótesis de Riemann. Alpöge fue uno de los matemáticos que revisó ese trabajo. El salto de «mejoramos una cota» a «la prueba completa» en tres meses es, quizá, el dato que mejor mide la velocidad del cambio.

No es un caso aislado. El mismo post de Xena menciona una formalización del último teorema de Fermat hecha por Anthropic, de 13 millones de líneas, y una colección de resultados de OpenAI con código en Lean donde unos 38 de 290 artículos no enuncian el teorema principal. Ese último ejemplo muestra por qué la pregunta 1 de la lista importa tanto: un código que compila puede estar probando otra cosa.

## Qué significa para quien programa

Esto es análisis, no parte del anuncio. Lo que hizo que la comunidad aceptara en dos días un trabajo de 17 millones de líneas no fue confiar en la IA, sino tener una forma mecánica, reproducible e independiente de comprobar el resultado. Esa lógica se traslada directo al código que generas con un asistente.

Las cuatro preguntas de Xena funcionan casi igual en un proyecto Laravel o React:

1. **¿El enunciado es el correcto?** En tu caso, ¿las pruebas verifican lo que el cliente pidió? Un asistente puede escribir pruebas que pasan pero que no comprueban nada útil. Lee las pruebas antes que el código.
2. **¿Compila?** Que pase el chequeo de tipos y el análisis estático en tu CI, no solo en tu máquina.
3. **¿Prueba eso y no otra cosa?** Mira si se cambiaron pruebas, configuraciones o se silenciaron reglas para que todo quedara en verde.
4. **¿El verificador es confiable?** No dejes que el mismo agente que escribió el código decida si está bien. Que lo revise tu CI, con reglas que el agente no pueda tocar.

Para el punto 2, estos comandos existen tal cual en el stack de la portada:

```bash
# TypeScript: chequeo de tipos sin generar archivos
npx tsc --noEmit

# Laravel: suite de pruebas
php artisan test

# PHP: análisis estático con PHPStan (si lo tienes instalado)
vendor/bin/phpstan analyse
```

Ninguno es tan estricto como Lean, pero la idea es la misma: el valor de la IA crece cuando hay una forma barata de saber si acertó. Si tu proyecto no tiene pruebas ni tipos, cada línea generada hay que revisarla a mano, y ahí se pierde casi toda la ventaja.

## Resumen en pasos

1. El 20 de noviembre, Levent Alpöge, matemático de Anthropic, publicó una prueba de la hipótesis de Riemann hecha con Claude, escrita solo en Lean.
2. El 21 de noviembre, Lean y Mathlib certificaron que el enunciado y la prueba son correctos, con varios verificadores independientes.
3. La biblioteca tiene unos 17 millones de líneas y 175.187 módulos. Algunas revisiones de Sutherland seguían en curso el 22 de noviembre.
4. Falta una versión legible por humanos, y el premio Clay exige publicación, dos años de espera y aceptación general.
5. Para tu trabajo: dale a la IA una forma automática de comprobar lo que hace (tipos, pruebas, análisis estático) y revisa primero que lo comprobado sea lo que querías.
