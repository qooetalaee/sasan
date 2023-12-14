<template>
  <div>
    <v-row align="center">
      <v-col cols="12" md="3">
        <base-input
          placeholder="عنوان محصول"
          :model-value="searchInName"
          @update:modelValue="(newValue) => (searchInName = newValue)"
      /></v-col>
      <v-col cols="12" md="3">
        <base-input
          placeholder="شماره سریال"
          :model-value="searchInSerial"
          @update:modelValue="(newValue) => (searchInSerial = newValue)"
      /></v-col>
    </v-row>

    <div class="d-flex align-center justify-end">
      <v-btn
        color="primary"
        class="elevation-0 rounded-lg"
        @click="goToNewProductPage"
        >محصول جدید</v-btn
      >
    </div>
    <!--Product List-->
    <data-table
      :items="items"
      :headers="headers"
      :pages-count="pageCount"
      :loading="loading"
      @edit="goToEditPage($event)"
      @delete="openDeleteProduct($event)"
      @page-changed="changePage($event)"
      @open-img="openImgDialog($event)"
    />
    <!--Delete Product Dialog-->
    <v-dialog
      v-model="deleteProductDialog"
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
            @click="deleteProductDialog = false"
            >لغو</v-btn
          >
          <v-btn
            width="48%"
            class="elevation-0 rounded-lg"
            outlined
            color="secondary"
            :loading="btnLoading"
            @click="deleteProduct"
            >تایید</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
    <!--Open featured image dialog-->
    <v-dialog v-model="imgDialog" max-width="500">
      <v-card>
        <v-img :src="featuredImageLink" />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import BaseInput from '~/components/common/BaseInput.vue'
import DataTable from '~/components/common/DataTable.vue'
export default {
  components: {
    DataTable,
    BaseInput,
  },
  data() {
    return {
      searchInName: '',
      searchInSerial: '',
      featuredImageLink: null,
      imgDialog: false,
      items: [],
      headers: [
        {
          text: 'عکس',
          value: 'image',
          align: 'start',
          sortable: false,
        },
        {
          text: 'نام',
          value: 'name',
          align: 'start',
          sortable: false,
        },
        {
          text: 'دسته بندی',
          value: 'categories[0]',
          align: 'start',
          sortable: false,
        },
        {
          text: 'تعداد موجودی',
          value: 'quantity_available',
          align: 'start',
          sortable: false,
        },
        {
          text: 'سریال',
          value: 'serial_number',
          align: 'start',
          sortable: false,
        },
        {
          text: 'وضعیت',
          value: 'status',
          align: 'start',
          sortable: false,
        },
        {
          text: 'سایز کودک',
          value: 'kidPrice',
          align: 'start',
          sortable: false,
        },
        {
          text: 'سایز کوچک',
          value: 'smallPrice',
          align: 'start',
          sortable: false,
        },
        {
          text: 'سایز متوسط',
          value: 'mediumPrice',
          align: 'start',
          sortable: false,
        },
        {
          text: 'سایز بزرگ',
          value: 'largePrice',
          align: 'start',
          sortable: false,
        },
        {
          text: 'حذف',
          value: 'delete',
          align: 'start',
          sortable: false,
        },
        {
          text: 'ویرایش',
          value: 'edit',
          align: 'end',
          sortable: false,
        },
      ],
      pageCount: 1,
      page: 1,
      loading: true,
      deleteProductDialog: false,
      productId: null, // Used for deleting product
      btnLoading: false,
    }
  },
  watch: {
    searchInName() {
      this.getProducts()
    },
    searchInSerial() {
      this.getProducts()
    },
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      try {
        const response = await this.$product.getAll(
          `?page=${this.page}&filter[name]=${this.searchInName}&filter[serial_number]=${this.searchInSerial}`
        )
        this.pageCount = response.meta.last_page
        this.items = this.setPrices(response.data)
      } catch (error) {
        console.log('ERR IS : ', error)
        this.$toast.error('دریافت لیست محصولات با شکست مواجه شد')
      } finally {
        this.loading = false
      }
    },
    goToEditPage(product) {
      this.$router.push({
        name: 'product-id',
        params: { id: product.id },
      })
    },
    openDeleteProduct(product) {
      this.productId = product.id
      this.deleteProductDialog = true
    },
    async deleteProduct() {
      try {
        this.btnLoading = true
        await this.$product.deleteProduct(this.productId)
        this.$toast.success('محصول با موفقیت حذف شد')
        this.deleteProductDialog = false
        this.getProducts()
      } catch (error) {
        this.$toast.error('حذف محصول با شکست مواجه شد')
      } finally {
        this.btnLoading = false
      }
    },
    goToNewProductPage() {
      this.$router.push({ name: 'product-add' })
    },
    changePage(page) {
      this.page = page
      this.getProducts()
    },
    setPrices(items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].companies)
          items[i].companies.forEach((element) => {
            items[i].webName = element.web_name
            items[i].smallPrice = Math.floor(
              element.pivot.s_final_price
            ).toLocaleString()
            items[i].largePrice = Math.floor(
              element.pivot.l_final_price
            ).toLocaleString()
            items[i].mediumPrice = Math.floor(
              element.pivot.m_final_price
            ).toLocaleString()
            items[i].kidPrice = Math.floor(
              element.pivot.k_final_price
            ).toLocaleString()
          })
      }
      return items
    },
    openImgDialog(link) {
      this.featuredImageLink = link
      this.imgDialog = true
    },
  },
}
</script>
