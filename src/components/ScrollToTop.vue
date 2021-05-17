<template>
<div class="toTop text-primary" v-if="visble">
  <a href="#top"><i class="fas fa-chevron-circle-up fa-lg"></i></a>
</div>
</template>
<script>
export default {
  name: 'ScrollToTop',
  data () {
    return {
      visble: false
    }
  },
  methods: {
    handleScroll () {
      const scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
      if (scrollTop > 20) {
        this.visble = true
      } else {
        this.visble = false
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
