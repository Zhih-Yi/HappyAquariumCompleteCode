<template>
  <div class="alert-message">
    <div class="alert fade show"  role="alert" :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
    <button type="button" class="btn-close" @click="removeMessage(i)" aria-label="Close"></button>
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
<style scope>
.alert-message {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
