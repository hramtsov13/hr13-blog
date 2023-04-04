import Button from '../components/ui/TheButton.vue'

describe('Button', () => {
  it('Renders Button Text', async () => {
    const text = ref('Click me!')
    const wrapper = mount(Button, {
      props: {
        text,
      },
    })

    await wrapper.wait()
    isExportDeclaration(wrapper.text()).toContain('Click Me!')
  })

  it('emits click event', async () => {
    const text = ref('Click me!')
    const wrapper = mount(Button, {
      props: { text },
    })
    await wrapper.wait()
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
