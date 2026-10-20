# DryCalc

Aplicación mobile para calcular los materiales necesarios en obras de construcción en seco: steel framing, tabiques y cielorrasos.

El usuario ingresa las medidas, elige el sistema constructivo y obtiene en segundos la lista de perfiles, placas y accesorios que necesita.

## Funcionalidades

| Funcionalidad | Detalle |
| --- | --- |
| Cálculo de muros | Perfiles, placas y accesorios a partir de las dimensiones ingresadas |
| Selección de sistema | Distintos tipos de muros y cielorrasos |
| Interfaz simple | Formularios con componentes reutilizables |
| Multiplataforma | Android e iOS desde una única base de código |

## Stack

| Área | Tecnología |
| --- | --- |
| Framework | React Native con Expo |
| Lenguaje | TypeScript |
| Componentes | @react-native-picker/picker |
| Calidad de código | ESLint y Prettier |

## Ejecutar en local

| Paso | Comando |
| --- | --- |
| Clonar | `git clone https://github.com/DepaoloJuan/DryCalc.git` |
| Instalar dependencias | `npm install` |
| Iniciar | `npx expo start` |

Después se abre la app con Expo Go en el celular o con un emulador de Android o iOS.

## Estructura

La lógica y las pantallas están en `src/`, el punto de entrada es `App.tsx` y los recursos estáticos están en `assets/`.

## Autor

Juan Manuel Depaolo · [LinkedIn](https://linkedin.com/in/juan-manuel-depaolo) · [GitHub](https://github.com/DepaoloJuan)
