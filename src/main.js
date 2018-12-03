import Vue from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import '@/components/icon/src/svg.js'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
