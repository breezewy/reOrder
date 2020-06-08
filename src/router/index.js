import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/reOrder/Home'
import BookedOrder from '@/pages/reOrder/BookedOrder'
import BookingOrder from '@/pages/reOrder/BookingOrder'
import Face from '@/pages/face/Face'
import Programme from '@/pages/programme/Programme'
import Traffic from '@/pages/programme/Traffic'
import SearchOrder from '@/pages/searchOrder/SearchOrder'
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
      // component: (resolve) => require(['@/pages/reOrder/Home'],resolve)
    },
    {
      path: '/booked',
      name: 'booked',
      meta: {
        title: '已预约订单'
      },
      component: BookedOrder
      // component: (resolve) => require(['@/pages/reOrder/BookedOrder'],resolve)
    },
    {
      path: '/booking',
      name: 'booking',
      meta: {
        title: '订单预约'
      },
      component: BookingOrder
      // component: (resolve) => require(['@/pages/reOrder/BookingOrder'],resolve)
    },
    {
      path: '/face',
      name: 'face',
      meta: {
        title: '人脸订单查询'
      },
      component: Face
      // component: (resolve) => require(['@/pages/face/Face'],resolve)
    },
    {
      path: '/programme',
      name: ' Programme',
      meta: {
        title: '宋城旅游演出节目单'
      },
      component: Programme
      // component: (resolve) => require(['@/pages/programme/Programme'],resolve)
    },
    {
      path: '/traffic',
      name: ' Traffic',
      meta: {
        title: '交通指南-宋城旅游'
      },
      component: Traffic
      // component: (resolve) => require(['@/pages/programme/Traffic'],resolve)
    },
    {
      path: '/searchOrder',
      name: ' searchOrder',
      meta: {
        title: '查询订单'
      },
      component: SearchOrder
      // component: (resolve) => require(['@/pages/programme/Traffic'],resolve)
    }
  ]
})

