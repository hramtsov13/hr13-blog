import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import TheNotification from '../index.vue'

describe('TheNotification', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(TheNotification)
    expect(wrapper.vm).toBeTruthy()
  })
})
