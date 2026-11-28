---
titulo: 'Google Play pide declarar si eres comerciante antes del 1 de febrero: qué datos tuyos quedarán públicos'
descripcion: 'Todas las cuentas de Google Play deben declarar si son comerciantes antes del 1 de febrero de 2027. Si lo eres con cuenta personal, verán tu teléfono y dirección.'
fecha: 2026-11-28
categoria: ecosistema
michi: celular
etiquetas: ['Google Play', 'Play Console', 'Android', 'Desarrolladores', 'Privacidad', 'Ley de Servicios Digitales', 'React Native', 'Expo']
formato: carrusel
resumen:
    - 'Todas las cuentas de [Google Play Console](google plei consol) deben declarar si son comerciantes o no antes del **1 de febrero de 2027**.'
    - 'La regla viene de leyes de Europa y el Reino Unido, pero Google la exige a todos los desarrolladores del mundo.'
    - 'Desde el 1 de marzo de 2027, si eres comerciante con cuenta personal, Google mostrará **tu teléfono y tu dirección** a usuarios de todo el mundo.'
    - 'Si no distribuyes apps en el Espacio Económico Europeo ni en el Reino Unido, la propia Google dice que puedes declararte no comerciante.'
    - 'Si no declaras a tiempo, Google puede bloquear las actualizaciones de tus apps o retirarlas de la tienda.'
fuentes:
    - titulo: 'Google Play Console Help: Trader status declaration'
      url: 'https://support.google.com/googleplay/android-developer/answer/17594752?hl=en'
    - titulo: 'Google Play Console Help: Required information to create a Play Console developer account'
      url: 'https://support.google.com/googleplay/android-developer/answer/13628312?hl=en'
    - titulo: 'Google Play Console Help: Choose a developer account type'
      url: 'https://support.google.com/googleplay/android-developer/answer/13634885?hl=en'
    - titulo: 'Google Payments Center Help: Create a payments profile'
      url: 'https://support.google.com/paymentscenter/answer/7161426?hl=en'
    - titulo: 'Apple Developer: Manage European Union Digital Services Act trader requirements'
      url: 'https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements/'
    - titulo: 'TNW: Google Play will show some developers’ contact details worldwide'
      url: 'https://thenextweb.com/news/google-play-developer-addresses-trader-dsa-worldwide'
---

Google Play fijó una regla nueva que toca a cualquiera que tenga una app Android en la tienda, sea nativa, hecha con React Native o con Expo. Todas las cuentas activas de Play Console deben declarar si actúan como comerciantes (en inglés, *trader*) antes del 1 de febrero de 2027. Y desde el 1 de marzo de 2027, si te declaras comerciante y tu cuenta es personal, Google mostrará tu número de teléfono y tu dirección en la ficha de tus apps, para usuarios de todo el mundo.

La noticia circuló esta semana en medios como TNW. Aquí separamos lo que dicen las páginas oficiales de Google de lo que es análisis.

## Qué pide Google

Según la página de ayuda de Play Console sobre la declaración de estado de comerciante, la obligación nace de las leyes de consumo del Espacio Económico Europeo (EEE) y del Reino Unido. Google explica que el 1 de marzo de 2027 Google Play pasa a funcionar como un «mercado en línea» en esas regiones, y por eso necesita saber quién vende como negocio y quién no. Aun así, la declaración es obligatoria para todas las cuentas, sin importar dónde se distribuyan las apps.

| Punto | Lo que dice Google |
| --- | --- |
| Quién debe declarar | Todas las cuentas activas de Play Console, en cualquier país |
| Plazo para cuentas existentes | 1 de febrero de 2027 |
| Plazo para cuentas nuevas | Al momento de crear la cuenta |
| Si no declaras | Bloqueo de actualizaciones y retiro de la tienda a nivel global |
| Si mientes sobre tu estado | Suspensión o cierre de la cuenta, según las secciones 11.4 y 10.3 (a) del acuerdo de distribución (DDA) |
| Cuándo se ven los datos | Desde el 1 de marzo de 2027 |

La declaración se puede cambiar después en Play Console.

### Cómo sabe Google si eres comerciante

Google no lo decide por ti. Remite a la guía de la Comisión Europea (sección 2.2, «el concepto de comerciante») y da cuatro criterios, que no son una lista cerrada:

- **Ánimo de lucro:** recibes o esperas recibir dinero por tus apps de forma regular o comercial, por ejemplo con apps de pago, compras dentro de la app o publicidad.
- **Volumen:** tienes un número alto o constante de transacciones.
- **Montaje de negocio:** manejas el desarrollo y la publicación como un negocio.
- **Estado legal:** tienes una figura legal que te permite hacer actividades comerciales, como un número D-U-N-S.

Si lo haces como pasatiempo, Google dice que probablemente no eres comerciante. Y advierte: en el EEE y el Reino Unido está prohibido declararse no comerciante cuando sí lo eres, y hacerlo puede llevar a que retiren tus apps en todo el mundo. Si declaras que no eres comerciante y Google detecta actividad que sugiere lo contrario, te puede pedir que lo confirmes. Si no respondes a tiempo, tus apps pueden salir de la tienda.

## Qué datos quedarán públicos

Desde el 1 de marzo de 2027, si te declaras comerciante, los usuarios **de todas partes** verán:

