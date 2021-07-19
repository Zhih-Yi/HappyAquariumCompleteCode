<template>
  <div class="pt-5 pb-3">
    <loading :active.sync="isLoading">
      <LoaderAnimation/>
    </loading>
    <div class="row py-4">
      <DisplayBox :count="filterToday.length" :title="'本日訂單'" :bg="'bg-secondary'" @showModal="openTodayModel"/>
      <DisplayBox :count="filterWeek.length" :title="'本周訂單'" :bg="'bg-warning'" @showModal="openWeekModel"/>
      <DisplayBox :count="filterMonth.length" :title="'本月訂單'" :bg="'bg-primary'" @showModal="openMonthModel"/>
    </div>
    <div class="row">
      <div class="d-flex justify-content-between">
        <h5 >訂單銷售一覽</h5>
        <select class="form-select form-select-sm time-select"
        aria-label="select" v-model="chartDataType">
          <option selected value="week">本周</option>
          <option value="year">年度</option>
        </select>
      </div>
      <div class="col-md-6 py-2">
        <canvas id="weekLineChart" class="bg-light" v-show="chartDataType === 'week'"></canvas>
        <canvas id="monthLineChart" class="bg-light" v-show="chartDataType === 'year'"></canvas>
      </div>
      <div class="col-md-6 py-2">
        <canvas id="weekSalesChart" class="bg-light" v-show="chartDataType === 'week'"></canvas>
        <canvas id="MonthSalesChart" class="bg-light" v-show="chartDataType === 'year'"></canvas>
      </div>
    </div>
    <div class="board row py-3">
      <div class="col-md-4">
        <div class="bg-lightgray infoCard-shadow m-3 p-3 text-center rounded">
          <h5>訂單總計</h5>
          <strong class="text-alert infoCard-title">{{ ordersAll.length }}</strong>
        </div>
      </div>
      <div class="col-md-4">
        <div class="bg-lightgray infoCard-shadow m-3 p-3 text-center rounded">
          <h5>年度銷售額</h5>
          <strong class="text-abstract infoCard-title">{{ profitYear | currency }}</strong>
        </div>
      </div>
      <div class="col-md-4">
        <div class="bg-lightgray infoCard-shadow m-3 p-3 text-center rounded">
          <h5>本周銷售額</h5>
          <strong class="text-use infoCard-title">{{ weekProfit | currency }}</strong>
        </div>
      </div>
    </div>
    <!-- Modal 訂單 -->
    <div class="modal fade" id="DisplayBoxModal" tabindex="-1" aria-labelledby="DisplayBoxModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header bg-abstract text-white">
            <h5 class="modal-title" id="DisplayBoxModalLabel">
              {{ ModalTitle }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table table-striped" v-if="currentFilterDay.length>0" >
              <thead>
                <tr>
                  <th>購買時間</th>
                  <th>購買內容</th>
                  <th>應付金額</th>
                  <th>狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in currentFilterDay" :key="item.id">
                  <td>{{ TrnasformDate(item.create_at) }}</td>
                  <td>
                    <ul class="pl-0">
                      <li v-for="product in item.products" :key="product.id">
                        {{ product.product.title }} {{ product.qty
                        }} {{ product.product.unit }}
                      </li>
                    </ul>
                  </td>
                  <td>{{ item.total | currency }}</td>
                  <td>
                    <span class="text-success" v-if="item.is_paid">已付款</span>
                    <span v-else class="text-danger">未付款</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else>尚無訂單</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayBox from '@/components/backend/DisplayBox.vue'
import LoaderAnimation from '@/components/LoaderAnimation.vue'
import { mapGetters } from 'vuex'
import { Modal } from 'bootstrap'
import moment from 'moment'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  name: 'DashboardIndex',
  data () {
    return {
      ordersAll: [],
      chartOrders: [],
      chartTotals: [],
      chartLabels: [],
      chartDataType: 'week',
      DisplayBoxModal: null,
      ModalTitle: '',
      currentFilterDay: [],
      profitYear: 0,
      weekProfit: 0,
      chart: null
    }
  },
  components: {
    DisplayBox,
    LoaderAnimation
  },
  computed: {
    ...mapGetters(['isLoading', 'checkoutVisible']),
    filterToday () {
      let items = []
      const today = new Date()
      const todayStr = `${today.getFullYear()}/${today.getMonth() +
        1}/${today.getDate()}`
      items = this.ordersAll.filter((item) => {
        const date = new Date(item.create_at * 1000)
        const dateStr = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`
        return todayStr === dateStr
      })
      return items
    },
    filterWeek () {
      let items = []
      const fromDate = moment().startOf('week')
      const toDate = moment().endOf('week')
      items = this.ordersAll.filter((item) => moment(item.create_at * 1000).isBetween(fromDate, toDate))
      return items
    },
    filterMonth () {
      let items = []
      const fromDate = moment().startOf('month')
      const toDate = moment().endOf('month')
      items = this.ordersAll.filter((item) => moment(item.create_at * 1000).isBetween(fromDate, toDate))
      return items
    }
  },
  methods: {
    TrnasformDate (timestamp) {
      const date = new Date(timestamp * 1000)
      const dateStr = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
      return dateStr
    },
    getOrderAll () {
      const vm = this
      const page = 0
      let totalPage = 1
      let items = []
      let counter = 1
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${page}`
      vm.$store.dispatch('updatedLoading', true)
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          items = res.data.orders
          totalPage = res.data.pagination.total_pages
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
                vm.ordersAll = items
                vm.getWeekOrder()
                vm.setMonthsChart()
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
    getWeekOrder () {
      const fromDate = moment().startOf('week')
      const toDate = moment().endOf('week')
      this.chartOrders = this.ordersAll.filter((item) => moment(item.create_at * 1000).isBetween(fromDate, toDate))
      this.setWeekChart()
    },
    setWeekChart () {
      const fromDate = moment().startOf('week')
      const toDate = moment().endOf('week')
      const day7 = moment(fromDate, ['YYYY/MM/DD'])
      const day1 = moment(fromDate).add(1, 'days').format('YYYY/MM/DD')
      const day2 = moment(fromDate).add(2, 'days').format('YYYY/MM/DD')
      const day3 = moment(fromDate).add(3, 'days').format('YYYY/MM/DD')
      const day4 = moment(fromDate).add(4, 'days').format('YYYY/MM/DD')
      const day5 = moment(fromDate).add(5, 'days').format('YYYY/MM/DD')
      const day6 = moment(toDate, ['YYYY/MM/DD'])

      const daylen7 = this.chartOrders.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM/DD')
        return date === day7
      })

      const daylen1 = this.chartOrders.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM/DD')
        return date === day1
      })

      const daylen2 = this.chartOrders.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM/DD')
        return date === day2
      })

      const daylen3 = this.chartOrders.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM/DD')
        return date === day3
      })

      const daylen4 = this.chartOrders.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM/DD')
        return date === day4
      })

      const daylen5 = this.chartOrders.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM/DD')
        return date === day5
      })

      const daylen6 = this.chartOrders.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM/DD')
        return date === day6
      })

      this.chartLabels = [
        '週日',
        '周一',
        '週二',
        '週三',
        '週四',
        '週五',
        '週六'
      ]

      this.chartTotals = [
        daylen7.length,
        daylen1.length,
        daylen2.length,
        daylen3.length,
        daylen4.length,
        daylen5.length,
        daylen6.length
      ]

      this.setChart(
        'weekLineChart',
        'bar',
        '銷售量',
        'rgba(69, 120, 252, 0.6)',
        'rgba(69, 120, 252, 0.7)'
      )
      // 銷售額
      let day7Sale = 0
      let day1Sale = 0
      let day2Sale = 0
      let day3Sale = 0
      let day4Sale = 0
      let day5Sale = 0
      let day6Sale = 0

      daylen7.forEach((item) => {
        day7Sale += item.total
      })

      daylen1.forEach((item) => {
        day1Sale += item.total
      })

      daylen2.forEach((item) => {
        day2Sale += item.total
      })

      daylen3.forEach((item) => {
        day3Sale += item.total
      })

      daylen4.forEach((item) => {
        day4Sale += item.total
      })

      daylen5.forEach((item) => {
        day5Sale += item.total
      })

      daylen6.forEach((item) => {
        day6Sale += item.total
      })

      this.weekProfit = day7Sale + day6Sale + day5Sale + day4Sale + day3Sale + day2Sale + day1Sale

      this.chartTotals = [
        day7Sale,
        day1Sale,
        day2Sale,
        day3Sale,
        day4Sale,
        day5Sale,
        day6Sale
      ]

      this.setChart(
        'weekSalesChart',
        'line',
        '銷售額',
        'rgba(63, 191, 127, 0.6)',
        'rgba(63, 191, 127, 0.7)'
      )
    },
    setMonthsChart () {
      const JanQty = this.ordersAll.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM')
        return date === `${moment().year()}/01`
      })

      const FebQty = this.ordersAll.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM')
        return date === `${moment().year()}/02`
      })

      const MarQty = this.ordersAll.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM')
        return date === `${moment().year()}/03`
      })

      const AprQty = this.ordersAll.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM')
        return date === `${moment().year()}/04`
      })

      const MayQty = this.ordersAll.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM')
        return date === `${moment().year()}/05`
      })

      const JunQty = this.ordersAll.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM')
        return date === `${moment().year()}/06`
      })

      const JulQty = this.ordersAll.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM')
        return date === `${moment().year()}/07`
      })

      const AugQty = this.ordersAll.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM')
        return date === `${moment().year()}/08`
      })

      const SepQty = this.ordersAll.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM')
        return date === `${moment().year()}/09`
      })

      const OctQty = this.ordersAll.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM')
        return date === `${moment().year()}/10`
      })

      const NovQty = this.ordersAll.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM')
        return date === `${moment().year()}/11`
      })

      const DecQty = this.ordersAll.filter((item) => {
        const date = moment(item.create_at * 1000).format('YYYY/MM')
        return date === `${moment().year()}/12`
      })

      this.chartLabels = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ]

      this.chartTotals = [
        JanQty.length,
        FebQty.length,
        MarQty.length,
        AprQty.length,
        MayQty.length,
        JunQty.length,
        JulQty.length,
        AugQty.length,
        SepQty.length,
        OctQty.length,
        NovQty.length,
        DecQty.length
      ]

      this.setChart(
        'monthLineChart',
        'bar',
        '銷售量',
        'rgba(247, 142, 38, 0.6)',
        'rgba(247, 142, 38, 0.7)'
      )

      let sale7 = 0
      let sale1 = 0
      let sale2 = 0
      let sale3 = 0
      let sale4 = 0
      let sale5 = 0
      let sale6 = 0
      let sale8 = 0
      let sale9 = 0
      let sale10 = 0
      let sale11 = 0
      let sale12 = 0

      JanQty.forEach((item) => {
        sale1 += item.total
      })

      FebQty.forEach((item) => {
        sale2 += item.total
      })

      MarQty.forEach((item) => {
        sale3 += item.total
      })

      AprQty.forEach((item) => {
        sale4 += item.total
      })

      MayQty.forEach((item) => {
        sale5 += item.total
      })

      JunQty.forEach((item) => {
        sale6 += item.total
      })

      JulQty.forEach((item) => {
        sale7 += item.total
      })

      AugQty.forEach((item) => {
        sale8 += item.total
      })

      SepQty.forEach((item) => {
        sale9 += item.total
      })

      OctQty.forEach((item) => {
        sale10 += item.total
      })

      NovQty.forEach((item) => {
        sale11 += item.total
      })

      DecQty.forEach((item) => {
        sale12 += item.total
      })

      this.profitYear = sale1 + sale2 + sale3 + sale4 + sale5 +
      sale6 + sale7 + sale8 + sale9 + sale10 + sale11 + sale12

      this.chartTotals = [
        sale1,
        sale2,
        sale3,
        sale4,
        sale5,
        sale6,
        sale7,
        sale8,
        sale9,
        sale10,
        sale11,
        sale12
      ]

      this.setChart(
        'MonthSalesChart',
        'line',
        '銷售額',
        'rgba(127, 63, 191, 0.6)',
        'rgba(127, 63, 191, 0.7)'
      )
    },
    setChart (chartName, type, title, bgColor, borderColor) {
    // set Chart
      const ctx = document.getElementById(chartName).getContext('2d')
      const config = {
        type: type,
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: title,
              backgroundColor: bgColor,
              borderColor: borderColor,
              data: this.chartTotals,
              fill: false
            }
          ]
        },
        options: {
          responsive: true
        }
      }
      this.chart = new Chart(ctx, config)
    },
    openTodayModel () {
      this.currentFilterDay = Array.from(this.filterToday)
      this.ModalTitle = '本日訂單'
      this.DisplayBoxModal.show()
    },
    openWeekModel () {
      this.currentFilterDay = Array.from(this.filterWeek)
      this.ModalTitle = '本周訂單'
      this.DisplayBoxModal.show()
    },
    openMonthModel () {
      this.currentFilterDay = Array.from(this.filterMonth)
      this.ModalTitle = '本月訂單'
      this.DisplayBoxModal.show()
    }
  },
  created () {
    this.getOrderAll()
    moment().format()
    this.$store.dispatch('updateCheckoutBtn', true)
  },
  mounted () {
    this.DisplayBoxModal = new Modal(
      document.getElementById('DisplayBoxModal')
    )
  }
}
</script>
