import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/reOrder/Home'
import BookedOrder from '@/pages/reOrder/BookedOrder'
import BookingOrder from '@/pages/reOrder/BookingOrder'
import Face from '@/pages/face/Face'
import Programme from '@/pages/programme/Programme'
import Traffic from '@/pages/programme/Traffic'
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
    },
    {
      path: '/face',
      name: 'face',
      meta: {
        title: '人脸订单查询'
      },
      component: Face
    },
    {
      path: '/programme',
      name: ' Programme',
      meta: {
        title: '宋城旅游演出节目单'
      },
      component: Programme
    },
    {
      path: '/traffic',
      name: ' Traffic',
      meta: {
        title: '交通指南-宋城旅游'
      },
      component: Traffic
    }
  ]
})

