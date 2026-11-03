---
titulo: 'Node.js 26 ya es LTS (Lithium): qué cambia, cuándo muere Node.js 22 y cómo migrar tu servidor'
descripcion: 'Node.js 26.13.0 marca el paso de la rama 26 a LTS con soporte hasta abril de 2029. Qué rompe frente a 22 y 24, qué pasa con esas versiones y cómo migrar.'
fecha: 2026-11-03T08:00:00-05:00
categoria: lanzamientos
michi: piensa
etiquetas: ['Node.js', 'LTS', 'Node.js 26', 'Node.js 22', 'Node.js 24', 'Debian']
formato: carrusel
resumen:
    - 'Desde el 28 de octubre, **Node.js 26** es la versión LTS más nueva, con el nombre Lithium. Tendrá soporte hasta el final de abril de 2029.'
    - 'Node.js 24 pasó a mantenimiento: solo recibe arreglos críticos y de seguridad. Node.js 22 deja de tener soporte el [30 de abril de 2027](treinta de abril de dos mil veintisiete).'
    - 'Si sigues en Node.js 20, ya no recibe parches de seguridad. Ese servidor es el primero que debes migrar.'
    - 'Antes de saltar, revisa los cambios que rompen: APIs eliminadas, **módulos nativos** que hay que recompilar y binarios de Linux que ahora necesitan libatomic.'
    - 'No uses Node.js 27 en producción: es una versión alfa pensada para probar librerías.'
fuentes:
    - titulo: 'Node.js 26.13.0 (LTS), 28 oct 2026'
      url: 'https://nodejs.org/en/blog/release/v26.13.0'
    - titulo: 'Node.js 26.0.0 (Current), 5 may 2026'
      url: 'https://nodejs.org/en/blog/release/v26.0.0'
    - titulo: 'nodejs/Release: calendario de versiones'
      url: 'https://github.com/nodejs/Release'
    - titulo: 'Node.js: versiones anteriores y estado de cada rama'
      url: 'https://nodejs.org/en/about/previous-releases'
    - titulo: 'Node.js 27.0.0-alpha.0.0.0, 29 oct 2026'
      url: 'https://nodejs.org/en/blog/release/v27.0.0-alpha.0.0.0'
    - titulo: 'Documentación de Node.js 26: process.release'
      url: 'https://nodejs.org/docs/latest-v26.x/api/process.html#processrelease'
    - titulo: 'nvm: README'
      url: 'https://github.com/nvm-sh/nvm'
    - titulo: 'Debian: paquete libatomic1'
      url: 'https://packages.debian.org/search?keywords=libatomic1&searchon=names&suite=stable&section=all'
---

El 28 de octubre salió **Node.js 26.13.0**, y con ella la rama 26 pasó oficialmente a **soporte de largo plazo (LTS)** con el nombre clave **Lithium**. No trae funciones nuevas: según las notas de la versión, frente a 26.12.1 solo cambia la metadata que la marca como LTS. Lo importante es lo que significa para tus servidores: hay una nueva versión recomendada para producción, Node.js 24 bajó a mantenimiento y a Node.js 22 le quedan menos de seis meses.

Si tienes APIs, bots o tareas programadas en Node.js, este es un buen momento para revisar en qué versión corren y planear el salto con calma, antes de que el calendario te obligue.

## Qué pasó

El proyecto Node.js promueve sus ramas pares a LTS unos seis meses después de su lanzamiento. Node.js 26 salió el 5 de mayo de 2026 como versión _Current_ y desde el 28 de octubre está en **Active LTS**. En esa fase recibe arreglos y también funciones que el equipo de versiones revisa y considera estables.

La página oficial de versiones lo dice sin rodeos: las aplicaciones en producción solo deberían usar ramas en _Active LTS_ o _Maintenance LTS_.

## En qué quedó cada versión

Según el calendario del repositorio `nodejs/Release`:

| Rama | Nombre | Estado hoy | Pasa a mantenimiento | Fin de soporte |
| --- | --- | --- | --- | --- |
| 26.x | Lithium | Active LTS | 20 oct 2027 | 30 abr 2029 |
| 24.x | Krypton | Maintenance LTS | 20 oct 2026 | 30 abr 2028 |
| 22.x | Jod | Maintenance LTS | 21 oct 2025 | 30 abr 2027 |
| 20.x | Iron | Sin soporte (EOL) | — | Ya terminó |
| 27.x | — | Alfa | — | 30 abr 2030 |

En la práctica:

