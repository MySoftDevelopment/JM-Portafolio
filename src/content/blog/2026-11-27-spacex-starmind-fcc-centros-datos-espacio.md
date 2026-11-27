---
titulo: 'SpaceX Starmind: la FCC autoriza un millón de satélites como centros de datos de IA en el espacio'
descripcion: 'La FCC autorizó a SpaceX a poner hasta un millón de satélites de cómputo de IA en órbita. Qué aprobó de verdad, qué dejó en pausa y qué plazos tiene.'
fecha: 2026-11-27
categoria: tecnologia
michi: chip
etiquetas: ['SpaceX', 'Starmind', 'FCC', 'Centros de datos', 'Satélites', 'Starlink', 'Infraestructura de IA']
formato: carrusel
resumen:
    - 'La [FCC](efe ce ce) de Estados Unidos autorizó a SpaceX a operar **Starmind**: hasta un millón de satélites que funcionarían como centros de datos de IA.'
    - 'El permiso cubre solo la radio de respaldo. Los satélites se comunicarían con láser a través de Starlink.'
    - 'La FCC dejó en pausa la autorización para los satélites que vuelan por encima de 600 kilómetros: SpaceX debe presentar primero su plan de basura espacial.'
    - 'Los plazos son largos: el primer satélite debe operar antes de noviembre de **2033** y la constelación completa antes de 2040.'
    - 'Para quien trabaja en tecnología no cambia nada hoy: es un permiso de radio, no un servicio que se pueda contratar.'
fuentes:
    - titulo: 'FCC: Memorandum Opinion and Order and Authorization DA 26-1273, SpaceX Orbital Data Center System (25 de noviembre de 2026)'
      url: 'https://docs.fcc.gov/public/attachments/DA-26-1273A1.pdf'
    - titulo: 'SpaceX: Starmind'
      url: 'https://www.spacex.com/spacexsi/starmind'
    - titulo: 'GeekWire: FCC clears SpaceX to put up to a million satellites in orbit for Starmind data center network'
      url: 'https://www.geekwire.com/2026/fcc-clears-spacex-million-satellites-starmind-data-center/'
---

El 25 de noviembre, la Comisión Federal de Comunicaciones de Estados Unidos (FCC) autorizó a SpaceX a desplegar Starmind, una constelación de hasta un millón de satélites pensados para funcionar como centros de datos de inteligencia artificial en órbita. Según GeekWire, la FCC la presentó como la primera autorización en la historia de Estados Unidos para una constelación de centros de datos en el espacio, y la noticia dio la vuelta a los medios de tecnología.

El titular suena a que mañana habrá GPU en el espacio. La orden de la FCC cuenta una historia más acotada. Separamos lo que dice el documento oficial de lo que es análisis.

## Qué aprobó la FCC

La decisión es la orden DA 26-1273 de la Oficina del Espacio de la FCC, firmada por Courtney Reinhard, a cargo de esa oficina. Está marcada como «concedida en parte, diferida en parte, con condiciones». Estos son los datos centrales:

| Punto | Lo que dice la orden |
| --- | --- |
| Tamaño | Hasta 1.000.000 de satélites en órbita no geoestacionaria |
| Altitudes | Capas de 50 km entre 500 y 1.002 km, con inclinaciones de 30 grados y heliosincrónicas |
| Qué autoriza | Radiofrecuencias para telemetría, seguimiento y comando de respaldo y emergencia |
| Frecuencias | 18,8-19,3 GHz (espacio a Tierra) y 28,6-29,1 GHz (Tierra a espacio), banda Ka |
| Condición de uso | Sin protección y sin causar interferencia a nadie |
| Vigencia | 15 años desde que el primer satélite esté en órbita y operando |

La solicitud llegó a finales de enero de 2026 y la FCC la puso en aviso público el 4 de febrero. Amazon (con su filial Kuiper), Viasat y la Sociedad Astronómica Estadounidense (AAS) pidieron negarla. La orden rechazó las tres peticiones.

### Lo que casi ningún titular explica

La FCC regula el uso del espectro radioeléctrico. Por eso, lo que autorizó es la radio de los satélites, y en este caso esa radio es solo de respaldo. Según la propia solicitud de SpaceX citada en la orden, Starmind se comunicará por enlaces ópticos (láser) entre satélites y con las constelaciones de Starlink. La banda Ka solo se usaría si fallan esos enlaces.

La orden también dice que no le toca juzgar si el negocio funciona. Varios comentarios del expediente cuestionaron la viabilidad técnica y económica de los centros de datos orbitales, el manejo del calor o su eficiencia frente a los centros de datos en tierra. La FCC respondió que esos temas no tienen relación con su mandato y que no va a sustituir el criterio de la empresa sobre la viabilidad de su negocio. Dicho de otra forma: el permiso no es un aval técnico.

## Qué quedó en pausa

Este es el punto más importante de la letra pequeña.

- **Basura espacial por encima de 600 km.** La FCC aceptó el plan de mitigación de desechos solo para los satélites que operen por debajo de 600 km. Para los demás, SpaceX debe presentar una solicitud de modificación con su plan final antes de desplegarlos. Mirando la tabla de altitudes nominales de la orden, dos de las seis capas (550-568 km y 565-585 km) quedan por debajo de ese límite y cuatro quedan por encima.
- **Cómo deshacerse de los satélites.** Las reglas exigen que los satélites que terminan su misión por debajo de 2.000 km reingresen a la atmósfera. SpaceX pidió una excepción para enviar los que operan por encima de 600 km a otras órbitas de desecho o a órbitas alrededor del Sol. La FCC dijo que no tiene información suficiente y difirió esa decisión.

