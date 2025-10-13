[//]: # 'GUÍA COMPLETA DE EJECUCIÓN - FRONTEND'

## 📦 INSTALACIÓN RÁPIDA

### Opción 1: Script Automático (Recomendado)

```bash
# 1. Navegar al directorio
cd frontend

# 2. Dar permisos a scripts
chmod +x setup.sh start-dev.sh

# 3. Ejecutar setup
./setup.sh

# 4. Iniciar frontend
./start-dev.sh
```

### Opción 2: Manual

```bash
# 1. Instalar dependencias
npm install

# 2. Crear .env
cp .env.example .env

# 3. Editar .env con tus valores
nano .env

# 4. Iniciar desarrollo
npm run dev
```

## 🚀 TESTING COMPLETO

### 1. Test Visual en Navegador

```bash
# Asegúrate de que backend y frontend estén corriendo
# Backend: http://localhost:3000
# Frontend: http://localhost:5173

# Abre el navegador en:
http://localhost:5173
```

### 2. Test de Integración

```bash
# Abre el archivo test-integration.html en tu navegador
# O accede a: http://localhost:5173/test-integration.html
```

### 3. Test Manual Paso a Paso

#### A. Login

1. Ve a `http://localhost:5173/auth/login`
2. Usa credenciales demo:
   - Email: `doctor@test.com`
   - Password: `Test123!@#05qu1`
3. Click en "Iniciar Sesión"
4. Deberías ser redirigido a `/dashboard`

#### B. Registro

1. Ve a `http://localhost:5173/auth/register`
2. Llena el formulario:
   - Nombre: Tu nombre
   - Apellido: Tu apellido
   - Email: tu@email.com
   - Tipo: Doctor o Paciente
   - Contraseña: Mínimo 12 caracteres con mayúscula, minúscula, número y especial
3. Acepta términos
4. Click en "Crear Cuenta"

#### C. Verificar Estado de Auth

1. Abre DevTools (F12)
2. Ve a Application → Local Storage
3. Verifica que existan:
   - `accessToken`
   - `refreshToken`
   - `user`

#### D. Test de Protección de Rutas

1. Sin estar logueado, intenta acceder a `/dashboard`
2. Deberías ser redirigido a `/auth/login`
3. Después de login, intenta acceder a `/auth/login`
4. Deberías ser redirigido a `/dashboard`

## 🔍 DEBUGGING

### Ver Logs en Consola

```javascript
// Abre DevTools Console (F12)
// Todos los requests de API se loggean automáticamente
```

### Inspeccionar Store de Pinia

```bash
# 1. Instala Vue DevTools
# 2. Abre DevTools → Vue → Pinia
# 3. Observa el estado del authStore
```

### Verificar Network Requests

```bash
# 1. Abre DevTools → Network
# 2. Filtra por XHR
# 3. Observa las peticiones a la API
```

## 🎯 CASOS DE USO COMPLETOS

### Caso 1: Registro Completo de Doctor

```
1. Ir a /auth/register
2. Ingresar datos:
   - Nombre: Dr Juan
   - Apellido: Pérez
   - Email: juan.perez@hospital.com
   - Tipo: Doctor
   - Especialización: Cardiología
   - Licencia: MED-12345
   - Teléfono: 71234567
   - Contraseña: SecurePass123!123
3. Aceptar términos
4. Registrar
5. Verificar redirección a dashboard
6. Verificar tokens en localStorage
```

### Caso 2: Login y Logout

```
1. Login con credenciales
2. Verificar dashboard muestra datos correctos
3. Click en "Cerrar Sesión"
4. Verificar redirección a login
5. Verificar localStorage limpio
```

### Caso 3: Refresh Token Automático

```
1. Login exitoso
2. Esperar 7 días (o modificar expiration en backend)
3. Hacer una petición
4. Observar en Network que se refresca automáticamente
```

## 🏗️ BUILD PARA PRODUCCIÓN

```bash
# Build
npm run build

# El resultado estará en dist/
# Archivos optimizados y minificados

# Preview del build
npm run preview
```

## 📊 MÉTRICAS DE RENDIMIENTO

### Lighthouse Score Esperado:

- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

### Tamaño del Bundle:

- Vendor: ~200KB
- App: ~50KB
- Total gzipped: <100KB

## 🔧 CONFIGURACIÓN AVANZADA

### Custom API URL

```env
VITE_API_URL=https://api.healthbridge.bo
```

### Timeout Personalizado

```env
VITE_API_TIMEOUT=30000
```

### Deshabilitar Features

```env
VITE_ENABLE_REGISTRATION=false
VITE_ENABLE_PASSWORD_RESET=false
```

## 🚨 PROBLEMAS COMUNES

### 1. CORS Error

```
Error: Access to fetch has been blocked by CORS policy
Solución: Verificar que el backend tenga CORS configurado para
http://localhost:5173 en ALLOWED_ORIGINS
```

### 2. 401 Unauthorized

```
Error: Token inválido
Solución:
1. Hacer logout
2. Limpiar localStorage
3. Login nuevamente
```

### 3. Refresh Token Loop

```
Error: Infinite refresh loop
Solución:
1. Verificar que JWT_SECRET sea el mismo en backend y frontend
2. Limpiar localStorage
3. Reiniciar ambos servicios
```

### 4. Build Errors

```
Error: Module not found
Solución:
rm -rf node_modules dist
npm install
npm run build
```

## ✅ CHECKLIST PRE-PRODUCCIÓN

- [ ] Build sin errores
- [ ] Todos los tests pasan
- [ ] CORS configurado correctamente
- [ ] Variables de entorno de producción
- [ ] Tokens con expiración apropiada
- [ ] Error handling completo
- [ ] Loading states en todas las acciones
- [ ] Validaciones client-side
- [ ] Responsive en todos los dispositivos
- [ ] Lighthouse score > 90
- [ ] Bundle size optimizado
- [ ] Source maps deshabilitados en prod

## 🎉 ¡LISTO!

El frontend de autenticación está completamente configurado con:

✅ Login y registro funcionales
✅ Validaciones en tiempo real
✅ Gestión de tokens JWT
✅ Refresh automático
✅ Guards de navegación
✅ UI/UX moderna
✅ TypeScript type-safe
✅ Estado global con Pinia
✅ Animaciones suaves
✅ Responsive design
✅ Testing completo

**Próximos pasos:**

1. Integrar con los demás servicios (appointments, medical records, etc.)
2. Agregar más funcionalidades al dashboard
3. Implementar recuperación de contraseña
4. Agregar verificación de email
5. Implementar 2FA (opcional)

¡Éxito! 🚀
