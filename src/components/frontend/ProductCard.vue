<template>
<div>
  <div class="row">
    <div class="col-md-4 col-sm-6 mb-4" v-for="item in product" :key="item.id">
      <router-link :to="`/content/${item.id}/kind/${kind === '所有商品'? '所有商品' :item.category}`">
      <div class="card h-100 card-shadow product-card" >
        <div class="card-img-wrapper">
          <div class="view-more d-flex justify-content-center align-items-center">
            查看更多
          </div>
          <Myfavorite :productID="item.id"/>
          <img v-lazy="item.imageUrl" class="card-img card-img-size" :alt="item.title">
        </div>
        <div class="card-body pb-1">
          <p class="card-title mb-0"><strong>{{ item.title }}</strong></p>
          <p class="mb-1 card-description"><small>{{ item.description }}</small></p>
          <div class="d-flex justify-content-between">
            <span class="text-decoration-line-through"><small>{{ item.origin_price |currency }}</small></span>
            <strong  class="text-danger">NT {{ item.price | currency }} </strong>
          </div>
        </div>
        <div class="card-footer border-0 p-0 bg-light">
          <button class="btn rounded-0 btn-block btn-primary w-100 card-btn" type="button" @click.prevent="addToCart(item)">
          加入購物車<i class="ms-2 fas fa-cart-plus "></i>
          <i class="fas fa-spinner fa-spin ms-2" v-if="loadingItem===item"></i>
          </button>
        </div>
      </div>
      </router-link>
    </div>
    <div v-if="product === undefined && !isLoading" class="py-5">
      <h3 class="text-center">找不到相關商品 請重新搜尋!</h3>
      <div class="text-center py-5">
        <i class="fas fa-search fa-7x img-no-result"></i>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Myfavorite from './MyFavorite.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductCard',
  props: ['product', 'kind', 'isLoading'],
  components: {
    Myfavorite
  },
  methods: {
    addToCart (data, num = 1) {
      this.$store.dispatch('AddTmpCart', { data, num })
    }
  },
  computed: {
    ...mapGetters(['loadingItem'])
  }
}
</script>
