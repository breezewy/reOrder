import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import BookedOrder from '@/pages/BookedOrder'
import BookingOrder from '@/pages/BookingOrder'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '*',
    //   redirect: '/home'
    // },
    {
      path: '/home/:id',
      name: 'home',
      meta: {
        title: '订单列表'
      },
      component: Home
    },
    {
      path: '/booked',
      name: 'booked',
      meta: {
        title: '已预约订单'
      },
      component: BookedOrder
    },
    {
      path: '/booking',
      name: 'booking',
      meta: {
        title: '订单预约'
      },
      component: BookingOrder
    }
  ]
})

