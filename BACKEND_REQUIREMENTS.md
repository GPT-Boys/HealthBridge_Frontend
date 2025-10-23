# 📋 INFORMACIÓN NECESARIA DEL BACKEND

**Proyecto:** HealthBridge Frontend  
**Fecha:** 23 de octubre de 2025  
**Estado:** Pendiente de información del backend

---

## 🎯 RESUMEN EJECUTIVO

Este documento detalla **toda la información que necesito de tu backend** para completar exitosamente la implementación del frontend. El frontend ya tiene una estructura sólida con tipos TypeScript, servicios API, y especificaciones documentadas, pero necesito confirmar y obtener detalles específicos de tu implementación backend.

---

## 📦 MICROSERVICIOS IDENTIFICADOS

Según tu configuración (`.env.example`), tienes los siguientes microservicios:

1. **Auth Service** - Puerto 3001
2. **User Service** - Puerto 3002
3. **Appointment Service** - Puerto 3003
4. **Notification Service** - Porto 3004
5. **Billing Service** - Puerto 3006
6. **Subscription Service** - Puerto 3007

---

## 1️⃣ CONFIGURACIÓN Y CONEXIÓN

### 1.1 URLs Base de los Microservicios

**Necesito confirmar:**

```bash
# ¿Estas URLs son correctas para desarrollo?
Auth Service: http://localhost:3001
User Service: http://localhost:3002
Appointment Service: http://localhost:3003
Notification Service: http://localhost:3004
Billing Service: http://localhost:3006
Subscription Service: http://localhost:3007

# ¿Cuál es la URL de producción de cada servicio?
# ¿Usan un API Gateway o accedo directamente a cada microservicio?
# ¿Hay un proxy/nginx configurado?
```

### 1.2 Configuración CORS

**Necesito saber:**

- ¿Qué origins están permitidos en CORS?
- ¿Qué headers están permitidos?
- ¿Permiten credentials (cookies)?
- ¿Hay restricciones específicas por microservicio?

```javascript
// Ejemplo de lo que necesito saber:
{
  origin: ['http://localhost:5173', 'https://tu-dominio.com'],
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type', ...],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}
```

---

## 2️⃣ AUTENTICACIÓN Y AUTORIZACIÓN

### 2.1 Flujo de Autenticación

**Necesito confirmar el flujo completo:**

```typescript
// ¿El flujo es así?
1. POST /api/auth/login
   Request: { email, password }
   Response: { user, accessToken, refreshToken }

2. POST /api/auth/register
   Request: { email, password, firstName, lastName, role, profile }
   Response: { user, accessToken, refreshToken }

3. POST /api/auth/refresh
   Request: { refreshToken }
   Response: { accessToken, refreshToken }

4. POST /api/auth/logout
   Request: { refreshToken }
   Response: { message }

5. POST /api/auth/verify-token
   Request: Headers con Bearer token
   Response: { valid: boolean, user: User }
```

### 2.2 Tokens JWT

**Necesito detalles sobre:**

```typescript
// ¿Cuál es el formato exacto del JWT?
{
  userId: string,
  email: string,
  role: 'admin' | 'doctor' | 'patient',
  iat: number,
  exp: number,
  // ¿Hay otros campos?
}

// ¿Cuál es el tiempo de expiración?
accessToken: 15min? 1h? 24h?
refreshToken: 7d? 30d? 90d?

// ¿Cómo se envía el token?
Authorization: Bearer <token>
// ¿O usan cookies?
```

### 2.3 Roles y Permisos

**Necesito confirmar:**

```typescript
// Roles disponibles
type Role = 'admin' | 'doctor' | 'patient'

// ¿Hay roles adicionales como 'nurse', 'receptionist', etc.?

// Permisos por endpoint - ¿Cuál es la matriz completa?
// Por ejemplo:
Appointments:
  - GET /appointments: patient (solo suyas), doctor (solo suyas), admin (todas)
  - POST /appointments: patient, doctor, admin
  - PUT /appointments/:id: owner, doctor (de la cita), admin
  - DELETE /appointments/:id: admin only
  
// ¿Pueden los doctores ver/modificar citas de otros doctores?
// ¿Los pacientes pueden cancelar citas? ¿Con qué restricciones?
```

