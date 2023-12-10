<template>
  <div>
    <div v-if="!models" class="d-flex align-center justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-row v-else justify="center">
      <v-col v-for="(cat, i) in models" :key="i" cols="12" md="3">
        <v-card class="pa-5 rounded-xl light-box-shadow-1">
          <div class="d-flex justify-space-around align-center">
            <h3>{{ cat.name }}</h3>
            <v-img
              max-width="40"
              :src="require('~/assets/Images/categories/bulk.svg')"
            />
          </div>
          <br />
          <h5 class="text-center">کد : {{ '   ' + cat.code }}</h5>
          <br />
          <div class="d-flex justify-space-around">
            <v-btn
              class="elevation-0 rounded-lg"
              color="secondary"
              @click="setDelete(cat.id)"
              >حذف</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <br />
    <div class="d-flex justify-center">
      <v-btn
        class="elevation-0 rounded-lg"
        color="primary"
        @click="addModelDialog = !addModelDialog"
        >طرح جدید</v-btn
      >
    </div>
    <!--Add model dialog-->
    <v-dialog v-model="addModelDialog" class="rounded-xl" max-width="300px">
      <v-card class="pa-3">
        <h3 class="titletxt--text text-center">ایجاد طرح جدید</h3>
        <base-input
          placeholder="نام"
          :model-value="body.name"
          @update:modelValue="(newValue) => (body.name = newValue)"
        />
        <base-input
          placeholder="کد"
          :model-value="body.code"
          @update:modelValue="(newValue) => (body.code = newValue)"
        />
        <v-btn
          class="elevation-0"
          color="primary"
          width="100%"
          :loading="loading"
          @click="addDesign"
          >ایجاد</v-btn
        >
      </v-card>
    </v-dialog>
    <!--Delete Dialog-->
    <v-dialog v-model="deleteModelDialog" class="rounded-xl" max-width="300px">
      <v-card class="pa-3">
        <h3 class="titletxt--text text-center">
          آیا از درخواست خود اطمینان دارید؟
        </h3>
        <br />
        <div class="d-flex align-center justify-space-between">
          <v-btn
            width="48%"
            class="elevation-0 rounded-lg"
            color="primary"
            @click="deleteModelDialog = false"
            >لغو</v-btn
          >
          <v-btn
            width="48%"
            class="elevation-0 rounded-lg"
            outlined
            color="secondary"
            :loading="loading"
            @click="deleteModel"
            >تایید</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
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
      loading: false,
      addModelDialog: false,
      deleteModelDialog: false,
      models: null,
      deleteId: null,
      body: {},
    }
  },
  mounted() {
    this.getModels()
  },
  methods: {
    async getModels() {
      try {
        this.models = null
        const response = await this.$product.getDesigns()
        this.models = response.data
      } catch (error) {}
    },
    async addDesign() {
      try {
        this.loading = true
        await this.$product.addDesign(this.body)
        this.$toast.success('طرح با موفقیت افزوده شد')
        this.getModels()
        this.addModelDialog = false
      } catch (error) {
        this.$toast.error('ایجاد طرح با شکست مواجه شد')
      } finally {
        this.loading = false
      }
    },
    async deleteModel() {
      try {
        this.loading = true
        await this.$product.deleteDesign(this.deleteId)
        this.$toast.success('طرح با موفقیت حذف شد')
        this.deleteModelDialog = false
        this.getModels()
      } catch (error) {
        this.$toast.error('حذف طرح با شکست مواجه شد')
      } finally {
        this.loading = false
      }
    },
    setDelete(id) {
      this.deleteId = id
      this.deleteModelDialog = true
    },
  },
}
</script>
