<template>
  <div class="container-fluid" v-if="invoice">
    <h2 class="mb-3">Factura {{ invoice.invoiceNumber }}</h2>

    <div class="card mb-3">
      <div class="card-body row g-3">
        <div class="col-md-3"><strong>Estado:</strong> <span class="text-capitalize">{{ invoice.status }}</span></div>
        <div class="col-md-3"><strong>Total:</strong> {{ formatCurrency(invoice.totalAmount) }}</div>
        <div class="col-md-3"><strong>Pagado:</strong> {{ formatCurrency(invoice.amountPaid) }}</div>
        <div class="col-md-3"><strong>Saldo:</strong> {{ formatCurrency(invoice.amountDue) }}</div>
      </div>
      <div class="card-footer d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="downloadPdf" :disabled="loading">
          PDF
        </button>
        <button class="btn btn-outline-primary" @click="sendEmail" :disabled="loading">
          Enviar Email
        </button>
        <button class="btn btn-success" @click="issue" :disabled="loading || invoice.status !== 'draft'">
          Emitir
        </button>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">Items</div>
      <div class="card-body table-responsive">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Descripción</th>
              <th class="text-end">Cant.</th>
              <th class="text-end">Precio</th>
              <th class="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(it, idx) in invoice.items" :key="idx">
              <td>{{ it.description }}</td>
              <td class="text-end">{{ it.quantity }}</td>
              <td class="text-end">{{ formatCurrency(it.unitPrice) }}</td>
              <td class="text-end">{{ formatCurrency(it.subtotal) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="card-header">Registrar Pago</div>
      <div class="card-body">
        <div class="row g-2 align-items-end">
          <div class="col-md-3">
            <label class="form-label">Monto</label>
            <input v-model.number="payment.amount" type="number" :max="invoice.amountDue" min="0" step="0.01" class="form-control" />
            <small class="text-muted">Saldo disponible: {{ formatCurrency(invoice.amountDue) }}</small>
          </div>
          <div class="col-md-3">
            <label class="form-label">Método</label>
            <select v-model="payment.paymentMethod" class="form-select">
              <option value="cash">Efectivo</option>
              <option value="bank_transfer">Transferencia</option>
              <option value="qr">QR</option>
            </select>
          </div>
          <div class="col-md-3">
            <button class="btn btn-primary w-100" @click="payManual" :disabled="loading">Pagar Manual</button>
          </div>
          <div class="col-md-3">
            <button class="btn btn-dark w-100" @click="payStripe" :disabled="loading">Pagar con Stripe</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-5">
    <div class="spinner-border text-primary" role="status"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { invoicesAPI, paymentsAPI } from '@/services/billingAPI'
import type { Invoice } from '@/types/billing.types'
import { useApi } from '@/composables/useApi'
import { formatters } from '@/utils/formatters'

const route = useRoute()
const { loading, execute } = useApi()
const invoice = ref<Invoice | null>(null)

const formatCurrency = (value: number) => formatters.formatCurrency(value, 'BOB')

onMounted(async () => {
  const id = route.params.id as string
  const res = await execute(() => invoicesAPI.getById(id))
  invoice.value = res?.data || null
})

const issue = async () => {
  if (!invoice.value) return
  const res = await execute(() => invoicesAPI.issue(invoice.value!.id))
  invoice.value = res?.data || invoice.value
}

const downloadPdf = async () => {
  if (!invoice.value) return
  const blob = await execute(() => invoicesAPI.downloadPdf(invoice.value!.id))
  if (blob) {
    const url = window.URL.createObjectURL(new Blob([blob]))
    const a = document.createElement('a')
    a.href = url
    a.download = `invoice-${invoice.value!.invoiceNumber}.pdf`
    a.click()
    window.URL.revokeObjectURL(url)
  }
}

const sendEmail = async () => {
  if (!invoice.value) return
  await execute(() => invoicesAPI.sendEmail(invoice.value!.id))
}

const payment = reactive({ amount: 0, paymentMethod: 'cash' as 'cash'|'bank_transfer'|'qr' })

const payManual = async () => {
  if (!invoice.value) return
  if (payment.amount <= 0 || payment.amount > invoice.value.amountDue) {
    // Validación de pago parcial
    return
  }
  await execute(() =>
    paymentsAPI.createManual(invoice.value!.id, {
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
    }),
  )
  // refrescar
  const res = await execute(() => invoicesAPI.getById(invoice.value!.id))
  invoice.value = res?.data || invoice.value
}

const payStripe = async () => {
  if (!invoice.value) return
  if (payment.amount <= 0 || payment.amount > invoice.value.amountDue) {
    return
  }
  // En un flujo real, obtendríamos paymentMethodId desde Stripe Elements
  await execute(() => paymentsAPI.createStripe(invoice.value!.id, { paymentMethodId: 'pm_mock' }))
  const res = await execute(() => invoicesAPI.getById(invoice.value!.id))
  invoice.value = res?.data || invoice.value
}
</script>

<style scoped></style>
