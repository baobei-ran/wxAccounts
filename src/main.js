
import 'babel-polyfill';
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import Vue from 'vue'
import '@/common/css/reset.css'
import App from './App'
import router from './router/index'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/common/css/flex.css'
import '@/common/js/rem.js'
import '@/common/js/filter'
import "@/common/js/ios.js"
import api from '@/api'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll';
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '',
  loading: './static/image/lazy.gif',
  attempt: 1
})

import { Loadmore } from 'mint-ui';

Vue.component(Loadmore.name, Loadmore);

Vue.config.productionTip = false
Vue.use(MintUI)
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);
Vue.prototype.$http = api

Vue.prototype.out = function (url) {
  if (url.indexOf('http') != -1) {
      window.open(url, '_black')
  } else {
    this.$router.push({path: url})
  }
}

window.addEventListener('online',  function() {
  // 网络由异常到正常时触发
  setTimeout(function () {
    window.location.reload()
  },0)
 });
 window.addEventListener('offline', function() {
  // 网络由正常常到异常时触发
  setTimeout(function () {
    window.location.reload()
  },0)
 })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
