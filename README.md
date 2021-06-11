# IA² | Frontend desktop app

<p align="center">
  <a target="_blank" rel="noopener noreferrer">
    <img width="220px" src="app/assets/img/logo_azul_texto.png" alt="IA²" />
  </a>
</p>
<br/>
<h4 align="center">Aplicación frontend de escritorio del proyecto IA², una herramienta Open Source para la anonimización de documentos.</h4>

---

<p align="center" style="margin-top: 14px;">
  <a
    href="https://github.com/instituciones-abiertas/ia2-desktop-app/blob/main/LICENSE"
  >
    <img
      src="https://img.shields.io/badge/License-GPL%20v3-blue.svg"
      alt="License" height="20"
    >
  </a>
  <a
    href="https://github.com/instituciones-abiertas/ia2-desktop-app/blob/main/CODE_OF_CONDUCT.md"
  >
    <img
      src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg"
      alt="Contributor Covenant" height="20"
    >
  </a>
</p>

## Stack Tecnológico

- [Electron](https://www.electronjs.org/)
- [ReactJs](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Webpack](https://webpack.js.org/)

> Este proyecto fue inicializado con [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate).

## Ambiente de desarrollo

A continuación se detallan las instrucciones a seguir para configurar el ambiente de desarrollo.

### Requisitos previos

- `node`, versión _v12.18.2_ o superior
- `npm`, versión _6.14.5_ o superior
- `yarn`, versión _1.22.5_ o superior

> Node y Npm se pueden instalar y administrar con [nvm](https://github.com/nvm-sh/nvm) (Node version manager, recomendado)

Luego de instalar `nvm`, descargar una versión de node para utilizar:

```bash
nvm install v12.18.2
```

Verificar las versiones instaladas

```bash
node --version
npm --version
```

Instalar yarn y verificar versión

> Yarn es utilizado por la mayoría de subprocesos de electron

```bash
npm install --global yarn
yarn --version
```

### Variables de ambiente

Realizar una copia del archivo `.env.example` y renombrarlo a `.env`. Luego, será necesario configurar las variables de ambiente.

```bash
cp .env.example .env
```

### Servidor

- `BASE_URL:` Url del servidor de ia².
- `API_URL:` Namespace de la api para la url. Generalmente `/api`.

**Ejemplo para un servidor local:**

```bash
BASE_URL=localhost:8000
API_URL=/api
```

#### Sentry

> Utilizamos Sentry para el reporte de errores.

- `SENTRY_DSN`: url del servicio de Sentry.
- `SENTRY_RELEASE`: setea el ambiente de Sentry (`staging`, `demo`, `prod`, `qa`, etc...)

#### Habilitar funcionalidad de selección múltiple de entidades

> Con el propósito de agilizar el proceso de etiquetado de entidades que se encuentran repetidas en el documento, es posible habilitar la funcionalidad de selección automática. Se trata de un componente que se renderiza en el paso de Edición del documento.
> Por defecto se encuentra deshabilitada.

- `MULTIPLE_SELECTION_ENABLE`: true

### Instalación

`npm install`

> #### No se encuentra la librería `libvips`
>
> En algunos sistemas operativos la librería `libvips` no se encuentra disponible por defecto, el siguiente error aparece durante la instalación.
>
> ```bash
> ../src/common.cc:25:10: fatal error: vips/vips8: No such file or directory
>    25 | #include <vips/vips8>
> ```
>
> Solución: instalar libvips via `apt install libvips-dev`.

### Iniciar el servidor de desarrollo

Se puede utilizar cualquier de los siguientes comandos:

_Utilizando `npm`_

```bash
npm run dev
```

_Utilizando `yarn`_

```bash
yarn dev
```

## Tests

Los tests de integración utilizan una instancia activa del [servidor de IA²](https://github.com/instituciones-abiertas/ia2-server). Del mismo modo, las variables de ambiente para tests deben estar disponibles en la terminal donde se correrán los tests.

Una vez configuradas las variables, exponer los valores de ambiente utilizando:

```bash
source .env
```

Luego es posible ejecutar las pruebas utilizando:

```bash
yarn run test-e2e
```

Con hot reload

```bash
yarn run test-e2e-live
```

## Generación de builds y paquetes

Para conocer detalles de configuración para realizar el build de la aplicación, se puede visitar la [documentación oficial](https://www.electron.build/configuration/configuration#Metadata-homepage) de electron-builder.

```bash
yarn build
```

**Build para producción:**

```bash
OPEN_ANALYZER=true yarn build
```

**Build para producción con debug habilitado:**

```bash
yarn cross-env DEBUG_PROD=true yarn package
```

**Generar package local:**

> _El package creado será almacenado en el directorio `/release`._

### Package para plataforma local

```bash
yarn package
```

### Package para múltiples platformas

> Para generar un package desde un tipo de plataforma para otra distinta, debemos instalar las dependencias necesarias.
> Ver la [documentación oficial](https://www.electron.build/multi-platform-build#linux) para más información.

**Package para Linux:**

```bash
yarn package --linux
```

**Package para Windows:**

```bash
yarn package --windows
```

**Opciones:**

- Es posible indicar la arquitectura para generar el build añadiendo alguna de las siguientes flags.
- `--ia32`
- `--x64`

## Licencia

[**GNU General Public License version 3**](LICENSE)

## Contribuciones

Por favor, asegúrese de leer los [lineamientos de contribución](CONTRIBUTING.md) antes de realizar Pull Requests.
