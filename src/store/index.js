import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import CartModules from './cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    status: {
      loadingItem: ''
    },
    messages: [],
    orders: [],
    orderPagination: {},
    checkoutVisible: true,
    FavoriteList: []
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    LOADINGITEM (state, status) {
      state.status.loadingItem = status
    },
    MESSAGESPUSH (state, payload) {
      state.messages.push(payload)
    },
    MESSAGEREMOVE (state, payload) {
      state.messages.splice(payload, 1)
    },
    MESSAGETIMEING (state, payload) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === payload) {
          state.messages.splice(i, 1)
        }
      })
    },
    ORDERS (state, payload) {
      state.orders = payload
    },
    ORDERPAGINATION (state, payload) {
      state.orderPagination = { ...payload }
    },
    CHECKOUTVISIBLE (state, payload) {
      state.checkoutVisible = payload
    },
    FAVORITELIST (state, payload) {
      state.FavoriteList = payload
    }
  },
  actions: {
    updatedLoading (context, status) {
      context.commit('LOADING', status)
    },
    updateLoadingItem (context, status) {
      context.commit('LOADINGITEM', status)
    },
    updateMessage (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000)
      const messages = {
        message,
        status,
        timestamp
      }
      context.commit('MESSAGESPUSH', messages)
      setTimeout(function () {
        context.commit('MESSAGETIMEING', timestamp)
      },
      3800)
    },
    removeMessage (context, num) {
      context.commit('MESSAGEREMOVE', num)
    },
    getOrder (context, page) {
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${page}`
      context.commit('LOADING', true)
      axios.get(api).then((res) => {
        if (res.data.success) {
          context.commit('ORDERS', res.data.orders)
          context.commit('ORDERPAGINATION', res.data.pagination)
        } else {
          const message = res.data.message
          const status = 'danger'
          const messageGroup = { message, status }
          context.dispatch('updateMessage', messageGroup)
        }
        context.commit('LOADING', false)
      }).catch((err) => {
        const message = err
        const status = 'danger'
        const messageGroup = { message, status }
        context.dispatch('updateMessage', messageGroup)
      })
    },
    updateCheckoutBtn (context, status) {
      context.commit('CHECKOUTVISIBLE', status)
    },
    getFavorite (context) {
      const tmpFavorite = JSON.parse(localStorage.getItem('favorite')) || []
      context.commit('FAVORITELIST', tmpFavorite)
    },
    AddFavorite (context, status) {
      const tmpFavorite = JSON.parse(localStorage.getItem('favorite')) || []
      if (tmpFavorite.indexOf(status) === -1) {
        tmpFavorite.push(status)
        localStorage.setItem('favorite', JSON.stringify(tmpFavorite))
      } else {
        const message = '商品重複加入'
        const status = 'warning'
        const messageGroup = { message, status }
        context.dispatch('updateMessage', messageGroup)
      }
      context.commit('FAVORITELIST', tmpFavorite)
    },
    removeFavorite (context, status) {
      const tmpFavorite = JSON.parse(localStorage.getItem('favorite')) || []
      const index = tmpFavorite.findIndex(item => item === status)
      tmpFavorite.splice(index, 1)
      localStorage.setItem('favorite', JSON.stringify(tmpFavorite))
      context.commit('FAVORITELIST', tmpFavorite)
    }

  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    messages (state) {
      return state.messages
    },
    loadingItem (state) {
      return state.status.loadingItem
    },
    Orders (state) {
      return state.orders
    },
    OrderPagination (state) {
      return state.orderPagination
    },
    checkoutVisible (state) {
      return state.checkoutVisible
    },
    favoritelist (state) {
      return state.FavoriteList
    }
  },
  modules: {
    CartModules
  }
})
