import { defineStore } from 'pinia'
import { API } from '@/services'

const useMainStore = defineStore('main', {
  state: () => ({
    dashboard: {
      loading: false,
      data: {},
    }
  }),
  getters: {},
  actions: {
    async getDashboardData() {
      this.dashboard.loading = true
      try {
        const { data } = await API.get('/dashboard')
        this.dashboard.data = data
        this.dashboard.loading = false
      } catch (err) {
        this.dashboard.loading = false
        throw err
      }
    }
  }
})

export default useMainStore
