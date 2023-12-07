export default ({ $axios }, inject) => {
    const product = {
      async getCategories() {
       return await $axios.$get('/admin/product/categories')
      },
      async getDesigns(){
        return await $axios.$get('/admin/designs')
      },
      async create(form){
        await $axios.$post('/admin/products', form)
      },
      async getAll(){
        return await $axios.$get('/admin/products')
      }
    }
    inject('product', product)
  }
  