### 2.4 Endpoints de Auth Service

**Necesito la lista completa de endpoints:**

```typescript
// ¿Tienen estos endpoints implementados?
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/verify-token
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/verify-email
POST /api/auth/resend-verification
POST /api/auth/change-password

// ¿Cuáles faltan? ¿Cuáles sobran?
```

---

## 3️⃣ USER SERVICE

### 3.1 Estructura del Usuario

**Necesito confirmar la estructura exacta:**

```typescript
// ¿La estructura del User es así?
interface User {
  id: string;           // ¿O _id de MongoDB?
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'doctor' | 'patient';
  profile?: {
    phone?: string;
    address?: string;
    birthDate?: string;
    gender?: 'male' | 'female' | 'other';
    specialization?: string;  // Solo para doctor
    licenseNumber?: string;   // Solo para doctor
    avatar?: string;
    // ¿Hay más campos?
  };
  isEmailVerified?: boolean;
  isActive?: boolean;
  // ¿Hay más campos como 'createdAt', 'updatedAt', 'deletedAt'?
}
```

### 3.2 Endpoints de User Service

**Necesito la lista completa:**

```typescript
// Profile
GET /api/users/me              // Obtener perfil propio
PUT /api/users/me              // Actualizar perfil propio
DELETE /api/users/me           // Eliminar cuenta propia

// Users management (admin)
GET /api/users                 // Listar usuarios (admin)
GET /api/users/:id             // Obtener usuario (admin/doctor)
PUT /api/users/:id             // Actualizar usuario (admin)
DELETE /api/users/:id          // Eliminar usuario (admin)

// Doctors
GET /api/users/doctors         // Listar doctores (público/autenticado)
GET /api/users/doctors/:id     // Obtener doctor específico

// Patients (doctor/admin only)
GET /api/users/patients        // Listar pacientes
GET /api/users/patients/:id    // Obtener paciente

// ¿Hay endpoints adicionales?
```

### 3.3 Búsqueda y Filtrado

**Necesito saber:**

```typescript
// ¿Cómo funciona la búsqueda de doctores?
GET /api/users/doctors?specialization=cardiology&available=true&...

// ¿Qué parámetros de filtro aceptan?
{
  specialization?: string;
  name?: string;        // Búsqueda por nombre
  role?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  // ¿Otros filtros?
}

// ¿Cuál es el formato de respuesta paginada?
{
  data: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}
```

---

## 4️⃣ APPOINTMENT SERVICE

### 4.1 Verificación de Especificación

**Tengo documentada esta especificación** (ver `frontend_spec_appointments_billing.md`):

- ✅ Base URL: `/api/appointments`
- ✅ Tipos: AppointmentStatus, AppointmentType
- ✅ Endpoints principales documentados
- ✅ Validaciones y reglas de negocio documentadas

**Necesito confirmar:**

1. ¿La especificación documentada coincide 100% con tu backend?
2. ¿Hay endpoints adicionales no documentados?
3. ¿Hay campos adicionales en el modelo Appointment?
4. ¿Las validaciones son exactamente como están documentadas?

### 4.2 Campos Específicos a Confirmar

```typescript
interface Appointment {
  id: string;                    // ¿O _id?
  patientId: string;             // ¿Referencia a User?
  doctorId: string;              // ¿Referencia a User?
  facilityId?: string;           // ¿Es obligatorio? ¿Qué estructura tiene Facility?
  
  // ¿Estos campos se populan automáticamente o vienen como IDs?
  patient?: User;                // ¿Se incluye el objeto User completo?
  doctor?: User;                 // ¿Se incluye el objeto User completo?
  facility?: Facility;           // ¿Se incluye el objeto Facility?
  
  // ¿Qué otros campos hay?
}
```

### 4.3 Reglas de Negocio a Confirmar

**Necesito confirmar estas reglas:**

