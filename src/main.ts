import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use((context) => {
    if(context.store.$id == 'currentUser') {
        const token = localStorage.getItem('token')
        if(token) {
            context.store.setValue(JSON.parse(token))
        }
    }
})
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
