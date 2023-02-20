<template>
  <div class="form-control w-full font-mono">
    <label class="label" :for="name">
      <span v-if="label.length" class="label-text">
        {{ label }}
        <sup v-if="required" class="text-red-500">*</sup>
      </span>
    </label>
    <input
      :id="name"
      class="input input-bordered w-full"
      :class="{ 'input-error': errorMessage }"
      :type="type"
      :name="name"
      :required="required"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="disabled"
      @input="onInput"
      @change="onChange"
    />
    <span
      class="min-h-5 inline-block text-sm text-red-500 opacity-0 transition duration-200"
      :class="{ 'opacity-100': errorMessage }"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface ITheInput {
  modelValue: string
  name: string
  type?: string
  label?: string
  placeholder?: string
  errorMessage?: string
  autocomplete?: string
  required?: boolean
  disabled?: boolean
}

withDefaults(defineProps<ITheInput>(), {
  label: '',
  modelValue: '',
  placeholder: '',
  errorMessage: '',
  name: '',
  type: 'text',
  autocomplete: 'off',
  required: false,
  disabled: false,
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
