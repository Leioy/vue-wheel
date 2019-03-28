import Message from '../message/message.vue'
export default {
  install (Vue, options) {
    Vue.prototype.$Message = {
      info ({ message = '', duration = 2000, closeable = false }) {
        const Constructor = Vue.extend(Message)
        const div = document.createElement('div')
        document.body.appendChild(div)
        const vm = new Constructor({
          propsData: {
            options: {
              type: 'info',
              message,
              duration,
              closeable,
            },
          },
        }).$mount(div)
        vm.visible = true
      },
      warning ({ message = '', duration = 2000, closeable = false }) {
        const Constructor = Vue.extend(Message)
        const div = document.createElement('div')
        document.body.appendChild(div)
        const vm = new Constructor({
          propsData: {
            options: {
              type: 'warning',
              message,
              duration,
              closeable,
            },
          },
        }).$mount(div)
        vm.visible = true
      },
      success ({ message = '', duration = 2000, closeable = false }) {
        const Constructor = Vue.extend(Message)
        const div = document.createElement('div')
        document.body.appendChild(div)
        const vm = new Constructor({
          propsData: {
            options: {
              type: 'success',
              message,
              duration,
              closeable,
            },
          },
        }).$mount(div)
        vm.visible = true
      },
      error ({ message = '', duration = 2000, closeable = false }) {
        const Constructor = Vue.extend(Message)
        const div = document.createElement('div')
        document.body.appendChild(div)
        const vm = new Constructor({
          propsData: {
            options: {
              type: 'error',
              message,
              duration,
              closeable,
            },
          },
        }).$mount(div)
        vm.visible = true
      },
    }
  },
}
