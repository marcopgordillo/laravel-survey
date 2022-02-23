import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    error: null,
  }),
  getters: {
    getUser: state => state.user.data,
  },
  actions: {
    logout() {
      this.user.data = {}
      this.user.token = null
    },
    saveUser(payload) {
      this.user.data = payload.data.user
      this.user.token = payload.data.token
      sessionStorage.setItem('TOKEN', payload.data.token)
    },

  }
})

export default useAuthStore