```typescript
// 1. Slots disponibles
- Horario laboral: 08:00-20:00 ¿Es correcto?
- Duración por defecto: 30 minutos ¿Es correcto?
- ¿Hay excepciones para emergencias?

// 2. Conflictos de horario
- ¿Se valida en backend? ¿Cómo?
- ¿Se puede solapar con citas cancelled/no_show?

// 3. Cancelación
- ¿Requiere 2 horas de anticipación? ¿Es flexible?
- ¿Quién puede cancelar? ¿Doctor puede cancelar citas de pacientes?

// 4. Reagendamiento
- ¿Requiere 4 horas de anticipación?
- ¿Se crea nueva cita o se modifica la existente?
- ¿Hay límite de reagendamientos?

// 5. Notificaciones
- ¿Se envían automáticamente?
- ¿Qué tipo de notificaciones? (email, SMS, push?)
- ¿Cuándo se envían? (24h antes, 1h antes, etc.)
```

### 4.4 Citas Virtuales

```typescript
// Necesito saber:
- ¿Cómo se genera el meetingLink?
- ¿Usan algún servicio específico? (Zoom, Google Meet, custom?)
- ¿El link se genera al crear la cita o al confirmarla?
- ¿Hay integración con video conferencia?
```

---

## 5️⃣ BILLING SERVICE

### 5.1 Verificación de Especificación

**Tengo documentada esta especificación** (ver `frontend_spec_appointments_billing.md`):

- ✅ Base URLs: `/api/invoices`, `/api/payments`, `/api/reports`
- ✅ Tipos: InvoiceStatus, PaymentStatus, PaymentMethod
- ✅ Endpoints principales documentados
- ✅ Integración con Stripe documentada

**Necesito confirmar:**

1. ¿La especificación documentada coincide 100% con tu backend?
2. ¿Stripe está implementado? ¿Qué version de la API?
3. ¿Los métodos de pago manuales están implementados?
4. ¿El sistema de reportes está completo?

### 5.2 Integración con Stripe

```typescript
// Necesito detalles específicos:
1. ¿Cuál es tu Stripe Public Key?
   - Test: pk_test_...
   - Production: pk_live_...

2. ¿Qué versión de Stripe API usan?
   - ¿Necesito instalar @stripe/stripe-js en el frontend?

3. Flujo de pago:
   // ¿Es así?
   a) Frontend: Crear PaymentMethod con Stripe Elements
   b) Frontend: Enviar paymentMethodId al backend
   c) Backend: Crear PaymentIntent y confirmar
   d) Backend: Retornar resultado
   
   // ¿O usan otro flujo?

4. ¿Manejan webhooks de Stripe?
   - payment_intent.succeeded
   - payment_intent.failed
   - charge.refunded
   // ¿Cuáles más?

5. ¿Cómo manejan los refunds?
   - ¿Automático via Stripe API?
   - ¿Manual con ajuste en BD?
```

### 5.3 Facturación Manual

```typescript
// Necesito confirmar:
1. Métodos de pago manual:
   - cash: ¿Cómo se registra?
   - bank_transfer: ¿Qué info se necesita? (banco, referencia, etc.)
   - qr: ¿Qué sistema usan? ¿Yape, Plin, otro?

2. ¿Quién puede registrar pagos manuales?
   - Solo admin?
   - Doctores también?

3. ¿Se genera recibo automáticamente?
   - ¿En qué formato? (PDF?)
```

### 5.4 Generación de PDF

```typescript
// Necesito saber:
1. GET /api/invoices/:id/pdf
   - ¿Retorna PDF directamente?
   - ¿O retorna URL a S3/storage?
   - ¿Qué headers retorna?

2. ¿Qué información incluye el PDF?
   - Logo de la empresa?
   - Datos fiscales?
   - QR code?

3. ¿Puedo previsualizar antes de descargar?
```

### 5.5 Reportes

```typescript
// Necesito confirmar los reportes disponibles:

1. GET /api/reports/financial
   - ¿Qué datos incluye exactamente?
   - ¿Hay gráficos/charts data?
   - ¿Formatos de export? (CSV, Excel, PDF?)

2. GET /api/reports/doctor/:doctorId
   - ¿Incluye desglose por período?
   - ¿Incluye información de pacientes?

3. GET /api/reports/patient/:patientId
   - ¿El paciente puede ver su propio reporte?
   - ¿Qué información se oculta por privacidad?

4. ¿Hay más reportes disponibles?
   - Por fecha?
   - Por servicio?
   - Por insurance provider?
```

---

