<template>
<div>
  <!--loader-->
  <loading :active.sync="isLoading" >
    <Loader/>
  </loading>
  <!--carousel component-->
  <Carousel v-cloak/>
  <!---nav-menu-->
  <div class="container-fluid pt-header">
    <HeaderTitle :title='`分類導覽`' :icon='`fas fa-th-large`' />
  <div class="row justify-content-center ">
    <div class="col-md-10 ">
      <div class="row g-0">
        <div class="col-6 col-sm-3 animated-x" >
          <router-link to="/product/水草">
            <div class="menu-item bg-cover text-center" v-cloak
              style="background-image:url('https://images.unsplash.com/photo-1519657635301-68bb60c798f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1492&q=80')">
            <div class="layer text-dark">水草</div></div>
          </router-link>
        </div>
        <div class="col-6 col-sm-3 animated-x">
          <router-link to="/product/觀賞魚">
            <div class="menu-item bg-cover text-center" v-cloak
            style="background-image:url('https://images.unsplash.com/photo-1520301255226-bf5f144451c1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fGZpc2glMjB0YW5rfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')">
            <div class="layer text-dark">觀賞魚</div></div>
          </router-link>
        </div>
        <div class="col-6 col-sm-3 animated-x">
          <router-link to="/product/觀賞蝦">
            <div class="menu-item bg-cover text-center" v-cloak
            style="background-image:url('https://media.istockphoto.com/photos/pregnant-red-bee-dwarf-shrimp-look-for-food-in-fresh-water-aquarium-picture-id1223017973?b=1&k=6&m=1223017973&s=170667a&w=0&h=6GJFkuUZSQwqifCsP6kzePzUFknLQ_NYmJb96xj1WrU=')">
            <div class="layer text-dark">觀賞蝦</div></div>
          </router-link>
        </div>
        <div class="col-6 col-sm-3 animated-x">
          <router-link to="/product/觀賞螺">
            <div class="menu-item bg-cover text-center" v-cloak
            style="background-image:url('https://storage.googleapis.com/vue-course-api.appspot.com/happyaquarium%2F1618049072705.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Qy2dJ5xCecNJfixqdURpCCH5JZdlNJPd5uEPGy4ylNVHxSiQ0iyloCnakhJGwHOxokLIyIep7vbIxOxpu1AxNMiVX00n2foi3F4cBmLMY40McdLrpC1EotwjlmJjpLTjTzgk0sWW0NgVuJNHx7dVyPjEqOTwaD2cRKWxsbROamhXQkyej7X1Sgv18WqBOc3VMMqeqAgjvQymrcGaaaWCMGF7CJANpI613S4Brfvs4UAzTLXf787%2BwVEJIVk8XHPDXw1B%2FDA4d4lIUfEYlN%2BEoL31SL5y9zUMr1Zs2SCEKI0%2Bgu5atzF3zKMVyATeC0JPnROr47msxDb%2FJsf6w%2Frwng%3D%3D')">
            <div class="layer text-dark">觀賞螺</div></div>
          </router-link>
        </div>
        <div class="col-6 col-sm-3 animated-x">
          <router-link to="/product/飼料">
            <div class="menu-item bg-cover text-center" v-cloak
            style="background-image:url('https://storage.googleapis.com/vue-course-api.appspot.com/happyaquarium%2F1618056605362.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=p36q3ePk9g3uyQvfH3UG8TJyvkf6u1mNTjRue5McmGrIUxpDYmrZakatT7TJlocryPSqz78TB6sAbsRRMdc4hxNjkTXW41M4VG3TeM8RhXq93SkKQwheenLWZ17WZ8FG6zzeGfhTNKSfx%2BfzkOa%2B9hHIiTbuuXfZUUIgUF8p6KeKmwMvmquDKSPgwokX%2BuOxRyu2hQz7kNNgLQAG4%2BAkxU7k0ha57wwbXPNQjert4ffWtGx1WUxXEHL1yE0eaW%2FUgs8uTIvEqSJuKhfuKPfTCkV4U97xE5RarW0Wbm%2Fwfut3xYr9VG%2Feqj0ZXhNyXD%2F1BkmkoSa0tTKw0xvFYbudGQ%3D%3D')">
            <div class="layer text-dark">飼料</div></div>
          </router-link>
        </div>
        <div class="col-6 col-sm-3 animated-x">
          <router-link to="/product/水質控制">
            <div class="menu-item bg-cover text-center" v-cloak
            style="background-image:url('https://storage.googleapis.com/vue-course-api.appspot.com/happyaquarium%2F1618064180440.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Jl%2FgVXYgzNUg8D4kBwXfj7wXw6PwdwqC4WSWPL%2FIZwen5BiDPIFzSRHEdhaW8hhqV4tO3UDwQDH21NJNxQwUETtpiVNvI2TD5n9FnVfYjtiqmdMJ5AlQ9ZnsP9rAoV54GLdwXwrLARNl4Viu7jAUBIXQIV0OFSQ3RtVsfU9gEhMy%2BYOjqvnqG2swf0bSMTi9kFbx5wiz0gyRKGhGx18PY7u7Xf4GgrVyPzHb%2FekDF34lit7PI%2F0HKnBZkxzeAg5GQ0Buca9D9%2FSwjr%2BlTN1vO%2BbnXlD861tAMP9XD8%2BB7jcspvEJ8KSKgXNQjhQzNu3m2tyPe5AcuettjmjoSe08bA%3D%3D')">
            <div class="layer text-dark">水質控制</div></div>
          </router-link>
        </div>
        <div class="col-6 col-sm-3 animated-x">
          <router-link to="/product/水族用品">
            <div class="menu-item bg-cover text-center" v-cloak
            style="background-image:url('https://storage.googleapis.com/vue-course-api.appspot.com/happyaquarium%2F1618061010167.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=qCz1zqyljSaJiZVo%2B0WEX31fJaPNTZieIOP%2BKKONaVw%2BVi%2F5ayXt4lbxBWry2B7bQvF%2F5J3cLdRdL%2FPeJJNQrP%2FrLCUOWHKjkTAQoWR8OoaipNy3mJdHjJRKjtRnXlcwvwFhWNj%2FMd408YYCgmH0AQaO%2BrrkSGJ%2FfQO3HjPKT%2BJip%2FOfeT9CybsVXKdbyShuxyMkqdHEIrwQGE67XzVHWIWMY14CorbWneVN2LGrgDugRi839RIbuszuPpa4K%2BJoH%2BUwqgAoGDa0IawnEKkuzjzSnraIdxVOQtOqg1DO8uTL34RJblf2Fw5ViNOSmiI00Jb8szRRR103kvxdasOgiQ%3D%3D')">
            <div class="layer text-dark">水族用品</div>
            </div>
          </router-link>
        </div>
        <div class="col-6 col-sm-3 animated-x">
          <router-link to="/product/水草肥料">
            <div class="menu-item text-center bg-cover" v-cloak
            :style="{backgroundImage:'url('+require('@/assets/images/fertilizer.jpg')+')'}">
            <div class="layer text-dark">水草肥料</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  </div>
  <!--header-->
  <div class="container-fluid pt-header">
    <HeaderTitle :title='`新品到貨`' :icon='`fas fa-shipping-fast`' class="animated"/>
     <!---display-box component-->
    <CardGroup :product="newProduct" class="animated"/>
  </div>
  <!--carousel component-->
  <div class="container-fluid pt-header-m">
    <HeaderTitle :title='`熱門商品`' :icon='`fas fa-fire`' class="animated"/>
    <CardGroup :product="hotProduct" class="animated"/>
  </div>
  <div class="container-fluid pt-header-m">
    <HeaderTitle :title='`限時搶購`' :icon='`fas fa-clock`' class="animated"/>
    <CardGroup :product="discountProduct" class="animated"></CardGroup>
  </div>
</div>
</template>

<script>
import Carousel from '@/components/frontend/Carousel.vue'
import HeaderTitle from '@/components/frontend/HeaderTitle'
import CardGroup from '@/components/frontend/CardGroup'
import Loader from '@/components/Loader.vue'
import newProduct from '@/assets/json/new.json'
import hotProduct from '@/assets/json/hot.json'
import discountProduct from '@/assets/json/discount.json'
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  name: 'Index',
  components: {
    Carousel,
    HeaderTitle,
    CardGroup,
    Loader
  },
  data () {
    return {
      newProduct: newProduct,
      hotProduct: hotProduct,
      discountProduct: discountProduct
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
  }
}
</script>
