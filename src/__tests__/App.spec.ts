import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from '../App.vue'

describe('App', () => {
  it('mounts and renders root container', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
        stubs: {
          RouterView: true,
          RouterLink: true,
          LoadingSpinner: true,
        },
      },
    })

    // Debe existir el contenedor raíz y el contenedor de toasts
    expect(wrapper.find('#app').exists()).toBe(true)
    expect(wrapper.find('.toast-container').exists()).toBe(true)
  })
})
