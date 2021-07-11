<template>
<div>
  <div class="container-fluid p-0">
    <div id="carouselCaptions" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="6000">
          <div v-lazy:background-image="require('@/assets/images/banner3.jpg')" class="header-carousel-item bg-cover" >
            <div class="carousel-caption d-flex flex-column justify-content-center">
              <h3 class="mt-3 mb-5 display-6 fw-bold white-text-shadow">專業。優惠。高品質。</h3>
              <p class="h5"><span class="d-none d-sm-block fw-bold white-text-shadow">飼料/底沙/魚缸/水族生物/水草/過濾設備</span>
              <br><span class="fw-bold white-text-shadow">各式水族精選商品就在快樂水族</span></p>
            </div>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="6000">
          <div v-lazy:background-image="require('@/assets/images/banner2.jpg')" class=" header-carousel-item bg-cover">
            <div class="carousel-caption d-flex flex-column justify-content-center">
              <h3 class="mt-3 mb-5 display-6 fw-bold white-text-shadow">雙11優惠季</h3>
              <p class="h5 fw-bold white-text-shadow"><span>11/1~11/30 不限商品 全館8折優惠</span></p>
            </div>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="6000">
          <div v-lazy:background-image="require('@/assets/images/banner1.jpg')" class="header-carousel-item bg-cover" alt="heater">
            <div class="carousel-caption d-flex flex-column justify-content-center">
              <h3 class="mt-3 mb-5 display-6 fw-bold white-text-shadow">給您的魚兒暖暖的冬天</h3>
              <p class="h5 fw-bold white-text-shadow"><span>水族加溫設備滿700送50</span></p>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Carousel'
}
</script>
