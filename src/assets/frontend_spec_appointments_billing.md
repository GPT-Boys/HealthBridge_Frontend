# Especificación Frontend - Appointment Service y Billing Service

Fecha: 2025-10-20

## Resumen
Este documento consolida la información necesaria para construir el frontend que consume los servicios de Citas (Appointment) y Facturación (Billing). Incluye: endpoints, roles y permisos, cuerpos de request/response, ejemplos JSON, reglas de negocio, validaciones y tipos TypeScript.

---

## 1. Roles y Permisos (ambos servicios)

- admin: acceso total a todas las operaciones.
- doctor: crear/consultar/actualizar sus citas; crear/emitir facturas y registrar pagos.
- patient: crear/consultar sus citas; pagar facturas propias; ver sus facturas/pagos.

Autenticación vía header Authorization: `Bearer <token>`.

---

## 2. Appointment Service
Base URL: `/api/appointments`

### 2.1 Endpoints

- GET `/slots/available` (público)
  - Query: `doctorId` (MongoId, requerido), `date` (ISO, requerido), `duration` (int, opcional)
  - 200: `{ message, date, duration, availableSlots: [{ startTime, endTime }], totalSlots }`

- POST `/` (auth: patient|doctor|admin)
  - Body requerido (validado):
    - patientId, doctorId (MongoId)
    - appointmentDate (ISO fecha), startTime (ISO fecha-hora)
    - duration (15..480, opcional; default 30)
    - type (consultation|follow_up|checkup|emergency|teleconsultation|vaccination|surgery|therapy)
    - reason (5..500)
    - specialization (<=100)
    - baseFee (>=0)
    - isVirtual (bool), insuranceCovered (bool), insuranceProvider (opcional), notes (<=1000)
  - 201: `{ message: 'Cita creada exitosamente', appointment }`
  - 400/409: mensajes de validación o conflicto de horario

- GET `/` (auth; filtro por rol)
  - Query opcional: `patientId, doctorId, facilityId, status[], dateFrom, dateTo, specialization, type, isVirtual, page, limit, sortBy, sortOrder`
  - 200: `{ message, appointments, totalCount, totalPages, currentPage }`

- GET `/stats` (auth: doctor|admin)
  - Query: `doctorId, dateFrom, dateTo`
  - 200: `{ message, stats: { total, byStatus, byType, virtual, inPerson }, period }`

- GET `/:id` (auth)
  - 200: `{ message, appointment }` | 404 si no existe

- PUT `/:id` (auth: patient|doctor|admin)
  - Body opcional: `appointmentDate, startTime, duration, reason, notes, status, isVirtual, meetingLink`
  - 200: `{ message, appointment }`

- POST `/:id/cancel` (auth: patient|doctor|admin)
  - Body: `{ reason }`
  - 200: `{ message, appointment }`

- POST `/:id/reschedule` (auth: patient|doctor|admin)
  - Body: `{ newStartTime, newDuration?, reason? }`
  - 200: `{ message, appointment }`

- POST `/:id/confirm` (auth: doctor|admin)
  - 200: `{ message, appointment }`

### 2.2 Estados y Tipos

- AppointmentStatus: `scheduled | confirmed | in_progress | completed | cancelled | no_show | rescheduled`
- AppointmentType: `consultation | follow_up | checkup | emergency | teleconsultation | vaccination | surgery | therapy`

### 2.3 Reglas de Negocio clave

- Horario laboral válido 08:00-20:00.
- No permitir citas pasadas (salvo emergency en validación del modelo al guardar).
- Conflictos de horario: no se puede crear/actualizar si se superpone con otra cita del mismo doctor en estados activos (scheduled, confirmed, in_progress).
- Cancelación: solo si faltan > 2 horas.
- Reagendar: solo si faltan > 4 horas.
- Confirmar: solo si estado actual es scheduled.
- Para citas virtuales, `meetingLink` debe ser URL válida.

### 2.4 Ejemplos JSON

