// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Es6Promise from 'es6-promise'
// require('es6-promise').polyfill()
Es6Promise.polyfill()
import Vue from 'vue'
import App from './App'
import router from './router/index'
import '@/common/css/reset.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/common/css/flex.css'
import '@/common/js/rem.js'
import '@/common/js/filter'
import "@/common/js/ios.js"
import 'swiper/dist/css/swiper.css'
import api from '@/api'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll';

Vue.use(infiniteScroll)
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '',
  loading: './common/img/5-121204193R0-50.gif',
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





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
