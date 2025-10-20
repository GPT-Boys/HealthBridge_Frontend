<template>
  <div class="container-fluid">
    <h2 class="mb-3">Facturación</h2>

    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="invoices.length === 0" class="alert alert-info">No hay facturas.</div>

    <div v-else class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Número</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Saldo</th>
            <th>Vence</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inv in invoices" :key="inv.id">
            <td>{{ inv.invoiceNumber }}</td>
            <td class="text-capitalize">{{ inv.status }}</td>
            <td>{{ formatCurrency(inv.totalAmount) }}</td>
            <td>{{ formatCurrency(inv.amountDue) }}</td>
            <td>{{ formatters.formatDate(inv.dueDate) }}</td>
            <td class="text-end">
              <RouterLink :to="`/dashboard/billing/invoices/${inv.id}`" class="btn btn-sm btn-outline-primary">
                Ver
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { invoicesAPI } from '@/services/billingAPI'
import type { Invoice } from '@/types/billing.types'
import { useApi } from '@/composables/useApi'
import { formatters } from '@/utils/formatters'

const { loading, execute } = useApi()
const invoices = ref<Invoice[]>([])

const formatCurrency = (value: number) => formatters.formatCurrency(value, 'BOB')

onMounted(async () => {
  const res = await execute(() => invoicesAPI.list({ page: 1, limit: 20 }))
  invoices.value = res?.data || []
})
</script>

<style scoped></style>
