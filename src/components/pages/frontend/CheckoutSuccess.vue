<template>
<div>
  <div class="checkout-img"
  v-lazy:background-image="'https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ2fHxmaXNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'">
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
            <span class="dot dot1 bg-use"></span>
            <span class="dot dot2 bg-abstract"></span>
            <span class="dot dot3 bg-warning"></span>
            <span class="dot dot4 bg-alert"></span>
            <span class="dot dot5 bg-use"></span>
            <span class="dot dot6 bg-abstract"></span>
            <span class="dot dot7 bg-warning"></span>
            <span class="dot dot8 bg-alert"></span>
            <i class="fas fa-box-open fa-5x"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center pt-5">
      <router-link  to="/" class="btn btn-outline-third">回首頁 </router-link>
      <router-link  to="/product" class="ms-2 btn btn-use btn-hv-style">繼續選購</router-link>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'CheckoutSuccess'
}
</script>
