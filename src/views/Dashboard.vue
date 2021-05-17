<template>
    <div>
  <Alert></Alert>
  <nav class="navbar navbar-main navbar-expand-md navbar-light bg-gradient navbar-dark bg-dark">
  <div class="d-flex">
  <router-link class="ms-3 navbar-brand order-2 order-md-1" to="/admin/dashboard"><i class="fas fa-fish text-primary me-2 fa-lg"></i>
  <strong  class="text-info">快樂水族</strong></router-link>
  <button class="btn order-1 order-md-2 text-white" @click="isOpen=!isOpen"><i class="fas fa-bars"></i></button>
  </div>
   <a href="#"  class="ms-auto text-white pb-0 pe-5" @click.prevent="signout">登出</a>
</nav>

        <div class="container-fluid">
  <div class="">
<Sidebar :open="isOpen" @closeNav="isOpen=false"></Sidebar>
<main class="dashboard-main" :class="{'open' :isOpen===true,'close':isOpen===false}">
   <router-view></router-view>
   <ScrollToTop></ScrollToTop>
  </main>
  </div>

</div>
    </div>
</template>
<script>
import Sidebar from '@/components/backend/Sidebar.vue'
import Alert from '@/components/AlertMessage.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

export default {
  name: 'Dashboard',
  data () {
    return {
      isOpen: true
    }
  },
  components: {
    Sidebar,
    Alert,
    ScrollToTop
  },
  methods: {
    signout () {
      const api = `${process.env.VUE_APP_APIHOST}/logout`
      const vm = this
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('getLoginStatus', false)
          vm.$router.push('/login')
        }
      })
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

    this.$http.defaults.headers.common.Authorization = `${token}`
  }
}
</script>
