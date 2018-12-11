import Vue from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import '@/components/icon/src/svg.js'
import Toast from './components/toast/src/plugin'
Vue.config.productionTip = false

Vue.use(Toast)

new Vue({
  render: h => h(App),
}).$mount('#app')