- **Tus datos de contacto.** Si tu cuenta es individual (personal), Google mostrará un número de teléfono y una dirección.
- **Tu número D-U-N-S**, en la sección de soporte de la app, si lo tienes.
- **El enlace a los términos de servicio** de la app, si lo diste.

Solo en el EEE y el Reino Unido, además, tu nombre de desarrollador reemplazará a Google en el campo «Ofrecido por» y se mostrará tu compromiso de cumplir las leyes locales.

Si eres comerciante con cuenta personal, Play Console te pedirá un teléfono de contacto para publicarlo y te avisa que tu dirección también será pública. Esa dirección no la escribes aparte: Google la toma del perfil de pagos vinculado a tu cuenta, y en ese perfil debe ir la dirección legal tal como aparece en documentos oficiales. Google no acepta apartados postales.

## Lo que los titulares no cuentan

Esto es análisis nuestro a partir de las páginas oficiales.

**La dirección no es del todo nueva para quien cobra.** La página de Google sobre los datos requeridos de una cuenta dice que, en una cuenta personal, Google ya muestra el nombre legal, el país y el correo de desarrollador, y que si monetizas en Google Play ya muestra tu dirección completa. Lo que cambia para un comerciante con cuenta personal es, sobre todo, que se suma el teléfono y que la regla se formaliza para todo el mundo. Las cuentas de organización ya mostraban nombre legal, D-U-N-S, dirección, correo y teléfono.

**Google va más allá que Apple.** Apple, en su página sobre la Ley de Servicios Digitales, dice que publica los datos del comerciante solo cuando la app se distribuye en alguno de los 27 países de la UE, y que un desarrollador individual puede dar una dirección o un apartado postal. Google los mostrará en todos los países y no acepta apartados postales en el perfil de pagos.

**Hay una salida explícita si no distribuyes en el EEE ni en el Reino Unido.** La misma página de Google aclara que, si no distribuyes apps en el EEE ni en el Reino Unido, puedes declararte no comerciante. Apple lo plantea igual: si solo distribuyes fuera de la UE, no actúas como comerciante en el App Store.

## Qué cambia en un caso típico de aquí

Piensa en alguien en Colombia que publicó desde su cuenta personal una app en Expo para una pyme, o una app propia con anuncios. Lo normal es que la dirección del perfil de pagos sea la de su casa.

- **Si la app solo se distribuye en Colombia o en Latinoamérica**, Google le permite declararse no comerciante. No se publicaría el teléfono por esta regla. Ojo: si la app ya monetiza, la dirección completa ya se muestra hoy según la política actual de cuentas personales.
- **Si la app está disponible en todos los países** y además cobra o tiene anuncios, lo más probable es que encaje como comerciante. En ese caso, desde marzo su teléfono y su dirección quedarían visibles en todo el mundo.
- **Si la app es de un cliente con empresa**, lo sano es que se publique desde una cuenta de organización de esa empresa, no desde la cuenta personal de quien la desarrolló. Las cuentas de organización piden un número D-U-N-S, que Dun & Bradstreet da gratis y que puede tardar hasta 30 días. Google, además, ya obliga a usar cuenta de organización para apps financieras, de salud, de VPN y de gobierno.

## Criterio para decidir

- **Si no distribuyes en el EEE ni en el Reino Unido**, revisa en qué países está publicada cada app, confirma que esas regiones no estén incluidas y declárate no comerciante.
- **Si distribuyes en el EEE o el Reino Unido y cobras, vendes dentro de la app o tienes publicidad**, lo prudente es declararte comerciante. Declararte no comerciante para no mostrar tus datos es justo lo que Google y la ley prohíben, y el castigo es el retiro global.
- **Si no quieres que se publique la dirección de tu casa**, tienes dos caminos: no distribuir en el EEE y el Reino Unido, o publicar desde una cuenta de organización con dirección comercial. Las páginas de Google que revisamos no explican cómo pasar una cuenta personal existente a una de organización, así que confírmalo en el soporte de Play Console antes de mover apps.

## Cómo declarar en Play Console

### En la cuenta

1. Entra a Google Play Console.
2. Ve a **Manage account > Account details > About you**.
3. Sigue las instrucciones para declarar tu estado de comerciante.

### En cada app (solo si eres comerciante)

1. En Play Console, selecciona la app.
2. En el menú izquierdo, ve a **Monitor and improve > Policy and programs > App content**.
3. Confirma el estado de comerciante de esa app.

Como comerciante, Google también te pedirá el enlace a los términos de servicio de cada app y que certifiques que solo ofreces productos o servicios que cumplen la ley aplicable.

## Resumen en pasos

1. **Confirmado:** todas las cuentas de Play Console deben declarar si son comerciantes antes del 1 de febrero de 2027; las cuentas nuevas lo hacen al crearse.
2. **Confirmado:** desde el 1 de marzo de 2027, un comerciante con cuenta personal tendrá su teléfono y su dirección visibles en todo el mundo.
3. **Confirmado:** si no distribuyes en el EEE ni en el Reino Unido, Google permite declararte no comerciante. Mentir sobre tu estado puede costarte la cuenta.
4. **Qué hacer hoy:** revisa en qué países distribuyes cada app, qué dirección tiene tu perfil de pagos y si las apps de clientes deberían estar en una cuenta de organización.
5. **Antes del 1 de febrero:** haz la declaración en Play Console para no arriesgarte a que bloqueen tus actualizaciones.
