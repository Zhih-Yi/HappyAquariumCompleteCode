import axios from 'axios'

export default {
  state: {
    cart: [],
    tmpCart: [],
    localStoragePrice: 0,
    cartTotal: 0,
    cartFinalTotal: 0,
    coupon: {}
  },
  mutations: {
    TMPCART (state, payload) {
      state.tmpCart = payload
    },
    TMPTOTAL (state, payload) {
      state.localStoragePrice = payload
    },
    CART (state, payload) {
      state.cart = payload
    },
    FINALTOTAL (state, payload) {
      state.cartFinalTotal = payload
    },
    CARTTOTAL (state, payload) {
      state.cartTotal = payload
    },
    COUPON (state, payload) {
      state.coupon = { ...payload }
    }
  },
  actions: {
    AddTmpCart (context, { data, num, IsTotalNum = false }) {
      context.commit('LOADINGITEM', data.id)
      const tmpCartItem = JSON.parse(localStorage.getItem('cartData')) || []
      const cacheCartID = []
      // 取出購物車內商品id
      tmpCartItem.forEach((item) => {
        cacheCartID.push(item.product_id)
      })
      // 若加入商品不存在直接存入，若存在則合併
      if (cacheCartID.indexOf(data.id) === -1) {
        const cartContent = {
          product_id: data.id,
          qty: num,
          title: data.title,
          origin_price: data.origin_price,
          price: data.price,
          imageUrl: data.imageUrl,
          id: data.id
        }
        tmpCartItem.push(cartContent)
        localStorage.setItem('cartData', JSON.stringify(tmpCartItem))
      } else {
        let tmp = {}
        let index = 0
        tmpCartItem.forEach((item, keys) => {
          // 找相同的產品id
          if (item.product_id === data.id) {
            // 取出已存在 localStorage 購物車的資料並加數量增加
            let { qty } = item
            if (IsTotalNum) {
              tmp = {
                product_id: data.id,
                qty: num,
                title: data.title,
                origin_price: data.origin_price,
                price: data.price,
                imageUrl: data.imageUrl,
                id: data.id
              }
            } else {
              tmp = {
                product_id: data.id,
                qty: qty += num,
                title: data.title,
                origin_price: data.origin_price,
                price: data.price,
                imageUrl: data.imageUrl,
                id: data.id
              }
            }
            // 移除現有 localStorage 購物車的資料
            index = keys
            tmpCartItem.splice(keys, 1)
          }
        })
        // 更新陣列 不放在 forEach 內，否則迴圈會重複執行導致變成加二
        // tmpCartItem.push(tmp)
        tmpCartItem.splice(index, 0, tmp)
        // 重新寫入 localStorage
        localStorage.setItem('cartData', JSON.stringify(tmpCartItem))
      }
      context.commit('TMPCART', tmpCartItem)
      context.dispatch('getTmpCart')
      context.commit('LOADINGITEM', '')
    },
    getTmpCart (context) {
      const tmpCartItem = JSON.parse(localStorage.getItem('cartData')) || []
      context.commit('TMPCART', tmpCartItem)
      let localStorageTotal = 0
      tmpCartItem.forEach((item) => {
        localStorageTotal += Number(item.qty * item.price)
      })
      context.commit('TMPTOTAL', localStorageTotal)
    },
    removeTmpCart (context, status) {
      const tmpCartItem = JSON.parse(localStorage.getItem('cartData')) || []
      const index = tmpCartItem.findIndex(item => item.id === status)
      tmpCartItem.splice(index, 1)
      localStorage.setItem('cartData', JSON.stringify(tmpCartItem))
      context.dispatch('getTmpCart')
    },
    AddtoCart (context) {
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/cart`
      context.commit('LOADING', true)
      const cacheCartID = []
      // 先取得購物車
      axios.get(api).then((res) => {
        const tmpCartData = res.data.data.carts
        tmpCartData.forEach((item) => {
          cacheCartID.push(item.id)
        })
      }).then(() => {
        cacheCartID.forEach((item) => {
          axios.delete(`${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/cart/${item}`)
        })
      }).then(() => {
        const tmpCartItem = JSON.parse(localStorage.getItem('cartData')) || []
        tmpCartItem.forEach((item) => {
          const cart = {
            product_id: item.id,
            qty: item.qty
          }
          axios.post(`${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/cart`, { data: cart })
            .then(() => {
              // 清空購物車內容
              context.commit('TMPCART', [])
              context.commit('TMPTOTAL', 0)
              localStorage.removeItem('cartData')
              context.commit('LOADING', false)
              // 重新取得購物車內容
              context.dispatch('getCart')
            })
        })
      }).catch((err) => {
        const message = err
        const status = 'danger'
        const messageGroup = { message, status }
        context.dispatch('updateMessage', messageGroup)
      })
    },
    getCart (context) {
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/cart`
      context.commit('LOADING', true)
      axios.get(api).then((res) => {
        if (res.data.success) {
          context.commit('CART', res.data.data.carts)
          context.commit('CARTTOTAL', res.data.data.total)
          context.commit('FINALTOTAL', res.data.data.final_total)
          if (res.data.data.carts[0].coupon) {
            context.commit('COUPON', res.data.data.carts[0].coupon)
          }
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
    useCoupon (context, couponCode) {
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/coupon`
      context.commit('LOADING', true)
      axios.post(api, { data: { code: couponCode } }).then(res => {
        if (res.data.success) {
          context.dispatch('getCart')
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
    }
  },
  getters: {
    cart (state) {
      return state.cart
    },
    cartTotal (state) {
      return state.cartTotal
    },
    finalTotal (state) {
      return state.cartFinalTotal
    },
    tmpCart (state) {
      return state.tmpCart
    },
    tmpTotal (state) {
      return state.localStoragePrice
    },
    coupon (state) {
      return state.coupon
    }
  }
}
