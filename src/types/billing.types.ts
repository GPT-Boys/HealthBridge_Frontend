// Tipos para Billing Service según especificación frontend

export type InvoiceStatus =
  | 'draft'
  | 'issued'
  | 'paid'
  | 'partially_paid'
  | 'overdue'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'partially_refunded'

export type PaymentMethod = 'stripe' | 'cash' | 'bank_transfer' | 'qr'

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  subtotal: number
  category?:
    | 'consultation'
    | 'procedure'
    | 'medication'
    | 'test'
    | 'therapy'
    | 'surgery'
    | 'other'
}

export interface InsuranceInfo {
  provider: string
  policyNumber: string
  coveragePercentage: number
  coverageAmount?: number
  copayAmount?: number
  claimNumber?: string
  claimStatus?: 'pending' | 'approved' | 'rejected' | 'processing'
  approvalDate?: string
}

export interface InvoiceStatusHistoryItem {
  status: InvoiceStatus
  changedAt: string
  changedBy: string
  reason?: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  patientId: string
  doctorId?: string
  facilityId?: string
  appointmentId?: string
  items: InvoiceItem[]
  subtotal: number
  discountPercentage: number
  discountAmount: number
  insuranceCoverage: number
  totalAmount: number
  amountPaid: number
  amountDue: number
  hasInsurance: boolean
  insuranceInfo?: InsuranceInfo
  status: InvoiceStatus
  issueDate: string
  dueDate: string
  paidDate?: string
  cancelledDate?: string
  currency: string
  notes?: string
  internalNotes?: string
  cancellationReason?: string
  createdBy: string
  statusHistory: InvoiceStatusHistoryItem[]
  createdAt: string
  updatedAt: string
}

export interface PaymentRefundEntry {
  amount: number
  reason: string
  refundedAt: string
  refundedBy: string
  stripeRefundId?: string
  status: 'pending' | 'completed' | 'failed'
}

export interface PaymentDetails {
  stripePaymentIntentId?: string
  stripeChargeId?: string
  stripePaymentMethodId?: string
  last4?: string
  brand?: string
  transactionId?: string
  bankName?: string
  accountNumber?: string
  qrCode?: string
  referenceNumber?: string
}

export interface Payment {
  id: string
  invoiceId: string
  patientId: string
  amount: number
  currency: string
  paymentMethod: PaymentMethod
  status: PaymentStatus
  paymentDetails?: PaymentDetails
  refunds: PaymentRefundEntry[]
  refundedAmount: number
  receiptNumber?: string
  notes?: string
  failureReason?: string
  paymentDate: string
  processedDate?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface PaginationInfo {
  total: number
  page: number
  totalPages: number
}
