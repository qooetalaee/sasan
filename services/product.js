export default ({ $axios }, inject) => {
  const product = {
    async getCategories() {
      return await $axios.$get('/admin/product/categories')
    },
    async createCategory(cat) {
      await $axios.post('/admin/product/categories', cat)
    },
    async getDesigns() {
      return await $axios.$get('/admin/designs')
    },
    async addDesign(context) {
      await $axios.$post('/admin/designs', context)
    },
    async deleteDesign(id) {
      await $axios.$delete(`/admin/designs/${id}`)
    },
    async create(form) {
      await $axios.$post('/admin/products', form)
    },
    async update(form, id){
      await $axios.$post(`/admin/products/${id}`, form)
    },
    async getAll(filter) {
      return await $axios.$get(`/admin/products${filter ?? ''}`)
    },
    async deleteCat(catId) {
      await $axios.$delete(`/admin/product/categories/${catId}`)
    },
    async deleteProduct(productId) {
      await $axios.$delete(`/admin/products/${productId}`)
    },
  }
  inject('product', product)
}
