<template>
<div>
  <loading :active.sync="isLoading" >
    <Loader/>
  </loading>
  <div class="img-header d-flex justify-content-center align-items-center">
    <div class="bg-cover img-header-img" v-lazy:background-image="require('@/assets/images/banner-favorite.jpg')"></div>
    <h2 class="img-header-title"><strong>我的收藏</strong></h2>
  </div>
  <div class="container py-5 min-vh-100">
    <!---麵包屑---->
    <div class="row py-3">
      <div class="col-md-6">
        <Breadcrumb/>
      </div>
    </div>
  <div class="row justify-content-center align-items-center">
    <div class="col-md-12">
      <div class="content-striped">
        <div class="row my-2 py-2  align-items-center" v-for="item in products" :key="item.id" v-cloak >
          <div class="col-6 col-sm-4 col-md-3 col-lg-3">
            <img v-lazy="item.imageUrl" :alt="item.title" class="cart-img">
          </div>
          <div class="col-6 col-sm-8 col-md-9 col-lg-9">
            <div class="row align-items-center">
              <div class="col-md-4">
                <p class="badge bg-third"> {{ item.category }}</p>
                <p>{{ item.title }}</p>
                <div class="d-flex ">
                  <p><del>{{ item.origin_price | currency }}</del></p>
                  <p class="text-danger h5 ms-5">{{ item.price | currency }}</p>
                </div>
              </div>
              <div class="col-md-8">
                <button type="button" class="btn btn-primary btn-hv-style me-3" @click="goToContent(item.id)"><span class="d-none d-sm-inline-block me-2">查看更多</span><i class="fas fa-angle-double-right"></i></button>
                <button type="button" class="btn btn-secondary btn-hv-style me-3" :id="item.id" @click="addToCart(item)"><span  class="d-none d-sm-inline-block me-2">加入購物車</span><i class="fas fa-cart-plus"></i></button>
                <a :id="item.id" role="button" @click="cancelFavorite(item.id)"><i class="fas fa-times ms-2"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="products.length===0&&!isLoading" class="py-5 text-center my-5">
        <h3>還沒有收藏喔，趕快去新增一些吧!</h3>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import Breadcrumb from '@/components/frontend/Breadcrumb.vue'
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader.vue'

export default {
  name: 'Favorite',
  data () {
    return {
      products: []
    }
  },
  components: {
    Breadcrumb,
    Loader
  },
  computed: {
    ...mapGetters(['isLoading', 'favoritelist', 'checkoutVisible'])
  },
  methods: {
    getFavoriteList () {
      this.$store.dispatch('getFavorite')
      this.getProductsList()
    },
    getProductsList () {
      const vm = this
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/products/all`
      vm.$store.dispatch('updatedLoading', true)
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          const productsAll = res.data.products
          vm.products = []
          vm.favoritelist.forEach(item => {
            const match = productsAll.filter((product) => product.id === item)
            if (match) {
              vm.products.push(...match)
            }
          })
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
    goToContent (id) {
      this.$router.push(`/content/${id}/kind`)
    },
    cancelFavorite (id) {
      this.$store.dispatch('removeFavorite', id)
      this.getFavoriteList()
    },
    addToCart (data, num = 1) {
      this.$store.dispatch('AddTmpCart', { data, num })
      this.$store.dispatch('updateMessage', {
        message: `<i class="fas fa-info-circle me-2"></i>${data.title} 已成功加入購物車`,
        status: 'primary'
      })
    }
  },
  created () {
    this.getFavoriteList()
    this.$store.dispatch('updateCheckoutBtn', true)
  }
}
</script>
