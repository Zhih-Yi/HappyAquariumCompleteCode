<template>
<div>
  <!--loader-->
  <loading :active.sync="isLoading" >
    <Loader/>
  </loading>
  <!--標題-->
  <div class="img-header bg-cover d-flex justify-content-center align-items-center"
    v-lazy:background-image="'https://images.unsplash.com/photo-1516970739312-08b075784b71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80'">
    <h2 class="img-header-title"><strong>我的收藏</strong></h2>
  </div>
  <div class="container-fluid">
    <!---麵包屑---->
    <div class="row py-3">
      <div class="col-md-6">
        <Breadcrumb/>
      </div>
    </div>
  <div class="row justify-content-center align-items-center">
    <div class="col-md-10">
      <div class="content-striped" >
        <div class="row mb-2 pb-2  align-items-center" v-for="item in products" :key="item.id" v-cloak >
          <div class="col-6 col-sm-4 col-md-3 col-lg-3">
            <img v-lazy="item.imageUrl" alt="item.title" class="cart-img">
          </div>
          <div class="col-6 col-sm-8 col-md-9 col-lg-9">
            <div class="row align-items-center">
              <div class="col-md-4">
                <p class="badge bg-third"> {{ item.category }}</p>
                <p>{{ item.title }}</p>
                <div class="d-flex ">
                  <p><del>{{ item.origin_price | currency }}</del></p>
                  <p class="text-alert h5 ms-5">{{ item.price | currency }}</p>
                </div>
              </div>
              <div class="col-md-8">
                <button class="btn btn-primary btn-hv-style me-3"  role="button" @click="goToContent(item.id)"><span class="d-none d-sm-inline-block me-2">查看更多</span><i class="fas fa-angle-double-right"></i></button>
                <button class="btn btn-use btn-hv-style me-3" :id="item.id" role="button" @click="addToCart(item)"><span  class="d-none d-sm-inline-block me-2">加入購物車</span><i class="fas fa-cart-plus"></i></button>
                <a class="" :id="item.id" role="button" @click="cancelFavorite(item.id)"><i class="fas fa-times ms-2"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="products.length===0&&!isLoading" class="py-5 text-center">
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
      vm.products = []
      vm.$store.dispatch('updatedLoading', true)
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          const productsAll = res.data.products
          vm.favoritelist.forEach(item => {
            const match = productsAll.filter((product) => {
              return product.id === item
            })
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
      this.$router.push(`/content/${id}`)
    },
    cancelFavorite (id) {
      this.$store.dispatch('removeFavorite', id)
      this.getFavoriteList()
    },
    addToCart (data, num = 1) {
      this.$store.dispatch('AddTmpCart', { data, num })
    }
  },
  created () {
    this.getFavoriteList()
    this.$store.dispatch('updateCheckoutBtn', true)
  }
}
</script>