## 6️⃣ NOTIFICATION SERVICE

### 6.1 Tipos de Notificaciones

**Necesito saber qué está implementado:**

```typescript
// Canales disponibles:
- Email: ¿Sí/No? ¿Qué servicio? (SendGrid, AWS SES, Nodemailer?)
- SMS: ¿Sí/No? ¿Qué servicio? (Twilio, AWS SNS?)
- Push Notifications: ¿Sí/No? ¿Firebase, OneSignal, custom?
- In-App: ¿Sí/No?
- WhatsApp: ¿Sí/No? ¿API oficial?

// Eventos que disparan notificaciones:
- Nueva cita creada
- Cita confirmada
- Recordatorio de cita (24h antes, 1h antes)
- Cita cancelada
- Cita reagendada
- Nueva factura generada
- Pago recibido
- Pago vencido (overdue)
// ¿Hay más?
```

### 6.2 Endpoints de Notification Service

```typescript
// ¿Qué endpoints están disponibles?

GET /api/notifications              // Listar notificaciones del usuario
GET /api/notifications/unread       // Notificaciones no leídas
POST /api/notifications/:id/read    // Marcar como leída
POST /api/notifications/read-all    // Marcar todas como leídas
DELETE /api/notifications/:id       // Eliminar notificación

// Configuración de preferencias
GET /api/notifications/preferences
PUT /api/notifications/preferences
{
  email: boolean,
  sms: boolean,
  push: boolean,
  appointmentReminders: boolean,
  billingNotifications: boolean,
  // ...más opciones
}
```

### 6.3 WebSocket / Real-time

```typescript
// ¿Tienen WebSocket implementado?
// ¿Cuál es la URL?
ws://localhost:3004/socket.io  // ¿O otra?

// ¿Qué eventos emiten?
{
  'notification:new': (notification) => {},
  'appointment:update': (appointment) => {},
  'payment:received': (payment) => {},
  // ¿Más eventos?
}

// ¿Requiere autenticación?
// ¿Cómo se autentica? (query token, handshake?)
```

---

## 7️⃣ SUBSCRIPTION SERVICE

### 7.1 Planes Disponibles

**Necesito saber:**

```typescript
// ¿Qué planes están disponibles?
interface SubscriptionPlan {
  id: string;
  name: string;           // "Free", "Basic", "Pro", "Enterprise"?
  price: number;          // Precio mensual
  billingPeriod: string;  // "monthly", "yearly"?
  features: string[];     // Lista de features incluidas
  limits: {
    appointments?: number;  // Límite de citas por mes
    storage?: number;       // GB de almacenamiento
    users?: number;         // Usuarios adicionales
    // ¿Otros límites?
  };
}

// ¿Hay planes específicos para diferentes roles?
// - Plan para pacientes
// - Plan para doctores
// - Plan para clínicas/instituciones
```

### 7.2 Endpoints de Subscription

```typescript
// ¿Qué endpoints están disponibles?

GET /api/subscriptions/plans           // Listar planes
GET /api/subscriptions/my              // Mi suscripción actual
POST /api/subscriptions/subscribe      // Suscribirse a un plan
POST /api/subscriptions/upgrade        // Cambiar de plan
POST /api/subscriptions/cancel         // Cancelar suscripción
GET /api/subscriptions/usage           // Uso actual vs límites
GET /api/subscriptions/billing-history // Historial de pagos

// ¿Hay más endpoints?
```

### 7.3 Integración con Stripe

```typescript
// ¿Usan Stripe para suscripciones?
// ¿O es diferente de Billing?

// Si usan Stripe Subscriptions:
- ¿Tienen Price IDs configurados?
- ¿Manejan webhooks de subscription?
  - subscription.created
  - subscription.updated
  - subscription.deleted
  - invoice.paid
  - invoice.payment_failed
```

---

## 8️⃣ VALIDACIONES Y ERRORES

### 8.1 Formato de Errores

**Necesito saber el formato exacto de errores:**

