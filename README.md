# HealthBridge Frontend

Sistema médico completo construido con Vue 3, TypeScript y Bootstrap 5. Integración total con 7 microservicios del backend.

## 🚀 Inicio Rápido

### Pre-requisitos
- Node.js v20.19.0+ o v22.12.0+
- npm v10+
- Backend corriendo (7 microservicios en puertos 3001-3007)

### Instalación

```sh
# 1. Instalar dependencias
npm install

# 2. (Opcional) Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local si necesitas cambiar puertos

# 3. Iniciar servidor de desarrollo
npm run dev
```

**Acceso:** `http://localhost:5173`

---

## ⚠️ ¿Todo funcionará?

**Sí, SI tu backend cumple estos requisitos:**

✅ **Los 7 microservicios están corriendo** (puertos 3001-3007)  
✅ **CORS configurado** para `http://localhost:5173`  
✅ **Base de datos conectada** en cada servicio  
✅ **Endpoints implementados** según especificaciones

**👉 Ver checklist completo:** [`PRE_LAUNCH_CHECKLIST.md`](./PRE_LAUNCH_CHECKLIST.md)

---

## 📁 Documentación

| Archivo | Descripción |
|---------|-------------|
| [`PRE_LAUNCH_CHECKLIST.md`](./PRE_LAUNCH_CHECKLIST.md) | ✅ Checklist de verificación pre-lanzamiento |
| [`INTEGRATION_REPORT.md`](./INTEGRATION_REPORT.md) | 📊 Reporte técnico de 82 endpoints integrados |
| [`IMPLEMENTATION_SUMMARY.md`](./IMPLEMENTATION_SUMMARY.md) | 📝 Resumen ejecutivo de implementación |
| [`CompleteExecutionGuide.md`](./CompleteExecutionGuide.md) | 🐳 Guía de ejecución con Docker |

---

## 🏗️ Arquitectura

### Stack Tecnológico
- **Framework:** Vue 3 (Composition API)
- **Language:** TypeScript
- **State Management:** Pinia
- **Routing:** Vue Router
- **UI Framework:** Bootstrap 5
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Testing:** Vitest + Playwright

### Microservicios Integrados
```
┌─────────────────────────────────────────────────────┐
│                Frontend (Vue 3)                     │
│                http://localhost:5173                │
└──────────────────┬──────────────────────────────────┘
                   │ /api/*
        ┌──────────┴───────────┐
        │   Vite Proxy Server   │
        └──────────┬───────────┘
                   │
    ┌──────────────┼──────────────────────┐
    │              │                      │
    ▼              ▼                      ▼
┌────────┐   ┌────────┐            ┌────────┐
│ Auth   │   │ User   │    ...     │ Sub    │
│ :3001  │   │ :3002  │            │ :3007  │
└────────┘   └────────┘            └────────┘
```

**Servicios:**
1. Auth (3001) - Autenticación JWT
2. User (3002) - Usuarios y doctores
3. Appointment (3003) - Citas médicas
4. Medical Record (3004) - Historiales médicos
5. Notification (3005) - Notificaciones + WebSocket
6. Billing (3006) - Facturación
7. Subscription (3007) - Suscripciones

---

## 🎯 Características Implementadas

### ✅ Autenticación
- Login/Logout
- Registro de usuarios
- Refresh token automático
- Reset de contraseña

### ✅ Dashboard
- Vista general por rol (patient/doctor/admin)
- Perfil de usuario

### ✅ Citas Médicas
- Lista de citas (filtros, paginación)
- Crear nueva cita
- Ver detalles y editar
- Enviar recordatorios

### ✅ Registros Médicos
- Lista de registros (filtros por fecha/doctor/estado)
- Crear registro (solo doctores)
- Ver/editar detalles
- Signos vitales
- Prescripciones
- Archivos médicos (upload/download)
- Compartir registros

### ✅ Notificaciones
- Campana con badge en header
- Lista completa con paginación
- **Tiempo real vía WebSocket**
- Marcar como leídas
- Navegación inteligente por tipo

### ✅ Facturación
- Lista de facturas
- Ver detalles de factura
- Historial de pagos

