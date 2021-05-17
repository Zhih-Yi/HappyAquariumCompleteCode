<template>
<div class="my-favorite">
  <i class="fas fa-heart fa-lg text-alert" v-if="favoriteItem===productID" :id="productID" @click.prevent="removeFavorite"></i>
  <i class="far fa-heart fa-lg text-white" :id="productID" v-else  @click.prevent="addFavorite"></i>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MyFavorite',
  data () {
    return {
      favoriteItem: ''
    }
  },
  props: ['productID'],
  computed: {
    ...mapGetters(['favoritelist'])
  },
  methods: {
    getFavoriteItem () {
      const tmpFavorite = JSON.parse(localStorage.getItem('favorite')) || []
      const tmpitem = tmpFavorite.find((item) => {
        return item === this.productID
      })
      if (tmpitem) {
        this.favoriteItem = tmpitem
      }
    },
    getFavorite () {
      this.$store.dispatch('getFavorite')
      this.getFavoriteItem()
    },
    addFavorite () {
      this.$store.dispatch('AddFavorite', this.productID)
      this.getFavoriteItem()
    },
    removeFavorite () {
      this.$store.dispatch('removeFavorite', this.productID)
      this.favoriteItem = ''
    }
  },
  created () {
    this.getFavorite()
  }
}
</script>