```typescript
// ¿Los errores vienen así?
{
  error: string;           // Mensaje de error principal
  message?: string;        // Mensaje adicional
  statusCode: number;      // 400, 401, 404, 500, etc.
  details?: any;           // Detalles adicionales
  errors?: Array<{         // Para errores de validación
    field: string;
    message: string;
  }>;
}

// Ejemplos específicos:
// Error 400 (validación)
{
  error: "Validation Error",
  errors: [
    { field: "email", message: "Email is required" },
    { field: "password", message: "Password must be at least 8 characters" }
  ]
}

// Error 401 (no autenticado)
{
  error: "Unauthorized",
  message: "Invalid or expired token"
}

// Error 403 (sin permisos)
{
  error: "Forbidden",
  message: "You don't have permission to access this resource"
}

// Error 404 (no encontrado)
{
  error: "Not Found",
  message: "Appointment not found"
}

// Error 409 (conflicto)
{
  error: "Conflict",
  message: "Time slot already booked"
}

// Error 500 (servidor)
{
  error: "Internal Server Error",
  message: "Something went wrong"
}
```

### 8.2 Mensajes en Español

```typescript
// ¿Los mensajes de error vienen en español o inglés?
// ¿Hay internacionalización (i18n)?
// ¿Debo traducir en el frontend o vienen traducidos?
```

### 8.3 Validaciones Específicas

```typescript
// Necesito confirmar las validaciones exactas:

// Email
- Formato válido
- Único en el sistema
- Case insensitive?

// Password
- Mínimo 8 caracteres? ¿O más?
- Requiere mayúsculas?
- Requiere números?
- Requiere caracteres especiales?

// Fechas
- Formato: ISO 8601?
- Zona horaria: UTC? Local?
- Validación de fechas pasadas

// Teléfono
- Formato requerido?
- País code requerido?
- Validación específica?

// Otros campos
- ¿Qué campos son obligatorios vs opcionales?
- ¿Hay límites de longitud?
```

---

## 9️⃣ ARCHIVOS Y UPLOADS

### 9.1 Upload de Archivos

```typescript
// ¿Dónde se almacenan los archivos?
- Local filesystem?
- AWS S3?
- Google Cloud Storage?
- Azure Blob Storage?
- Cloudinary?

// ¿Qué endpoints hay para uploads?
POST /api/upload/avatar         // Upload avatar de usuario
POST /api/upload/documents      // Upload documentos médicos
POST /api/upload/invoice-docs   // Upload documentos de factura

// ¿Qué formato aceptan?
{
  maxSize: '5MB'?,
  allowedTypes: ['image/jpeg', 'image/png', 'application/pdf']?,
  // ...
}

// ¿Cómo se retorna la URL?
{
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}
```

---

## 🔟 VARIABLES DE ENTORNO

### 10.1 Variables Requeridas

**Necesito saber qué variables debo configurar:**

```bash
# Frontend (.env)
VITE_API_URL=?                    # ¿/api? ¿http://api.healthbridge.com?
VITE_API_TIMEOUT=?                # 30000?
VITE_APP_NAME=?                   # HealthBridge?
VITE_APP_VERSION=?                # 1.0.0?

# Stripe (si aplica)
VITE_STRIPE_PUBLIC_KEY=?          # pk_test_... o pk_live_...

# WebSocket (si aplica)
VITE_WS_URL=?                     # ws://localhost:3004?

# Google Analytics / Tracking (si aplica)
VITE_GA_ID=?
VITE_GTM_ID=?

# Sentry / Error tracking (si aplica)
VITE_SENTRY_DSN=?

# Features flags
VITE_ENABLE_REGISTRATION=?        # true/false
VITE_ENABLE_PASSWORD_RESET=?      # true/false
VITE_ENABLE_SUBSCRIPTIONS=?       # true/false
VITE_ENABLE_NOTIFICATIONS=?       # true/false

# ¿Hay más variables necesarias?
```

---

## 1️⃣1️⃣ TESTING Y DATOS DE PRUEBA

### 11.1 Datos de Testing

**Necesito datos de prueba para development:**

```typescript
// Usuarios de prueba
{
  admin: {
    email: "admin@healthbridge.com",
    password: "Admin123!",
    id: "..."
  },
  doctor: {
    email: "doctor@healthbridge.com",
    password: "Doctor123!",
    id: "...",
    specialization: "Cardiología"
  },
  patient: {
    email: "patient@healthbridge.com",
    password: "Patient123!",
    id: "..."
  }
}

// ¿Tienen seed data?
// ¿Hay script para resetear la BD?
```

