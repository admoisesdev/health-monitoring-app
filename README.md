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
- Listado de consejos de salud.
- Navegación entre pantallas a traves de **_tabs_**.
- UI limpia, organizada y modularizada.
- Adaptación a móviles con resoluciones más pequeñas.

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

### Paso para correr todas las pruebas unitarias (unit testing):
#### Con pnpm:
```
pnpm run test
```

#### Con npm:
```
npm run test
```

---

## 📂 Estructura del Proyecto
Esta _App Móvil_  usa una estructura de carpetas basada en arquitectura limpia
adaptada y modularización. Por lo que usa buenas prácticas de código limpio, principios como
SOLID, etc.

| Carpeta                          | Descripción | Formato para nombrar archivo | 
| -------------------------------- | ----------- | ------------------- |
| `/app`                           | Contiene todas las páginas y layouts anidados de la app móvil, basado en el _App Directory_ de Expo que crea el enrutamiento automáticamente |  N/A |
| `/assets`                        | Contiene todos los recusos estáticos como las imágenes y fuentes que están en la carpeta /fonts |  N/A |
| `/config`                        | Contiene archivos de configuración global para nuestra app(configuraciones de __APIs__, adaptadores, helpers, constantes, etc)  | N/A  |
| `/config/constants`              | Contiene las constantes de la app móvil que guardar datos estáticos para usarlos en la lógica de negocio de los módulos | `NombreDescriptivo.ts` |
| `/config/helpers`                | Contiene funciones que realizan tareas comunes y que pueden ser reutilizadas(por ejemplo, formatear fechas, montos, calculos, etc)  | `NombreDescriptivo.ts` |
| `/infrastructure`                | Es responsable de implementar los detalles de cómo nuestra app interactúa con las __APIs__ como crear las interfaces, mostrar mappers, etc. | N/A |
| `/infrastructure/interfaces`     | Contiene las interfaces más globales que se pueden usar en cualquier parte de la app | `nombre-descriptivo.response.ts`  |
| `/presentation/modulo`           | Contiene código relacionado con la interfaz de usuario de nuestra aplicación. Esto realizado por módulos independientes | N/A |
| `/presentation/theme`            | Contiene todos los componentes tematizados (uso de patrón adaptador y mini librería) y hooks relacionado a los colores que se pueden usar en todos los módulos de nuestra app. | N/A |
| `/presentation/shared`           | Contiene todos los componentes y hooks globales que se pueden usar en todas las pantallas de la app. | N/A |
| `/presentation/modulo/components`| Contiene  los componentes de React que se utilizan en nuestra aplicación, pero de su determinado módulo. | `NombreComponente.tsx` |
| `/presentation/modulo/hooks`     | Contiene los hooks personalizados de React que se utilizan en nuestra aplicación, pero de su determinado módulo. | `useNombrehook.ts` |

---

## 📌 Notas
- Esta aplicación es solo una simulación técnica, no se conecta con un dispositivo BLE real.
- Puede ser ejecutada tanto en iOS como Android usando Expo Go.



