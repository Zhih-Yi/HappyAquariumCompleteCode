import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Index from '@/components/pages/frontend/Index.vue'
import Product from '@/components/pages/frontend/Product.vue'
import Login from '@/components/pages/frontend/Login.vue'
import Content from '@/components/pages/frontend/Content.vue'
import Dashboard from '@/views/Dashboard.vue'
import DashboardIndex from '@/components/pages/backend/DashboardIndex.vue'
import ProductManage from '@/components/pages/backend/ProductManage.vue'
import CheckoutConfirm from '@/components/pages/frontend/CheckoutConfirm.vue'
import CheckoutOrder from '@/components/pages/frontend/CheckoutOrder.vue'
/* import CheckoutPay from '@/components/pages/frontend/CheckoutPay.vue' */
import CheckoutSuccess from '@/components/pages/frontend/CheckoutSuccess.vue'
import Coupon from '@/components/pages/backend/Coupon.vue'
import Order from '@/components/pages/backend/Order.vue'
import Favorite from '@/components/pages/frontend/Favorite.vue'
import ReportDay from '@/components/pages/backend/ReportDay.vue'
import ReportWeek from '@/components/pages/backend/ReportWeek.vue'
import ReportMonth from '@/components/pages/backend/ReportMonth.vue'

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
        path: 'content/:contentId',
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
            name: '結帳-訂單結帳'
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
