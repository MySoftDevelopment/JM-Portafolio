---
titulo: 'Composer 2.11.0 y 2.2.31 corrigen dos fallos de seguridad: tokens en composer.lock y escritura fuera de vendor'
descripcion: 'Composer publicó 2.11.0 y 2.2.31 con dos avisos de seguridad y otros arreglos. Cómo saber si tu composer.lock filtró un token y qué actualizar hoy.'
fecha: 2026-10-29T08:00:00-05:00
categoria: seguridad
michi: escudo
etiquetas: ['Composer', 'PHP', 'Laravel', 'GHSA-c968-33g3-wh7p', 'GHSA-fm2w-xgf2-f9fh', 'CI/CD']
fuentes:
    - titulo: 'GHSA-c968-33g3-wh7p: Package names in vendor/composer/installed.json can escape the vendor directory'
      url: 'https://github.com/composer/composer/security/advisories/GHSA-c968-33g3-wh7p'
    - titulo: 'GHSA-fm2w-xgf2-f9fh: Inline repository HTTP headers, such as API tokens, are written into composer.lock'
      url: 'https://github.com/composer/composer/security/advisories/GHSA-fm2w-xgf2-f9fh'
    - titulo: 'Composer: CHANGELOG (2.11.0)'
      url: 'https://github.com/composer/composer/blob/main/CHANGELOG.md'
    - titulo: 'Composer: CHANGELOG de la rama LTS (2.2.31)'
      url: 'https://github.com/composer/composer/blob/2.2/CHANGELOG.md'
    - titulo: 'Composer: documentación de configuración (política cooldown)'
      url: 'https://github.com/composer/composer/blob/2.11.0/doc/06-config.md'
---

El 29 de octubre Composer publicó dos versiones: **2.11.0**, la nueva versión estable, y **2.2.31**, la de soporte extendido (LTS) para quien sigue en PHP antiguo. Las dos corrigen **dos avisos de seguridad** publicados el mismo día, además de otros arreglos menores de seguridad.

No es una alarma del nivel de PHP2Shell: ninguno de los dos fallos se puede disparar publicando un paquete malicioso ni desde internet. Pero uno de ellos puede haber dejado **un token de acceso dentro de tu `composer.lock`**, y ese archivo casi siempre termina en Git. Si trabajas con Laravel o cualquier proyecto PHP, vale la pena revisarlo hoy.

## Qué se corrigió

### Escritura y borrado fuera de vendor (GHSA-c968-33g3-wh7p)

Severidad **alta**, CVSS 3.1 de **7.1**. Composer no validaba los nombres de paquete que lee de `vendor/composer/installed.json`. Un nombre manipulado con segmentos `..` podía hacer que `composer install` **borrara un directorio fuera de `vendor/`**, y que `composer reinstall` además **escribiera archivos allí**. Los nombres que vienen de `composer.lock` o de los repositorios ya se validaban; el hueco estaba solo en ese archivo local.

La condición es que el atacante pueda escribir en tu `installed.json`. Según el aviso, el caso más realista es un **caché de CI** que se restaura en el pipeline y en el que pueden escribir los *pull requests* que vienen de *forks*. Si tu `vendor/` siempre lo genera un `composer install` confiable en la misma máquina, el riesgo práctico es bajo.

### Tokens copiados a composer.lock (GHSA-fm2w-xgf2-f9fh)

Severidad **moderada**, CVSS 3.1 de **5.3**. Si definías un repositorio de tipo `composer` con cabeceras HTTP en línea (`options.http.header`), Composer copiaba esas cabeceras en el `composer.lock` por cada paquete descargado de ese repositorio. Esas cabeceras suelen llevar un token de API.

Te expone solo si se cumplen **todas** estas condiciones:

- Usas un repositorio `composer` privado con cabeceras en línea.
- Ese repositorio está definido **fuera** del `composer.json` del proyecto, por ejemplo en el `config.json` global.
- Descargaste paquetes desde ese repositorio.
- El `composer.lock` resultante lo vio alguien que no debía tener esa credencial (por ejemplo, un repositorio público o compartido con terceros).

Si la cabecera ya estaba en el `composer.json` del proyecto, el lock no añade exposición nueva. Y lo que guardas en `auth.json` o en la variable `COMPOSER_AUTH` (http-basic, bearer, github-oauth, custom-headers) **nunca** se escribió en el lock.

