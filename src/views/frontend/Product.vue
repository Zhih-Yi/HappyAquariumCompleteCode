<template>
<div>
  <div class="img-header d-flex justify-content-center align-items-center">
    <div class="bg-cover img-header-img" v-lazy:background-image="require('@/assets/images/banner-product.jpeg')"></div>
    <h2 class="img-header-title"><strong>商品一覽</strong></h2>
  </div>
  <loading :active.sync="isLoading">
    <Loader/>
  </loading>
  <div class="container py-5">
    <div class="row justify-content-between d-flex">
      <div class="col-md-3">
        <Breadcrumb/>
      </div>
    <form class="col-md-3">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="商品搜尋" v-model="searchText" @keyup.enter="searchData">
        <button type="button" class="btn btn-primary btn-hv-style"
        @click="searchData"><i class="fas fa-search"></i></button>
      </div>
    </form>
  </div>
  <div class="row">
    <div class="col-lg-2">
      <div class="list-group rounded-0 rounded-bottom mb-3 mx-2 list-group-menu-sticky">
        <div class="row">
          <a class="list-group-item col-lg-12 col-md-4 col-sm-4 col-12" :class="{'active':selectKind==='所有商品'}" @click.prevent="selectKind='所有商品';currentPage=0;isSearch = false">
            <i class="fas fa-fish me-2 ps-3"></i>全部</a>
          <a  class="list-group-item col-lg-12 col-md-4 col-sm-4 col-6" :class="{'active':selectKind==='水草'}" @click.prevent="selectKind='水草';currentPage=0;isSearch = false">
            <i class="fas fa-seedling me-2 ps-3"></i>水草</a>
          <a  class="list-group-item col-lg-12 col-md-4 col-sm-4 col-6" :class="{'active':selectKind==='觀賞魚'}" @click.prevent="selectKind='觀賞魚';currentPage=0;isSearch = false">
            <i class="fas fa-fish me-2 ps-3"></i> 觀賞魚</a>
          <a class="list-group-item col-lg-12 col-md-4 col-sm-4 col-6" :class="{'active':selectKind==='觀賞蝦'}" @click.prevent="selectKind='觀賞蝦';currentPage=0;isSearch = false">
            <i class="fas fa-fish me-2 ps-3"></i>觀賞蝦</a>
          <a  class="list-group-item col-lg-12 col-md-4 col-sm-4 col-6"  :class="{'active':selectKind==='觀賞螺'}" @click.prevent="selectKind='觀賞螺';currentPage=0;isSearch = false">
            <i class="fas fa-fish me-2 ps-3"></i>觀賞螺</a>
          <a  class="list-group-item col-lg-12 col-sm-4 col-6" :class="{'active':selectKind==='飼料'}" @click.prevent="selectKind='飼料';currentPage=0;isSearch = false">
            <i class="fas fa-fish me-2 ps-3"></i> 飼料</a>
          <a class="list-group-item col-lg-12 col-md-4 col-sm-4 col-6" :class="{'active':selectKind==='水質控制'}" @click.prevent="selectKind='水質控制';currentPage=0;isSearch = false">
            <i class="fas fa-tint me-2 ps-3"></i> 水質控制</a>
          <a class="list-group-item col-lg-12 col-md-4 col-sm-4 col-6" :class="{'active':selectKind==='水族用品'}" @click.prevent="selectKind='水族用品';currentPage=0;isSearch = false">
            <i class="fas fa-tint me-2 ps-3"></i>水族用品</a>
          <a class="list-group-item col-lg-12 col-md-4 col-sm-4 col-6" :class="{'active':selectKind==='水草肥料'}" @click.prevent="selectKind='水草肥料';currentPage=0;isSearch = false">
            <i class="fas fa-seedling me-2 ps-3"></i>水草肥料</a>
        </div>
       </div>
    </div>
    <div class="col-lg-10">
      <ProductCard :product="filterData()[currentPage]" :kind.sync="selectKind" :isLoading.sync="isLoading"/>
        <nav class="my-3" aria-label="Page navigation" v-cloak>
          <ul class="pagination justify-content-center product-pagination">
            <li class="page-item" v-for="page in filterData().length" :key="page"
            :class="{'active':currentPage===page-1}">
               <a class="page-link" href="#" v-cloak @click.prevent="currentPage=page-1">{{ page }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ProductCard from '@/components/frontend/ProductCard.vue'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/frontend/Breadcrumb.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'Product',
  components: {
    ProductCard,
    Breadcrumb,
    Loader
  },
  data () {
    return {
      products: [],
      selectKind: '所有商品',
      isSearch: false,
      searchText: '',
      currentPage: 0
    }
  },
  methods: {
    getProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/products/all`
      vm.$store.dispatch('updatedLoading', true)
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.products = res.data.products
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
    filterData () {
      const vm = this
      let items = []
      if ((vm.selectKind === '' && !vm.isSearch) || vm.selectKind === '所有商品' || (vm.searchText === '' && vm.isSearch === true)) {
        items = vm.products
      } else if (vm.isSearch) {
        items = vm.products.filter((item) => item.title.indexOf(vm.searchText) > -1)
      } else {
        items = vm.products.filter((item) => item.category === vm.selectKind)
      }
      const newProducts = []
      items.forEach((item, i) => {
        if (i % 6 === 0) {
          newProducts.push([])
        }
        const page = parseInt(i / 6)
        newProducts[page].push(item)
      })
      return newProducts
    },
    searchData (event) {
      if (event.isComposing) {
        return
      }
      this.selectKind = ''
      this.isSearch = true
      this.currentPage = 0
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'checkoutVisible'])
  },
  created () {
    const kind = this.$route.params.kind
    if (kind) {
      this.selectKind = kind
    }
    this.getProduct()
    this.$store.dispatch('updateCheckoutBtn', true)
  }
}
</script>
