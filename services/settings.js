export default ({ $axios }, inject) => {
  const setting = {
    async save(context) {
      return await $axios.$post('/admin/adjustments/wage', context)
    },
  }
  inject('settings', setting)
}
