---
titulo: 'GPT-6 Cyber: el modelo de OpenAI para encontrar y explotar fallas, y las 948 del kernel Linux'
descripcion: 'OpenAI lanzó GPT-6 Cyber, su modelo para seguridad ofensiva autorizada. Qué puede hacer, quién lo usa, cuánto cuesta y qué hacer con tus servidores Linux.'
fecha: 2026-11-06
actualizado: 2026-11-11
categoria: ia
michi: robot
etiquetas: ['OpenAI', 'GPT-6 Cyber', 'GPT-6 Astra', 'Daybreak', 'Linux', 'kernel', 'agentes de IA']
formato: carrusel
resumen:
    - 'OpenAI lanzó **GPT-6 Cyber**, un modelo para encontrar fallas, escribir exploits y probar parches en entornos autorizados.'
    - 'No está abierto a todos: solo organizaciones aprobadas en su programa Daybreak Red, con llaves físicas y verificación de identidad.'
    - 'Cuesta el doble que GPT-6 Astra: 20 dólares por millón de tokens de entrada y 100 por millón de salida.'
    - 'En un informe aparte, OpenAI dice que su sistema de agentes logró acceso **root** con 948 fallas del kernel Linux.'
    - 'Para tu servidor: mantén el kernel al día y reinicia después de actualizar, porque los parches siguen llegando.'
fuentes:
    - titulo: 'OpenAI: GPT-6 Cyber System Card (5 nov 2026)'
      url: 'https://deploymentsafety.openai.com/gpt-6-cyber'
    - titulo: 'OpenAI API: modelo GPT-6-Cyber (acceso, contexto y precios)'
      url: 'https://developers.openai.com/api/docs/models/gpt-6-cyber'
    - titulo: 'OpenAI API: modelo GPT-6 Astra (precios)'
      url: 'https://developers.openai.com/api/docs/models/gpt-6-astra'
    - titulo: 'OpenAI: A thousand fewer paths to root (4 nov 2026)'
      url: 'https://openai.com/index/a-thousand-fewer-paths-to-root/'
    - titulo: 'Help Net Security: OpenAI''s upcoming AI model built 948 working Linux root exploits in a single run'
      url: 'https://www.helpnetsecurity.com/2026/11/05/openai-linux-kernel-root-exploits/'
    - titulo: 'CyberScoop: OpenAI GPT-6 Cyber security model'
      url: 'https://cyberscoop.com/openai-gpt-6-cyber-security-model/'
---

El 5 de noviembre OpenAI presentó **GPT-6 Cyber**, una variante de su modelo GPT-6 Astra entrenada para trabajo de seguridad autorizado: buscar vulnerabilidades, desarrollar exploits, hacer pruebas de penetración web y verificar que los parches funcionen. Un día antes, la empresa había publicado un informe sobre un sistema de agentes que, según la propia OpenAI, construyó exploits para llegar a root en 948 fallas distintas del kernel Linux.

Las dos noticias juntas dicen algo concreto: encontrar fallas graves en software muy revisado ya se puede hacer en serie y con un costo que se mide en dólares por falla. Aquí va qué se anunció, qué está confirmado y qué significa si administras servidores.

## Qué es GPT-6 Cyber

La ficha técnica (*system card*) del modelo, publicada el 5 de noviembre, lo describe como un modelo especializado construido sobre GPT-6 Astra. En el marco de preparación de OpenAI recibe la misma calificación que Astra: **crítico** en ciberseguridad, alto en riesgos biológicos y químicos, y por debajo de alto en automejora de la IA.

Lo que cambia frente a Astra se ve en las pruebas de la propia ficha:

| Prueba | GPT-6 Cyber | GPT-6 Astra |
| --- | --- | --- |
| ExploitGym (exploit esperado) | 48,45 % | 42,43 % |
| ExploitGym con objetivos endurecidos | 36,94 % | 29,69 % |
| ExploitBench, ejecución de código en V8/Chrome | 42 % | 39 % |
| SEC-Bench Pro (pass@1) | 87,02 % | 85,38 % |
| SRE-Bench, ingeniería inversa de binarios (pass@1) | 92,84 % | 87,98 % |

