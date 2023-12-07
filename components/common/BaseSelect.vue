<template>
  <v-select
    :value="modelValue"
    :prepend-inner-icon="icon ? `mdi-${icon}` : false"
    class="rounded-lg my-3"
    flat
    solo
    clearable
    :chips="chips"
    :multiple="chips"
    :placeholder="placeholder"
    hide-details
    background-color="backgroundColor"
    :items="items"
    item-value="id"
    item-text="title"
    @input="$emit('update:modelValue', $event)"
  />
</template>
<script>
export default {
  props: {
    modelValue: {
      type: [String, Number, null],
      required: true,
    },
    placeholder: {
      type: String,
      require: false,
      default: '',
    },
    icon: {
      type: String,
      require: false,
      default: '',
    },
    items: {
      type: Array,
      require: false,
      default: () => [],
    },
    chips: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data() {
    return {
      value: null,
    }
  },
}
</script>
