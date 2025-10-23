// Tipos para Medical Record Service según especificación backend

export type RecordStatus = 'active' | 'archived' | 'deleted'

export type PrescriptionStatus = 'active' | 'completed' | 'cancelled'

export type FileCategory = 'image' | 'lab_result' | 'report' | 'prescription' | 'other'

export type FileStatus = 'active' | 'archived' | 'deleted'

export interface MedicalRecord {
  id: string
  patientId: string
  doctorId: string
  appointmentId?: string
  date: string // ISO date
  diagnosis: string
  symptoms: string[]
  treatment?: string
  notes?: string
  vitalSigns?: {
    bloodPressure?: string
    heartRate?: number
    temperature?: number
    weight?: number
    height?: number
    bmi?: number
    oxygenSaturation?: number
    respiratoryRate?: number
  }
  allergies?: string[]
  chronicConditions?: string[]
  currentMedications?: string[]
  familyHistory?: string
  lifestyleNotes?: string
  followUpRequired: boolean
  followUpDate?: string
  followUpInstructions?: string
  status: RecordStatus
  isConfidential: boolean
  sharedWith?: string[]
  createdBy: string
  lastModifiedBy?: string
  createdAt: string
  updatedAt: string
}

export interface Prescription {
  id: string
  recordId: string
  patientId: string
  doctorId: string
  medication: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
  startDate: string
  endDate?: string
  status: PrescriptionStatus
  refillsAllowed: number
  refillsUsed: number
  pharmacyNotes?: string
  isControlledSubstance: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface MedicalFile {
  id: string
  recordId?: string
  patientId: string
  uploadedBy: string
  fileName: string
  originalName: string
  fileSize: number
  mimeType: string
  category: FileCategory
  description?: string
  tags?: string[]
  uploadDate: string
  status: FileStatus
  url?: string
  thumbnailUrl?: string
  metadata?: {
    width?: number
    height?: number
    duration?: number
    pages?: number
    [key: string]: any
  }
  accessibleBy?: string[]
  isConfidential: boolean
  expiresAt?: string
  createdAt: string
  updatedAt: string
}

export interface RecordFilters {
  patientId?: string
  doctorId?: string
  dateFrom?: string
  dateTo?: string
  status?: RecordStatus
  followUpRequired?: boolean
  page?: number
  limit?: number
  sortBy?: 'date' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface PrescriptionFilters {
  patientId?: string
  doctorId?: string
  recordId?: string
  status?: PrescriptionStatus
  dateFrom?: string
  dateTo?: string
  page?: number
  limit?: number
}

export interface FileFilters {
  patientId?: string
  recordId?: string
  category?: FileCategory
  status?: FileStatus
  dateFrom?: string
  dateTo?: string
  page?: number
  limit?: number
}

export interface PaginationInfo {
  total: number
  page: number
  totalPages: number
}

export interface RecordListResponse {
  message: string
  records: MedicalRecord[]
  pagination: PaginationInfo
}

export interface RecordResponse {
  message: string
  record: MedicalRecord
}

export interface PrescriptionListResponse {
  message: string
  prescriptions: Prescription[]
  pagination: PaginationInfo
}

export interface PrescriptionResponse {
  message: string
  prescription: Prescription
}

export interface FileListResponse {
  message: string
  files: MedicalFile[]
  pagination: PaginationInfo
}

export interface FileResponse {
  message: string
  file: MedicalFile
}
