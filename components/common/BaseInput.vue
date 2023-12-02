<template>
  <v-text-field
    v-model="value"
    :prepend-inner-icon="`mdi-${icon}`"
    class="rounded-lg my-10"
    :type="type"
    flat
    solo
    :placeholder="placeholder"
    hide-details
    background-color="backgroundColor"
    :value="value"
  />
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      require: false,
      default: 'text',
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
  },
  data() {
    return {
      value: null,
    }
  },
  watch: {
    value() {
      this.$emit('input', this.value)
    },
  },
}
</script>
