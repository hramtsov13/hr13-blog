import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from '../components/ui/TheButton.vue'

describe('Button', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Button)
    expect(wrapper.vm).toBeTruthy()
  })
})
