<template>
<div class="breadcrumb">
  <ul>
    <li v-for="(breadcrumb, idx) in breadcrumbList" :key="idx" @click="routeTo(idx)"
    :class="{'linked': !breadcrumb.link}">
    {{ breadcrumb.name }}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      breadcrumbList: []
    }
  },
  mounted () {
    this.updateBreadcrumbList()
  },
  watch: {
    '$route' () {
      this.updateList()
    }
  },
  methods: {
    routeTo (pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) {
        this.$router.push(this.breadcrumbList[pRouteTo].link)
      }
    },
    updateBreadcrumbList () {
      this.breadcrumbList = this.$route.meta.breadcrumb
    }
  }
}
</script>

<style scoped>
.breadcrumb{
    margin-bottom:12px;
}
ul{
    display: flex;
    list-style: none;
    padding: 0;
}
li{
    cursor: pointer;
    color: #7D7DFF;
    font-weight: 800;
}
li:last-child {
    cursor: default;
    font-weight: normal;
}
li:not(:last-child):after {
    content: "/";
    margin: 5px;
}
</style>
