// import 'babel-polyfill' // https://babeljs.io/docs/plugins/preset-env/#usebuiltins
import 'assets/scss/base.scss'
import 'assets/scss/el-cover.scss'
import 'assets/scss/element-variables.scss'

import Vue from 'vue'

import ElementUI from 'element-ui'
Vue.use(ElementUI)

import router from './router'
import App from './App'

import filters from 'filters'
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})
import 'directives'

import store from './store'

Vue.config.productionTip = false


import {fetchGetConfig} from 'request/api'

fetchGetConfig().then(res=> {
  // console.info('resresresresresres----',res)
  window.__BASEURL__ = res.env.host;
  new Vue({
    el: '#app',
    router,
    store,
    render: createElement => createElement(App)
  })
});
