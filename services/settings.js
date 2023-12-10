export default ({ $axios }, inject) => {
  const setting = {
    async getAll(){
      return await $axios.$get('/admin/adjustments/wage')
    },
    async save(context) {
      return await $axios.$post('/admin/adjustments/wage', context)
    },
  }
  inject('settings', setting)
}
