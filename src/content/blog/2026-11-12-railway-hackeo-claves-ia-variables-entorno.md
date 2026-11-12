---
titulo: 'Hackeo a Railway: cómo robaron claves de IA de hasta 100.000 espacios de trabajo y qué revisar en tu proyecto'
descripcion: 'Railway publicó el informe final del ataque de octubre: cómo entraron, qué variables descifraron, los 740.000 dólares en consumo de IA y qué revisar en tus claves.'
fecha: 2026-11-12
categoria: ciberataques
michi: antifaz
etiquetas: ['Railway', 'Variables de entorno', 'API keys', 'LLMjacking', 'Agentes de IA', 'CI/CD', 'Vite']
formato: carrusel
resumen:
    - 'Railway, una plataforma para desplegar aplicaciones, publicó el informe final del ataque que sufrió el 20 y 21 de octubre.'
    - 'El atacante descifró variables de entorno de hasta el **1,85 %** de los espacios de trabajo: unos 100.000.'
    - 'Buscaba sobre todo **claves de IA**. Con las robadas se gastaron unos 740.000 dólares en consumo que nadie autorizó.'
    - 'Entró por el sistema de [builds](compilación) y luego por un error de configuración en su nube, con ayuda de agentes de IA.'
    - 'Si usas claves de IA: una por entorno, límites de gasto, revisa el consumo por clave y que ninguna llegue al navegador.'
fuentes:
    - titulo: 'Railway: Incident Report, October 21st Security Attack (10 nov 2026)'
      url: 'https://blog.railway.com/p/incident-report-october-security-incident'
    - titulo: 'Railway: Preliminary Report, Oct 21st Security Incident'
      url: 'https://blog.railway.com/p/preliminary-report-october-security-incident'
    - titulo: 'Railway: Check for Unexpected Anthropic Usage'
      url: 'https://blog.railway.com/p/security-disclosure-recommendation-check-for-unexpected-anthropic-usage'
    - titulo: 'Railway: Check for Unexpected OpenAI Usage'
      url: 'https://blog.railway.com/p/security-disclosure-recommendation-check-for-unexpected-openai-usage'
    - titulo: 'Wiz: “Black October” for AI Developer Platforms (actualizado el 10 nov 2026)'
      url: 'https://www.wiz.io/blog/black-october-for-ai-developer-platforms'
    - titulo: 'Anthropic: API key best practices'
      url: 'https://support.claude.com/en/articles/9767949-api-key-best-practices-keeping-your-keys-safe-and-secure'
    - titulo: 'Vite: Env Variables and Modes'
      url: 'https://vite.dev/guide/env-and-mode'
---

El 10 de noviembre Railway, la plataforma que muchos equipos usan para desplegar aplicaciones y bases de datos sin administrar servidores, publicó el informe final del ataque que sufrió entre el 20 y el 21 de octubre. Las cifras son concretas: el atacante pudo descifrar variables de entorno de hasta 100.000 espacios de trabajo, iba detrás de las claves de API de proveedores de IA y, con las que se llevó, se generó un consumo no autorizado de unos 740.000 dólares.

Lo que más enseña es el camino: una cadena de credenciales con más permisos de los necesarios.

## Qué pasó, según el informe de Railway

Esta cronología resume el informe final (horas en UTC):

| Fecha y hora | Qué ocurrió |
| --- | --- |
| 18 de octubre | El atacante empieza a crear cuentas de prueba. Los primeros intentos fallan. |
| 20 oct, 07:28 | Explota una falla desconocida en la infraestructura de compilación (builds) y escapa en parte del aislamiento de archivos. Obtiene una credencial de los servidores de build. |
| 20 oct, 13:58 | Una alerta por llamadas anómalas a un registro interno avisa al ingeniero de turno. |
| 20 oct, 17:03 a 17:28 | Railway detiene los builds y revoca la credencial robada. |
| 21 oct, 03:26 | El atacante entra por segunda vez, a través de una configuración OIDC mal definida en uno de sus entornos de nube. |
| 21 oct, 04:07 a 07:15 | Saca variables cifradas de la base de datos de producción y descifra una parte. |
| 21 oct, 07:14 y 07:22 | Railway desactiva todas las credenciales de nube y vuelve a detener los builds. |
| 21 oct, hacia las 09:25 | El atacante queda fuera de los sistemas. |
| 21 oct, 20:19 | Railway invalida todas las sesiones y tokens de usuarios. |
| 22 oct, 22:49 | Los builds vuelven para todos los planes. |

### La primera puerta: el sistema de builds

Railway compilaba varios proyectos en la misma máquina virtual, aislados entre sí. El atacante rompió parcialmente ese aislamiento y leyó archivos de la máquina, entre ellos una credencial pensada solo para subir imágenes al terminar un build.

El problema: un sistema interno de tareas (Temporal) aceptaba esa credencial como cliente de confianza. Con ella, el atacante leyó el historial de 353 builds, con las variables que se les pasaban, y descargó una copia del repositorio interno de Railway. Según la empresa, ese código le permitió buscar con agentes nuevas formas de entrar.

### La segunda puerta: la nube y una clave en disco

Con el código, encontró un error en la configuración OIDC del despliegue interno y obtuvo una credencial temporal de la nube. De ahí sacó una llave SSH y entró a una máquina de orquestación que guardaba en disco una credencial de larga duración capaz de descifrar variables. Los registros de la base de datos muestran que filtraba por nombres de variable con expresiones regulares para priorizar claves de proveedores de IA, y que apuntaba a clientes con muchas variables.

Railway dice que el atacante usó modelos sin salvaguardas y, citando a Wiz, una herramienta parecida a ARTEX, el marco de pentesting con agentes del que hablamos en la entrada sobre [el agente que entró a WorkOS](/blog/agente-ia-artex-workos-filtracion-credencial/).

