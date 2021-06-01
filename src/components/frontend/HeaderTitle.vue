<template>
<div>
  <h2 class="text-center text-third">{{ title }}
    <i class="ms-3" :class="icon"></i>
  </h2>
</div>
</template>
<script>
export default {
  name: 'HeaderTitle',
  props: ['title', 'icon']
}
</script>
