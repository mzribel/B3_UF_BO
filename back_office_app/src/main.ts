import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/theme.css'
import './assets/style.css'
import App from './App.vue'

const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)

app.mount('#app')
