<template>
<div>
  <div class="row pt-3 justify-content-center">
    <div class="col-md-10">
      <div class="row slick-group">
        <div class="mb-3" v-for="item in product" :key="item.title">
          <router-link :to="`/content/${item.id}/kind/`">
            <div class="card h-100 card-shadow product-card">
              <div class="card-img-wrapper">
                <div class="view-more d-flex justify-content-center align-items-center">
                  查看更多
                </div>
                <Myfavorite :productID="item.id"></Myfavorite>
                <img v-lazy="item.imageUrl" class="card-img card-img-size" :alt="item.title">
              </div>
              <div class="card-body">
                  <p class="card-title card-description"><strong>{{ item.title }}</strong></p>
                <div class="d-flex justify-content-between">
                  <span class="text-decoration-line-through"><small>{{ item.origin_price | currency}}</small></span>
                  <strong  class="text-danger">{{ item.price | currency }} </strong>
                </div>
              </div>
              <div class="card-footer border-0  p-0 bg-light">
                  <button class="btn btn-block btn-primary w-100 card-btn" @click.prevent="AddCart(item)">
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
          <router-link to="/product" exact-active-class="active" class="badge bg-secondary badge-pills text-dark link-shop ">
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
import $ from 'jquery'

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
  },
  mounted () {
    $('.slick-group').not('.slick-initialized').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      adaptiveHeigh: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 567,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        }
      ]
    })
  }
}
</script>
