import Vue from 'vue'
import App from './App.vue'
import '@/components/icon/svg.js'
import Toast from './components/toast/plugin'
import './assets/styles/index.scss'
Vue.config.productionTip = false

Vue.use(Toast)

new Vue({
  render: h => h(App),
}).$mount('#app')