- Crear cita (request):
```
{
  "patientId": "653a1f...",
  "doctorId": "653a2a...",
  "appointmentDate": "2025-10-22",
  "startTime": "2025-10-22T14:00:00.000Z",
  "duration": 30,
  "type": "consultation",
  "reason": "Dolor de cabeza persistente",
  "specialization": "Neurología",
  "baseFee": 150,
  "isVirtual": false,
  "insuranceCovered": true,
  "insuranceProvider": "SeguroX",
  "notes": "Paciente refiere mareos" 
}
```
- Crear cita (response 201):
```
{
  "message": "Cita creada exitosamente",
  "appointment": { ...IAppointment }
}
```
- Listar citas:
```
{
  "message": "Citas obtenidas exitosamente",
  "appointments": [ ...IAppointment[] ],
  "totalCount": 42,
  "totalPages": 5,
  "currentPage": 1
}
```
- Slots disponibles:
```
{
  "message": "Slots disponibles obtenidos exitosamente",
  "date": "2025-10-22T00:00:00.000Z",
  "duration": 30,
  "availableSlots": [
    { "startTime": "2025-10-22T13:00:00.000Z", "endTime": "2025-10-22T13:30:00.000Z" }
  ],
  "totalSlots": 10
}
```

### 2.5 Tipos TypeScript (Frontend)

```
export type Role = 'admin' | 'doctor' | 'patient';

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show' | 'rescheduled';
export type AppointmentType = 'consultation' | 'follow_up' | 'checkup' | 'emergency' | 'teleconsultation' | 'vaccination' | 'surgery' | 'therapy';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  facilityId?: string;
  appointmentDate: string; // ISO date
  startTime: string; // ISO date-time
  endTime: string;    // ISO date-time
  duration: number;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  specialization: string;
  department?: string;
  room?: string;
  isVirtual: boolean;
  meetingLink?: string;
  requiresPreparation: boolean;
  preparationInstructions?: string;
  baseFee: number;
  insuranceCovered: boolean;
  insuranceProvider?: string;
  finalCost?: number;
  remindersSent: Array<{ type: 'email'|'sms'|'whatsapp'; sentAt: string; status: 'sent'|'delivered'|'failed' }>;
  createdBy: string;
  cancelledBy?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  originalAppointmentId?: string;
  rescheduledFrom?: string;
  rescheduledTo?: string;
  reschedulingReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentFilters {
  patientId?: string;
  doctorId?: string;
  facilityId?: string;
  status?: AppointmentStatus | AppointmentStatus[];
  dateFrom?: string;
  dateTo?: string;
  specialization?: string;
  type?: AppointmentType;
  isVirtual?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'appointmentDate' | 'startTime' | 'createdAt' | 'status' | 'type';
  sortOrder?: 'asc' | 'desc';
}
```

---

## 3. Billing Service
Base URL: `/api/invoices`, `/api/payments`, `/api/reports`

### 3.1 Endpoints - Invoices

- POST `/api/invoices` (auth: admin|doctor)
  - Body: `{ patientId, doctorId?, facilityId?, items: [{ description, quantity, unitPrice, subtotal, category? }], discountPercentage?, hasInsurance?, insuranceInfo?, notes?, dueDate? }`
  - 201: `{ success, message, data: Invoice }`

- POST `/api/invoices/appointment/:appointmentId` (auth: admin|doctor)
  - Crea factura desde cita COMPLETED
  - 201: `{ success, message, data: Invoice }`

- GET `/api/invoices` (auth)
  - Query: `patientId?, doctorId?, status?, dateFrom?, dateTo?, page?, limit?`
  - 200: `{ success, data: Invoice[], pagination }`

- GET `/api/invoices/:id` (auth)
  - 200: `{ success, data: Invoice }` | 404

- PUT `/api/invoices/:id/issue` (auth: admin|doctor)
  - Cambia de draft a issued
  - 200: `{ success, message, data: Invoice }`

