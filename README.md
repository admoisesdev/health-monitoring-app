# HealthMonitoring App

Aplicación móvil simple para **simular** una funcionalidad típica de monitoreo y sincronización de datos de salud, como parte de una prueba técnica.

---

## 🧠 Descripción

1. **Pantalla principal**: Muestra el nombre del usuario, el número de pasos diarios y un botón para "Sincronizar dispositivo" vía BLE.
2. **Pantalla de recomendaciones**: Muestra una lista de consejos para mejorar la salud del usuario.

---

## 🚀 Tecnologías Utilizadas

- **[React Native](https://reactnative.dev/)**
- **[Expo](https://expo.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[React Native Paper](https://callstack.github.io/react-native-paper/)**
- **[Nativewind](https://www.nativewind.dev/)**

---

## 🎯 Funcionalidades

- Simulación de sincronización BLE con un retraso de 2 segundos.
- Barra de carga durante la sincronización.
- Actualización del número de pasos tras cada sincronización.
- Navegación entre pantallas a traves de **_tabs_**.
- UI limpia, organizada y modularizada.

---

## 📲 Instalación y Ejecución

### Requisitos Previos

- Tener instalado **Node.js** y **npm** o **yarn**
- Tener instalado **Expo CLI**  
  Instalar con:
  ```bash
  npm install -g expo-cli
- Tener instalado pnpm (recomendado):
   ```bash
   npm install -g pnpm

### Pasos para correr la app

#### 1. Clonar el repositorio
  ```bash
  git clone https://github.com/admoisesdev/health-monitoring-app.git
  cd health-monitoring-app
 ```

#### Usando pnpm (recomendado):

##### 1. Instalar dependencias:
```
pnpm install
```

##### 2. Iniciar el proyecto con Expo:
```
pnpm start
```
Luego escanea el código QR con la app Expo Go en tu teléfono para ver la aplicación.

#### Alternativa con npm:

##### 1. Instalar dependencias:
```
npm install
```

##### 2. Iniciar el proyecto con Expo:
```
npm start
```

---

## 📂 Estructura del Proyecto

---

## 📌 Notas
- Esta aplicación es solo una simulación técnica, no se conecta con un dispositivo BLE real.
- Puede ser ejecutada tanto en iOS como Android usando Expo Go.



