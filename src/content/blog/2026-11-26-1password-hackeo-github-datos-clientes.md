---
titulo: 'Hackeo a 1Password: entraron por la cuenta de GitHub de un empleado y copiaron datos de clientes'
descripcion: 'Un atacante usó la cuenta de GitHub de un empleado de 1Password para meter código en su backend y copiar datos de clientes. Qué se expuso y qué hacer.'
fecha: 2026-11-26
categoria: ciberataques
michi: antifaz
etiquetas: ['1Password', 'GitHub', 'CI/CD', 'Filtración de datos', 'Phishing', 'Gestor de contraseñas']
formato: carrusel
resumen:
    - 'Un atacante entró a la cuenta corporativa de **GitHub** de un empleado de [1Password](uan pásword) y la usó para meter código malicioso en su backend.'
    - 'Ese código descargó registros de una parte de los clientes: nombres, correos, identificadores de cuenta y tokens de invitación y recuperación.'
    - 'También copió código fuente privado y llegó al sistema de [CI/CD](integración y despliegue continuos). La empresa dice que rotó las credenciales expuestas.'
    - 'Según 1Password, las bóvedas y las llaves que las protegen **no se vieron afectadas**, y no hay que cambiar nada en la cuenta.'
    - 'El riesgo real es el phishing: desconfía de correos o llamadas sobre invitaciones o recuperación de cuenta que no pediste.'
    - 'La lección para equipos: una sola cuenta de GitHub no debería poder llevar código a producción sin revisión.'
fuentes:
    - titulo: '1Password: Update on a security incident involving 1Password’s backend systems (25 de noviembre de 2026)'
      url: 'https://1password.com/blog/update-on-nov-2026-security-incident'
    - titulo: 'BleepingComputer: 1Password customer data stolen after employee GitHub account breach'
      url: 'https://www.bleepingcomputer.com/news/security/1password-customer-data-stolen-after-employee-github-account-breach/'
    - titulo: 'SecurityWeek: 1Password Breach Exposes Customer Data, Internal Source Code'
      url: 'https://www.securityweek.com/1password-breach-exposes-customer-data-internal-source-code/'
    - titulo: 'GitHub Docs: Reviewing your security log'
      url: 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/reviewing-your-security-log'
    - titulo: 'GitHub Docs: Available rules for rulesets'
      url: 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets'
---

1Password es uno de los gestores de contraseñas más usados por personas y empresas. El 25 de noviembre publicó que un atacante entró a parte de sus sistemas de backend y copió información de cuentas de un subconjunto de clientes. La puerta de entrada no fue una falla en la app ni en el cifrado: fue la cuenta corporativa de GitHub de un empleado.

La buena noticia, según la empresa, es que las bóvedas no se tocaron. La mala es que el caso muestra lo lejos que puede llegar alguien con una sola cuenta de GitHub dentro de una empresa de seguridad.

## Qué pasó

Esta es la cronología que da 1Password en su comunicado:

| Fecha | Qué ocurrió |
| --- | --- |
| Antes del 19 de noviembre | Un atacante obtiene acceso a la cuenta corporativa de GitHub de un empleado. La empresa no ha dicho cómo |
| Con esa cuenta | Accede al código fuente, sube código malicioso a servicios del backend y ese código descarga datos administrativos de clientes |
| También | Copia código de repositorios privados y llega al sistema de CI/CD, donde hay secretos de infraestructura |
| 19 de noviembre de 2026 | 1Password empieza a investigar las señales de que la cuenta estaba comprometida |
| 25 de noviembre de 2026 | Publica el incidente en su blog |

Ni BleepingComputer ni SecurityWeek lograron que la empresa precisara cuántos usuarios están afectados, cómo se comprometió la cuenta ni cuánto tiempo estuvo activo el código malicioso. BleepingComputer dice que pidió detalles y no obtuvo respuesta antes de publicar.

## Qué datos se expusieron y cuáles no

Según 1Password, el atacante descargó registros de cuenta de una parte de sus usuarios con esto:

- Nombres y correos con los que se entra a 1Password.
- Identificadores de cuenta y de usuario, y fechas de creación de la cuenta y del último inicio de sesión.
- Llaves públicas, que por diseño son públicas.
- Parámetros del protocolo SRP (*Secure Remote Password*), que según la empresa no sirven para entrar a una cuenta.
- Tokens de algunos enlaces enviados por correo para invitaciones, aprovisionamiento y recuperación de cuenta.
- Metadatos internos que no son secretos, como identificadores de versión y de archivo.

Lo que la empresa dice que **no** se vio afectado: las bóvedas y lo que hay en ellas, las llaves que las protegen, las llaves de recuperación de cuenta y las apps y extensiones del navegador. 1Password recuerda que no guarda la contraseña de la cuenta ni la *Secret Key* de nadie.

### Los tokens de invitación y recuperación

Es el dato más delicado. Cuando 1Password manda un correo para aceptar una invitación de aprovisionamiento (la que usan SCIM Bridge y Hosted Provisioning) o para aceptar una recuperación de cuenta, el enlace lleva un token. La empresa explica que ese token solo sirve combinado con un inicio de sesión por SSO o con un código que llega al correo registrado.

Ese código era de seis dígitos. Como precaución, ahora es de diez caracteres alfanuméricos, lo que hace inviable adivinarlo a la fuerza. 1Password dice que muy pocos usuarios tenían una invitación o recuperación pendiente durante el incidente, que ya les avisó directamente y que no encontró evidencia de cuentas tomadas con esos tokens.

## Qué hizo 1Password

