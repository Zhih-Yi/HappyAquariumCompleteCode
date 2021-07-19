<template>
  <div>
    <div class="img-header d-flex justify-content-center align-items-center">
      <div class="img-header-img bg-cover" v-lazy:background-image="require('@/assets/images/banner-content.jpg')"></div>
        <h2 class="img-header-title pt-5 pt-md-0">
          <strong>商品內容</strong>
        </h2>
      </div>
      <loading :active.sync="isLoading">
        <LoaderAnimation/>
      </loading>
      <div class="container py-5 mh-content">
        <div class="row">
          <div class="col-2 pt-1 pb-3">
            <a href="#" @click.prevent="historyBack">
              <i class="fas fa-arrow-left fa-2x text-third"></i>
            </a>
          </div>
        </div>
      <div class="row">
        <div class="col-md-6">
          <div class="bg-content content-img mb-3" v-lazy:background-image="Product.imageUrl" v-cloak>
            <Myfavorite :productID="productId"/>
          </div>
        </div>
        <div class="col-md-6">
          <h1 class="h3 fw-bold" v-cloak >{{ Product.title }}</h1>
          <div class="d-flex py-3 align-items-center">
            <span class="text-decoration-line-through text-third me-3" v-cloak>
            NT ${{ Product.origin_price }}</span>
            <strong class="h3 fw-bold text-danger" v-cloak>NT ${{ Product.price }}</strong>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="input-group mb-3">
                <button class="btn border border-2" @click="minusQuantity" type="button" id="minus">
                  <strong class="h4">−</strong>
                </button>
                <input type="number" class="form-control" v-model.number="quantity" @change="VerifyNumber">
                <button class="btn border border-2" @click="addQuantity" type="button" id="plus">
                  <strong class="h4">+</strong>
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <button type="button" class="my-2 btn btn-block btn-primary btn-hv-style w-100" @click="addToCart(Product, quantity)">
                加入購物車<i class="ms-2 fas fa-cart-plus"></i>
                <i class="fas fa-spinner fa-spin ms-2" v-if="loadingItem===Product.id"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-3">
      <div class="row">
        <div class="col-md-6">
          <div class="mb-4">
            <h3><i class="fas fa-info-circle me-2"></i>商品特色</h3>
            <p class="py-2" v-cloak>{{ Product.description }}</p></div>
          </div>
          <div class="col-md-6">
            <div class="mb-4">
              <h3><i class="fas fa-feather-alt me-2"></i>商品內容</h3>
              <p class="py-2" v-cloak><pre class="fs-6">{{ Product.content }}</pre></p>
            </div>
          </div>
        </div>
      <div class="row">
        <div class="col-md-12">
          <div class="mb-4">
            <h3><i class="fas fa-shipping-fast me-2"></i>運送須知</h3>
            <p class="py-2">
            一般商品可選擇超商取貨付款，商品出貨時間為3-5天，若購買活體則一律黑貓寄送，商品出貨時間為1-2天。
            <br>
            </p>
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-4">
            <h3><i class="fas fa-box-open me-2"></i>退換貨須知</h3>
            <p class="py-2" >
            一般商品可退換貨，需保留發票與完好未下水商品，由超商寄回。活體則一律不做退換，
            若有活體死亡，請於收件後60分鐘內拍照回傳，拍照需包含未拆封的原始魚袋完整包裝
            <br>
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <h3 v-if="RelativeProduct.length>0">
        <i class="fas fa-leaf me-2"></i>看看類似商品
      </h3>
        <div class="col-md-3 mb-3" v-for="item in RelativeProduct" :key="item.id">
          <router-link :to="`/content/${item.id}/kind/${item.category}`" target="_blank">
          <div class="card h-100 card-shadow product-card">
            <div class="card-img-wrapper">
              <div class="view-more d-flex justify-content-center align-items-center">查看更多</div>
                <Myfavorite :productID="item.id"/>
                <img v-lazy="item.imageUrl" class="card-img card-img-size" v-cloak :alt="item.title"></div>
                  <div class="card-body">
                    <p class="card-title" v-cloak><strong>{{ item.title }}</strong></p>
                    <div class="d-flex justify-content-between">
                    <span class="text-decoration-line-through" v-cloak>
                      <small>NT ${{ item.origin_price | currency }}</small>
                    </span>
                    <strong class="text-danger" v-cloak>NT {{ item.price | currency }}</strong>
                  </div>
                </div>
                <div class="card-footer border-0 p-0 bg-light">
                  <button type="button" class="btn rounded-0 btn-block btn-primary w-100 card-btn" @click.prevent="addToCart(item)">
                  加入購物車<i class="ms-2 fas fa-cart-plus"></i>
                  <i class="fas fa-spinner fa-spin ms-2" v-if="loadingItem===item.id"></i>
                  </button>
                </div>
              </div>
            </router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Myfavorite from '@/components/frontend/MyFavorite.vue'
import LoaderAnimation from '@/components/LoaderAnimation.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Content',
  data () {
    return {
      Product: {},
      RelativeProduct: [],
      productId: '',
      quantity: 1,
      min: 1,
      max: 20,
      kind: ''
    }
  },
  components: {
    Myfavorite,
    LoaderAnimation
  },
  computed: {
    ...mapGetters(['isLoading', 'checkoutVisible', 'loadingItem'])
  },
  methods: {
    getProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/product/${this.productId}`
      vm.$store.dispatch('updatedLoading', true)
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.Product = { ...res.data.product }
        } else {
          vm.$store.dispatch('updateMessage', {
            message: res.data.message,
            status: 'danger'
          })
        }
      }).then(() => {
        vm.getRelativeProduct()
      }).catch((err) => {
        vm.$store.dispatch('updateMessage', {
          message: err,
          status: 'danger'
        })
      })
    },
    addQuantity () {
      if (this.quantity < 20) {
        this.quantity++
      }
    },
    minusQuantity () {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    VerifyNumber () {
      if (this.quantity > this.max) {
        this.quantity = this.max
      }
      if (this.quantity < this.min) {
        this.quantity = this.min
      }
    },
    getRelativeProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/products/all`
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          const tmpDataList = res.data.products
          vm.RelativeProduct = tmpDataList.filter((item, i) => (item.category.indexOf(vm.Product.category) > -1) && (item.title !== vm.Product.title))
          vm.RelativeProduct = Array.from(vm.RelativeProduct.slice(0, 4))
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
    },
    addToCart (data, num = 1) {
      this.$store.dispatch('AddTmpCart', { data, num })
      this.$store.dispatch('updateMessage', {
        message: `<i class="fas fa-info-circle me-2"></i>${data.title} 已成功加入購物車`,
        status: 'primary'
      })
    },
    historyBack () {
      if (this.kind === '') {
        this.$router.go(-1)
      } else {
        this.$router.push(`/product/${this.kind}`)
      }
    }
  },
  created () {
    this.productId = this.$route.params.contentId
    if (this.$route.params.kind) {
      this.kind = this.$route.params.kind
    }
    this.getProduct()
    this.$store.dispatch('updateCheckoutBtn', true)
  }
}
</script>
