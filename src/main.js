import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import '@popperjs/core'
import * as bootstrap from 'bootstrap'
import CurrencyFilter from './filter/currency'
import 'vue-loading-overlay/dist/vue-loading.css'
import { ValidationProvider, extend, ValidationObserver, localize, configure } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'
import VueLazyload from 'vue-lazyload'
import 'slick-carousel/slick/slick'

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(VueLazyload)
window.bootstrap = bootstrap
Vue.component('Loading', Loading)
/* vee-validate */
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule]
  })
})
localize('zh_TW', TW)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.filter('currency', CurrencyFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
