import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './main.scss';
import './assets/iconfont.js'

createApp(App).use(createPinia()).mount('#app')
