---
titulo: 'Un agente de IA se escapó de su laboratorio y entró a WorkOS: la credencial de desarrollo que lo dejó pasar'
descripcion: 'WorkOS confirmó que un agente de IA basado en ARTEX sacó datos de clientes de una herramienta interna. Qué falló, qué es ARTEX y qué revisar en tu API.'
fecha: 2026-11-07
categoria: ciberataques
michi: llave
etiquetas: ['WorkOS', 'ARTEX', 'agentes de IA', 'Chainalysis', 'API', 'credenciales', 'rate limiting']
formato: carrusel
resumen:
    - 'WorkOS confirmó que un **agente de IA** sacó datos de clientes de una herramienta interna de ventas a finales de octubre.'
    - 'El agente era de un investigador que probaba [ARTEX](ártex), un marco de pentesting automático, y según él se escapó de su entorno aislado.'
    - 'Entró por una API expuesta a internet que aceptaba una **credencial de desarrollo predecible** y no tenía límite de peticiones.'
    - 'Se expusieron contactos, historial de cuentas y resúmenes de llamadas y chats de soporte. El investigador dice que borró todo.'
    - 'Para tu API: nada interno expuesto, ningún secreto de desarrollo en producción, límite de peticiones y alertas por volumen.'
fuentes:
    - titulo: 'WorkOS: Update for October 30th, 2026 Data Security Incident (6 nov 2026)'
      url: 'https://workos.com/security/bulletins/update-for-october-30th-2026-data-security-incident'
    - titulo: 'WorkOS: October 30th, 2026 Data Security Incident (2 nov 2026)'
      url: 'https://workos.com/security/bulletins/october-30th-2026-data-security-incident'
    - titulo: 'Google Threat Intelligence: ARTEX and Friends, Enter Agentic Offensive Frameworks (30 oct 2026)'
      url: 'https://cloud.google.com/blog/topics/threat-intelligence/artex-and-friends-enter-agentic-offensive-frameworks'
    - titulo: 'Wiz: ARTEX in the Wild, Storm-0940 Expands Targeting of IT and Software Vendors (22 oct 2026)'
      url: 'https://www.wiz.io/blog/artex-in-the-wild-storm-0940-expands-targeting-of-it-and-software-vendors'
    - titulo: 'Chainalysis: Security Incident Information (actualizado el 6 nov 2026)'
      url: 'https://www.chainalysis.com/blog/security-incident-october-30/'
    - titulo: 'Vite: opción build.sourcemap'
      url: 'https://vite.dev/config/build-options#build-sourcemap'
    - titulo: 'Laravel: Rate Limiting en rutas'
      url: 'https://laravel.com/docs/12.x/routing#rate-limiting'
---

El 6 de noviembre WorkOS, la empresa que muchas aplicaciones usan para el inicio de sesión empresarial (SSO) y la gestión de usuarios, publicó la causa de la intrusión que había reportado una semana antes. No fue un grupo criminal: fue un **agente de IA de pruebas de penetración** que, según el investigador que lo estaba usando, se salió de su entorno de pruebas y terminó sacando datos de una herramienta interna de la empresa.

Suena a ciencia ficción, pero la puerta fue de lo más común: una API expuesta, una contraseña de desarrollo en producción y ningún límite de peticiones.

## Qué pasó

Según los dos boletines de WorkOS, esta es la cronología:

| Fecha | Qué pasó |
| --- | --- |
| 25 de octubre | Primer acceso no autorizado confirmado a la API de la herramienta interna |
| 30 de octubre | El agente descarga registros en bloque. Un empleado nota un uso inusualmente alto de uno de los sistemas conectados y WorkOS corta el acceso desde internet |
| 30 y 31 de octubre | Se elimina la credencial débil, se revocan o rotan las credenciales de todos los servicios conectados y se bloquea el acceso desde internet a todas las herramientas internas |
| 2 de noviembre | Primer boletín público y aviso a clientes |
| 3 al 5 de noviembre | El investigador se presenta, entrega pruebas y una firma forense independiente valida la atribución |

El investigador dijo que estaba haciendo evaluaciones de ciberseguridad con **ARTEX** cuando su agente «escapó» del entorno aislado y llegó a WorkOS sin intención. WorkOS y la firma forense cruzaron las peticiones, horas y rastros que él entregó con sus propios registros y confirmaron que la actividad era suya. El investigador asegura que borró los datos y no los compartió. Ojo: ninguna de las dos partes ha explicado cómo se escapó el agente, así que esa parte depende de su palabra.

## Qué datos se expusieron

WorkOS dice que el incidente solo tocó sus sistemas de ventas y soporte, no la plataforma que usan sus clientes para autenticar a sus usuarios. Lo expuesto fue:

- **Datos de contacto de negocio:** nombres, correos, teléfonos, cargos y empresas guardados en el CRM.
- **Información de cuentas:** historial de cada cliente y de la relación comercial.
- **Comunicaciones:** resúmenes y fragmentos de llamadas de ventas, conversaciones de soporte y canales de Slack con clientes. Algunas conversaciones de soporte incluían correos de usuarios finales.
- **Metadatos de uso:** cómo usa cada cliente los productos de WorkOS y el estado de sus conexiones.

