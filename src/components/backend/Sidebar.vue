<template>
<div class="col-md-4 col-lg-3 g-0 col-sm-6">
  <nav id="sidebarMenu" class="bg-gradient sidebar h-100" :class="{'open':open,'close':!open}">
    <div class="position-sticky">
      <ul class="nav flex-column">
        <li class="sidebar-heading h5 text-white">
          <i class="fas fa-pencil-alt me-2"></i>管理選單
        </li>
        <li class="nav-item">
          <router-link class="nav-link " to="/admin/dashboard">
            <i class="fas fa-home me-2"></i>首頁
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link " to="/admin/order">
            <i class="fas fa-truck  me-2"></i>訂單管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link " to="/admin/productManage">
            <i class="fas fa-shopping-cart me-2"></i>商品管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link " to="/admin/coupon">
            <i class="fas fa-tags me-2"></i> 優惠卷管理
          </router-link>
        </li>
      </ul>
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white">
        <span><i class="fas fa-piggy-bank me-2"></i>銷售報表</span>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link " to="/admin/reportDay">
            <i class="fas fa-sticky-note me-2"></i>本日
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link " to="/admin/reportWeek">
            <i class="fas fa-sticky-note me-2"></i>本周
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link " to="/admin/reportMonth">
            <i class="fas fa-sticky-note me-2"></i>本月
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</div>
</template>
<script>
export default {
  name: 'Sidebar',
  props: ['open'],
  methods: {
    closeMenu () {
      this.$emit('closeNav')
    }
  }
}
</script>
