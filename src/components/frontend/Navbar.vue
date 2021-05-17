<template>
<div>
  <nav class="navbar navbar-main navbar-expand-md bg-gradient p-0 ">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"  aria-expanded="false">
     <i class="fas fa-bars text-white"></i>
    </button>
    <router-link class="navbar-brand" to="/"><i class="fas fa-fish text-primary me-2 fa-lg"></i><strong class="text-info">快樂水族</strong></router-link>
    <ShoppingCart/>
    <div class="collapse navbar-collapse"  id="navbarContent">
      <ul class="navbar-nav ms-auto mb-2 mb-md-0">
        <li class="nav-item me-3">
          <router-link class="nav-link pb-0" @click.native="foldNav" to="/" exact-active-class="active">首頁</router-link>
        </li>
        <li class="nav-item me-3">
         <router-link class="nav-link pb-0" @click.native="foldNav" to="/product" exact-active-class="active">商品</router-link>
        </li>
        <li class="nav-item me-3">
         <router-link class="nav-link pb-0" @click.native="foldNav" to="/favorite" exact-active-class="active">我的收藏</router-link>
        </li>
        <li class="nav-item me-3" >
         <router-link class="nav-link pb-0" @click.native="foldNav" to="/login" exact-active-class="active" >登入</router-link>
        </li>
      </ul>
    </div>
  </div>
  </nav>
</div>
</template>

<script>
import ShoppingCart from './ShoppingCart'
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  name: 'Navbar',
  props: ['loginstatus'],
  components: {
    ShoppingCart
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    foldNav () {
      $('.navbar-toggler').click()
    }
  },
  computed: {
    ...mapGetters(['loginStatus'])
  }
}
</script>