## Qué se expuso

- **Variables de entorno:** hasta el 1,85 % de los espacios de trabajo, unos 100.000. Es un tope: los registros identifican entornos, no variables sueltas.
- **Tokens de cuentas vinculadas:** claves de agentes propias (BYOK) y tokens OAuth de GitHub de 1.852 usuarios. Railway los reinició todos y no encontró inicios de sesión con ellos.
- **Otras credenciales:** una consulta adicional coincidió con credenciales de nube, bases de datos y pagos.
- **Lo que no:** según el informe, no hay indicios de que se descargaran repositorios de clientes ni de que se accediera a sus bases de datos.

Railway pidió a GitHub, GitLab, Anthropic, OpenAI, OpenRouter, SpaceXSI, Google y Stripe revocar las claves que podían estar comprometidas, y presentó una denuncia ante el IC3 del FBI.

### Quién paga los 740.000 dólares

El informe detalla la postura de cada proveedor frente al consumo fraudulento: AWS Bedrock y Google Gemini lo cubren con sus políticas de fraude; OpenAI y SpaceXSI lo revisan caso por caso; con Anthropic seguía en conversaciones, y mientras tanto Railway asume el costo; OpenRouter mantiene su política de no reembolsar, así que Railway lo paga.

## No es un caso aislado

Wiz, la firma de seguridad en la nube, llama a octubre el «Black October» de las plataformas para desarrolladores de IA. Contó al menos nueve incidentes en ese mes, entre ellos Fireworks AI, Zeabur, Lightning AI, OpenCode, Railway, Warp y Northflank, y siguió sumando casos en noviembre. Según Wiz, Zeabur cerrará por su incidente.

El patrón, según Wiz, es el mismo: buscar variables de entorno con acceso a IA para revenderlo (lo que se conoce como *LLMjacking*). En dos casos que analizó, la primera prueba con la clave robada llegó menos de 30 minutos después del robo. Después vino la avalancha: unos 800.000 llamados en 30 horas en un caso y unos 1,7 millones en 13 horas en el otro. Solo esos dos casos habrían superado los 100.000 dólares a precio de lista.

## Qué revisar en tu proyecto hoy

Aplica uses Railway o no: cada plataforma que guarda tus variables es un lugar más donde viven tus claves.

### 1. Si usaste Railway

Revoca las claves que guardabas allí, crea nuevas y redespliega. Railway publicó guías por proveedor. Para Anthropic y OpenAI, recomienda revisar el consumo agrupado por clave: si una clave que solo usas con un modelo aparece de repente con otro, es una señal clara.

### 2. Una clave por entorno y por proyecto

Anthropic recomienda claves distintas para desarrollo, pruebas y producción. Así sabes de dónde sale cada consumo y puedes apagar una sin tumbar las demás.

### 3. Pon un techo al gasto

La misma guía de Anthropic sugiere límites de gasto en la página de facturación y, si tu cuenta usa recarga automática, elegir con cuidado el umbral: la recarga sigue cobrando a tu tarjeta aunque el consumo venga de una clave robada.

### 4. Que ninguna clave llegue al navegador

En proyectos con Vite (React, Laravel con Vite), toda variable con prefijo `VITE_` se incrusta en el JavaScript que descarga cualquier visitante. La documentación de Vite lo advierte: esas variables no deben llevar claves de API. Revisa tus archivos `.env`:

```bash
grep -nE '^VITE_[A-Z0-9_]*(KEY|TOKEN|SECRET)' .env*
```

Y confirma que el valor de tu clave no quedó en el build de producción:

```bash
grep -rlF "$OPENAI_API_KEY" dist/ public/build/
```

Si alguno de los dos comandos devuelve algo, esa clave ya es pública: rótala y mueve la llamada a tu backend.

### 5. Revisa qué secretos recibe tu build

Una de las lecciones del informe es que el build recibía variables que no necesitaba para compilar. En tu CI, pasa al paso de build solo lo indispensable y deja las claves de IA, de base de datos y de pagos para el entorno donde corre la aplicación.

## Qué cambia para un proyecto pequeño de aquí

Esto es análisis, no parte de las fuentes.

Para una pyme o un desarrollador independiente en Colombia que paga la API de IA en dólares con tarjeta de crédito, una clave robada no es un problema técnico: es una factura. Los casos de Wiz muestran que el abuso empieza en minutos y puede gastar en un día lo que tu proyecto consume en meses.

Por eso conviene pensar las claves de IA como pensarías una tarjeta: con cupo, con alertas y con una por uso. Si tu proyecto llama a la API desde el frontend «porque era más rápido», es el primer arreglo que vale la pena hacer.

Para quien construye plataformas, el informe deja una lista corta: credenciales que solo sirvan para su tarea, de vida corta, nunca guardadas en disco si pueden emitirse al momento, y sistemas internos que no confíen en cualquier cliente que presente una credencial válida. Railway dice que ya movió cada build a su propia máquina virtual efímera y que ahora solo un servicio de secretos puede descifrar, con registro de cada operación.

## Resumen en pasos

1. Railway confirmó que un atacante descifró variables de entorno de hasta unos 100.000 espacios de trabajo entre el 20 y el 21 de octubre.
2. Entró por el sistema de builds y luego por un error de configuración OIDC, buscando sobre todo claves de proveedores de IA.
3. El consumo fraudulento con las claves robadas llegó a unos 740.000 dólares. Railway cubre lo que los proveedores no reembolsen.
4. Si usaste Railway, rota tus claves y revisa el consumo por clave en cada proveedor.
5. En cualquier proyecto: una clave por entorno, límites de gasto, nada de claves en variables `VITE_` y el mínimo de secretos en el build.
