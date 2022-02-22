import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
  state: () => ({
    user: {
      data: {
        name: 'Marco'
      },
      token: null,
    }
  }),
  getters: {},
  actions: {}
})

export default useMainStore
