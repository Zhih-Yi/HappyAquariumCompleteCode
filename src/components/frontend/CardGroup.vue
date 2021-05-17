<template>
<div>
  <div class="row pt-3 justify-content-center">
    <div class="col-md-10">
      <div class="row">
        <div class="col-md-4 mb-3" v-for="item in product" :key="item.title">
          <router-link :to="`/content/${item.id}`">
            <div class="card h-100 border-0 card-shadow" >
              <div class="card-img-wrapper">
                <div class="view-more d-flex justify-content-center align-items-center">
                  查看更多
                </div>
                <Myfavorite :productID="item.link"></Myfavorite>
                <img :src="item.imageUrl" class="card-img card-img-size" :alt="item.title">
              </div>
              <div class="card-body">
                  <p class="card-title  text-third"><strong>{{ item.title }}</strong></p>
                <div class="d-flex justify-content-between">
                  <span class="text-decoration-line-through text-third "><small>{{ item.origin_price | currency}}</small></span>
                  <strong  class="text-alert">{{ item.price | currency }} </strong>
                </div>
              </div>
              <div class="card-footer border-0  p-0 bg-light">
                  <button class="btn rounded-0 btn-block btn-use w-100 card-btn" @click.prevent="AddCart(item)">
                  加入購物車<i class="ms-2 fas fa-cart-plus"></i>
                   <i class="fas fa-spinner fa-spin ms-2" v-if="loadingItem===item.id"></i>
                  </button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row text-end py-2 d-flex align-items-center">
        <div class="col-12">
          <router-link to="/product" exact-active-class="active" class="badge bg-info badge-pills text-white link-shop ">
          去逛逛<i class="fas fa-angle-double-right ms-2 "></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Myfavorite from './MyFavorite'
import { mapGetters } from 'vuex'

export default {
  name: 'CardGroup',
  props: ['product'],
  components: {
    Myfavorite
  },
  methods: {
    AddCart (data, num = 1) {
      this.$store.dispatch('AddTmpCart', { data, num })
    }
  },
  computed: {
    ...mapGetters(['loadingItem'])
  }
}
</script>