Lo que sí registra la orden son los compromisos de SpaceX: probar los satélites primero en órbitas bajas, guiar el reingreso sobre el océano y diseñarlos para que se desintegren por completo al entrar a la atmósfera.

## Los plazos que debe cumplir SpaceX

La FCC le eximió de las reglas antiguas de hitos y fianzas y le aplicó el calendario nuevo que adoptó en julio de 2026. Si no lo cumple, la autorización queda sin efecto:

| Fecha límite | Qué debe estar operando |
| --- | --- |
| 25 de noviembre de 2033 | Al menos un satélite |
| 25 de noviembre de 2035 | El 10 % de la constelación (100.000 satélites si se usa el máximo) |
| 25 de noviembre de 2038 | El 50 % |
| 25 de noviembre de 2040 | El resto |

Además, SpaceX debe entregar un informe cada seis meses (antes del 1 de enero y del 1 de julio) con el número de alertas de posible colisión, los satélites retirados, los que reingresaron, el total desplegado y cuántos usaron la banda Ka.

## Qué dice SpaceX sobre Starmind

En su página oficial, SpaceX describe el satélite AI1 con estas cifras: 30 metros de alto desplegado, 75 metros de envergadura y una carga de cómputo de hasta 250 kW de pico y 175 kW de promedio. Dice que el sistema acepta módulos de cómputo de cualquier fabricante de chips, que la energía viene de paneles solares en órbita heliosincrónica, que el calor se disipa por radiación al vacío y que los resultados bajan a la Tierra por láser a través de Starlink.

También dice que construye una fábrica en Bastrop, Texas, para producir estos satélites a gran escala, con producción que podría empezar, en el mejor caso, a finales de 2027, y que depende de Starship para subir satélites tan pesados. Todo eso es lo que promete la empresa, no algo que la FCC haya verificado.

Según GeekWire, el presidente de la FCC, Brendan Carr, dijo que la decisión «abre una nueva frontera» para la infraestructura de cómputo, y la FCC sigue revisando otras propuestas de centros de datos orbitales, como la de Starcloud, de 88.000 satélites.

## Contexto que el anuncio no da

Esta parte es análisis nuestro a partir de los datos anteriores.

**La escala es más un techo que un plan.** Un millón es el máximo autorizado, no lo que se va a lanzar. Solo como referencia de orden de magnitud: si cada satélite llevara los 175 kW promedio que SpaceX anuncia para AI1, el millón sumaría unos 175 GW. Es una cuenta hipotética que muestra por qué el proyecto se vende como solución al problema de energía de los centros de datos, pero ninguna fuente dice que la constelación vaya a llegar a ese tamaño ni con ese satélite.

**El calendario es largo y está condicionado.** El primer plazo es 2033. El 10 % de la constelación no se exige hasta 2035. Y cuatro de las seis capas no se pueden usar hasta que la FCC apruebe el plan de desechos que hoy falta.

**La pregunta difícil sigue abierta.** El calor, el costo por lanzamiento y la vida útil de chips expuestos a la radiación son los puntos que los críticos señalaron en el expediente. La FCC dijo explícitamente que no los evaluó. Nada de esto se resuelve con un permiso de radio.

## Criterio para quien trabaja en tecnología

- **Si consumes API de IA o alquilas GPU en la nube,** no cambia nada. Starmind no es un servicio que se pueda contratar y no hay precios publicados. Planear infraestructura alrededor de él sería apostar a algo que, por los plazos de la propia FCC, puede tardar años.
- **Si sigues el costo del cómputo de IA,** esta es una señal de hacia dónde mira la industria: la energía y la refrigeración son el cuello de botella, y las empresas grandes buscan salirse de la red eléctrica. Vale la pena seguir los informes semestrales que exige la FCC, que dirán cuántos satélites hay de verdad.
- **Si te preocupa el cielo nocturno o la basura espacial,** las preguntas de fondo quedaron diferidas, no resueltas. El próximo paso visible es la solicitud de modificación con el plan de desechos para las órbitas altas.

## Resumen en pasos

1. **Confirmado:** el 25 de noviembre la FCC autorizó a SpaceX a operar Starmind, hasta un millón de satélites como centros de datos de IA, y rechazó las objeciones de Amazon, Viasat y la AAS.
2. **Confirmado:** lo autorizado es la radio de respaldo en banda Ka. El tráfico principal iría por láser a través de Starlink.
3. **Confirmado:** el plan de basura espacial solo se aprobó por debajo de 600 km. Para las capas más altas, SpaceX debe volver a pedir permiso.
4. **Confirmado:** el primer satélite debe operar antes del 25 de noviembre de 2033 y la constelación completa antes del 25 de noviembre de 2040, o la licencia se cae.
5. **Qué hacer:** nada técnico. Si te interesa el costo del cómputo de IA, sigue los informes semestrales de SpaceX a la FCC y la solicitud de modificación para las órbitas altas.
