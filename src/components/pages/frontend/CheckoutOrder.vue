<template>
<div>
  <loading :active.sync="isLoading">
    <Loader/>
  </loading>
  <div class="img-header bg-cover d-flex justify-content-center align-items-center"
    v-lazy:background-image="'https://images.unsplash.com/photo-1529057018378-07c51d77da73?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjY3fHxmaXNoJTIwdGFua3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'">
    <h2 class="img-header-title"><strong>結帳-訂單付款</strong></h2>
  </div>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-6">
        <Breadcrumb/>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <CheckoutFlow :step="2" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 mb-3">
        <div v-if="cart.length>0">
          <h5 class="fw-bold"><i class="fas fa-tag me-2 text-use"></i>套用優惠卷</h5>
          <div class="border-secondary border rounded bg-white px-3">
          <button class="btn btn-outline-third my-3" @click="isOpenCoupon=!isOpenCoupon" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            檢視優惠卷 <i class="fas" :class="{'fa-chevron-up':isOpenCoupon,'fa-chevron-down':!isOpenCoupon}"></i>
          </button>
            <div class="collapse mb-3" id="collapseExample">
              <div class="card card-body bg-light">
                <div class="row justify-content-center align-items-center">
                  <div class="content-striped">
                    <p class="text-alert"><small>優惠卷每次只能用一張喔</small></p>
                    <div class="py-3 align-items-center"
                     v-for="item in AllActiveCouponList" :key="item.id" v-cloak >
                      <div class="col-12 d-flex px-2 align-items-center">
                        <div class="coupon text-white p-1 rounded">
                          <span>
                            <i class="fas fa-tags"></i>
                            {{ item.percent }}%
                          </span>
                        </div>
                        <div class="ms-3">
                          <p class="mb-0">{{ item.title }}</p>
                        </div>
                      </div>
                      <div class="col-12 px-2">
                        <div class="align-items-center">
                          <div class="input-group input-group-sm my-3">
                            <button class="btn-outline-third btn" @click="HandleCopy">點選複製優惠碼<i class="far fa-clone ms-1"></i></button>
                            <input type="text" readonly :value="item.code" class="bg-light input-readonly" >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="AllActiveCouponList.length===0&&!isLoading"  class="py-5 text-center">
                    <h3>目前沒有優惠卷喔!</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-group input-group-sm mb-3" v-if="cart.length>0">
              <input type="text" class="form-control bg-light" @click="HandlePaste" v-model="coupon_code" placeholder="請貼上優惠碼" aria-label="請貼上優惠碼" aria-describedby="button-addon">
              <div class="input-group-append">
                <button class="btn btn-use btn-hv-style" type="button" id="button-addon" @click="useCoupon">套用優惠碼</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <h5 class="fw-bold"><i class="fas fa-truck me-2 ms-2 text-use"></i>訂單資訊</h5>
        <div class="text-end border py-3 px-3 border-secondary rounded bg-white">
          <div class="d-flex justify-content-between">
            <span>小計:</span>
            <span class="ms-2" v-cloak>
            {{ cartTotal | currency }}</span>
          </div>
          <div class="d-flex justify-content-between text-success my-1">
            <small>使用優惠代碼:</small><small class="ms-2" v-cloak v-if="coupon !== {}">
            {{ coupon.code }}</small>
          </div>
          <div class="d-flex justify-content-between border-top border-secondary pt-2 mt-2">
            <span>總計:</span><span class="ms-2"  v-cloak>
            {{ finalTotal | currency }}</span>
            </div>
          </div>
        </div>
        <div class="col-12 pt-3">
          <div class="accordion accordion-flush mb-3" id="orderDetail">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#orderDetailContent" aria-expanded="false" aria-controls="flush-collapseOne">
               <h5 class="fw-bold"><i class="fas fa-shopping-bag me-2 text-use"></i>查看訂購商品資訊</h5>
              </button>
              </h2>
              <div id="orderDetailContent" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#orderDetail">
                <div class="accordion-body">
                  <div class="content-striped">
                    <div class="row mb-2 pb-2 align-items-center" v-for="item in cart" :key="item.id">
                      <div class="col-6 col-sm-4 col-md-4 col-lg-3">
                        <img v-lazy="item.product.imageUrl" :alt="item.product.title" class="cart-img-sm">
                      </div>
                    <div class="col-6 col-sm-8 col-md-8 col-lg-9">
                      <div class="row align-items-center">
                        <div class="col-md-6">
                          <small>{{ item.product.title }} <span class="ms-1">×{{ item.qty }}</span></small>
                          <span class="badge bg-success ms-2" v-if="item.total!==item.final_total">
                          折扣商品
                          </span>
                        </div>
                        <div class="col-md-3">
                        {{ item.product.price | currency }}
                        </div>
                        <div class="col-md-3 text-success" v-if="item.total!=item.final_total">
                        折扣價{{ item.final_total | currency }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 py-3">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-12">
          <h5 class="fw-bold"><i class="fas fa-user-edit me-2 text-use"></i>聯絡人資料</h5>
           <ValidationObserver v-slot="{ invalid }">
            <form  @submit.prevent="createOrder" class="border border-secondary rounded px-3 py-3 bg-white" >
              <div class="row">
                <div class="col-md-6 mb-4">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="userName"><span class="text-danger">*</span>姓名</label>
                    <input type="text" name="姓名" id="userName" class="form-control bg-light" v-model="user.name" :class="classes">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-md-6  mb-4">
                  <ValidationProvider rules="required|email" v-slot="{ errors, classes }">
                    <label for="email"><span class="text-danger">*</span>信箱</label>
                    <input type="email" name="信箱" id="email" v-model="user.email" class="form-control bg-light" :class="classes">
                    <span class="invalid-feedback" >{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6  mb-4">
                  <ValidationProvider rules="required|digits:10" v-slot="{ errors, classes }">
                    <label for="phone"><span class="text-danger">*</span>電話</label>
                    <input type="tel" name="電話" id="phone" v-model="user.tel" class="form-control bg-light" :class="classes">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-md-6 mb-4">
                   <ValidationProvider rules="required" v-slot="{ errors, classes }">
                      <label for="email"><span class="text-danger">*</span>付款方式</label>
                      <select class="form-select bg-light" :class="classes" name="付款方式">
                        <option value="payafter" selected>貨到付款</option>
                        <option value="creditcard">信用卡</option>
                      </select>
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12  mb-4">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="address"><span class="text-danger">*</span>地址</label>
                    <input type="text" name="地址" id="address" v-model="user.address" class="form-control bg-light" :class="classes">
                    <span class="invalid-feedback" >{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-4">
                   <label for="message">留言</label>
                   <textarea name="留言" id="message" cols="30" rows="3" v-model="user.message" class="form-control bg-light"></textarea>
                </div>
              </div>
              <div class="text-end mb-4">
                <button type="submit" class="btn btn-use btn-hv-style" :disabled = "invalid||cart.length===0">送出訂單<i class="fas fa-angle-double-right ms-2"></i></button>
              </div>
            </form>
           </ValidationObserver>
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
import $ from 'jquery'

export default {
  name: 'CheckoutOrder',
  components: {
    Breadcrumb,
    Loader,
    CheckoutFlow
  },
  data () {
    return {
      coupon_code: '',
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
        message: ''
      },
      isOpenCoupon: false,
      AllActiveCouponList: [],
      orderId: ''
    }
  },
  created () {
    this.$store.dispatch('getCart')
    this.$store.dispatch('updateCheckoutBtn', false)
    this.getAllCoupons()
  },
  computed: {
    ...mapGetters(['cart', 'isLoading', 'cartTotal', 'finalTotal', 'checkoutVisible', 'coupon'])
  },
  methods: {
    useCoupon () {
      if (this.coupon_code === '') return
      this.$store.dispatch('useCoupon', this.coupon_code)
    },
    createOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/order`
      vm.$store.dispatch('updatedLoading', true)
      // 去除括號
      const textMessage = vm.user.message.trim().replace(/[&<>"'`=/]/g, '')
      vm.$http.post(api, { data: { user: vm.user }, message: textMessage }).then((res) => {
        if (res.data.success) {
          this.orderId = res.data.orderId
        } else {
          vm.$store.dispatch('updateMessage', {
            message: res.data.message,
            status: 'danger'
          })
        }
      }).then(() => {
        const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/pay/${this.orderId}`
        vm.$http.post(api).then((res) => {
          if (res.data.success) {
            vm.$router.push('/checkoutSuccess')
          } else {
            vm.$store.dispatch('updateMessage', {
              message: res.data.message,
              status: 'danger'
            })
          }
          vm.$store.dispatch('updatedLoading', false)
        }).catch((err) => {
          vm.$store.dispatch('updateMessage', {
            message: err,
            status: 'danger'
          })
        })
      }).catch((err) => {
        vm.$store.dispatch('updateMessage', {
          message: err,
          status: 'danger'
        })
      })
    },
    HandleCopy (e) {
      $(e.target).parent().find('input[type="text"]').select()
      document.execCommand('copy')
    },
    HandlePaste (e) {
      navigator.clipboard.readText()
        .then((text) => {
          this.coupon_code = text
        })
    },
    getAllCoupons () {
      this.AllActiveCouponList = [{ id: '1', percent: 80, code: 'newfish123', title: '新魚到!火赤金鑽小朋友來了' },
        { id: '2', percent: 85, code: 'free123', title: '瘋狂折扣周' },
        { id: '3', percent: 95, code: 'weed123321', title: '水草大特賣' }]
    }
  }
}
</script>
