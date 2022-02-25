import { defineStore } from 'pinia'
import { AuthService } from '@/services'

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
    async registerUser(payload) {
      const { data } = await AuthService.registerUser(payload)
      this.user.data = data.data.user
      this.user.token = data.data.token
      sessionStorage.setItem('TOKEN', data.data.token)
    },
    async login(payload) {
      const { data } = await AuthService.login(payload)
      this.user.data = data.data.user
      this.user.token = data.data.token
      sessionStorage.setItem('TOKEN', data.data.token)

    }
// 3 marzo, 8pm, 14 marzo 7pm,
// pc 300 $
// foto
// cv, relevante
// contenido 5 puntos mas relevantes
// fundacion.propade@propade.org
  }
})

export default useAuthStore
