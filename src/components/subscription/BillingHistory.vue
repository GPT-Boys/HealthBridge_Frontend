<template>
  <div class="billing-history">
    <header class="d-flex align-items-center justify-content-between mb-3">
      <h5 class="mb-0">
        <slot name="title">Historial de facturación</slot>
      </h5>
      <small class="text-muted" v-if="subtitle">{{ subtitle }}</small>
    </header>

    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status" aria-hidden="true"></div>
      <div class="mt-2 small text-muted">Cargando...</div>
    </div>

    <div v-else>
      <div v-if="!hasInvoices" class="text-center py-4 text-muted small">
        <slot name="empty">No hay facturas registradas.</slot>
      </div>

      <div v-else class="table-responsive">
        <table class="table table-sm align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Descripción</th>
              <th scope="col" class="text-end">Importe</th>
              <th scope="col">Estado</th>
              <th scope="col" class="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="invoice in sortedInvoices"
              :key="invoice.id"
              :class="{ 'text-muted': invoice.status === 'failed' }"
            >
              <td class="small text-nowrap">{{ formatDate(invoice.date) }}</td>
              <td>
                <div class="fw-semibold small">{{ invoice.description || 'Factura' }}</div>
                <div class="small text-muted">{{ invoice.reference || '' }}</div>
              </td>
              <td class="text-end small">{{ formatCurrency(invoice.amount, invoice.currency) }}</td>
              <td>
                <span
                  class="badge"
                  :class="{
                    'bg-success': invoice.status === 'paid',
                    'bg-warning text-dark': invoice.status === 'pending',
                    'bg-danger': invoice.status === 'failed',
                  }"
                >
                  {{ invoice.status ? capitalize(invoice.status) : '—' }}
                </span>
              </td>
              <td class="text-end">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-primary me-2"
                  @click="viewInvoice(invoice)"
                  :aria-label="`Ver factura ${invoice.id}`"
                >
                  Ver
                </button>

                <button
                  v-if="invoice.downloadUrl || allowDownload"
                  type="button"
                  class="btn btn-sm btn-primary"
                  @click="downloadInvoice(invoice)"
                  :aria-label="`Descargar factura ${invoice.id}`"
                >
                  Descargar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="showFooter && hasInvoices"
        class="mt-3 d-flex justify-content-between align-items-center small text-muted"
      >
        <div>Mostrando {{ invoicesCount }} factura{{ invoicesCount === 1 ? '' : 's' }}</div>
        <div v-if="footerNote">
          {{ footerNote }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Invoice {
  id: string
  date: string | number | Date
  description?: string
  reference?: string
  amount: number
  currency?: string
  status?: 'paid' | 'pending' | 'failed'
  downloadUrl?: string
}

const props = defineProps<{
  /**
   * Lista de facturas. Cada elemento:
   * { id, date, description?, reference?, amount, currency?, status?, downloadUrl? }
   */
  invoices?: Invoice[] | null
  loading?: boolean
  subtitle?: string | null
  /**
   * Permitir mostrar botón de descarga aun si no hay downloadUrl (emite evento 'download').
   */
  allowDownload?: boolean
  /**
   * Mostrar pie con conteo y nota opcional
   */
  showFooter?: boolean
  footerNote?: string | null
}>()

const emits = defineEmits<{
  (e: 'download', invoice: Invoice): void
  (e: 'view', invoice: Invoice): void
}>()

const {
  invoices = null,
  loading = false,
  allowDownload = false,
  showFooter = true,
  footerNote = null,
} = props as Required<
  Pick<typeof props, 'invoices' | 'loading' | 'allowDownload' | 'showFooter' | 'footerNote'>
>

const hasInvoices = computed(() => Array.isArray(invoices) && invoices.length > 0)
const invoicesCount = computed(() => (invoices ? invoices.length : 0))

const sortedInvoices = computed(() => {
  if (!invoices) return []
  return [...invoices].sort((a, b) => {
    const da = new Date(a.date).getTime()
    const db = new Date(b.date).getTime()
    return db - da
  })
})

function formatDate(d: string | number | Date) {
  try {
    const dt = new Date(d)
    return dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return String(d)
  }
}

function formatCurrency(amount: number, currency?: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 2,
    }).format(amount / 100) // asume amount en centavos
  } catch {
    return `${amount}`
  }
}

function capitalize(s?: string) {
  if (!s) return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function downloadInvoice(invoice: Invoice) {
  // Si hay URL, abrir en nueva pestaña; siempre emitir para que el consumidor haga lo que necesite
  if (invoice.downloadUrl) {
    // abrir en ventana nueva en entorno de navegador
    try {
      window.open(invoice.downloadUrl, '_blank', 'noopener')
    } catch {
      // ignore
    }
  }
  emits('download', invoice)
}

function viewInvoice(invoice: Invoice) {
  emits('view', invoice)
}
</script>

<style lang="scss" scoped>
.billing-history {
  .table {
    th {
      font-weight: 600;
      font-size: 0.85rem;
    }
    td {
      font-size: 0.9rem;
    }
  }

  .badge {
    font-size: 0.75rem;
    padding: 0.35rem 0.5rem;
  }

  .spinner-border {
    width: 2rem;
    height: 2rem;
  }
}
</style>