La ficha misma advierte que ExploitBench usa vulnerabilidades históricas y que eso puede inflar los resultados, porque el modelo pudo verlas durante el entrenamiento.

La evaluación externa, hecha por la firma Irregular, es más matizada. En su prueba FrontierCyber, GPT-6 Cyber resolvió 90 de 288 retos y Astra 96. Ninguno de los dos resolvió los 15 retos más difíciles, e Irregular no observó ataques exitosos contra objetivos completamente endurecidos.

## Quién lo puede usar y cuánto cuesta

No es un modelo abierto. Según la documentación de la API, tu organización necesita acceso aprobado a **Daybreak Red**, el programa de OpenAI para equipos de seguridad ofensiva. La ficha técnica detalla los requisitos:

- **Organizaciones:** inicio de sesión único (SSO), autenticación multifactor, equipos administrados y permisos mínimos.
- **Personas:** verificación de identidad con prueba de vida, una declaración legal y al menos una llave de seguridad física FIDO2.
- **API:** lista de direcciones IP permitidas, activa por defecto.

Para quien tenga acceso, la documentación lista estos precios por millón de tokens:

| | GPT-6 Cyber | GPT-6 Astra |
| --- | --- | --- |
| Entrada | 20 dólares | 10 dólares |
| Entrada en caché | 2 dólares | 1 dólar |
| Salida | 100 dólares | 50 dólares |

Es decir, el doble que Astra. La ventana de contexto es de 1.050.000 tokens, con un máximo de 128.000 tokens de salida, y solo funciona con los endpoints Chat Completions y Responses.

## Los controles para que no se salga del alcance

El riesgo obvio de un modelo que escribe exploits es que ataque sistemas que nadie autorizó. La ficha incluye una prueba con una trampa (*honeypot*) en ExploitGym para medirlo: GPT-6 Cyber atacó sistemas fuera del alcance en el 0,07 % de las ejecuciones sin instrucciones de seguridad y en el 0 % con ellas. GPT-5.6 Cyber lo hacía en el 5,51 % y GPT-5.6 Sol en el 49,5 %.

OpenAI añadió además bloqueos para controles industriales, servicios esenciales y sistemas electorales, desarrollados con la firma Dragos, y un monitoreo específico para distinguir pruebas autorizadas de acciones fuera del alcance.

## Las 948 fallas del kernel Linux

El informe del 4 de noviembre, titulado «A thousand fewer paths to root», es el dato que más ha circulado. Esto es lo que dice OpenAI:

- A mediados de octubre, su sistema de agentes revisó el kernel Linux: produjo 2.308 hallazgos candidatos, reprodujo 1.724 fallas y obtuvo **948 exploits funcionales de escalada local de privilegios**, es decir, fallas que permiten pasar de un usuario sin privilegios a root en una distribución de escritorio común.
- El análisis costó 1.213.430 dólares en créditos de la API, unos 1.279 dólares por exploit.
- El sistema también genera un parche para cada falla, y un investigador humano revisa el exploit, el parche y la gravedad antes de reportarla.
- Al terminar el análisis, que duró 10 días, 61 fallas ya estaban corregidas en el kernel oficial, 43 tenían parches en preparación y 299 se estaban reportando y discutiendo en público.

OpenAI atribuye el trabajo a «un próximo modelo cyber», sin nombrarlo. CyberScoop atribuye estos resultados a GPT-6 Cyber y agrega que el modelo encontró al menos 81 vulnerabilidades nuevas en Firefox, un dato que no aparece en el informe.

Un matiz importante, que ya es análisis: una escalada local no deja entrar a nadie desde internet. El atacante necesita primero ejecutar código en la máquina, con una cuenta de bajo privilegio o con otra falla. El problema es que eso pasa: es justo lo que se vio cuando [una falla del kernel se encadenó con PHP2Shell](/blog/kernel-linux-cve-2026-46300-root) para llegar a root.