- Desactivó la cuenta de GitHub afectada, revocó el token robado y quitó los accesos que creó el atacante.
- Restauró versiones limpias del servicio afectado.
- Rotó o revocó todas las credenciales internas que pudieron quedar expuestas, incluidas las del CI/CD.
- Endureció los controles de GitHub, del CI/CD y de los equipos de los empleados, y añadió detecciones para este tipo de ataque.
- Contrató expertos independientes para validar la contención. SecurityWeek anota que la investigación sigue abierta.

## Qué hacer si usas 1Password

La empresa dice que no tienes que cambiar nada en tu cuenta. Lo que sí cambia es el riesgo de phishing: el atacante tiene nombres, correos y la confirmación de que esas personas usan 1Password. Es la materia prima perfecta para un correo falso convincente.

1. **Desconfía de invitaciones y recuperaciones que no pediste.** Correos, mensajes o llamadas que hablen de 1Password, de aceptar una invitación o de recuperar tu cuenta son la carnada más probable.
2. **Nunca des la contraseña ni la Secret Key.** 1Password dice que nunca te las va a pedir. Escríbelas solo en la app oficial o en el sitio cuya dirección tecleaste tú. La Secret Key solo se pide la primera vez que entras en un dispositivo o navegador nuevo; si te la piden en cualquier otro momento, sospecha.
3. **Si administras una cuenta de empresa,** revisa si tenías invitaciones de aprovisionamiento o recuperaciones pendientes en esos días y confirma con tu equipo que cada una era legítima.
4. **Reporta lo raro** a support@1password.com, la dirección que da la empresa.

## La lección para quien desarrolla

Esto es análisis a partir del comunicado.

**Una cuenta de GitHub es una llave de producción.** El atacante no rompió el cifrado de 1Password ni encontró una falla en la app. Usó una cuenta legítima para subir código y ese código terminó ejecutándose en el backend. Si en tu equipo un `git push` a la rama principal dispara un despliegue automático, la cuenta de cada persona con permisos de escritura vale lo mismo que acceso directo al servidor.

**El CI/CD guarda los secretos de todo.** Las claves de la base de datos, del proveedor de nube, de la pasarela de pagos o de la API de WhatsApp suelen vivir como secretos del pipeline. Por eso 1Password tuvo que rotar las credenciales de infraestructura. Es el mismo patrón que vimos en [el gusano testmetest](/blog/testmetest-gusano-npm-github/) y en [el hackeo a Fireworks AI](/blog/hackeo-fireworks-ai-uber-notion-cursor/): quien roba un token de desarrollo apunta primero a los secretos.

**El diseño de cifrado de extremo a extremo funcionó.** Aun con código propio corriendo en el backend, el atacante no pudo leer las bóvedas porque la empresa no tiene las llaves. Es un buen argumento para cifrar del lado del cliente los datos que de verdad importan, y para no confiar en que el servidor nunca será comprometido.

## Cómo revisar tu propio GitHub hoy

No necesitas ser 1Password para que te pase lo mismo. Estos pasos sirven a un equipo pequeño que despliega un proyecto Laravel o Node.js desde GitHub.

### 1. Mira el registro de seguridad de tu cuenta

En GitHub, haz clic en tu foto de perfil, entra a **Settings** y, en la sección **Archives** del menú lateral, abre **Security log**. Guarda las acciones de los últimos 90 días, con el país y la hora de cada una. Busca inicios de sesión, tokens nuevos o llaves SSH que no reconozcas.

Desde la terminal, con la CLI oficial de GitHub, puedes ver con qué cuenta y alcances estás autenticado y qué llaves SSH tiene tu cuenta:

```bash
gh auth status
gh ssh-key list
```

### 2. Revisa tus tokens personales

En **Settings > Developer settings > Personal access tokens** borra los que ya no uses y los que no tengan fecha de vencimiento. Un token olvidado con permiso de escritura sobre todos tus repositorios es exactamente lo que buscan.

### 3. Que nadie pueda llevar código a producción solo

Con los *rulesets* de GitHub puedes proteger la rama de la que despliegas. Las reglas que más ayudan en un caso como este:

- **Require a pull request before merging**, con al menos una aprobación.
- **Require approval of the most recent reviewable push**, para que quien sube el último cambio no sea quien lo aprueba.
- **Block force pushes** y **Restrict deletions**, que vienen activadas por defecto.
- **Require signed commits**, si tu equipo ya firma sus commits.

En un equipo de una sola persona esto no siempre es práctico. En ese caso, lo mínimo es tener la autenticación de dos factores activa con una llave física o passkey, y que el despliegue a producción no salga de cualquier push sin que tú lo confirmes.

## Resumen en pasos

1. **Confirmado:** un atacante usó la cuenta corporativa de GitHub de un empleado de 1Password para subir código malicioso al backend y copiar registros de una parte de los clientes. La investigación empezó el 19 de noviembre.
2. **Confirmado:** se expusieron nombres, correos, identificadores, fechas de acceso, parámetros SRP y tokens de invitación y recuperación. También código fuente privado y acceso al CI/CD.
3. **Según 1Password:** las bóvedas, sus llaves y las llaves de recuperación no se vieron afectadas, y no hay que cambiar nada en la cuenta.
4. **Qué hacer hoy si usas 1Password:** desconfía de invitaciones o recuperaciones que no pediste y nunca entregues la contraseña ni la Secret Key fuera de la app o el sitio oficial.
5. **Qué hacer en tu equipo:** revisa el registro de seguridad de GitHub, limpia tokens y exige revisión antes de desplegar.
