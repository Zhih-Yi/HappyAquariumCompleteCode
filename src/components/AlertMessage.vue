<template>
  <div class="alert-message">
    <div class="alert fade show" role="alert" :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      <span v-html="item.message"></span>
      <a class="ms-2" @click.prevent="removeMessage(i)" aria-label="Close">
        <i class="fas fa-times text-third"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AlertMessage',
  computed: {
    ...mapGetters(['messages'])
  },
  methods: {
    updateMessage (message, status) {
      this.$store.dispatch('updateMessage', { message, status })
    },
    removeMessage (num) {
      this.$store.dispatch('removeMessage', num)
    }
  }
}
</script>
<style scoped>
.alert-message {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
