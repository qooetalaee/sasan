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
    <data-table
      :items="items"
      :headers="headers"
      @edit="goToEditPage($event)"
      @delete="deleteProduct($event)"
    />
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
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      try {
        const response = await this.$product.getAll()
        this.items = response.data
      } catch (error) {
        this.$toast.error('دریافت لیست محصولات با شکست مواجه شد')
      }
    },
    goToEditPage() {
      console.log('EDIT')
    },
    deleteProduct() {
      console.log('DELETE')
    },
    goToNewProductPage() {
      this.$router.push({ name: 'product-add' })
    },
  },
}
</script>