### 11.2 Endpoints de Testing

```typescript
// ¿Hay endpoints especiales para testing?
POST /api/test/seed-data          // Poblar BD con datos de prueba
POST /api/test/reset-database     // Limpiar BD
POST /api/test/create-mock-user   // Crear usuario de prueba
```

---

## 1️⃣2️⃣ DOCUMENTACIÓN Y RECURSOS

### 12.1 Documentación del Backend

**Necesito acceso a:**

- [ ] README del backend con setup instructions
- [ ] Documentación de API (Swagger/OpenAPI?)
- [ ] Colección de Postman/Insomnia
- [ ] Diagramas de arquitectura
- [ ] Modelos de base de datos (schemas)
- [ ] Guía de deployment

```typescript
// ¿Tienen documentación Swagger/OpenAPI?
// URL: http://localhost:3001/api-docs ?

// ¿Tienen colección de Postman?
// ¿Pueden compartir el JSON?
```

### 12.2 Repositorio del Backend

```typescript
// Información del repositorio:
- URL del repositorio: https://github.com/...
- Branch principal: main? master? develop?
- ¿Es privado? ¿Necesito acceso?
- ¿Hay CI/CD configurado?
```

---

## 1️⃣3️⃣ DEPLOYMENT Y PRODUCCIÓN

### 13.1 URLs de Producción

```typescript
// ¿Cuáles son las URLs de producción?
Frontend: https://healthbridge.com ?
API Gateway: https://api.healthbridge.com ?

// ¿O cada servicio tiene su propio subdominio?
Auth: https://auth.healthbridge.com
Appointments: https://appointments.healthbridge.com
// ...etc
```

### 13.2 SSL/HTTPS

```typescript
// ¿HTTPS está configurado?
// ¿Usan certificados de Let's Encrypt?
// ¿Hay redirección automática HTTP → HTTPS?
```

### 13.3 Base de Datos

```typescript
// ¿Qué base de datos usan?
- MongoDB? (local, Atlas, etc.)
- PostgreSQL?
- MySQL?
- Otra?

// ¿Hay réplicas/backup?
// ¿Qué estrategia de backup usan?
```

---

## 1️⃣4️⃣ FEATURES ADICIONALES

### 14.1 Features que Debo Implementar

**¿Qué features están completas en backend?**

Marcar con ✅ lo que está listo, ❌ lo que falta, 🚧 lo que está en desarrollo:

**Autenticación:**
- [ ] Login con email/password
- [ ] Registro de usuarios
- [ ] Forgot password / Reset password
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] OAuth (Google, Facebook, etc.)
- [ ] Remember me

**Appointments:**
- [ ] Crear cita
- [ ] Listar citas
- [ ] Ver detalle de cita
- [ ] Actualizar cita
- [ ] Cancelar cita
- [ ] Reagendar cita
- [ ] Confirmar cita
- [ ] Ver slots disponibles
- [ ] Búsqueda/filtrado de citas
- [ ] Citas virtuales con video
- [ ] Recordatorios automáticos
- [ ] Historial de citas

**Billing:**
- [ ] Crear factura
- [ ] Crear factura desde cita
- [ ] Listar facturas
- [ ] Ver detalle de factura
- [ ] Emitir factura
- [ ] Actualizar factura (draft)
- [ ] Cancelar factura
- [ ] Descargar PDF
- [ ] Enviar por email
- [ ] Pago con Stripe
- [ ] Pago manual (cash, transfer, qr)
- [ ] Reembolsos
- [ ] Reportes financieros
- [ ] Integración con seguros

**Users:**
- [ ] Ver perfil
- [ ] Actualizar perfil
- [ ] Upload avatar
- [ ] Listar doctores
- [ ] Búsqueda de doctores por especialidad
- [ ] Listar pacientes (doctor/admin)
- [ ] Administración de usuarios (admin)

**Notifications:**
- [ ] Notificaciones en la app
- [ ] Notificaciones por email
- [ ] Notificaciones por SMS
- [ ] Notificaciones push
- [ ] WhatsApp notifications
- [ ] Configurar preferencias
- [ ] Marcar como leída
- [ ] WebSocket real-time

