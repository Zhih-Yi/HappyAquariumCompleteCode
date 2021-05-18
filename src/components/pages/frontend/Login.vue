<template>
<div>
  <loading :active.sync="isLoading" >
    <Loader/>
  </loading>
  <div class="img-header bg-cover d-flex justify-content-center align-items-center"
    style="background-image: url('https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTZ8fGZpc2glMjBhcXVhcml1bXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')">
    <h2 class="img-header-title"><strong>管理員登入</strong></h2>
  </div>
  <div class="container-fluid py-5">
    <div class="row">
      <div class="col-md-6">
        <Breadcrumb/>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-md-6">
        <form class="pt-2 pb-5" @submit.prevent="signin">
          <div class="text-center pb-3">
            <div class="dot-group">
              <span class="dot dot1 bg-use"></span>
              <span class="dot dot2 bg-abstract"></span>
              <span class="dot dot3 bg-warning"></span>
              <span class="dot dot4 bg-alert"></span>
            </div>
            <i class="fas fa-fish text-primary me-2 fa-3x"></i>
            <div class="dot-group">
              <span class="dot dot5 bg-use"></span>
              <span class="dot dot6 bg-abstract"></span>
              <span class="dot dot7 bg-warning"></span>
              <span class="dot dot8 bg-alert"></span>
            </div>
          </div>
          <div class="form-floating mb-3">
            <input type="email" placeholder="電子郵件" class="form-control bg-light text-third" id="floatingInput"  v-model="user.username">
            <label for="floatingInput">電子郵件</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password"  placeholder="密碼" class="form-control bg-light text-third" id="floatingPassword"  v-model="user.password" autocomplete="on">
            <label for="floatingPassword">密碼</label>
          </div>
          <button class="w-100 btn btn-lg btn-use btn-hv-style fw-bold" type="submit">登入</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/frontend/Breadcrumb'
import Loader from '@/components/Loader.vue'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    Breadcrumb,
    Loader
  },
  computed: {
    ...mapGetters(['isLoading', 'checkoutVisible'])

  },
  methods: {
    signin () {
      const vm = this
      const api = `${process.env.VUE_APP_APIHOST}/admin/signin`
      vm.$store.dispatch('updatedLoading', true)
      vm.$http.post(api, vm.user).then((res) => {
        if (res.data.success) {
          const token = res.data.token
          const expired = res.data.expired
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`
          vm.$store.dispatch('updatedLoading', false)
          vm.$router.push('/admin/dashboard')
        } else {
          vm.$store.dispatch('updateMessage', {
            message: res.data.message,
            status: 'danger'
          })
          vm.$store.dispatch('updatedLoading', false)
        }
      }).catch((err) => {
        vm.$store.dispatch('updateMessage', {
          message: err,
          status: 'danger'
        })
      })
    }
  },
  created () {
    this.$store.dispatch('updateCheckoutBtn', true)
  }
}
</script>