## Versiones afectadas

| Rama | Afectadas | Corregida |
| --- | --- | --- |
| Composer 2 actual | 2.3.0 hasta antes de 2.11.0 | **2.11.0** |
| Composer 2.2 LTS y 1.x | 1.0 hasta antes de 2.2.31 | **2.2.31** |

La rama 2.2 LTS existe para proyectos atascados en PHP viejo: la versión actual de Composer requiere PHP 7.2.5 o superior, mientras que 2.2 sigue funcionando desde PHP 5.3.2.

## Qué más trae 2.11.0

El registro de cambios incluye otras correcciones de seguridad sin aviso propio:

- Los argumentos adicionales que se pasan a scripts `@composer` ahora se escapan.
- Las contraseñas de svn ya no aparecen en la salida de depuración, y las credenciales en URLs se ocultan en los errores de hg y fossil.
- Composer rechaza conexiones TLS que presenten los certificados intermedios de **eMudhra** que fueron comprometidos, aunque el almacén de certificados del sistema confíe en su raíz. En 2.2.31 esto exige `composer/ca-bundle` 1.4.16 o superior.
- Las cabeceras personalizadas de un repositorio ya no se envían a descargas alojadas en otros dominios cuyo nombre empieza igual que el del repositorio.

Hay un **cambio que rompe compatibilidad**: se eliminó la opción `source-fallback`, que llegó en 2.10 como medida temporal. Si una descarga *dist* falla, Composer ya no recurre a clonar el código fuente. Si tu pipeline dependía de eso, puede empezar a fallar.

Y una novedad útil contra ataques a la cadena de suministro: la política **cooldown**, que retiene durante un tiempo las versiones recién publicadas antes de dejarlas instalar. Muchas versiones maliciosas se detectan y retiran en horas o días, así que esperar unos días reduce el riesgo:

```json
{
    "config": {
        "policy": {
            "cooldown": {
                "period": "7 days"
            }
        }
    }
}
```

Se aplica en `composer update` y `composer require`, no toca las versiones `dev-*` ni las que ya están en tu lock y no se están actualizando. Si necesitas un parche urgente, puedes saltártela en una ejecución con `--no-cooldown` o excluir paquetes concretos con la opción `ignore`.

## Qué hacer hoy

### 1. Mira qué versión tienes

```bash
composer --version
```

Hazlo en tu máquina, en el servidor y en las imágenes o *runners* de CI. Suelen tener versiones distintas.

### 2. Actualiza Composer

Si lo instalaste como `composer.phar` global:

```bash
sudo -H composer self-update
```

Si estás en la rama LTS por una versión vieja de PHP, pide la versión exacta:

```bash
composer self-update 2.2.31
```

Si Composer vino del gestor de paquetes de tu sistema operativo, `self-update` no está disponible: tendrás que esperar el paquete de tu distribución o reinstalar Composer desde getcomposer.org.

### 3. Revisa si tu lock tiene cabeceras

Busca entradas `header` en el lock actual y en el historial de Git:

```bash
grep -n '"header"' composer.lock
git log -p -- composer.lock | grep -n '"header"'
```

Si aparece algo, después de actualizar Composer regenera el lock sin tocar versiones:

```bash
composer update --lock
```

Los locks existentes conservan las cabeceras hasta que se reescriben, por eso este paso es necesario. Y si el token llegó a un repositorio que otros pueden ver, **revócalo y crea uno nuevo**: borrarlo del último commit no lo saca del historial. De paso, mueve esa credencial a `auth.json`, que es donde debe vivir.

### 4. Revisa tus cachés de CI

Si tu pipeline restaura la carpeta `vendor/` completa desde un caché compartido, sobre todo uno en el que pueden escribir *pull requests* de *forks*, considera generar `vendor/` en cada ejecución con `composer install` a partir del lock. Así nadie puede colarte un `installed.json` alterado.

## En resumen

1. Comprueba la versión de Composer en tu equipo, servidor y CI.
2. Actualiza a 2.11.0, o a 2.2.31 si estás en la rama LTS.
3. Busca `"header"` en tu `composer.lock` y en su historial; si hay un token, rótalo y ejecuta `composer update --lock`.
4. Revisa si tu pipeline dependía de `source-fallback`.
5. Considera activar la política `cooldown` para no instalar versiones recién publicadas.
