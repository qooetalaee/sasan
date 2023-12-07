<template>
  <v-text-field
    :value="modelValue"
    :prepend-inner-icon="icon ? `mdi-${icon}` : false"
    class="rounded-lg my-3"
    :type="type"
    flat
    solo
    :min="0"
    :placeholder="placeholder"
    hide-details
    :suffix="suffix ?? false"
    background-color="backgroundColor"
    :disabled="disabled"
    @input="$emit('update:modelValue', $event)"
  />
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
