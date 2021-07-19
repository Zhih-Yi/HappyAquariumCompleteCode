<template>
<div class="pt-5">
  <loading :active.sync="isLoading" >
   <LoaderAnimation/>
  </loading>
  <h2 class="mt-4 manage-header">訂單管理<i class="fas fa-truck ms-2"></i></h2>
  <div class="table-responsive">
    <table class="table table-striped table-sm mt-4 text-third">
      <thead>
        <th width="120">購買時間</th>
        <th width="140">Email</th>
        <th class="140">購買內容</th>
        <th class="text-end pe-3" width="100">應付金額</th>
        <th width="100">狀態</th>
        <th width="100">檢視</th>
      </thead>
      <tbody>
        <tr v-for="item in Orders" :key="item.id">
          <td>{{ getCreatedDate(item) }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul class="ps-0">
              <li v-for="product in item.products" :key="product.id" class="list-inside">
              {{ product.product.title }} 數量{{ product.qty }}{{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-end pe-3">{{ item.total | currency }}</td>
          <td>
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span v-else class="text-danger">未付款</span>
          </td>
          <td>
            <button type="button" class="btn btn-outline-third" @click="OpenModal(item)">檢視</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="Orders.length === 0 && !isLoading">
      <h3 class="text-center">尚無訂單</h3>
    </div>
  </div>
  <Pagination :pagination="OrderPagination" @getData="getOrders"/>
  <!-- Modal -->
  <div class="modal fade" id="ViewModal" tabindex="-1" aria-labelledby="ViewModalabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-abstract text-white">
          <h5 class="modal-title" id="ViewModalLabel">
          檢視訂單<i class="fas fa-check-square ms-2"></i>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 py-2 mb-2">
              <label for="datetime" class="manage-header">
                <strong>購買日期</strong>
              </label>
              <p class="manage-text mb-0">{{ getCreatedDate(currentOrder) }}</p>
            </div>
            <div class="col-md-6 py-2">
              <label for="orderNo" class="manage-header">
                <strong>訂單編號</strong>
              </label>
              <p class="manage-text mb-0">{{ currentOrder.id }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 py-2 bg-light">
              <label for="total" class="manage-header">
                <strong>金額</strong>
              </label>
              <p class="manage-text mb-0">{{ currentOrder.total | currency }}</p>
            </div>
            <div class="col-md-6 py-2 bg-light">
              <label for="isPaid" class="manage-header">
                <strong>狀態</strong>
              </label>
              <p class="manage-text mb-0">{{ currentOrder.is_paid ? '已付款' : '未付款' }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 py-2">
              <label class="manage-header">
                <strong>購物清單</strong>
              </label>
              <ul class="manage-text mb-0 list-point-inset">
                <li v-for="product in currentOrder.products" :key="product.id">{{ product.product.title }}
                數量{{ product.qty }}{{ product.product.unit }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 py-2 bg-light">
              <label for="name" class="manage-header">
                <strong>購買者</strong>
              </label>
              <p class="manage-text mb-0">{{ currentOrder.user.name }}</p>
            </div>
            <div class="col-md-6 py-2 bg-light">
              <label for="email" class="manage-header"><strong>email</strong></label>
              <p class="manage-text mb-0"> {{ currentOrder.user.email }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 py-2">
              <label for="tel" class="manage-header">
                <strong>電話</strong>
              </label>
              <p class="manage-text mb-0">{{ currentOrder.user.tel }}</p>
            </div>
            <div class="col-md-6 py-2">
              <label for="address" class="manage-header">
                <strong>地址</strong>
              </label>
              <p class="manage-text mb-0">{{ currentOrder.user.address }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 py-2 bg-light">
              <label class="manage-header">
                <strong>留言</strong>
              </label>
              <p class="manage-text mb-0">{{ currentOrder.user.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Pagination from '@/components/backend/PaginationManage.vue'
import LoaderAnimation from '@/components/LoaderAnimation.vue'
import { mapGetters } from 'vuex'
import { Modal } from 'bootstrap'

export default {
  name: 'Order',
  components: {
    Pagination,
    LoaderAnimation
  },
  data () {
    return {
      currentOrder: {
        user: {}
      },
      viewModal: null
    }
  },
  methods: {
    getOrders (page = 1) {
      this.$store.dispatch('getOrder', page)
    },
    getCreatedDate (item) {
      const date = new Date(item.create_at * 1000)
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    },
    OpenModal (item) {
      this.currentOrder = { ...item }
      this.viewModal.show()
    }
  },
  created () {
    this.getOrders()
    this.$store.dispatch('updateCheckoutBtn', true)
  },
  mounted () {
    this.viewModal = new Modal(document.getElementById('ViewModal'))
  },
  computed: {
    ...mapGetters(['isLoading', 'Orders', 'OrderPagination', 'checkoutVisible'])
  }
}
</script>
