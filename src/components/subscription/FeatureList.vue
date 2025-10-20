<template>
  <div class="feature-list">
    <header class="d-flex align-items-center justify-content-between mb-3">
      <h5 class="mb-0">
        <slot name="title">Características</slot>
      </h5>
      <small class="text-muted" v-if="subtitle">{{ subtitle }}</small>
    </header>

    <ul class="list-unstyled mb-0">
      <li
        v-for="feature in normalizedFeatures"
        :key="feature.key"
        class="d-flex align-items-start gap-3 py-2 feature-item"
        :class="{ 'opacity-75': !feature.included }"
        @click="interactive && toggleFeature(feature.key)"
        role="button"
        :aria-pressed="feature.included"
        :tabindex="interactive ? 0 : -1"
        @keydown.enter.prevent="interactive && toggleFeature(feature.key)"
        @keydown.space.prevent="interactive && toggleFeature(feature.key)"
      >
        <div class="icon-wrap mt-1">
          <i
            v-if="feature.included"
            class="bi bi-check-circle-fill text-success"
            aria-hidden="true"
          ></i>
          <i v-else class="bi bi-x-circle text-danger" aria-hidden="true"></i>
        </div>

        <div class="feature-body flex-fill">
          <div class="d-flex align-items-center justify-content-between">
            <strong class="feature-title">{{ feature.label }}</strong>
            <small v-if="feature.badge" class="badge bg-primary ms-2">{{ feature.badge }}</small>
          </div>
          <div v-if="feature.description" class="feature-desc text-muted small">
            {{ feature.description }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'

interface Feature {
  key: string
  label: string
  included?: boolean
  description?: string
  badge?: string
}

const props = defineProps<{
  /**
   * Array de features. Cada elemento puede tener:
   * { key, label, included?, description?, badge? }
   */
  features?: Feature[] | null

  /**
   * Alternativamente, pasar un array de keys que están incluidas en el plan.
   * Si se usan ambos, `features` tiene prioridad.
   */
  includedKeys?: string[] | null

  /**
   * Texto pequeño mostrado al lado del título
   */
  subtitle?: string | null

  /**
   * Permite hacer toggle (emit 'update:includedKeys' y 'change') cuando se hace click en un elemento.
   * Si no se pasa, la lista es solo de lectura.
   */
  interactive?: boolean
}>()

const emits = defineEmits<{
  (e: 'change', payload: { key: string; included: boolean }): void
  (e: 'update:includedKeys', keys: string[]): void
}>()

const { features, includedKeys, subtitle, interactive } = toRefs(props)

const normalizedFeatures = computed<Feature[]>(() => {
  if (features.value && features.value.length > 0) {
    // Si se proporcionó la lista completa de features, respetar su `included` cuando exista,
    // y usar includedKeys como fallback para marcar inclusion.
    const keys = new Set(includedKeys.value || [])
    return features.value.map((f) => ({
      key: f.key,
      label: f.label,
      included: typeof f.included === 'boolean' ? f.included : keys.has(f.key),
      description: f.description,
      badge: f.badge,
    }))
  }

  // Si solo se pasaron includedKeys, construir una lista simple
  if (includedKeys.value && includedKeys.value.length > 0) {
    return includedKeys.value.map((k) => ({
      key: k,
      label: prettifyKey(k),
      included: true,
    }))
  }

  return []
})

function prettifyKey(key: string) {
  // Convierte "advanced-appointments" => "Advanced Appointments" (básico)
  return key.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function toggleFeature(key: string) {
  if (!interactive.value) return

  const list = normalizedFeatures.value
  const idx = list.findIndex((f) => f.key === key)
  if (idx === -1) return

  // asegurar que el elemento existe y normalizar included a boolean
  const item = list[idx]
  if (!item) return

  const newIncluded = !(item.included ?? false)
  item.included = newIncluded

  // Emitir change
  emits('change', { key, included: newIncluded })

  // Actualizar includedKeys emit (reconstruir)
  const newKeys = list.filter((f) => f.included).map((f) => f.key)
  emits('update:includedKeys', newKeys)
}
</script>

<style lang="scss" scoped>
.feature-list {
  .feature-item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    cursor: default;

    &:hover {
      background: rgba(0, 0, 0, 0.01);
    }

    &.opacity-75 {
      .feature-title {
        color: var(--secondary-color, #6c757d);
      }
    }

    .icon-wrap {
      width: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }

    .feature-title {
      font-size: 0.95rem;
    }

    .feature-desc {
      margin-top: 0.125rem;
      line-height: 1.2;
    }
  }

  /* Si el componente es interactivo, indicar con puntero */
  :root {
    --interactive-cursor: pointer;
  }
  /* Aplicar cursor pointer a items clicables */
  li[role='button'] {
    cursor: pointer;
  }
}
</style>