- **Node.js 24** sigue siendo una opción sólida hasta 2028, pero ya solo recibe arreglos críticos y de seguridad.
- **Node.js 22** muere el 30 de abril de 2027. Si es tu versión de producción, tienes unos seis meses para migrar.
- **Node.js 20** ya no recibe parches. En los avisos de seguridad del 21 de octubre solo hubo versiones corregidas para 22, 24 y 26, y el proyecto recuerda que las versiones sin soporte siempre quedan afectadas. Si tienes algo en 20, es lo primero que debes mover.
- **Node.js 27** salió el 29 de octubre como alfa. Es para que los autores de librerías prueben, no para producción. Las notas ya avisan cambios grandes, como un nuevo límite de memoria por defecto y la exigencia de OpenSSL 3 o superior.

Además, el calendario cambia a partir de Node.js 27: habrá una versión mayor por año, todas pasarán a LTS y la diferencia entre pares e impares deja de importar.

## Qué rompe si vienes de 22 o 24

Las notas de Node.js 26.0.0 listan los cambios mayores. Estos son los que más probablemente te toquen en un proyecto real:

- **Módulos nativos.** `NODE_MODULE_VERSION` sube a 147, así que los paquetes con código nativo compilados para versiones anteriores hay que recompilarlos. Borra `node_modules` y vuelve a instalar en el servidor o en tu CI con Node.js 26.
- **APIs eliminadas.** Se quitó por completo `http.Server.prototype.writeHeader()` (usa `writeHead()`) y los módulos internos `_stream_readable`, `_stream_writable`, `_stream_duplex`, `_stream_transform`, `_stream_passthrough` y `_stream_wrap`. También se retiró el flag `--experimental-transform-types`.
- **Deprecaciones en tiempo de ejecución.** `module.register()` ahora muestra advertencia, igual que varias APIs de `crypto` y `stream`. No rompen todavía, pero llenan los logs y anuncian que se van.
- **Otros cambios de comportamiento.** La API `Temporal` para fechas viene activada por defecto, `localStorage` devuelve `undefined` si no se configuró un archivo y los streams legibles entregan un buffer por lectura.
- **Linux y libatomic.** Las notas de 26.13.0 advierten que, desde Node.js 25, los binarios oficiales para Linux están enlazados con `libatomic`, que en algunas distribuciones hay que instalar aparte. Si vienes de 22 o 24, es justo tu caso.

Si tu código o tus dependencias usan algo de lo anterior, lo vas a ver al correr las pruebas. Por eso conviene migrar primero en desarrollo.

## Cómo saber qué versión usas

En el servidor, revisa la versión y si es LTS:

```bash
node -v
node -p "process.release.lts"
```

Según la documentación, `process.release.lts` devuelve el nombre de la rama LTS (por ejemplo `Lithium`) y `undefined` en versiones que no son LTS. Repite esto en cada servidor, contenedor y en la configuración de tu CI: es común que el servidor esté en una versión y el pipeline en otra.

## Cómo migrar a Node.js 26

### 1. Prueba en local

Si usas nvm, instala la rama nueva y reinstala tus paquetes globales desde la versión que usas hoy:

```bash
nvm install --reinstall-packages-from=default lts/lithium
```

Luego, en cada proyecto, borra `node_modules`, instala de nuevo y corre las pruebas y el build. Fíjate en las advertencias de deprecación en la consola.

### 2. Prepara el servidor Linux

En Debian, instala `libatomic1` antes de poner los binarios oficiales de Node.js 26:

```bash
sudo apt install libatomic1
```

El paquete está en los repositorios de Debian estable. Si usas otra forma de instalar Node.js en el servidor, revisa que la versión resultante sea 26.13.0 o superior.

### 3. Actualiza el CI y los contenedores

Cambia la versión de Node.js en tu pipeline y en tus imágenes de Docker al mismo tiempo que en el servidor. Así compilas los módulos nativos con la misma versión con la que corren en producción.

### 4. Despliega y vigila

Sube primero un servicio de bajo riesgo, revisa logs y memoria durante unos días y luego sigue con el resto.

## En resumen

1. Ejecuta `node -v` en cada servidor, contenedor y CI.
2. Si algo corre en Node.js 20, migra ya: no recibe parches de seguridad.
3. Si estás en 22, planea la migración antes del 30 de abril de 2027.
4. Para proyectos nuevos o migraciones, usa Node.js 26 (Lithium), con soporte hasta abril de 2029.
5. Antes de migrar, revisa APIs eliminadas, recompila módulos nativos e instala `libatomic1` en Linux.
6. No uses Node.js 27 en producción mientras sea alfa.
