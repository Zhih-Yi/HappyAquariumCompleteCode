import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/frontend/Home.vue'
import Index from '@/views/frontend/Index.vue'
import Product from '@/views/frontend/Product.vue'
import Login from '@/views//frontend/Login.vue'
import Content from '@/views/frontend/Content.vue'
import Dashboard from '@/views/backend/Dashboard.vue'
import DashboardIndex from '@/views/backend/DashboardIndex.vue'
import ProductManage from '@/views/backend/ProductManage.vue'
import CheckoutConfirm from '@/views/frontend/CheckoutConfirm.vue'
import CheckoutOrder from '@/views//frontend/CheckoutOrder.vue'
import CheckoutSuccess from '@/views/frontend/CheckoutSuccess.vue'
import Coupon from '@/views/backend/Coupon.vue'
import Order from '@/views/backend/Order.vue'
import Favorite from '@/views/frontend/Favorite.vue'
import ReportDay from '@/views/backend/ReportDay.vue'
import ReportWeek from '@/views/backend/ReportWeek.vue'
import ReportMonth from '@/views/backend/ReportMonth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
          breadcrumb: [{
            name: '首頁'
          }]
        }
      },
      {
        path: 'product/:kind?',
        name: 'Product',
        component: Product,
        meta: {
          breadcrumb: [{
            name: '首頁',
            link: '/'
          },
          {
            name: '商品'
          }]
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: {
          breadcrumb: [{
            name: '首頁',
            link: '/'
          }, {
            name: '管理員登入'

          }]
        }
      },
      {
        path: 'content/:contentId/kind/:kind?',
        name: 'Content',
        component: Content,
        meta: {
          breadcrumb: [{
            name: '首頁',
            link: '/'
          }, {
            name: '所有商品',
            link: '/product'
          }, {
            name: '商品內容'
          }]
        }

      },
      {
        path: 'favorite',
        name: 'Favorite',
        component: Favorite,
        meta: {
          breadcrumb: [{
            name: '首頁',
            link: '/'
          },
          {
            name: '我的收藏'
          }]
        }
      },
      {
        path: 'checkoutConfirm',
        name: 'CheckoutConfirm',
        component: CheckoutConfirm,
        meta: {
          breadcrumb: [{
            name: '首頁',
            link: '/'
          }, {
            name: '結帳-確認商品'
          }]
        }
      },
      {
        path: 'checkoutOrder',
        name: 'CheckoutOrder',
        component: CheckoutOrder,
        meta: {
          breadcrumb: [{
            name: '首頁',
            link: '/'
          }, {
            name: '結帳-訂單付款'
          }]
        }
      },
      {
        path: 'checkoutSuccess',
        name: 'CheckoutSuccess',
        component: CheckoutSuccess,
        meta: {
          breadcrumb: [{
            name: '首頁',
            link: '/'
          }, {
            name: '付款成功'
          }]
        }

      }
    ]
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,

    children: [
      {
        path: 'dashboard',
        name: 'DashboardIndex',
        component: DashboardIndex,
        meta: { requiresAuth: true }
      },
      {
        path: 'productManage',
        name: 'ProductManage',
        component: ProductManage,
        meta: { requiresAuth: true }
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: Coupon,
        meta: { requiresAuth: true }
      },
      {
        path: 'order',
        name: 'Order',
        component: Order,
        meta: { requiresAuth: true }
      },
      {
        path: 'reportDay',
        name: 'ReportDay',
        component: ReportDay,
        meta: { requiresAuth: true }
      },
      {
        path: 'reportWeek',
        name: 'ReportWeek',
        component: ReportWeek,
        meta: { requiresAuth: true }
      },
      {
        path: 'reportMonth',
        name: 'ReportMonth',
        component: ReportMonth,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes,
  scrollBehavior () {
    return {
      x: 0, y: 0
    }
  }
})

export default router
