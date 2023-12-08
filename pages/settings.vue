<template>
  <div>
    <v-row>
      <v-col v-for="(input, i) in inputs" :key="i" cols="12" md="3">
        <base-input
          :suffix="input.suffix"
          :placeholder="input.title + ' ' + 'را وارد کنید'"
          type="number"
        />
      </v-col>
    </v-row>
    <br />
    <div class="d-flex align-center justify-center">
      <v-btn color="primary" class="elevation-0 rounded-lg"
        >ذخیره تغییرات</v-btn
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
        },
        {
          title: 'سود',
          suffix: 'درصد',
        },
        {
          title: 'اقساط',
          suffix: 'درصد',
        },
        {
          title: 'درصد دلخواه',
          suffix: 'درصد',
        },
        {
          title: 'سود در سایت دوم',
          suffix: 'درصد',
        },
        {
          title: 'سود در سایت سوم',
          suffix: 'درصد',
        },
      ],
    }
  },
}
</script>
