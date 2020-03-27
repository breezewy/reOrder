
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'


import './assets/styles/border.css'
import './assets/styles/reset.css'
import { Toast } from "vant";
import VueWechatTitle from 'vue-wechat-title'
import VueAwesomeSwiper from 'vue-awesome-swiper'


// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(VueWechatTitle)
Vue.use(Toast);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


