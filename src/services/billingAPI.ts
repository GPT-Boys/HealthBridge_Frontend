/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api'
import type { Invoice, Payment, PaginationInfo } from '@/types/billing.types'

// Invoices
export const invoicesAPI = {
  create: (payload: any) =>
  api.post<{ success: boolean; message: string; data: Invoice }>(`/invoices`, payload),

  createFromAppointment: (appointmentId: string) =>
    api.post<{ success: boolean; message: string; data: Invoice }>(
  `/invoices/appointment/${appointmentId}`,
      {},
    ),

  list: (params?: {
    patientId?: string
    doctorId?: string
    status?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    limit?: number
  }) => api.get<{ success: boolean; data: Invoice[]; pagination: PaginationInfo }>(`/invoices`, { params }),

  getById: (id: string) => api.get<{ success: boolean; data: Invoice }>(`/invoices/${id}`),

  issue: (id: string) => api.put<{ success: boolean; message: string; data: Invoice }>(`/invoices/${id}/issue`),

  update: (id: string, payload: any) =>
  api.put<{ success: boolean; message: string; data: Invoice }>(`/invoices/${id}`, payload),

  cancel: (id: string) => api.delete<{ success: boolean; message: string; data: Invoice }>(`/invoices/${id}`),

  downloadPdf: (id: string) =>
  api.get<ArrayBuffer>(`/invoices/${id}/pdf`, { responseType: 'arraybuffer' }),

  sendEmail: (id: string) => api.post<{ success: boolean; message: string }>(`/invoices/${id}/email`, {}),
}

// Payments
export const paymentsAPI = {
  createManual: (
    invoiceId: string,
    payload: { amount: number; paymentMethod: 'cash' | 'bank_transfer' | 'qr'; paymentDetails?: any; notes?: string },
  ) =>
    api.post<{ success: boolean; data: Payment }>(
  `/payments/invoice/${invoiceId}/manual`,
      payload,
    ),

  createStripe: (invoiceId: string, payload: { paymentMethodId: string }) =>
    api.post<{ success: boolean; data: Payment }>(
      `/payments/invoice/${invoiceId}/stripe`,
      payload,
    ),

  refund: (paymentId: string, payload: { amount?: number; reason: string }) =>
  api.post<{ success: boolean; data: any }>(`/payments/${paymentId}/refund`, payload),

  list: (params?: {
    invoiceId?: string
    patientId?: string
    status?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    limit?: number
  }) => api.get<{ success: boolean; data: Payment[]; pagination: PaginationInfo }>(`/payments`, { params }),

  getById: (id: string) => api.get<{ success: boolean; data: Payment }>(`/payments/${id}`),
}

// Reports
export const reportsAPI = {
  financial: (params: { dateFrom: string; dateTo: string; doctorId?: string; facilityId?: string; groupBy?: string }) =>
    api.get<{ success: boolean; data: { totalFacturado: number; totalPagado: number; totalPendiente: number; cantidadFacturas: number } }>(
  `/reports/financial`,
      { params },
    ),

  byDoctor: (doctorId: string, params?: { dateFrom?: string; dateTo?: string }) =>
    api.get<{ success: boolean; data: { doctorId: string; totalFacturado: number; totalPagado: number; totalPendiente: number; cantidadFacturas: number } }>(
  `/reports/doctor/${doctorId}`,
      { params },
    ),

  byPatient: (patientId: string) =>
    api.get<{ success: boolean; data: { patientId: string; totalFacturado: number; totalPagado: number; totalPendiente: number; cantidadFacturas: number } }>(
  `/reports/patient/${patientId}`,
    ),

  pending: () =>
    api.get<{ success: boolean; data: { totalPendiente: number; cantidadFacturas: number; facturas: Invoice[] } }>(
  `/reports/pending`,
    ),
}
