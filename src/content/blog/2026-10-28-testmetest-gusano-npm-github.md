---
titulo: 'testmetest: el gusano de npm que convirtió 42 repositorios de GitHub en trampas para Claude, Cursor y VS Code'
descripcion: 'Un gusano de npm roba tokens, se propaga a tus paquetes y borra tu carpeta personal si revocas el token sin limpiar antes. Cómo revisarte y en qué orden actuar.'
fecha: 2026-10-28T11:00:00-05:00
categoria: seguridad
michi: paquete
etiquetas: ['npm', 'Node.js', 'GitHub', 'cadena de suministro', 'malware', 'Claude Code', 'Cursor']
fuentes:
    - titulo: 'SafeDep: testmetest npm Packages Carry a New Miasma Worm Variant (22 oct 2026)'
      url: 'https://safedep.io/testmetest-npm-worm-miasma-variant/'
    - titulo: 'JFrog Security Research: Beyond testmetest, 42 hijacked GitHub repos (26 oct 2026)'
      url: 'https://research.jfrog.com/post/beyond-testmetest-42-hijacked-github-repos/'
    - titulo: 'GitHub Advisory Database: GHSA-6cj6-rwg9-r9jc, malicious code in data-pipeline-testmetest'
      url: 'https://github.com/advisories/GHSA-6cj6-rwg9-r9jc'
---

Mientras medio internet parcheaba PHP y Node.js, en npm circulaba otro problema, uno que no se arregla actualizando. El 22 de octubre la empresa de seguridad SafeDep documentó **testmetest**, un gusano que se esconde en paquetes de npm. Hasta ese momento sumaba **62 versiones maliciosas** publicadas desde cuatro cuentas. El 26 de octubre JFrog mostró hasta dónde había llegado: **42 repositorios de GitHub de 11 dueños legítimos** modificados para infectar a quien los abriera.

Lo nuevo de este ataque es la forma de entrar. Ya no depende solo de `npm install`: también usa la configuración de los **asistentes de IA y editores** que hoy casi todos tenemos abiertos.

## Cómo infecta

### Al instalar el paquete

El código malicioso se ejecuta durante la instalación, pero esquiva los lugares donde normalmente se revisa:

- **Sin un script `postinstall` visible.** Usa el archivo `binding.gyp`, el que compila módulos nativos con `node-gyp`. Cuando npm compila el módulo, ese archivo ejecuta el código malicioso.
- **Con un módulo nativo cifrado.** Otras versiones cargan un archivo `.node` que descifra la carga maliciosa.
- **Al cargar el módulo.** La variante más nueva se ejecuta cuando Node.js carga el módulo nativo, no al instalarlo. Por eso **`--ignore-scripts` no la detiene**.

### Al abrir el repositorio con tu editor o asistente

En los 42 repositorios comprometidos, JFrog encontró archivos de configuración preparados para que el código se ejecute con acciones de todos los días, como **abrir la carpeta del proyecto**:

- `.claude/settings.json` (Claude Code)
- `.gemini/settings.json` (Gemini CLI)
- `.cursor/mcp.json` y `.cursor/rules/setup.mdc` (Cursor)
- `.vscode/tasks.json` (VS Code)

La carga maliciosa estaba en `.github/init.js`, envuelta en archivos de **casi 13 MB** generados para que cada copia se viera distinta. Con ese tamaño, quedaban fuera del buscador de código de GitHub.

## Qué hace una vez dentro

Según SafeDep y JFrog:

- **Roba credenciales:** llaves SSH, tokens de npm y PyPI, credenciales de la nube, contraseñas guardadas en el navegador y **credenciales de herramientas de IA** (Claude, Codex, Gemini, Copilot).
- **Se propaga:** inyecta su cargador en tus paquetes de npm y los vuelve a publicar, publica en PyPI y RubyGems, y añade flujos de trabajo maliciosos a tus repositorios de GitHub o GitLab.
- **Se deja una trampa:** durante 48 horas vigila el token de GitHub que robó. Si GitHub responde que el token ya no es válido (401 o 403), es decir, si lo revocas, **borra tu carpeta personal**.

Ese último punto cambia el orden de la limpieza, que se explica más abajo.

## Cómo revisar si estás infectado

En Linux o macOS, busca la persistencia que instala:

```bash
ls -la ~/.local/bin/net-health-checker.sh ~/.config/net-health-checker 2>/dev/null
systemctl --user list-units --all 2>/dev/null | grep -E "net-health-checker|pkg-runtime"
systemctl list-units --all 2>/dev/null | grep -E "net-health-checker|pkg-runtime"
```

En macOS revisa también los LaunchAgents:

```bash
launchctl list | grep -E "net-health-checker|pkg-runtime"
```

Otras señales: archivos `.napi_cache` en tus proyectos o en `node_modules`, conexiones al dominio `aiarmor[.]website` y paquetes con `testmetest` en el nombre dentro de tu `package-lock.json` o `yarn.lock`.

## Si estás infectado: el orden importa

El aviso de GitHub y el informe de JFrog coinciden: **quita la persistencia antes de revocar el token**. Si lo haces al revés, el gusano detecta la revocación y borra tu carpeta personal.

1. **Desconecta el equipo de la red.**
2. **Quita la persistencia:** detén y elimina el servicio de systemd o el LaunchAgent (`net-health-checker`, `pkg-runtime`) y borra `~/.local/bin/net-health-checker.sh` y `~/.config/net-health-checker/`.
3. **Desde otro equipo limpio, revoca y rota todo:** tokens de GitHub, GitLab y npm, llaves SSH, credenciales de la nube, claves de API de proveedores de IA y cualquier secreto que hubiera en ese equipo o en tu CI.
4. **Revisa lo que publicaste:** versiones nuevas de tus paquetes en npm que no reconozcas y commits recientes en `.github/`, `.claude/`, `.cursor/`, `.gemini/` o `.vscode/` de tus repositorios.
5. **Reinstala el sistema operativo.** SafeDep lo recomienda: no hay forma fiable de saber qué más quedó.

## Cómo protegerte de lo que viene

Este no será el último gusano de npm del año. Algunos hábitos que reducen el riesgo:

- **Antes de abrir un repositorio que no es tuyo** con Claude Code, Cursor o VS Code, revisa las carpetas `.claude/`, `.cursor/`, `.gemini/` y `.vscode/`. Estas herramientas te preguntan si confías en la carpeta. **No aceptes por costumbre**: en VS Code, el modo restringido es la opción segura para código ajeno.
- **Instala con el lockfile:** `npm ci` (o `yarn install --frozen-lockfile`) solo instala lo que ya está fijado y no "lo último".
- **Sospecha de las dependencias nuevas,** sobre todo de paquetes recién publicados, con pocas descargas o con módulos nativos que en realidad no necesitan.
- **Usa tokens con permisos mínimos y caducidad corta:** tokens *fine-grained* en GitHub y tokens granulares de npm. Si te los roban, el daño es menor.
- **Activa la autenticación en dos pasos para publicar en npm,** para que un token robado no baste para sacar una versión nueva de tu paquete.

## En resumen

1. Busca `net-health-checker` y `pkg-runtime` en tu equipo y `testmetest` en tus lockfiles.
2. Si estás infectado: desconecta, quita la persistencia y solo después revoca los tokens desde otro equipo.
3. No abras repositorios ajenos con tu asistente de IA sin revisar antes sus carpetas de configuración.
4. Instala con el lockfile y reduce los permisos de tus tokens.
