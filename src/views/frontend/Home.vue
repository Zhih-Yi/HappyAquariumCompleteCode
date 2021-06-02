<template>
<div class="home">
<Navbar></Navbar>
<Alert></Alert>
<router-view></router-view>
<ScrollToTop></ScrollToTop>
<div class="footer">
  <div class="container">
  <div class="row ">
    <div class="col-lg-9 col-md-8">
      <p class="display-6 header-font-style">
      <img src="@/assets/images/fish.png" class="me-2" alt="logo"/><span class="text-white">快樂水族</span>
      </p>
      <ul class="d-flex list-unstyled">
        <li class="me-3" ><a href="https://social-plugins.line.me/lineit/share?url=https://zhih-yi.github.io/HappyAquarium/" target="_blank" class="icon-link"><i class="fab fa-line fa-2x "></i></a></li>
        <li class="me-3"  data-href="https://zhih-yi.github.io/HappyAquarium/"><a  class="icon-link" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzhih-yi.github.io%2FHappyAquarium%2F%23%2F&amp;src=sdkpreparse" ><i class="fab fa-facebook-square fa-2x"></i></a></li>
      </ul>
    </div>
    <div class="col-lg-3 col-md-4">
      <p class="h4 text-white"><strong>聯絡方式</strong></p>
      <ul class="list-unstyled">
        <li><a href="mailto:example@gmail.com" class="contact-link"><i class="fas fa-envelope me-2"></i>example@gmail.com</a></li>
        <li><a href="tel:+886886886" class="contact-link"><i class="fas fa-phone-volume me-2"></i>+886-886-886</a></li>
        <li class="contact-link"><i class="fas fa-home mr-2"></i>高雄市中正五路到底</li>
      </ul>
    </div>
  </div>
</div>
</div>
<div id="fb-root"></div>
</div>
</template>

<script>
import Navbar from '@/components/frontend/Navbar.vue'
import Alert from '@/components/AlertMessage.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Alert,
    ScrollToTop
  }
}
</script>
