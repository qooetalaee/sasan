export default ({ $axios }, inject) => {
    const companies = {
      async getAll() {
        return await $axios.$get('/admin/companies')
      },
      async create(context){
        await $axios.$post('/admin/companies', context)
      },
      async deleteCompany(id){
        await $axios.$delete(`/admin/companies/${id}`)
      }
    }
    inject('companies', companies)
  }
  