## Qué significa para quien trabaja en tecnología

Separando hechos de opinión, esta es la lectura práctica:

- **Los parches del kernel van a seguir llegando.** Si hay cientos de fallas en proceso de reporte, durante los próximos meses habrá más actualizaciones de seguridad del kernel de lo normal. Instalarlas y reiniciar deja de ser opcional.
- **El cuello de botella ya no es encontrar fallas, sino corregirlas.** Los mantenedores de proyectos de código abierto reciben más reportes de los que pueden revisar, y eso también afecta a las librerías que usas.
- **Las herramientas no son solo para defensores.** OpenAI pone controles de acceso fuertes, pero otros modelos se acercan en capacidad. Lo prudente es asumir que un atacante con recursos puede encontrar fallas así.

### Cómo mantener al día el kernel en Debian

```bash
# Ver la versión del kernel que está corriendo
uname -r

# Instalar las actualizaciones disponibles, incluido el kernel
sudo apt update && sudo apt full-upgrade

# El kernel nuevo solo se usa después de reiniciar
sudo reboot
```

Después del reinicio, vuelve a correr `uname -r` y confirma que cambió la versión. Si usas un VPS administrado, revisa en el panel de tu proveedor si el kernel lo controla él o tú.

## Qué cambia en la rutina de un servidor pequeño

Esto es análisis hecho con las cifras del informe. Una resta primero: de los 948 exploits, 61 ya estaban corregidos, 43 tenían parche en preparación y 299 se estaban reportando. Suman 403. De los otros 545, las cifras citadas no dicen en qué estado estaban. La consecuencia práctica es que la fila de parches del kernel es larga y va a durar meses.

Para un negocio con uno o dos servidores, eso cambia dos costumbres.

**El reinicio deja de ser un evento y pasa a ser rutina.** Si cada actualización del kernel exige que alguien se acuerde de reiniciar, no va a pasar. En Debian y Ubuntu se puede dejar programado. Instala las actualizaciones automáticas:

```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

Y activa el reinicio automático en `/etc/apt/apt.conf.d/50unattended-upgrades`:

```
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "03:00";
```

Con eso el servidor reinicia de madrugada solo cuando una actualización lo necesita. A cambio aceptas una caída de uno o dos minutos sin supervisión: asegúrate de que tus servicios arranquen solos después del reinicio (`systemctl is-enabled <servicio>`) antes de activarlo.

**Importa más quién puede ejecutar código en la máquina.** Una escalada local necesita un punto de partida, y en un servidor web ese punto suele ser una aplicación vulnerable. Cada sitio adicional en el mismo servidor es una entrada más hacia el mismo kernel. Dos medidas baratas: no mezclar en un servidor el sitio importante con los experimentos, y correr cada sitio con su propio usuario del sistema (un *pool* de PHP-FPM por sitio), para que entrar por uno no dé acceso a los archivos de los demás mientras llega el parche.

Sobre el precio: unos 1.279 dólares por exploit es poco frente a lo que cuesta ese trabajo hecho a mano. No hace falta tener acceso a GPT-6 Cyber para que eso te afecte: basta con que alguien lo tenga.

## Resumen

1. OpenAI lanzó GPT-6 Cyber el 5 de noviembre, una variante de GPT-6 Astra para encontrar fallas, escribir exploits y probar parches en entornos autorizados.
2. Solo lo pueden usar organizaciones aprobadas en Daybreak Red, con verificación de identidad y llaves físicas.
3. Cuesta 20 dólares por millón de tokens de entrada y 100 por millón de salida, el doble que Astra.
4. Según su propio informe, el sistema de agentes de OpenAI logró root con 948 fallas del kernel Linux, y los parches se están publicando por tandas.
5. Mantén el kernel de tus servidores actualizado y reinicia después de cada actualización.
