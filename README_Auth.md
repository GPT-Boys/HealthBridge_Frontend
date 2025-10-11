# 🎨 HealthBridge Frontend - Auth Module

Frontend de autenticación para HealthBridge construido con Vue 3, TypeScript y Vite.

## 🚀 Características

- ✅ Login con validación
- ✅ Registro de usuarios (Doctor/Paciente)
- ✅ Recuperación de contraseña
- ✅ Gestión de tokens (Access + Refresh)
- ✅ Guards de autenticación
- ✅ Validaciones en tiempo real
- ✅ UI/UX moderna con Bootstrap 5
- ✅ TypeScript para type-safety
- ✅ Pinia para state management
- ✅ Animaciones con Animate.css
- ✅ SweetAlert2 para notificaciones

## 📋 Requisitos

- Node.js 18+
- npm 9+
- Backend Auth Service corriendo en `http://localhost:3001`

## 🔧 Instalación

```bash
# Clonar y entrar al directorio
cd frontend

# Ejecutar setup
chmod +x setup.sh
./setup.sh

# Esto instalará dependencias y creará .env
```

## ⚙️ Configuración

Edita `.env` con tus valores:

```env
VITE_API_URL=http://localhost:3001
VITE_API_TIMEOUT=10000
```

## 🏃 Ejecución

```bash
# Desarrollo
chmod +x start-dev.sh
./start-dev.sh

# O directamente con npm
npm run dev

# Producción
npm run build
npm run preview
```

## 📁 Estructura

```
src/
├── components/       # Componentes reutilizables
│   ├── auth/        # Componentes de auth
│   └── common/      # Componentes comunes
├── composables/     # Composables de Vue
├── layouts/         # Layouts de la app
├── router/          # Vue Router config
├── services/        # API services
├── stores/          # Pinia stores
├── types/           # TypeScript types
├── utils/           # Utilidades
├── views/           # Vistas/páginas
├── App.vue
└── main.ts
```

## 🎯 Funcionalidades

### Login

- Validación de email y contraseña
- Mostrar/ocultar contraseña
- Recordar sesión
- Credenciales de demo
- Manejo de errores

### Registro

- Validación en tiempo real
- Indicador de fortaleza de contraseña
- Campos específicos por rol
- Términos y condiciones
- Confirmación de contraseña

### Seguridad

- Tokens JWT en localStorage
- Refresh token automático
- Interceptors de Axios
- Guards de navegación
- Logout automático en errores

## 🧪 Testing Manual

```bash
# Ejecutar script de testing
chmod +x test-frontend.sh
./test-frontend.sh
```

### Probar en navegador:

1. **Login:** `http://localhost:5173/auth/login`
   - Email: `doctor@test.com`
   - Password: `Test123!@#`

2. **Registro:** `http://localhost:5173/auth/register`
   - Llenar formulario completo
   - Probar validaciones

3. **Dashboard:** `http://localhost:5173/dashboard`
   - Requiere estar autenticado

## 🔒 Flujo de Autenticación

1. Usuario ingresa credenciales
2. Frontend envía POST a `/api/auth/login`
3. Backend retorna `accessToken` y `refreshToken`
4. Tokens se guardan en localStorage
5. Access token se agrega a headers de cada request
6. Si access token expira, se usa refresh token
7. Si refresh token expira, logout automático

## 📦 Build para Producción

```bash
# Build
npm run build

# Preview del build
npm run preview

# Archivos generados en dist/
```

## 🚀 Despliegue en Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Variables de entorno en Vercel:

```
VITE_API_URL=https://tu-backend.render.com
```

## 🎨 Personalización

### Colores

Edita las variables en `src/styles/variables.scss`

### Rutas

Agrega rutas en `src/router/index.ts`

### API

Agrega endpoints en `src/services/authAPI.ts`

## 🐛 Troubleshooting

### Error: Cannot connect to backend

```bash
# Verificar que el backend está corriendo
curl http://localhost:3001/health

# Si no está corriendo, iniciarlo
cd ../auth-service
./start-dev.sh
```

### Error: Module not found

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: Port 5173 already in use

```bash
# Cambiar puerto en vite.config.ts
server: {
  port: 5174
}
```

## 📝 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format
```

## 🤝 Integración con Backend

Este frontend está diseñado para trabajar con el Auth Service del backend.

**Endpoints usados:**

- POST `/api/auth/register` - Registro
- POST `/api/auth/login` - Login
- POST `/api/auth/refresh-token` - Refresh
- POST `/api/auth/verify-token` - Verificar
- POST `/api/auth/logout` - Logout
- GET `/api/auth/profile` - Perfil

## 📄 Licencia

MIT

---

Desarrollado con ❤️ por el equipo HealthBridge