**Subscriptions:**
- [ ] Listar planes
- [ ] Suscribirse
- [ ] Cambiar plan
- [ ] Cancelar suscripción
- [ ] Ver uso actual
- [ ] Historial de pagos
- [ ] Límites por plan

**Medical Records (si aplica):**
- [ ] Crear registro médico
- [ ] Ver historiales
- [ ] Adjuntar archivos
- [ ] Prescripciones

**Other:**
- [ ] Dashboard statistics
- [ ] Calendario de citas
- [ ] Búsqueda global
- [ ] Export data (CSV, PDF)
- [ ] Auditoría de acciones
- [ ] Logs de sistema

---

## 1️⃣5️⃣ CHECKLIST DE INFORMACIÓN PENDIENTE

### Prioridad ALTA (Necesito AHORA):

- [ ] Confirmar URLs base de todos los microservicios
- [ ] Confirmar estructura exacta de User y Appointment
- [ ] Confirmar flujo de autenticación (login, register, refresh)
- [ ] Confirmar formato de errores
- [ ] Proporcionar credenciales de prueba
- [ ] Confirmar Stripe Public Key (si aplica)
- [ ] Confirmar CORS configuration

### Prioridad MEDIA (Necesito PRONTO):

- [ ] Documentación completa de API (Swagger/Postman)
- [ ] Reglas de negocio específicas confirmadas
- [ ] Validaciones exactas de cada campo
- [ ] Endpoints de Notification y Subscription
- [ ] WebSocket configuration
- [ ] Variables de entorno completas

### Prioridad BAJA (Nice to have):

- [ ] Diagramas de arquitectura
- [ ] Guía de deployment
- [ ] Scripts de testing
- [ ] CI/CD pipelines
- [ ] Monitoring y logging

---

## 1️⃣6️⃣ CÓMO PROPORCIONAR LA INFORMACIÓN

### Opción 1: Documentación Swagger/OpenAPI

Si tienen Swagger configurado, solo necesito:

```bash
# URL de Swagger UI
http://localhost:3001/api-docs
http://localhost:3003/api-docs
# ... para cada servicio
```

### Opción 2: Colección Postman

Si tienen colección de Postman, compartan:

```
healthbridge-backend.postman_collection.json
```

### Opción 3: Documento Markdown

Pueden crear un documento similar respondiendo cada sección:

```markdown
# Backend API Documentation

## 1. Auth Service
- Base URL: http://localhost:3001
- Endpoints:
  - POST /api/auth/login
    - Request: { email, password }
    - Response: { ... }
  - ...

## 2. User Service
...
```

### Opción 4: Acceso al Repositorio

Si puedo acceder al repositorio backend:

```
https://github.com/tu-org/healthbridge-backend
```

Puedo revisar directamente:
- `routes/` - para ver endpoints
- `models/` - para ver estructuras de datos
- `controllers/` - para ver lógica
- `.env.example` - para ver variables
- `README.md` - para setup

---

## 📞 PRÓXIMOS PASOS

1. **Revisar este documento** y confirmar qué información pueden proporcionar
2. **Priorizar** las secciones marcadas como ALTA prioridad
3. **Compartir** la información por el medio que prefieran:
   - Documento de respuestas
   - Acceso al repo
   - Colección Postman
   - Swagger URL
   - Reunión para revisar juntos

4. **Comenzar desarrollo** una vez tenga la información crítica

---

## 📝 NOTAS FINALES

- Este frontend ya tiene una **base sólida** implementada
- Los **tipos TypeScript** ya están definidos según la especificación
- Los **servicios API** ya tienen la estructura
- Las **vistas** principales ya están creadas
- Solo necesito **confirmar y ajustar** según su backend real

**Tiempo estimado de desarrollo una vez tenga la información:**
- 2-3 días para ajustes y conexión con backend
- 3-5 días para testing y refinamiento
- 1-2 días para deployment y documentación

**Total: ~7-10 días de desarrollo**

---

**¿Preguntas?** Por favor, indiquen qué secciones necesitan clarificación.

**¿Listos para empezar?** Compartan la información de Prioridad ALTA y comenzamos! 🚀
