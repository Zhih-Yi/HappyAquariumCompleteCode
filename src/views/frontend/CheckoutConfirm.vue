<template>
<div>
  <loading :active.sync="isLoading">
    <Loader/>
  </loading>
  <div class="img-header d-flex justify-content-center align-items-center">
    <div class="bg-cover img-header-img" v-lazy:background-image="require('@/assets/images/banner-checkout.jpeg')"></div>
    <h2 class="img-header-title"><strong>結帳-確認商品</strong></h2>
  </div>
  <div class="container py-5">
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
            <img v-lazy="item.imageUrl" :alt="item.title" class="cart-img">
          </div>
          <div class="col-6 col-sm-8 col-md-8 col-lg-9">
            <div class="row align-items-center">
              <div class="col-md-5 col-sm-5 col-12">
                <p class="mb-0">{{ item.title }}
                  <button type="button" class="btn p-0 text-third d-sm-none" @click="deleteTmpCartItem(item.id)">
                  <i class="fas fa-times ms-2"></i></button>
                </p>
                <br>{{ item.price | currency }}
              </div>
              <div class="col-md-5 col-sm-5 col-12">
                <div class="input-group input-group-sm input-group-fixed mb-3">
                  <button type="button" class="btn border border-secondary" @click="minusQuantity(item)" id="minus"><strong class="h4">−</strong></button>
                  <input type="number"  class="form-control" v-model.number="item.qty" @change="verifyNumber(item)">
                    <button type="button" class="btn border border-secondary" @click="addQuantity(item)" id="plus"><strong class="h4">+</strong></button>
                </div>
              </div>
             <div class="col-md-2 col-sm-2 d-none d-sm-block">
                <button type="button" class="btn py-0 text-third" @click="deleteTmpCartItem(item.id)">
                <i class="fas fa-trash-alt"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="d-flex justify-content-end py-2 my-3 border-top h5" v-if="tmpCart.length>0">
          <div class="me-4">總計</div>
          <div>{{ tmpTotal | currency }}</div>
        </div>
      </div>
      <div class="row" v-if="tmpCart.length>0">
        <div class="col-12 text-end">
          <button type="button" @click="addToCart" class="btn btn-primary btn-hv-style">訂單結帳
          <i class="fas fa-angle-double-right ms-2"></i></button>
        </div>
      </div>
      <div class="row">
        <div v-if="tmpCart.length===0&&!isLoading" class="text-center py-5">
          <div class="py-3">
            <i class="fa-lg fas fa-shopping-cart fa-3x mb-3"></i><br>
             <p><strong class="mb-3">您的購物車是空的</strong></p>
          </div>
          <router-link class="btn btn-primary btn-hv-style" to="/product">
          去逛逛<i class="fas fa-angle-double-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!--送出提醒Modal-->
<div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="infoModalLabel">訂單確認</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        訂單確認送出後無法修改，確認送出?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-third" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary btn-hv-style" @click="createCart">確認送出</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/frontend/Breadcrumb.vue'
import Loader from '@/components/Loader.vue'
import CheckoutFlow from '@/components/frontend/CheckoutFlow.vue'
import { Modal } from 'bootstrap'

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
      max: 20,
      infoModal: null
    }
  },
  created () {
    this.$store.dispatch('updateCheckoutBtn', false)
    this.$store.dispatch('getTmpCart')
  },
  mounted () {
    this.infoModal = new Modal(document.getElementById('infoModal'))
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
      this.infoModal.show()
    },
    createCart () {
      this.infoModal.hide()
      this.$store.dispatch('AddtoCart')
      this.$router.push('/checkoutOrder')
    }
  }
}
</script>
