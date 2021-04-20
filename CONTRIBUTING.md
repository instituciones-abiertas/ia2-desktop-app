# Guía de contribución de IA²-Desktop-App

¡Hola! Estamos muy emocionadxs de que estes interesadx en contribuir a IA²-Desktop-App. Antes de enviar Pull Requests, asegurate de tomarte un momento y leer las siguientes pautas:

- [Código de conducta](https://github.com/instituciones-abiertas/ia2-desktop-app/blob/master/.github/CODE_OF_CONDUCT.md)
- [Pautas para la apertura de issues](#pautas-para-la-apertura-de-issues)
- [Pautas para la apertura de Pull Requests](#pautas-para-la-apertura-de-pull-requests)
- [Configuración de desarrollo](#configuración-de-desarrollo)
- [Estructura del proyecto](#estructura-del-proyecto)

## Pautas para la apertura de issues

- Utiliza siempre nuestros templates de issue para [**bugs**](url-del-template) o para [**features**](url-del-template) para crear issues.

## Pautas para la apertura de Pull Requests

- La rama `main` es solo un snapshot de la última versión estable. Todo el desarrollo debe realizarse en ramas dedicadas que apunten a la rama `develop`. **No envíes PRs contra la rama `main`.**

- Siempre realizar un checkout partiendo de la rama en cuestión, ej: `develop` y realizar el merge contra esa misma rama al finalizar. Siga esta convención para la nueva rama: `númeroDeIssue-usuarioDeGithub-títuloDeCommit`.

- Esta bien realizar varios commit pequeños mientras trabajas en el PR. Podemos realizar un squash antes de mergear la rama, si es necesario.

- Si agregas una nueva característica:

  - Agrega un caso de prueba
  - Proporciona una razón convincente para agregar esta función. Idealmente, primero debes abrir un issue comentando la sugerencia y aguardar que se apruebe antes de trabajar en él.

- Si arreglas un bug:
  - Si estas resolviendo un caso especial sigue la convención de nomenclatura de ramas mencionada anteriormente.
  - Proporciona una descripción detallada de la resolución del bug en el PR. Se prefiere una demostración en vivo.

## Configuración de desarrollo

Necesitarás **Node**, preferentemente versión **12.18.2** o **posterior**.

Después de clonar el repositorio forkeado, sigue las instrucciones de desarrollo en [README.md](README.md#Ambiente-de-desarrollo)

### Escritura de commits

No esperamos ninguna convención estricta, pero agradeceríamos que resumieras de qué trata el contenido de tus modificaciones al escribir un commit.

## Estructura del proyecto

- **`.env`**: archivo de configuración general del proyecto.

- **`app/api`**: `<DIR>` contiene los módulos dedicados a realizar solicitudes HTTP para el host declarado en el archivo `.env`.

- **`app/containers`**: `<DIR>` Módulos dedicados a la implementación de contenedores de componentes reutilizables. Generalmente presentan interacciones con los módulos de **api**, wrappers de theme gráficos y solicitudes a la store de redux.

- **`app/features`**: `<DIR>` Módulos dedicados a la representación lógica de las secciones de la aplicación, por ejemplo: pantalla de acceso, pantalla de stepper.
