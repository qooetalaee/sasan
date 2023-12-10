<template>
  <div>
    <v-row>
      <v-col v-for="(input, i) in inputs" :key="i" cols="12" md="3">
        <base-input
          :suffix="input.suffix"
          :placeholder="input.title + ' ' + 'را وارد کنید'"
          type="number"
          :model-value="baseBody[input.value]"
          @update:modelValue="(newValue) => (baseBody[input.value] = newValue)"
        />
      </v-col>
    </v-row>
    <br />
    <div class="d-flex align-center justify-center">
      <v-btn
        color="primary"
        class="elevation-0 rounded-lg"
        :loading="loading"
        @click="saveBaseChanges"
        >ذخیره اطلاعات پایه</v-btn
      >
    </div>
  </div>
</template>
<script>
import BaseInput from '~/components/common/BaseInput.vue'
export default {
  components: {
    BaseInput,
  },
  data() {
    return {
      inputs: [
        {
          title: 'اجرت',
          suffix: 'درصد',
          value: 'wage',
        },
        {
          title: 'سود',
          suffix: 'درصد',
          value: 'profit',
        },
        {
          title: 'اقساط',
          suffix: 'درصد',
          value: 'installments',
        },
        {
          title: 'درصد دلخواه',
          suffix: 'درصد',
          value: 'optional',
        },
      ],
      baseBody: {},
      loading: false,
    }
  },
  methods: {
    async saveBaseChanges() {
      try {
        this.loading = !this.loading
        await this.$settings.save(this.baseBody)
        this.$toast.success('تغییرات با موفقیت ذخیره شد')
      } catch (error) {
        this.$toast.error('ذخیره تغییرات با شکست مواجه شد')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
