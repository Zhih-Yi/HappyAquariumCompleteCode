<template>
<div>
  <nav class="navbar navbar-main navbar-expand-md bg-gradient p-3" ref="navbar">
  <div class="container-fluid">
    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"  aria-expanded="false">
      <div>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </div>
    </button>
    <router-link class="navbar-brand" to="/"><img src="@/assets/images/fish.png" class="me-2" alt="logo"/><span class="text-white header-font-style">快樂水族</span></router-link>
    <ShoppingCart/>
    <div class="collapse navbar-collapse navbar-content" id="navbarContent">
      <ul class="navbar-nav ms-auto mb-2 mb-md-0">
        <li class="nav-item me-3">
          <router-link class="nav-link fw-bold" @click.native="foldNav" to="/" exact-active-class="active">首頁</router-link>
        </li>
        <li class="nav-item me-3">
         <router-link class="nav-link fw-bold" @click.native="foldNav" to="/product" active-class="active">商品</router-link>
        </li>
        <li class="nav-item me-3">
         <router-link class="nav-link fw-bold" @click.native="foldNav" to="/favorite" exact-active-class="active">收藏</router-link>
        </li>
        <li class="nav-item me-3" >
         <router-link class="nav-link fw-bold" @click.native="foldNav" to="/login" exact-active-class="active" >登入</router-link>
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
    },
    handleScroll () {
      const scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
      const windowWidth = window.innerWidth
      if (scrollTop > 5) {
        this.$refs.navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
      } else {
        if (windowWidth > 768) {
          this.$refs.navbar.style.backgroundColor = 'transparent'
        } else {
          this.$refs.navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['loginStatus'])
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
