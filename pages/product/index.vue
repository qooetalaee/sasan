<template>
  <div>
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
  </div>
</template>
<script>
import DataTable from '~/components/common/DataTable.vue'
export default {
  components: {
    DataTable,
  },
  data() {
    return {
      items: [],
      headers: [
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
  mounted() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      try {
        const response = await this.$product.getAll(`?page=${this.page}`)
        this.pageCount = response.meta.last_page
        this.items = response.data
      } catch (error) {
        this.$toast.error('دریافت لیست محصولات با شکست مواجه شد')
      } finally {
        this.loading = false
      }
    },
    goToEditPage(productId) {
      this.$router.push({ name: 'product-id', id: productId })
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
  },
}
</script>
