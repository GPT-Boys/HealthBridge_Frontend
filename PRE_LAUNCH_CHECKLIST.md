# ✅ Checklist de Pre-lanzamiento - HealthBridge Frontend

## 🎯 Respuesta Rápida: ¿Funcionará todo?

**SÍ**, el frontend funcionará correctamente **SI** tu backend cumple con estos requisitos:

---

## 📋 Verificación Backend (CRÍTICO)

### 1. ✅ Microservicios Corriendo

Asegúrate de que **TODOS** estos servicios estén ejecutándose:

```bash
✓ API Gateway       → Puerto 3001 (o el que uses como proxy)
✓ Auth Service      → Puerto 3001 (rutas /api/auth/*)
✓ User Service      → Puerto 3002 (rutas /api/users/*)
✓ Appointment       → Puerto 3003 (rutas /api/appointments/*)
✓ Medical Record    → Puerto 3004 (rutas /api/medical-record/*)
✓ Notification      → Puerto 3005 (rutas /api/notification/*)
✓ Billing           → Puerto 3006 (rutas /api/billing/*)
✓ Subscription      → Puerto 3007 (rutas /api/subscription/*)
```

**Comando para verificar:**
```bash
# Linux/Mac
netstat -tuln | grep -E '3001|3002|3003|3004|3005|3006|3007'

# Windows PowerShell
netstat -an | Select-String -Pattern '3001|3002|3003|3004|3005|3006|3007'
```

---

### 2. ✅ CORS Configurado

Tu backend **DEBE** permitir peticiones desde `http://localhost:5173`:

```javascript
// Ejemplo Node.js/Express
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))
```

**Verificación rápida:**
```bash
# Prueba una ruta pública
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:3002/api/users/public/doctors
```

---

### 3. ✅ Base de Datos Conectada

Cada microservicio debe tener conexión a su base de datos correspondiente.

**Verificación:**
- Revisa logs de cada servicio
- Busca mensajes como "Database connected" o "MongoDB connected"

---

### 4. ✅ Endpoints Implementados

El frontend hace peticiones a **82 endpoints**. Verifica que tu backend tenga implementados al menos:

**Críticos para login:**
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/users/profile`

**Verificación:**
```bash
# Test login (ajusta el payload según tu backend)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

### 5. ✅ WebSocket Server (Notificaciones en Tiempo Real)

Si quieres notificaciones en tiempo real, el Notification Service debe tener WebSocket habilitado:

```javascript
// Ejemplo Socket.io
const io = require('socket.io')(server, {
  cors: { origin: 'http://localhost:5173' }
})
```

**Puerto esperado:** `3005` (configurable en `.env`)

**Verificación:**
```bash
# Test WebSocket (requiere wscat)
npm install -g wscat
wscat -c ws://localhost:3005/ws?userId=test123
```

---

## 🔧 Configuración Frontend

### 1. ✅ Variables de Entorno

Crea un archivo `.env.local` (OPCIONAL, ya hay valores por defecto):

```bash
# Copia el ejemplo
cp .env.example .env.local

# Edita según tu configuración
# Solo necesario si tus puertos son diferentes
```

**Valores por defecto** (funcionan si no creas `.env.local`):
```
VITE_API_URL=/api
VITE_API_TIMEOUT=30000
VITE_WS_URL=ws://localhost:3005
VITE_AUTH_SERVICE_TARGET=http://localhost:3001
VITE_USER_SERVICE_TARGET=http://localhost:3002
# ... etc (ver vite.config.ts)
```

---

### 2. ✅ Dependencias Instaladas

```bash
# Verifica que node_modules existe
npm install
```

---

### 3. ✅ Type-Check Pasa

```bash
npm run type-check
# ✓ Debe pasar sin errores
```

---

## 🚀 Pasos para Iniciar

### Opción 1: Backend Individual + Frontend

```bash
# Terminal 1-7: Inicia cada microservicio
cd backend/auth-service && npm run dev
cd backend/user-service && npm run dev
cd backend/appointment-service && npm run dev
cd backend/medical-record-service && npm run dev
cd backend/notification-service && npm run dev
cd backend/billing-service && npm run dev
cd backend/subscription-service && npm run dev

# Terminal 8: Frontend
cd frontend
npm run dev
```

**Acceso:** `http://localhost:5173`

---

### Opción 2: Docker Compose (Recomendado)

Si tienes `docker-compose.yml` configurado:

```bash
# Levanta todo el stack
docker-compose up -d

# Verifica que todos estén running
docker-compose ps

# Ve los logs
docker-compose logs -f frontend
```

---

## 🔍 Problemas Comunes y Soluciones

### ❌ Error: "Network Error" o "CORS Error"

**Causa:** Backend no permite origen `http://localhost:5173`

**Solución:**
```javascript
// En cada microservicio
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))
```

---

