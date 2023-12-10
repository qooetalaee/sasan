<template>
  <div>
    <!--Settings-->
    <v-row>
      <v-col v-for="(input, i) in inputs" :key="i" cols="12" md="3">
        <p>{{ input.title }}</p>
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
    <v-divider class="my-4"></v-divider>
    <!--Companies-->
    <v-row justify="center">
      <v-col v-for="(company, i) in companies" :key="i" cols="12" md="3">
        <v-card class="pa-5 light-box-shadow-1 rounded-lg">
          <div class="d-flex justify-space-around align-center">
            <h3>{{ company.web_name }}</h3>
            <v-img
              max-width="40"
              :src="require('~/assets/Images/categories/bulk.svg')"
            />
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center justify-space-between">
            <h4 class="mb-3">اختلاف قیمت</h4>
            <p class="pa-1 white--text tertiary rounded-lg">
              {{ company.amount }}
            </p>
          </div>
          <div class="d-flex align-center">
            <h4 class="mb-3">واحد</h4>
            <v-spacer></v-spacer>
            <p class="pa-1 rounded-lg">
              {{ company.type === 'amount' ? 'تومان' : 'درصد' }}
              /
              {{ company.type_action === 'increase' ? 'افزایشی' : 'کاهشی' }}
            </p>
          </div>
          <br />
          <div class="d-flex justify-center">
            <v-btn
              class="elevation-0 rounded-lg"
              color="secondary"
              @click="setDeleteId(company.id)"
              >حذف</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <br />
    <div class="d-flex align-center justify-center">
      <v-btn
        class="elevation-0 rounded-lg"
        color="primary"
        @click="addCompanyDialog = !addCompanyDialog"
        >سایت جدید</v-btn
      >
    </div>
    <!--Add Company Dialog-->
    <v-dialog v-model="addCompanyDialog" class="rounded-xl" max-width="300px">
      <v-card class="pa-3">
        <h3 class="titletxt--text text-center">ایجاد دسته بندی جدید</h3>
        <base-input
          placeholder="نام وب سایت"
          :model-value="companyBody.web_name"
          @update:modelValue="(newValue) => (companyBody.web_name = newValue)"
        />
        <base-input
          placeholder="شناسه وب سایت"
          :model-value="companyBody.web_id"
          @update:modelValue="(newValue) => (companyBody.web_id = newValue)"
        />
        <base-input
          type="number"
          placeholder="میزان اختلاف"
          :model-value="companyBody.amount"
          @update:modelValue="(newValue) => (companyBody.amount = newValue)"
        />
        <base-select
          :items="[
            { id: 'decrease', title: 'کاهش' },
            { id: 'increase', title: 'افزایش' },
          ]"
          placeholder="اکشن"
          :model-value="companyBody.type_action"
          @update:modelValue="
            (newValue) => (companyBody.type_action = newValue)
          "
        />
        <v-btn
          class="elevation-0"
          color="primary"
          width="100%"
          :loading="loading"
          @click="createCompany"
          >ایجاد</v-btn
        >
      </v-card>
    </v-dialog>
    <!--Delete Company Dialog-->
    <v-dialog
      v-model="deleteCompanyDialog"
      class="rounded-xl"
      max-width="300px"
    >
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
            @click="deleteCompanyDialog = false"
            >لغو</v-btn
          >
          <v-btn
            width="48%"
            class="elevation-0 rounded-lg"
            outlined
            color="secondary"
            :loading="loading"
            @click="deleteCompany"
            >تایید</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
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
      addCompanyDialog: false,
      deleteCompanyDialog: false,
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
      deleteId: null,
      baseBody: {},
      companyBody: {},
      companies: null,
      loading: false,
    }
  },
  mounted() {
    this.getSettings()
    this.getCompanies()
  },
  methods: {
    async getSettings() {
      try {
        const response = await this.$settings.getAll()
        this.baseBody = response.data
      } catch (error) {}
    },
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
    async getCompanies() {
      try {
        this.companies = null
        const response = await this.$companies.getAll()
        this.companies = response.data
      } catch (error) {
        this.$toast.error('دریافت لیست سایت ها با شکست مواجه شد')
      }
    },
    async createCompany() {
      try {
        this.loading = true
        this.companyBody.type = 'amount'
        await this.$companies.create(this.companyBody)
        this.$toast.success('وب سایت با موفقیت ایجاد شد')
        this.getCompanies()
        this.addCompanyDialog = false
      } catch (error) {
        this.$toast.error('ایجاد وب سایت با شکست مواجه شد')
      } finally {
        this.loading = false
      }
    },
    async deleteCompany() {
      try {
        this.loading = true
        await this.$companies.deleteCompany(this.deleteId)
        this.$toast.success('سایت با موفقیت حذف شد')
        this.getCompanies()
        this.deleteCompanyDialog = false
      } catch (error) {
        this.$toast.error('حذف وب سایت با شکست مواجه شد')
      } finally {
        this.loading = false
      }
    },
    setDeleteId(id) {
      this.deleteId = id
      this.deleteCompanyDialog = true
    },
  },
}
</script>
