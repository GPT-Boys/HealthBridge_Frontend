/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api'
import type {
  MedicalRecord,
  Prescription,
  MedicalFile,
  RecordFilters,
  PrescriptionFilters,
  FileFilters,
  RecordListResponse,
  RecordResponse,
  PrescriptionListResponse,
  PrescriptionResponse,
  FileListResponse,
  FileResponse,
} from '@/types/medicalRecord.types'

// Base: /api/medical-record

// RECORDS
export const recordsAPI = {
  // Crear registro médico
  create: (data: Partial<MedicalRecord>) =>
    api.post<RecordResponse>('/medical-record/records', data),

  // Listar registros (con filtros)
  list: (params?: RecordFilters) =>
    api.get<RecordListResponse>('/medical-record/records', { params }),

  // Obtener un registro por ID
  getById: (id: string) =>
    api.get<RecordResponse>(`/medical-record/records/${id}`),

  // Actualizar registro
  update: (id: string, data: Partial<MedicalRecord>) =>
    api.put<RecordResponse>(`/medical-record/records/${id}`, data),

  // Eliminar registro (soft delete)
  delete: (id: string) =>
    api.delete<{ message: string }>(`/medical-record/records/${id}`),

  // Compartir registro con otro usuario
  share: (id: string, userId: string) =>
    api.post<RecordResponse>(`/medical-record/records/${id}/share`, { userId }),

  // Dejar de compartir
  unshare: (id: string, userId: string) =>
    api.post<RecordResponse>(`/medical-record/records/${id}/unshare`, { userId }),
}

// PRESCRIPTIONS
export const prescriptionsAPI = {
  // Crear prescripción
  create: (data: Partial<Prescription>) =>
    api.post<PrescriptionResponse>('/medical-record/prescriptions', data),

  // Listar prescripciones
  list: (params?: PrescriptionFilters) =>
    api.get<PrescriptionListResponse>('/medical-record/prescriptions', { params }),

  // Obtener por ID
  getById: (id: string) =>
    api.get<PrescriptionResponse>(`/medical-record/prescriptions/${id}`),

  // Actualizar prescripción
  update: (id: string, data: Partial<Prescription>) =>
    api.put<PrescriptionResponse>(`/medical-record/prescriptions/${id}`, data),

  // Cancelar prescripción
  cancel: (id: string) =>
    api.post<PrescriptionResponse>(`/medical-record/prescriptions/${id}/cancel`, {}),

  // Registrar uso de refill
  useRefill: (id: string) =>
    api.post<PrescriptionResponse>(`/medical-record/prescriptions/${id}/refill`, {}),
}

// FILES
export const filesAPI = {
  // Subir archivo
  upload: (formData: FormData) =>
    api.post<FileResponse>('/medical-record/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // Listar archivos
  list: (params?: FileFilters) =>
    api.get<FileListResponse>('/medical-record/files', { params }),

  // Obtener por ID
  getById: (id: string) =>
    api.get<FileResponse>(`/medical-record/files/${id}`),

  // Descargar archivo
  download: (id: string) =>
    api.get<Blob>(`/medical-record/files/${id}/download`, { responseType: 'blob' }),

  // Actualizar metadatos
  update: (id: string, data: { description?: string; tags?: string[]; category?: string }) =>
    api.put<FileResponse>(`/medical-record/files/${id}`, data),

  // Eliminar archivo (soft delete)
  delete: (id: string) =>
    api.delete<{ message: string }>(`/medical-record/files/${id}`),

  // Compartir archivo
  share: (id: string, userId: string) =>
    api.post<FileResponse>(`/medical-record/files/${id}/share`, { userId }),

  // Dejar de compartir
  unshare: (id: string, userId: string) =>
    api.post<FileResponse>(`/medical-record/files/${id}/unshare`, { userId }),
}

export default {
  records: recordsAPI,
  prescriptions: prescriptionsAPI,
  files: filesAPI,
}
