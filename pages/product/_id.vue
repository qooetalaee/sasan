<template>
  <div>
    <div v-if="!data" class="d-flex align-center justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-row v-else>
      <v-col cols="12" md="4">
        <!--Product Title-->
        <h4>عنوان محصول</h4>
        <base-input
          placeholder="عنوان محصول را وارد کنید"
          :model-value="data.name"
          @update:modelValue="(newValue) => (data.name = newValue)"
        />
      </v-col>
      <!--Product Tags-->
      <v-col cols="12" md="8">
        <h4>تگ های محصول</h4>
        <base-select
          chips
          :items="data.tags"
          placeholder="انتخاب برچسب"
          :model-value="data.tags"
          @update:modelValue="(newValue) => (data.tags = newValue)"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import BaseInput from '~/components/common/BaseInput.vue'
import BaseSelect from '~/components/common/BaseSelect.vue'
export default {
  components: {
    BaseInput,
    BaseSelect,
  },
  data() {
    return {
      data: null,
    }
  },
  mounted() {
    this.getProductInfo()
  },
  methods: {
    async getProductInfo() {
      const response = await this.$product.getAll(
        `?filter[id]=${this.$route.params.id}`
      )
      this.data = response.data[0]
    },
  },
}
</script>
