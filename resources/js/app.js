import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '../css/app.css'

const app = createApp(App)
          .use(createPinia())
            .use(router)

app.mount('#app')
