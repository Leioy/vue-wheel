# YUI

> 本组件库仅供学习交流，请勿在生产环境中使用

[官方文档](https://leioy.github.io/vue-wheel-docs/dist/#/)

## 安装
```js
$ npm install yyui-vue
$ yarn add yyui-vue
```

## 使用
在main.js中如下配置:
```js
import Vue from 'Vue'
import App from 'components/app.vue'
import Yui from 'yyui-vue'
import 'yyui-vue/dist/yui.css'
Vue.use(Yui)
new Vue({
  el: '#app',
  render: h => h(app)
})
```
如果您觉得还不错，请点个star