### ❌ Error: "401 Unauthorized" en todas las peticiones

**Causa:** Token JWT no se está enviando o el backend no lo acepta

**Solución:**
1. Verifica que después del login el token se guarda:
   ```javascript
   localStorage.getItem('accessToken') // Debe existir
   ```
2. Verifica el header en Network tab:
   ```
   Authorization: Bearer eyJhbGc...
   ```
3. Verifica que tu backend decodifica el token correctamente

---

### ❌ Error: "404 Not Found" en rutas de API

**Causa:** El proxy de Vite no está redirigiendo correctamente

**Solución:**
1. Verifica que el microservicio está corriendo en el puerto correcto
2. Verifica `vite.config.ts` → `server.proxy`
3. Reinicia el servidor de desarrollo: `Ctrl+C` y `npm run dev`

---

### ❌ WebSocket no conecta

**Causa:** URL incorrecta o servicio no soporta WebSocket

**Solución:**
1. Verifica que `VITE_WS_URL` apunte al servicio correcto
2. Verifica que el Notification Service tiene Socket.io o WS habilitado
3. Si no usas WebSocket, el frontend seguirá funcionando (solo sin notificaciones en tiempo real)

---

### ❌ Error: "Timeout" en peticiones

**Causa:** Backend tarda más de 30 segundos

**Solución:**
```bash
# Aumenta el timeout en .env.local
VITE_API_TIMEOUT=60000  # 60 segundos
```

---

### ❌ Error: "Cannot read property 'accessToken' of null"

**Causa:** No hay usuario logueado

**Solución:**
1. Ve a `/auth/login`
2. Ingresa credenciales válidas
3. Verifica que el backend retorna `accessToken` y `refreshToken`

---

## 🧪 Test de Integración Rápido

Ejecuta estos pasos para verificar que todo funciona:

### 1. Inicia Frontend
```bash
npm run dev
```

### 2. Abre el navegador
```
http://localhost:5173
```

### 3. Verifica la página de inicio
- ✅ Se carga sin errores
- ✅ Puedes navegar a `/auth/login`

### 4. Intenta hacer login
```
Email: admin@healthbridge.com (o el que tengas en BD)
Password: ********
```

- ✅ Si login exitoso → Redirige a `/dashboard`
- ✅ Aparece nombre de usuario en header
- ✅ Sidebar muestra menú según rol

### 5. Prueba una funcionalidad
- Ve a "Mis Citas" → `/dashboard/appointments`
- ✅ Debe cargar lista de citas (puede estar vacía)
- ✅ Sin errores en consola de navegador

### 6. Verifica Network Tab (F12)
- ✅ Peticiones a `/api/*` → Status 200 o 201
- ✅ No hay errores CORS
- ✅ Token en headers `Authorization: Bearer ...`

---

## 📊 Checklist Final

Antes de dar por terminado, marca cada punto:

### Backend
- [ ] Todos los microservicios corriendo
- [ ] CORS configurado para `http://localhost:5173`
- [ ] Base de datos conectada
- [ ] Endpoint `/api/auth/login` funciona
- [ ] Endpoint `/api/users/profile` funciona
- [ ] WebSocket server corriendo (opcional)

### Frontend
- [ ] `npm install` ejecutado
- [ ] `npm run type-check` pasa sin errores
- [ ] `.env.local` configurado (o usando defaults)
- [ ] `npm run dev` inicia sin errores
- [ ] Navegador abre `http://localhost:5173`

### Integración
- [ ] Página de inicio carga
- [ ] Puedo hacer login
- [ ] Dashboard carga según mi rol
- [ ] Puedo navegar entre vistas
- [ ] Las peticiones API funcionan (Network tab)
- [ ] No hay errores en consola

---

## 🎉 Si todo está ✅, ¡Funcionará!

El frontend está **100% listo** para trabajar con tu backend, siempre que:
1. **Los 7 microservicios estén corriendo**
2. **CORS esté configurado**
3. **Los endpoints coincidan con las especificaciones que me diste**

---

## 📞 ¿Algo no funciona?

### Debugging paso a paso:

1. **Abre DevTools** (F12)
2. Ve a **Console** → Busca errores
3. Ve a **Network** → Busca peticiones fallidas
4. Copia el error y revisa esta guía
5. Si el error no está aquí, verifica:
   - Logs del microservicio correspondiente
   - Que el endpoint existe en tu backend
   - Que el payload coincida con lo esperado

---

## 📚 Documentación de Referencia

- **INTEGRATION_REPORT.md** - Detalles de los 82 endpoints
- **IMPLEMENTATION_SUMMARY.md** - Resumen de implementación
- **README.md** - Setup inicial
- **vite.config.ts** - Configuración de proxy
- **src/services/*.ts** - Clientes de API

---

**Última actualización:** 23 de octubre de 2025  
**Estado:** ✅ Frontend listo para producción