- PUT `/api/invoices/:id` (auth: admin|doctor)
  - Solo si status = draft
  - 200: `{ success, message, data: Invoice }`

- DELETE `/api/invoices/:id` (auth: admin)
  - Cancela factura
  - 200: `{ success, message, data: Invoice }`

- GET `/api/invoices/:id/pdf` (auth)
  - Respuesta PDF (content-type: application/pdf)

- POST `/api/invoices/:id/email` (auth: admin|doctor)
  - Envía por email al paciente
  - 200: `{ success, message }`

### 3.2 Endpoints - Payments

- POST `/api/payments/invoice/:invoiceId/manual` (auth: admin|doctor)
  - Body: `{ amount, paymentMethod: 'cash'|'bank_transfer'|'qr', paymentDetails?, notes? }`
  - 201: `{ success, data: Payment }`

- POST `/api/payments/invoice/:invoiceId/stripe` (auth: admin|doctor|patient)
  - Body: `{ paymentMethodId }`
  - 201: `{ success, data: Payment }`

- POST `/api/payments/:paymentId/refund` (auth: admin)
  - Body: `{ amount?, reason }`
  - 200: `{ success, data }` (Stripe Refund o Payment actualizado)

- GET `/api/payments` (auth: admin|doctor)
  - Query: `invoiceId?, patientId?, status?, dateFrom?, dateTo?, page?, limit?`
  - 200: `{ success, data: Payment[], pagination }`

- GET `/api/payments/:id` (auth: admin|doctor|patient)
  - 200: `{ success, data: Payment }`

### 3.3 Endpoints - Reports

- GET `/api/reports/financial` (auth: admin)
  - Query: `dateFrom, dateTo, doctorId?, facilityId?, groupBy?`
  - 200: `{ success, data: { totalFacturado, totalPagado, totalPendiente, cantidadFacturas } }`

- GET `/api/reports/doctor/:doctorId` (auth: admin|doctor)
  - Query: `dateFrom?, dateTo?`
  - 200: `{ success, data: { doctorId, totalFacturado, totalPagado, totalPendiente, cantidadFacturas } }`

- GET `/api/reports/patient/:patientId` (auth: admin|doctor|patient)
  - 200: `{ success, data: { patientId, totalFacturado, totalPagado, totalPendiente, cantidadFacturas } }`

- GET `/api/reports/pending` (auth: admin|doctor)
  - 200: `{ success, data: { totalPendiente, cantidadFacturas, facturas: Invoice[] } }`

### 3.4 Estados y Tipos (Billing)

- InvoiceStatus: `draft | issued | paid | partially_paid | overdue | cancelled | refunded`
- PaymentStatus: `pending | processing | completed | failed | refunded | partially_refunded`
- PaymentMethod: `stripe | cash | bank_transfer | qr`

### 3.5 Reglas de Negocio clave (Billing)

- Invoice:
  - issue -> solo si está en draft
  - update -> solo en draft
  - cancel -> no permitido si está paid/refunded/cancelled
  - totals: subtotal = sum(items.qty*unitPrice); total = subtotal - discount - insuranceCoverage; amountDue = total - amountPaid
  - overdue: si status issued/partially_paid y dueDate < now

- Payments:
  - manual: solo métodos cash/bank_transfer/qr; amount > 0 y <= amountDue
  - stripe: usa PaymentIntent + confirmación; crea Payment y Transaction; actualiza invoice
  - refund: stripe via API; manual ajusta refunds array y estado; crea Transaction negativa

### 3.6 Ejemplos JSON

