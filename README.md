# Mern Tasks Client APP

## [Live Demo WIP](https://confident-blackwell-6bbe12.netlify.app/)

## Capturas de Aplicación

<br>

### Login

<br>

<img src="https://github.com/panchoarc/merntasks-app-client/blob/master/images/Login.PNG?raw=true" width="400" height="300" alt="Login">

<br><br>

### Crear Usuario

<br>

<img src="https://github.com/panchoarc/merntasks-app-client/blob/master/images/CrearUsuario.PNG?raw=true" width="400" height="300" alt="Login">

<br><br>

### Proyectos

<br>

<img src="https://github.com/panchoarc/merntasks-app-client/blob/master/images/App.PNG?raw=true" width="600" height="300" alt="Login">

<br><br>

# Tecnologías Utilizadas

- [Create React App](https://create-react-app.dev/docs/getting-started/)

Herramienta oficial para la creación de SPA (Single Page Applications) utilizando react para la construcción rápida sin configuración.

- [Axios](https://github.com/axios/axios)

Cliente HTTP basado en promesas

- [Cypress](https://docs.cypress.io/guides/overview/why-cypress)

Framework que permite realizar pruebas e2e (End to end)

<br>

# Scripts Disponibles

### `npm start` o `yarn start`

Nos permite iniciar la aplicación en modo desarrollo en el puerto 3000

### `npm run build`

Nos permite crear el bundle de producción. Este bundle se localiza en **build**

### `npm run cy:open`

Nos permite iniciar la GUI de Cypress mostrandonos las pruebas escritas para su ejecución.

## Capturas
<br>

<img src="https://github.com/panchoarc/merntasks-app-client/blob/master/images/DashboardCypress.PNG?raw=true" width="600" height="300" alt="Login">

## Docker

Si desea construir la aplicación en un contenedor de Docker, utilice la siguiente sintaxis:

**_Para su construcción:_**

```docker
docker build -t <NombreAplicación> .
```

**_Para su despliegue:_**

```docker
docker run -dp puertocontenedor:puertomaquina --name <NombreContenedorAplicación> <NombreAplicación>
```