### ✅ Suscripciones
- Ver planes disponibles
- Mi suscripción actual
- Upgrade/Downgrade
- Historial de pagos
- Control de uso

### ✅ Admin
- Gestión de usuarios (CRUD)
- Filtros por rol/estado

---

## 📊 Cobertura de Endpoints

**Total:** 82/82 endpoints (100%)

| Servicio | Endpoints | Estado |
|----------|-----------|--------|
| Auth | 7 | ✅ Completo |
| User | 13 | ✅ Completo |
| Appointment | 10 | ✅ Completo |
| Medical Record | 20 | ✅ Completo |
| Notification | 4 | ✅ Completo |
| Billing | 11 | ✅ Completo |
| Subscription | 17 | ✅ Completo |

---

## 🔧 Comandos Disponibles

```sh
# Desarrollo
npm run dev                 # Servidor desarrollo (http://localhost:5173)

# Testing
npm run test:unit           # Tests unitarios (Vitest)
npm run test:e2e            # Tests E2E (Playwright)
npm run type-check          # Verificación de tipos TypeScript

# Build
npm run build               # Build para producción
npm run preview             # Preview del build

# Linting
npm run lint                # ESLint + auto-fix
npm run format              # Prettier
```

---

## 🔐 Seguridad

### Role-Based Access Control (RBAC)
- **Patient:** Citas, historial médico propio, facturación
- **Doctor:** Citas, crear registros médicos, pacientes
- **Admin:** Gestión de usuarios, reportes, configuración

### JWT con Refresh Token
- Token de acceso (15 min)
- Refresh automático en interceptor Axios
- Logout automático si refresh falla

---

## 🛠️ Configuración Avanzada

### Variables de Entorno

Crea `.env.local` para personalizar:

```bash
# API
VITE_API_URL=/api
VITE_API_TIMEOUT=30000

# WebSocket (notificaciones en tiempo real)
VITE_WS_URL=ws://localhost:3005

# Microservicios (solo si puertos diferentes)
VITE_AUTH_SERVICE_TARGET=http://localhost:3001
VITE_USER_SERVICE_TARGET=http://localhost:3002
# ... etc
```

### Proxy de Desarrollo

El archivo `vite.config.ts` configura un proxy que redirige:
- `/api/auth/*` → `http://localhost:3001`
- `/api/users/*` → `http://localhost:3002`
- ... etc

Esto evita problemas de CORS en desarrollo.

---

## 🧪 Testing

### Unit Tests (Vitest)
```sh
npm run test:unit
```

### E2E Tests (Playwright)
```sh
# Instalar navegadores (solo primera vez)
npx playwright install

# Ejecutar tests
npm run test:e2e
```

### Type Checking
```sh
npm run type-check
```

---

## 🚀 Despliegue

### Opción 1: Build estático

```sh
# Build
npm run build

# Resultado en /dist
# Sirve con nginx, apache, etc.
```

### Opción 2: Docker

```sh
# Build imagen
docker build -t healthbridge-frontend .

# Ejecutar contenedor
docker run -p 80:80 healthbridge-frontend
```

Ver [`DockerGuide.md`](./DockerGuide.md) para más detalles.

---

## 🐛 Troubleshooting

### Error: "Network Error" o "CORS Error"
**Solución:** Configura CORS en tu backend para permitir `http://localhost:5173`

### Error: "401 Unauthorized"
**Solución:** Verifica que el token JWT se guarda en localStorage después del login

### Error: "404 Not Found" en rutas de API
**Solución:** Verifica que los microservicios están corriendo en los puertos correctos

**👉 Ver más:** [`PRE_LAUNCH_CHECKLIST.md`](./PRE_LAUNCH_CHECKLIST.md)

---

## 📞 Soporte

Para problemas de integración:
1. Revisa [`PRE_LAUNCH_CHECKLIST.md`](./PRE_LAUNCH_CHECKLIST.md)
2. Revisa [`INTEGRATION_REPORT.md`](./INTEGRATION_REPORT.md)
3. Verifica logs del microservicio correspondiente
4. Revisa DevTools → Console y Network

---

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
