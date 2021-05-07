// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'

Vue.prototype.$ = $
Vue.use(VueAxios, axios)
Vue.use(Ant)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
