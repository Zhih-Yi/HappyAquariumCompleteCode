<template>
<div>
  <div class="img-header bg-cover d-flex justify-content-center align-items-center"
    style="background-image: url('https://images.unsplash.com/photo-1509016068623-286b408eb841?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTExfHxmaXNoJTIwdGFua3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')">
    <h2 class="img-header-title"><strong>商品一覽</strong></h2>
  </div>
  <!--loader-->
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
        <input type="text" class="form-control" placeholder="商品快速搜尋" v-model="searchText">
        <button class="btn btn-use btn-hv-style"
        @click.prevent="isSearch = true; selectKind = '';currentPage = 0"><i class="fas fa-search text-third"></i></button>
      </div>
    </form>
  </div>
  <div class="row">
    <div class="col-md-3">
      <div class="list-group rounded-0 rounded-bottom mb-3 mx-2" >
        <div class="row ">
          <h5 class="col-md-12 py-3 bg-primary bg-gradient border border-2 text-third mb-0 text-center rounded-top">
          <strong><i class="fas fa-frog me-2"></i>商品類別</strong></h5>
          <a class="list-group-item col-md-12 col-sm-4 col-12" :class="{'active':selectKind==='所有商品'}" @click.prevent="selectKind='所有商品';currentPage=0;isSearch = false">
            <i class="fas fa-fish me-2 ps-3"></i>全部</a>
          <a  class="list-group-item col-md-12 col-sm-4 col-6" :class="{'active':selectKind==='水草'}" @click.prevent="selectKind='水草';currentPage=0;isSearch = false">
            <i class="fas fa-seedling me-2 ps-3"></i>水草</a>
          <a  class="list-group-item col-md-12 col-sm-4 col-6" :class="{'active':selectKind==='觀賞魚'}" @click.prevent="selectKind='觀賞魚';currentPage=0;isSearch = false">
            <i class="fas fa-fish me-2 ps-3"></i> 觀賞魚</a>
          <a class="list-group-item col-md-12  col-sm-4 col-6" :class="{'active':selectKind==='觀賞蝦'}" @click.prevent="selectKind='觀賞蝦';currentPage=0;isSearch = false">
            <i class="fas fa-fish me-2 ps-3"></i>觀賞蝦</a>
          <a  class="list-group-item col-md-12 col-sm-4 col-6"  :class="{'active':selectKind==='觀賞螺'}" @click.prevent="selectKind='觀賞螺';currentPage=0;isSearch = false">
            <i class="fas fa-fish me-2 ps-3"></i>觀賞螺</a>
          <a  class="list-group-item col-md-12 col-sm-4 col-6" :class="{'active':selectKind==='飼料'}" @click.prevent="selectKind='飼料';currentPage=0;isSearch = false">
            <i class="fas fa-fish me-2 ps-3"></i> 飼料</a>
          <a class="list-group-item col-md-12 col-sm-4 col-6" :class="{'active':selectKind==='水質控制'}" @click.prevent="selectKind='水質控制';currentPage=0;isSearch = false">
            <i class="fas fa-tint me-2 ps-3"></i> 水質控制</a>
          <a class="list-group-item col-md-12 col-sm-4 col-6" :class="{'active':selectKind==='水族用品'}" @click.prevent="selectKind='水族用品';currentPage=0;isSearch = false">
            <i class="fas fa-tint me-2 ps-3"></i>水族用品</a>
          <a class="list-group-item col-md-12 col-sm-4 col-6" :class="{'active':selectKind==='水草肥料'}" @click.prevent="selectKind='水草肥料';currentPage=0;isSearch = false">
            <i class="fas fa-seedling me-2 ps-3"></i>水草肥料</a>
        </div>
       </div>
    </div>
    <div class="col-md-9">
      <ProductCard :product="filterData()[currentPage]"/>
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
      if ((vm.selectKind === '' && vm.isSearch === false) || vm.selectKind === '所有商品' || (vm.searchText === '' && vm.isSearch === true)) {
        items = vm.products
      } else if (this.isSearch) {
        items = vm.products.filter((item) => {
          return item.title.indexOf(vm.searchText) > -1
        })
      } else {
        items = vm.products.filter((item) => {
          return item.category === vm.selectKind
        })
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
