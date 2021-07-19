<template>
  <div>
    <loading :active.sync="isLoading">
      <LoaderAnimation/>
    </loading>
    <div class="img-header d-flex justify-content-center align-items-center">
      <div class="bg-cover img-header-img" v-lazy:background-image="require('@/assets/images/banner-login.jpeg')"></div>
        <h2 class="img-header-title pt-5 pt-md-0">
          <strong>管理員登入</strong>
        </h2>
      </div>
    <div class="container py-5 mh-content">
      <div class="row">
        <div class="col-md-6">
          <Breadcrumb/>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form class="pt-2 pb-5" @submit.prevent="signin">
            <div class="text-center pb-3">
              <div class="dot-group">
                <span class="dot dot1 bg-primary"></span>
                <span class="dot dot2 bg-abstract"></span>
                <span class="dot dot3 bg-warning"></span>
                <span class="dot dot4 bg-danger"></span>
              </div>
              <i class="fas fa-fish text-secondary me-2 fa-3x"></i>
              <div class="dot-group">
                <span class="dot dot5 bg-primary"></span>
                <span class="dot dot6 bg-abstract"></span>
                <span class="dot dot7 bg-warning"></span>
                <span class="dot dot8 bg-danger"></span>
              </div>
            </div>
            <div class="form-floating mb-3">
              <input type="email" placeholder="電子郵件" class="form-control bg-light text-third"
              id="floatingInput" v-model="user.username">
              <label for="floatingInput">電子郵件</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" placeholder="密碼" class="form-control bg-light text-third"
              id="floatingPassword" v-model="user.password" autocomplete="on">
              <label for="floatingPassword">密碼</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary btn-hv-style fw-bold" type="submit">登入</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/frontend/Breadcrumb.vue'
import LoaderAnimation from '@/components/LoaderAnimation.vue'
import { mapGetters } from 'vuex'

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
    LoaderAnimation
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
