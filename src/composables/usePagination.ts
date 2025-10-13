import { computed, reactive } from 'vue'

interface PaginationOptions {
  page?: number
  limit?: number
  total?: number
}

export function usePagination(options: PaginationOptions = {}) {
  const state = reactive({
    page: options.page || 1,
    limit: options.limit || 10,
    total: options.total || 0,
  })

  const totalPages = computed(() => Math.ceil(state.total / state.limit))

  const hasNextPage = computed(() => state.page < totalPages.value)

  const hasPrevPage = computed(() => state.page > 1)

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      state.page = page
    }
  }

  const nextPage = () => {
    if (hasNextPage.value) {
      state.page++
    }
  }

  const prevPage = () => {
    if (hasPrevPage.value) {
      state.page--
    }
  }

  const setTotal = (total: number) => {
    state.total = total
  }

  const reset = () => {
    state.page = 1
    state.total = 0
  }

  const getPages = () => {
    const pages = []
    const maxVisiblePages = 5
    const half = Math.floor(maxVisiblePages / 2)

    let start = Math.max(1, state.page - half)
    const end = Math.min(totalPages.value, start + maxVisiblePages - 1)

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return {
    page: computed(() => state.page),
    limit: computed(() => state.limit),
    total: computed(() => state.total),
    totalPages,
    hasNextPage,
    hasPrevPage,
    setPage,
    nextPage,
    prevPage,
    setTotal,
    reset,
    getPages,
  }
}
