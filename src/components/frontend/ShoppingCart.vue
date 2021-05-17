<template>
<div id="shoppingCart" class=" d-flex align-items-center order-md-1" :class="{'invisible':!checkoutVisible}">
  <a class="cart nav-link" @click.prevent="cartVisible=!cartVisible">
    <i class="fa-lg fas fa-shopping-cart fa-lg text-primary"></i>
    <span class="cart-num badge rounded-pill bg-alert text-white"><small>{{ tmpCart.length }}</small></span>
  </a>
  <transition name="slide">
    <div class="cart-content bg-light rounded py-2 px-2" v-if="cartVisible">
      <form>
        <div class="table-scroll">
          <table class="table table-sm" v-if="tmpCart.length>0">
            <thead>
              <tr>
                <th width="10"></th>
                <th width="110">品名</th>
                <th width="40" class="text-end">數量</th>
                <th width="40" class="text-end">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tmpCart" :key="item.id">
                <td valign="middle">
                  <button @click.stop="deleteTmpCartItem(item.id)" class="btn p-0 text-third" v-if="checkoutVisible">
                    <i class="fas fa-trash-alt fa-xs"></i>
                  </button>
                </td>
                <td valign="middle">
                  {{ item.title }}
                </td>
                <td  valign="middle" class="text-end">{{ item.qty }}</td>
                <td  valign="middle" class="text-end">{{ item.price | currency }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-end py-2" v-if="tmpCart.length>0">
          <div class="me-4">總計</div>
          <div>{{ tmpTotal | currency }}</div>
        </div>
        <button type="button" @click="toCheckout" class="btn btn-use btn-hv-style btn-block w-100 mb-2"
           v-if="tmpCart.length>0">
           結帳去<i class="fas fa-shopping-bag ms-2"></i>
        </button>
        <div class="px-2 py-2 text-center"  v-if="tmpCart.length===0" >
          <i class="fa-lg fas fa-shopping-cart fa-3x mb-3"></i><br>
          <p><strong class="mb-3">您的購物車是空的</strong></p>
          <router-link to="/product" class="btn btn-use btn-hv-style">去逛逛<i class="fas fa-angle-double-right"></i></router-link>
        </div>
      </form>
    </div>
  </transition>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  name: 'ShoppingCart',
  data () {
    return {
      cartVisible: false,
      coupon_code: ''
    }
  },
  computed: {
    ...mapGetters(['tmpCart', 'tmpTotal', 'checkoutVisible'])
  },
  created () {
    this.$store.dispatch('getTmpCart')
  },
  methods: {
    deleteTmpCartItem (id) {
      this.$store.dispatch('removeTmpCart', id)
    },
    toCheckout () {
      this.cartVisible = false
      this.$router.push('/checkoutConfirm')
    },
    closeCart (e) {
      if (e.target.id === 'shoppingCart' || $(e.target).closest('#shoppingCart').length) return
      if (this.cartVisible) {
        this.cartVisible = false
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.closeCart)
  },
  destroyed () {
    document.removeEventListener('click', this.closeCart)
  }
}
</script>
