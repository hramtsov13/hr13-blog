<template>
  <div class="form-control w-full">
    <label class="label" :for="name">
      <span v-if="label.length" class="label-text">
        {{ label }}
      </span>
    </label>
    <input
      :id="name"
      class="input input-bordered w-full"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      @input="onInput"
    />
    <span v-if="errorMessage">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface ITheInput {
  modelValue: string
  name: string
  type: string
  label?: string
  placeholder?: string
  errorMessage?: string
  autocomplete?: string
}

withDefaults(defineProps<ITheInput>(), {
  label: '',
  modelValue: '',
  placeholder: '',
  errorMessage: '',
  name: '',
  type: 'text',
  autocomplete: 'off',
})

const emits = defineEmits(['update:modelValue', 'input', 'change'])

const onInput = (event: Event) => {
  if (event) {
    const target = event.target as HTMLInputElement
    emits('update:modelValue', target.value)
    emits('input', target.value)
  }
}

const onChange = (event: Event) => {
  if (event) {
    const target = event.target as HTMLInputElement
    emits('change', target.value)
  }
}
</script>
