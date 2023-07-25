# Weather App

## Descripción

Esta es una aplicación moderna del clima que utiliza la API proporcionada por [OpenWeatherMap](https://openweathermap.org/) para recopilar datos meteorológicos, construida con la popular biblioteca de JavaScript - React,. La aplicación aprovecha el poder de los service workers para la funcionalidad offline y mejoras de rendimiento. Los service workers actúan como un proxy entre el navegador y la red, permitiendo que la aplicación funcione offline y cargue más rápido en visitas posteriores.

## NOTA IMPORTANTE
Es necesario **permitir que el navegador obtenga tu ubicación**

## Generar el sw.js
Para cargar el workbox del Service Worker en local es necesario usar el comando **npm run build && npm run generate-sw** para generar las build necesarias.

## Dependencias

- `@testing-library/jest-dom`
- `axios`
- `bootstrap`
- `idb`
- `node-sass`
- `react`
- `react-bootstrap`
- `react-dom`

## Scripts

- `start`: Inicia la aplicación en modo de desarrollo.
- `build`: Construye la aplicación para producción.
- `test`: Ejecuta las pruebas.
- `check-coverage`: Verifica la cobertura de las pruebas.
- `test:watch`: Ejecuta las pruebas en modo observación.


## Configuraciones adicionales

El proyecto también utiliza configuraciones de ESLint, Prettier, lint-staged, Jest y Husky para asegurar la calidad del código, gestionar el formateo del código.
