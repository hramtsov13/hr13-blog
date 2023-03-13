<template>
  <div class="form-control w-full font-mono">
    <label class="label" :for="name">
      <span v-if="label.length" class="label-text">
        {{ label }}
        <sup v-if="required" class="text-red-500">*</sup>
      </span>
    </label>

    <textarea
      :id="name"
      class="textarea textarea-secondary textarea-bordered w-full"
      :class="[
        { 'textarea-error': errorMessage },
        { 'text-neutral-100': disabled },
      ]"
      :value="modelValueRef"
      :name="name"
      :disabled="disabled"
      :rows="rows"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :readonly="readonly"
      v-bind="$attrs"
      @change="onChange"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />

    <div class="mt-1 flex justify-between gap-10 text-sm">
      <span
        class="min-h-5 inline-block text-red-500 opacity-0 transition duration-200"
        :class="{ 'opacity-100': errorMessage }"
      >
        {{ errorMessage }}
      </span>

      <span class="text-neutral-600">
        {{ modelValueRef.length }} / {{ maxLength }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TheTextareaProps {
  modelValue: string
  name: string
  label?: string
  placeholder?: string
  errorMessage?: string
  autocomplete?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  maxLength?: number
  rows?: number
}

const props = withDefaults(defineProps<TheTextareaProps>(), {
  label: '',
  modelValue: '',
  placeholder: '',
  errorMessage: '',
  name: '',
  autocomplete: 'off',
  required: false,
  disabled: false,
  readonly: false,
  maxLength: 200,
  rows: 4,
})

const emits = defineEmits(['update:modelValue', 'change', 'input'])

const focused = ref(false)
const modelValueRef = ref(props.modelValue)

const onInput = (event: Event) => {
  if (event) {
    const target = event.target as HTMLTextAreaElement

    if (target.value.length <= props.maxLength + 1) {
      modelValueRef.value = target.value

      emits('update:modelValue', target.value)
      emits('input', target.value)
    } else {
      modelValueRef.value = target.value.substring(0, props.maxLength)

      emits('update:modelValue', modelValueRef.value)
      emits('input', modelValueRef.value)
    }
  }
}

const onChange = (event: Event) => {
  if (event) {
    const target = event.target as HTMLTextAreaElement

    modelValueRef.value = target.value.substring(0, props.maxLength)

    emits('update:modelValue', modelValueRef.value)
    emits('change', modelValueRef.value)
  }
}

const onFocus = () => {
  focused.value = true
}

const onBlur = () => {
  focused.value = false
}
</script>
