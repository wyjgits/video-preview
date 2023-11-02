import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "./router";
import App from './App.vue'
import './main.scss';
import './assets/iconfont.js'

createApp(App).use(router).use(createPinia()).mount('#app')
