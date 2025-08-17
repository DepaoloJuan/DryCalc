<img width="638" height="411" alt="Captura de pantalla 2025-08-17 024547" src="https://github.com/user-attachments/assets/c95edc6d-40cf-44c7-8c5c-ab7de7c5eb9d" />


# 📐 DryCalc

**DryCalc** es una aplicación móvil desarrollada en **React Native**, diseñada para facilitar los cálculos en proyectos de construcción en seco, como steel framing, tabiques y cielorrasos. La aplicación permite a los usuarios ingresar medidas, seleccionar tipos de muros o cielorrasos, y obtener de manera rápida y clara los materiales necesarios.

---

## ✨ Características

- 📏 **Cálculo de muros**: Determina los perfiles, placas y accesorios necesarios según las dimensiones ingresadas.
- 🧱 **Selección de sistemas**: Permite elegir entre diferentes tipos de muros o cielorrasos.
- ⚡ **Interfaz intuitiva**: Diseñada con componentes reutilizables para una experiencia de usuario fluida.
- 📱 **Compatibilidad**: Funciona en dispositivos Android e iOS, utilizando Expo o React Native CLI.
- 🔧 **Código modular**: Estructura organizada que facilita el mantenimiento y futuras mejoras.

---

## 🛠️ Tecnologías Utilizadas

- [React Native](https://reactnative.dev/) – Framework principal para el desarrollo de la aplicación.
- [TypeScript](https://www.typescriptlang.org/) – Proporciona tipado estático y robustez al código.
- [@react-native-picker/picker](https://github.com/react-native-picker/picker) – Implementación de selectores personalizados.
- [Expo](https://expo.dev/) *(opcional, para pruebas rápidas)*.
- [Git & GitHub](https://github.com/) – Herramientas para el control de versiones.

---

## 📂 Estructura del Proyecto

```
drycalc/
├── components/
│   └── Select.tsx          # Componente reutilizable de selección
├── screens/
│   └── MuroFormScreen.tsx   # Pantalla principal para el cálculo de muros
├── App.tsx                  # Punto de entrada de la aplicación
├── package.json
└── README.md
```

---

## 🚀 Instalación y Ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/DepaoloJuan/DryCalc.git
   cd DryCalc
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Ejecuta en modo desarrollo:

   - Con Expo:

   ```bash
   npx expo start
   ```

   - Con React Native CLI:

   ```bash
   npx react-native run-android
   # o
   npx react-native run-ios
   ```

---

## 📸 Capturas de Pantalla

*(Agrega imágenes de la aplicación en funcionamiento aquí)*

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas 🙌. Aquí hay algunos pasos sugeridos:

1. Haz un fork del repositorio.
2. Crea una rama para tu mejora:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realiza un commit y push de tus cambios.
4. Abre un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes usar, modificar y distribuir el código libremente, siempre que se mencione al autor original.

---

## 👨‍💻 Autor

**Juan Manuel Depaolo**  
📧 [juanmanueldepaolo@gmail.com](mailto:juanmanueldepaolo@gmail.com)

---
Espero que esta versión te resulte útil y profesional. ¡Buena suerte con tu proyecto!
