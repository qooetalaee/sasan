<template>
  <div>
    <!--Loading-->
    <div v-if="!categories" class="d-flex align-center justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <!--Main Content-->
    <v-row v-else justify="center">
      <v-col v-for="(cat, i) in categories" :key="i" cols="12" md="3">
        <v-card class="pa-5 rounded-xl light-box-shadow-1">
          <div class="d-flex justify-space-around align-center">
            <h3>{{ cat.title }}</h3>
            <v-img
              max-width="40"
              :src="require('~/assets/Images/categories/bulk.svg')"
            />
          </div>
          <br />
          <div class="d-flex justify-space-around">
            <v-btn
              v-if="!cat.parent"
              class="elevation-0 rounded-lg"
              outlined
              color="primary"
              @click="addSubMenu(cat.id)"
              >افزودن زیر منو</v-btn
            >
            <v-btn
              class="elevation-0 rounded-lg"
              color="secondary"
              @click="deleteCatSetter(cat.id)"
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
        @click="addCatDialog = !addCatDialog"
        >افزودن دسته بندی</v-btn
      >
    </div>
    <!--Add Cat Dialog-->
    <v-dialog v-model="addCatDialog" class="rounded-xl" max-width="300px">
      <v-card class="pa-3">
        <h3 class="titletxt--text text-center">ایجاد دسته بندی جدید</h3>
        <base-input
          placeholder="نام دسته بندی"
          :model-value="newCat.title"
          @update:modelValue="(newValue) => (newCat.title = newValue)"
        />
        <base-input
          placeholder="آدرس دسته بندی"
          :model-value="newCat.slug"
          @update:modelValue="(newValue) => (newCat.slug = newValue)"
        />
        <base-input
          placeholder="سیمبول (برای مثال T)"
          :model-value="newCat.symbol"
          @update:modelValue="(newValue) => (newCat.symbol = newValue)"
        />
        <v-btn
          class="elevation-0"
          color="primary"
          width="100%"
          :loading="loading"
          @click="createCategory"
          >ایجاد</v-btn
        >
      </v-card>
    </v-dialog>
    <!--Delete Cat Dialog-->
    <v-dialog v-model="deleteCatDialog" class="rounded-xl" max-width="300px">
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
            @click="deleteCatDialog = false"
            >لغو</v-btn
          >
          <v-btn
            width="48%"
            class="elevation-0 rounded-lg"
            outlined
            color="secondary"
            :loading="loading"
            @click="deleteCat"
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
      deleteCatDialog: false,
      categories: null,
      deleteCatId: null,
      newCat: {},
      addCatDialog: false,
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      try {
        this.categories = null
        const response = await this.$product.getCategories()
        const arr = response.data
        const allCats = []
        arr.forEach((element) => {
          allCats.push(element)
          if (element.child)
            element.child.forEach((el) => {
              allCats.push(el)
            })
        })
        this.categories = allCats
      } catch (error) {
        this.$toast.error('دریافت لیست دسته بندی با شکست مواجه شد')
      }
    },
    addSubMenu(parentCat) {
      this.newCat.parent = parentCat
      this.addCatDialog = !this.addCatDialog
    },
    async createCategory() {
      try {
        this.loading = true
        await this.$product.createCategory(this.newCat)
        this.newCat = {}
        this.addCatDialog = !this.addCatDialog
        this.getCategories()
        this.$toast.success('دسته بندی با موفقیت ایجاد شد')
      } catch (error) {
        this.$toast.error('ایجاد دسته بندی با شکست مواجه شد')
      } finally {
        this.loading = false
      }
    },
    deleteCatSetter(id) {
      this.deleteCatId = id
      this.deleteCatDialog = true
    },
    async deleteCat() {
      try {
        this.loading = true
        await this.$product.deleteCat(this.deleteCatId)
        this.$toast.success('دسته بندی با موفقیت حذف شد')
        this.deleteCatDialog = !this.deleteCatDialog
        this.getCategories()
      } catch (error) {
        this.$toast.error('حذف دسته بندی با شکست مواجه شد')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