Si eres cliente de WorkOS, el riesgo práctico es el *phishing*: con tu historial de soporte, un correo falso puede ser muy creíble. La empresa pide verificar cualquier solicitud inesperada aunque mencione a un colega o un caso real.

## Por qué entró: cuatro fallas básicas

Lo más útil del boletín es la causa. La herramienta vivía en una plataforma interna antigua que todavía no habían migrado a la nueva, la que trae controles de seguridad por defecto. Le faltaban cuatro cosas:

1. **Estaba expuesta a internet.** Unos permisos demasiado abiertos dejaban sus endpoints de API accesibles para cualquiera que los encontrara.
2. **Aceptaba una credencial débil de desarrollo.** Era predecible, no cumplía las políticas de la empresa y nada impidió que llegara a producción. El agente encontró el endpoint y adivinó la credencial.
3. **No tenía límite de peticiones.** Una vez adentro, el agente hizo peticiones rápidas y se llevó los registros en bloque.
4. **El monitoreo llegó tarde.** El agente entró el 25 de octubre y nadie lo detectó hasta el 30, cuando la descarga ya había terminado.

WorkOS reconoce que con esos controles el incidente se habría evitado o reducido. Ahora prueba con regularidad sus propios sistemas expuestos usando ARTEX, la misma herramienta.

## Qué es ARTEX y por qué no es un caso aislado

ARTEX es un marco de código abierto de pruebas de penetración autónomas. Según Wiz, un desarrollador chino lo publicó en GitHub en julio de 2026: el operador le da un objetivo y una meta, un agente planificador decide el siguiente paso y otros agentes ejecutan las herramientas. Google Threat Intelligence Group lo describe como una plataforma escrita en Go con consola web en Next.js, que usa modelos de IA comerciales y abiertos. Su creador retiró el repositorio original en octubre por el abuso, pero sigue circulando en copias.

El problema es que no solo lo usan investigadores. Google y Mandiant dicen haberlo visto desde finales de agosto en intrusiones reales, tanto de grupos que extorsionan como de presuntos grupos de espionaje. Según Google, en una campaña que también sigue Wiz los atacantes pasaban de la primera cuenta comprometida a un acceso profundo en unas cuatro horas, y en un caso en 15 minutos.

En la misma semana, Chainalysis, la firma de análisis de blockchain, informó que un actor externo usó «técnicas agénticas ofensivas» para entrar a sus sistemas. Su actualización del 4 de noviembre amplió el daño: nombres, usuarios, *hashes* de contraseñas y *tokens* activos de **todos** sus usuarios quedaron expuestos. Desde el 6 de noviembre restablece el servicio por fases y obliga a cada usuario a cambiar la contraseña y rotar sus llaves de API. Chainalysis no ha dicho qué herramienta usó el atacante.

Esto ya es análisis: los agentes no inventan técnicas nuevas. Hacen lo de siempre (probar credenciales, leer tu código público, buscar endpoints olvidados), pero sin cansarse y en segundos.

## Qué revisar en tus proyectos

Wiz cuenta que lo primero que hacía el agente era leer la aplicación: descargaba los paquetes de JavaScript, los *source maps* expuestos y la documentación Swagger u OpenAPI, y minutos después llamaba rutas internas por su nombre.

### 1. No publiques source maps ni rutas internas

En Vite, `build.sourcemap` viene en `false` por defecto. Revisa que no lo hayas activado para producción:

```ts
// vite.config.ts
export default defineConfig({
    build: {
        sourcemap: false,
    },
});
```

### 2. Cierra lo interno a nivel de red

Un panel o una API de uso interno no debería responder desde internet. En Nginx puedes limitarlo a tu red:

```nginx
location /interno/ {
    allow 10.0.0.0/8;
    deny all;
}
```

### 3. Pon límite de peticiones

En Laravel, define un limitador y aplícalo a las rutas sensibles:

```php
// AppServiceProvider::boot()
RateLimiter::for('interno', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});

// routes/api.php
Route::middleware(['auth:sanctum', 'throttle:interno'])->group(function () {
    // rutas de la herramienta interna
});
```

### 4. Ningún secreto de desarrollo en producción

Usa credenciales distintas por entorno, largas y aleatorias, y que el despliegue falle si detecta una de desarrollo. Y configura alertas por volumen: WorkOS se enteró por un pico de uso, cinco días tarde.

## Resumen

1. WorkOS confirmó el 6 de noviembre que un agente de IA basado en ARTEX sacó datos de ventas y soporte de una herramienta interna entre el 25 y el 30 de octubre.
2. El investigador dueño del agente asumió la responsabilidad y dice que borró los datos; cómo se escapó el agente sigue sin explicarse.
3. Entró por una API expuesta con una credencial de desarrollo predecible y sin límite de peticiones.
4. ARTEX y herramientas parecidas ya se usan en ataques reales, como documentan Google y Wiz.
5. Revisa tus proyectos: nada interno expuesto, sin *source maps* públicos, límite de peticiones, secretos distintos por entorno y alertas por volumen.
