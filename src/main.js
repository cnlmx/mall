import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'
require('./mock/index.js')

Vue.config.productionTip = false

// 新建一个 Vue 实例作为事件总线对象
Vue.prototype.$bus = new Vue()

// 安装自定义插件 toast
Vue.use(toast)

// 使用懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/loading.gif')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
