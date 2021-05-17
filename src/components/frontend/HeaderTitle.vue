<template>
<div>
  <h2 class="text-center text-third"><strong>{{ title }}</strong>
    <i class="ms-3" :class="icon"></i>
  </h2>
  <div class="header-line"></div>
</div>
</template>
<script>
export default {
  name: 'HeaderTitle',
  props: ['title', 'icon']
}
</script>
