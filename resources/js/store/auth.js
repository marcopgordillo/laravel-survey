import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      data: {
      },
      token: null,
    }
  }),
  getters: {},
  actions: {}
})

export default useAuthStore
