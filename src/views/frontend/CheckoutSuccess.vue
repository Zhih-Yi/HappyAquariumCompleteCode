<template>
<div>
 <div class="img-header d-flex justify-content-center align-items-center">
    <div class="bg-cover img-header-img" v-lazy:background-image="require('@/assets/images/banner-success.jpeg')"></div>
  </div>
  <div class="container-fluid py-5" >
    <div class="d-flex justify-content-center align-items-center info-box">
      <div class="d-flex justify-content-around ">
        <div>
          <h2 class="display-3"><strong>訂購成功</strong></h2>
          <strong class="display-6 text-center">感謝您的訂購!</strong><br>
        </div>
        <div class="d-flex align-items-end ms-5">
          <div class="dot-bounce">
            <span class="dot dot1 bg-primary"></span>
            <span class="dot dot2 bg-abstract"></span>
            <span class="dot dot3 bg-warning"></span>
            <span class="dot dot4 bg-danger"></span>
            <span class="dot dot5 bg-primary"></span>
            <span class="dot dot6 bg-abstract"></span>
            <span class="dot dot7 bg-warning"></span>
            <span class="dot dot8 bg-danger"></span>
            <i class="fas fa-box-open fa-5x"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center pt-5">
      <router-link  to="/" class="btn btn-outline-third">回首頁 </router-link>
      <router-link  to="/product" class="ms-2 btn btn-primary btn-hv-style">繼續選購</router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CheckoutSuccess'
}
</script>
