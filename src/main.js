import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* 基础样式 */
import "./assets/css/normalize.css"

createApp(App).use(store).use(router).mount('#app')
