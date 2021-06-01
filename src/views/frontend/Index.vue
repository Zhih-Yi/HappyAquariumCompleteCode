<template>
<div>
  <loading :active.sync="isLoading" >
    <Loader/>
  </loading>
  <Carousel v-cloak/>
  <div class="container-fluid pt-header">
    <div class="row justify-content-center">
      <div class="col-md-11 col-lg-10">
        <div class="row d-flex align-items-center pt-3 pb-5">
          <div class="col-md-6 text-center animated-x mb-3">
            <h2 class="mb-3">關於我們</h2>
            <p>快樂水族成立於2021年5月，核心價值在於</p>
            <p>提供高品質的水族設備與周邊用品，</p>
            <p>讓魚兒與水中生物能健康順利的成長，</p>
            <p>並販售各類水中生物讓所有人都能輕易體驗養魚的樂趣。</p>
          </div>
          <div class="col-md-6 animated">
            <img class="w-100 img-index" :src="require('@/assets/images/img-index1.png')" alt="關於我們">
          </div>
        </div>
        <div class="row d-flex align-items-center">
          <div class="col-md-6 animated order-2 order-md-1">
            <img class="w-100 img-index" :src="require('@/assets/images/img-index2.jpg')" alt="實用美學">
          </div>
          <div class="col-md-6 text-center animated-x order-1 order-md-2 mb-3">
            <h2 class="mb-3">實用美學</h2>
            <p>快樂水族販售各類方便實用的水族用品，</p>
            <p>以及活潑美麗的水族生物，</p>
            <p>幫您打造出優雅精緻的水族魚缸</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid pt-header">
    <HeaderTitle :title='`分類導覽`' :icon='`fas fa-th-large`' />
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="row g-0">
          <div class="col-6 col-sm-3 animated-x" >
            <router-link to="/product/水草">
              <div class="menu-item bg-cover text-center" v-cloak
              v-lazy:background-image="require('@/assets/images/水草.jpg')">
                <div class="layer">水草</div>
              </div>
            </router-link>
          </div>
          <div class="col-6 col-sm-3 animated-x">
            <router-link to="/product/水質控制">
              <div class="menu-item bg-cover text-center" v-cloak
             v-lazy:background-image="require('@/assets/images/水質.png')">
              <div class="layer">水質控制</div></div>
            </router-link>
          </div>
          <div class="col-6 col-sm-3 animated-x">
            <router-link to="/product/觀賞蝦">
              <div class="menu-item bg-cover text-center" v-cloak
               v-lazy:background-image="require('@/assets/images/觀賞蝦.jpg')">
              <div class="layer">觀賞蝦</div></div>
            </router-link>
          </div>
          <div class="col-6 col-sm-3 animated-x">
            <router-link to="/product/水草肥料">
              <div class="menu-item text-center bg-cover" v-cloak
              v-lazy:background-image="require('@/assets/images/肥料.png')">
              <div class="layer">水草肥料</div>
              </div>
            </router-link>
          </div>
          <div class="col-6 col-sm-3 animated-x">
            <router-link to="/product/飼料">
              <div class="menu-item bg-cover text-center" v-cloak
              v-lazy:background-image="require('@/assets/images/飼料.png')">
              <div class="layer">飼料</div>
              </div>
            </router-link>
          </div>
          <div class="col-6 col-sm-3 animated-x">
            <router-link to="/product/觀賞魚">
              <div class="menu-item bg-cover text-center" v-cloak
              v-lazy:background-image="require('@/assets/images/觀賞魚.jpg')">
              <div class="layer">觀賞魚</div></div>
            </router-link>
          </div>
          <div class="col-6 col-sm-3 animated-x">
            <router-link to="/product/水族用品">
              <div class="menu-item bg-cover text-center" v-cloak
             v-lazy:background-image="require('@/assets/images/用品.png')">
              <div class="layer">水族用品</div>
              </div>
            </router-link>
          </div>
          <div class="col-6 col-sm-3 animated-x">
            <router-link to="/product/觀賞螺">
              <div class="menu-item bg-cover text-center" v-cloak
               v-lazy:background-image="require('@/assets/images/觀賞螺.jpg')">
                <div class="layer">觀賞螺</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid pt-header">
    <HeaderTitle :title='`新品到貨`' :icon='`fas fa-shipping-fast`' class="animated"/>
    <CardGroup :product="newProduct" class="animated"/>
  </div>
  <div class="container-fluid pt-header-m">
    <HeaderTitle :title='`熱門商品`' :icon='`fas fa-fire`' class="animated"/>
    <CardGroup :product="hotProduct" class="animated"/>
  </div>
  <div class="container-fluid pt-header-m">
    <HeaderTitle :title='`限時搶購`' :icon='`fas fa-clock`' class="animated"/>
    <CardGroup :product="discountProduct" class="animated"></CardGroup>
  </div>
  <div class="container-fluid pt-header-m pb-5">
    <HeaderTitle :title='`聯絡我們`' :icon='`fas fa-paper-plane`' class="animated"/>
    <MapContact class="animated" @msgModal="sendMessage" ref="mapcontact"/>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="msgModal" tabindex="-1" aria-labelledby="msgModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="msgModalLabel">您的訊息已送出</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        您的訊息已送出等候回復，感謝您的支持!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-hv-style" data-bs-dismiss="modal">確認</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Carousel from '@/components/frontend/Carousel.vue'
import HeaderTitle from '@/components/frontend/HeaderTitle.vue'
import CardGroup from '@/components/frontend/CardGroup'
import Loader from '@/components/Loader.vue'
import newProduct from '@/assets/json/new.json'
import hotProduct from '@/assets/json/hot.json'
import discountProduct from '@/assets/json/discount.json'
import MapContact from '@/components/frontend/MapContact.vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
import { Modal } from 'bootstrap'

export default {
  name: 'Index',
  components: {
    Carousel,
    HeaderTitle,
    CardGroup,
    Loader,
    MapContact
  },
  data () {
    return {
      newProduct,
      hotProduct,
      discountProduct,
      msgModal: null
    }
  },
  methods: {
    scrollEffect () {
      const scrollPos = $(window).scrollTop()
      const windowH = $(window).height()
      $('.animated').each(function () {
        const thisPos = $(this).offset().top
        if ((windowH + scrollPos) >= thisPos) {
          $(this).addClass('fadein')
        }
      })
      $('.animated-x').each(function () {
        const thisPos = $(this).offset().top
        if ((windowH + scrollPos) >= thisPos) {
          $(this).addClass('slidein')
        }
      })
    },
    sendMessage () {
      this.msgModal.show()
      this.$refs.mapcontact.name = ''
      this.$refs.mapcontact.email = ''
      this.$refs.mapcontact.msg = ''
      this.$refs.mapcontact.$refs.observer.reset()
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'checkoutVisible'])
  },
  created () {
    window.addEventListener('scroll', this.scrollEffect)
    this.$store.dispatch('updateCheckoutBtn', true)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollEffect)
  },
  mounted () {
    this.msgModal = new Modal(document.getElementById('msgModal'))
  }
}
</script>
