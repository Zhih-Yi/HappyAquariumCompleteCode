<template>
  <div class="col-md-4 col-sm-4 mb-3">
    <a href="#" @click.prevent="showModalDialog">
      <div class="text-center py-2 rounded text-dark bg-gradient display-box" :class="bg">
        <h5 class="display-7">{{ title }}</h5>
        <p class="display-6 mb-0">{{ count }}</p>
        <small>查看訂單<i class="far fa-hand-point-right ms-2"></i></small>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'DisplayBox',
  props: ['bg', 'title', 'count'],
  methods: {
    showModalDialog () {
      this.$emit('showModal')
    }
  }
}
</script>