- Crear factura (request):
```
{
  "patientId": "653a1f...",
  "doctorId": "653a2a...",
  "items": [
    { "description": "Consulta", "quantity": 1, "unitPrice": 150, "subtotal": 150, "category": "consultation" }
  ],
  "discountPercentage": 10,
  "hasInsurance": true,
  "insuranceInfo": { "provider": "SeguroX", "policyNumber": "ABC-123", "coveragePercentage": 70 },
  "notes": "Emitida por recepción"
}
```
- Crear factura (response):
```
{ "success": true, "message": "Factura creada exitosamente", "data": { ...Invoice } }
```
- Listar facturas (response):
```
{ "success": true, "data": [ ...Invoice[] ], "pagination": { "total": 120, "page": 1, "totalPages": 12 } }
```
- Pago Stripe (request):
```
{ "paymentMethodId": "pm_1Q..." }
```
- Pago Stripe (response):
```
{ "success": true, "data": { ...Payment } }
```

### 3.7 Tipos TypeScript (Frontend)

```
export type InvoiceStatus = 'draft'|'issued'|'paid'|'partially_paid'|'overdue'|'cancelled'|'refunded';
export type PaymentStatus = 'pending'|'processing'|'completed'|'failed'|'refunded'|'partially_refunded';
export type PaymentMethod = 'stripe'|'cash'|'bank_transfer'|'qr';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  category?: 'consultation'|'procedure'|'medication'|'test'|'therapy'|'surgery'|'other';
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  coveragePercentage: number;
  coverageAmount?: number;
  copayAmount?: number;
  claimNumber?: string;
  claimStatus?: 'pending'|'approved'|'rejected'|'processing';
  approvalDate?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  doctorId?: string;
  facilityId?: string;
  appointmentId?: string;
  items: InvoiceItem[];
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  insuranceCoverage: number;
  totalAmount: number;
  amountPaid: number;
  amountDue: number;
  hasInsurance: boolean;
  insuranceInfo?: InsuranceInfo;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  cancelledDate?: string;
  currency: string;
  notes?: string;
  internalNotes?: string;
  cancellationReason?: string;
  createdBy: string;
  statusHistory: Array<{ status: InvoiceStatus; changedAt: string; changedBy: string; reason?: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  patientId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  paymentDetails?: {
    stripePaymentIntentId?: string;
    stripeChargeId?: string;
    stripePaymentMethodId?: string;
    last4?: string;
    brand?: string;
    transactionId?: string;
    bankName?: string;
    accountNumber?: string;
    qrCode?: string;
    referenceNumber?: string;
  };
  refunds: Array<{ amount: number; reason: string; refundedAt: string; refundedBy: string; stripeRefundId?: string; status: 'pending'|'completed'|'failed' }>;
  refundedAmount: number;
  receiptNumber?: string;
  notes?: string;
  failureReason?: string;
  paymentDate: string;
  processedDate?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## 4. Validaciones y Mensajes de Error

- Appointment: ver reglas en validators (límites de fechas, horario, longitudes, enums). Mensajes traducidos en español tal como en backend.
- Billing: validaciones para items, montos, enums de estado y método de pago; errores como "Monto excede el saldo pendiente", "Solo se pueden emitir facturas en estado borrador", etc.

---

## 5. Estados de UI recomendados

- Appointments: loading, empty, list, detail, form (create/edit), reschedule modal, cancel confirm, confirm action.
- Billing: invoices list/detail, issue confirm, payment (manual/stripe), refund modal, reports dashboards.

---

## 6. Sugerencias para comenzar en Frontend

- Crear `appointmentsAPI.ts`, `billingAPI.ts` con wrappers fetch/axios usando los tipos anteriores.
- Estructurar rutas: `/appointments`, `/appointments/:id`, `/billing/invoices`, `/billing/invoices/:id`, `/billing/payments`.
- Componentes base: `Table`, `Form`, `Modal`, `DateTimePicker`, `MoneyInput`, `StatusBadge`.
- Manejo de auth: inyectar `Authorization: Bearer <token>` en requests protegidos.

---

## 7. Integraciones externas

- Stripe (solo si usas pagos con tarjeta): requiere `paymentMethodId` del frontend.
- Email/PDF: generación en backend, el frontend solo dispara la acción.

---

Fin del documento.
