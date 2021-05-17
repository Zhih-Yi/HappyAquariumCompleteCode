<template>
<div>
  <loading :active.sync="isLoading">
    <Loader/>
  </loading>
  <div class="img-header bg-cover d-flex justify-content-center align-items-center"
    style="background-image: url('https://images.unsplash.com/photo-1595541718888-f29d5deaeb6e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjU1fHxmaXNoJTIwYXF1YXJpdW18ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')">
    <h2 class="img-header-title"><strong>結帳-確認商品</strong></h2>
  </div>
  <div class="container py-5">
    <!---麵包屑---->
    <div class="row">
      <div class="col-md-6">
        <Breadcrumb/>
      </div>
    </div>
    <div class="row justify-content-center ">
      <div class="col-md-6">
        <CheckoutFlow :step="1" />
      </div>
      <div class="content-striped">
        <div class="row py-3 align-items-center" v-for="item in tmpCart" :key="item.id">
          <div class="col-6 col-sm-4 col-md-4 col-lg-3">
            <img :src="item.imageUrl" alt="item.product.title" class="cart-img">
          </div>
          <div class="col-6 col-sm-8 col-md-8 col-lg-9">
            <div class="row align-items-center">
              <div class="col-md-5 col-sm-5 col-12">
                {{ item.title }}
                <button class="btn py-0 text-third d-sm-none" @click="deleteTmpCartItem(item.id)">
                <i class="fas fa-times ms-2"></i></button>
                <br>{{ item.price | currency }}
              </div>
              <div class="col-md-5 col-sm-5 col-12">
                <div class="input-group input-group-sm mb-3">
                  <button class="btn btn-secondary" @click.prevent="minusQuantity(item)" type="button" id="minus"><strong class="h4">−</strong></button>
                  <input type="number"  class="form-control" v-model.number="item.qty" @change="verifyNumber(item)">
                    <button class="btn btn-secondary" @click.prevent="addQuantity(item)" type="button" id="plus"><strong class="h4">+</strong></button>
                </div>
              </div>
             <div class="col-md-2 col-sm-2 d-none d-sm-block">
                <button class="btn py-0 text-third" @click="deleteTmpCartItem(item.id)">
                <i class="fas fa-trash-alt"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="d-flex justify-content-end py-2 mt-3 border-top h5" v-if="tmpCart.length>0">
          <div class="me-4">總計</div>
          <div>{{ tmpTotal | currency }}</div>
        </div>
      </div>
      <div class="row" v-if="tmpCart.length>0">
        <div class="col-12 text-end">
          <button @click="addToCart" class="btn btn-use btn-hv-style">訂單結帳
          <i class="fas fa-angle-double-right ms-2"></i></button>
        </div>
      </div>
      <div class="row">
        <div v-if="tmpCart.length===0&&!isLoading" class="text-center py-5">
          <div class="py-3">
            <i class="fa-lg fas fa-shopping-cart fa-3x mb-3"></i><br>
             <p><strong class="mb-3">您的購物車是空的</strong></p>
          </div>
          <router-link class="btn btn-use btn-hv-style" to="/product">
          去逛逛<i class="fas fa-angle-double-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/frontend/Breadcrumb'
import Loader from '@/components/Loader.vue'
import CheckoutFlow from '@/components/frontend/CheckoutFlow'

export default {
  name: 'CheckoutConfirm',
  components: {
    Breadcrumb,
    Loader,
    CheckoutFlow
  },
  data () {
    return {
      min: 1,
      max: 20
    }
  },
  created () {
    this.$store.dispatch('updateCheckoutBtn', false)
    this.$store.dispatch('getTmpCart')
  },
  computed: {
    ...mapGetters(['tmpCart', 'isLoading', 'tmpTotal', 'checkoutVisible'])
  },
  methods: {
    addQuantity (data, num = 1) {
      if (data.qty < 20) {
        data.qty++
        this.$store.dispatch('AddTmpCart', { data, num })
      }
    },
    minusQuantity (data, num = -1) {
      if (data.qty > 1) {
        data.qty--
        this.$store.dispatch('AddTmpCart', { data, num })
      }
    },
    verifyNumber (data) {
      if (data.qty > this.max) {
        data.qty = this.max
      }
      if (data.qty < this.min) {
        data.qty = this.min
      }
      const num = Number(data.qty)
      const IsTotalNum = true
      this.$store.dispatch('AddTmpCart', { data, num, IsTotalNum })
    },
    deleteTmpCartItem (id) {
      this.$store.dispatch('removeTmpCart', id)
    },
    addToCart () {
      this.$store.dispatch('AddtoCart')
      this.$router.push('/checkoutOrder')
    }
  }
}
</script>
