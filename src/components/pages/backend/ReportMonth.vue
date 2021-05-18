<template>
<div class="pt-5">
  <loading :active.sync="isLoading" >
   <Loader/>
  </loading>
  <h2 class="mt-4 manage-header">本月訂單一覽<i class="fas fa-calendar-alt ms-2"></i></h2>
  <div class="table-responsive">
    <table class="table table-striped table-sm mt-4 text-third">
      <thead>
        <th width="60">訂購日期</th>
        <th width="120">訂購商品</th>
        <th width="80">金額</th>
        <th width="60">狀態</th>
        <th width="60">詳細內容</th>
      </thead>
      <tbody>
        <tr v-for="item in MonthOrders" :key="item.id">
          <td>{{ TransformDate(item.create_at) }}</td>
          <td>
            <ul class="list-unstyled mb-0">
              <li v-for="product in item.products" :key="product.id">
              {{ product.product.title }} × {{ product.qty }}
              </li>
            </ul>
          </td>
          <td >{{ item.total | currency }}</td>
          <td ><span class="text-success" v-if="item.is_paid">已付款</span>
            <span class="text-danger" v-else>未付款</span></td>
          <td>
            <button class="btn btn-outline-third btn-sm" @click="OpenModal(item)">檢視</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="MonthOrders.length===0&&!isLoading">
      <h3 class="text-center">本月尚無訂單</h3>
    </div>
    <!--本月訂單Modal---->
    <div class="modal fade"  id="MonthOrderModal" tabindex="-1"  aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-abstract bg-gradient text-white">
            <h5 class="modal-title">檢視訂單<i class="fas fa-check-square ms-2"></i></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6 py-2 mb-2">
                <label for="datetime" class="manage-header"><strong>購買日期</strong></label>
                <p class="manage-text mb-0"> {{ TransformDate(currentOrder.create_at) }}</p>
              </div>
              <div class="col-md-6 py-2">
                <label for="orderNo" class="manage-header"><strong>訂單編號</strong></label>
                <p class="manage-text mb-0">{{ currentOrder.id }}</p>
              </div>
            </div>
            <div class="row  bg-light">
              <div class="col-md-6 py-2">
                <label for="total" class="manage-header"><strong>金額</strong></label>
                <p class="manage-text mb-0"> {{ currentOrder.total | currency }}</p>
              </div>
              <div class="col-md-6 py-2">
                <label for="isPaid" class="manage-header"><strong>狀態</strong></label>
                <p class="manage-text mb-0"> {{ currentOrder.is_paid?'已付款':'未付款' }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 py-2">
                <label class="manage-header "><strong>購物清單</strong></label>
                <ul class="manage-text mb-0 list-point-inset">
                  <li v-for="product in currentOrder.products" :key="product.id">{{ product.product.title }}
                    ×{{ product.qty }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="row  bg-light">
              <div class="col-md-6 py-2">
                <label for="name" class="manage-header"><strong>購買者</strong></label>
                <p class="manage-text mb-0"> {{ currentOrder.user.name }}</p>
              </div>
              <div class="col-md-6 py-2">
                <label for="email" class="manage-header"><strong>email</strong></label>
                <p class="manage-text mb-0"> {{ currentOrder.user.email }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 py-2">
                <label for="tel" class="manage-header"><strong>電話</strong></label>
                <p class="manage-text mb-0"> {{ currentOrder.user.tel }}</p>
              </div>
              <div class="col-md-6 py-2">
                <label for="address" class="manage-header"><strong>地址</strong></label>
                <p class="manage-text mb-0"> {{ currentOrder.user.address }}</p>
              </div>
            </div>
            <div class="row bg-light">
              <div class="col-md-12 py-2">
                <label class="manage-header"><strong>留言</strong></label>
                <p class="manage-text mb-0"> {{ currentOrder.user.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { Modal } from 'bootstrap'
import Loader from '@/components/Loader.vue'

export default {
  name: 'ReporMonth',
  components: {
    Loader
  },
  data () {
    return {
      MonthOrders: [],
      currentOrder: {
        user: {}
      },
      ViewModal: null
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  methods: {
    getMonthOrders () {
      const vm = this
      const page = 0
      let totalPage = 1
      let items = []
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${page}`
      vm.$store.dispatch('updatedLoading', true)
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          items = res.data.orders
          totalPage = res.data.pagination.total_pages
          let counter = 1
          for (let i = 2; i < totalPage + 1; i++) {
            const apiurl = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${i}`
            vm.$http.get(apiurl).then((res) => {
              if (res.data.success) {
                items = [...items, ...res.data.orders]
                counter = counter + 1
              } else {
                vm.$store.dispatch('updateMessage', {
                  message: res.data.message,
                  status: 'danger'
                })
              }
              vm.$store.dispatch('updatedLoading', false)
            }).then(() => {
              if (counter === totalPage) {
                const fromDate = moment().startOf('month')
                const toDate = moment().endOf('month')
                vm.MonthOrders = items.filter((item) => {
                  return moment(item.create_at * 1000).isBetween(fromDate, toDate)
                })
              }
            }).catch((err) => {
              vm.$store.dispatch('updateMessage', {
                message: err,
                status: 'danger'
              })
            })
          }
        } else {
          vm.$store.dispatch('updateMessage', {
            message: res.data.message,
            status: 'danger'
          })
        }
      }).catch((err) => {
        vm.$store.dispatch('updateMessage', {
          message: err,
          status: 'danger'
        })
      })
    },
    TransformDate (timestamp) {
      const date = new Date(timestamp * 1000)
      return `${date.getFullYear()}/${date.getMonth() + 1}/
      ${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    },
    OpenModal (item) {
      this.currentOrder = { ...item }
      this.ViewModal.show()
    }
  },
  created () {
    this.getMonthOrders()
  },
  mounted () {
    this.ViewModal = new Modal(document.getElementById('MonthOrderModal'))
  }
}
</script>
