import Vue from 'vue'
import App from './App.vue'
import '@/components/icon/src/svg.js'
import Toast from './components/toast/src/plugin'
import './assets/styles/index.scss'
Vue.config.productionTip = false

Vue.use(Toast)

new Vue({
  render: h => h(App),
}).$mount('#app')
