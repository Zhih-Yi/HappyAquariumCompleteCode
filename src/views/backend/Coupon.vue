<template>
  <div class="pt-5">
    <loading :active.sync="isLoading">
      <LoaderAnimation/>
    </loading>
    <h2 class="mt-4 manage-header">優惠卷管理<i class="fas fa-tags ms-2"></i></h2>
    <div class="text-end py-3">
      <button type="button" class="btn btn-primary text-white" data-toggle="modal" @click="openModal(true)">
       新增優惠卷<i class="fas fa-plus ms-2"></i></button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm mt-4 text-third">
        <thead>
          <th width="130">名稱</th>
          <th width="60">折扣百分比</th>
          <th width="120">到期日</th>
          <th width="60">是否啟用</th>
          <th width="80">編輯</th>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ TransformDate(item.due_date) }}</td>
            <td>
              <span v-if="item.is_enabled">啟用</span><span v-else>未啟用</span>
            </td>
            <td>
              <button type="button" class="btn btn-outline-third btn-sm" @click="openModal(false,item)">編輯</button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openModalDelete(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="coupons.length === 0 && !isLoading">
        <h3 class="text-center">請新增優惠卷</h3>
      </div>
    </div>
    <Pagination :pagination="pagination" @getData="getCoupons"/>
    <ValidationObserver v-slot="{ invalid }">
      <div class="modal fade" id="AddNewModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header bg-abstract bg-gradient text-white">
              <h5 class="modal-title">
                {{ modalTitle }}<i class="ms-2 fas fa-pencil-alt" ></i>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row g-3">
                <div class="col-12 mb-4">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="title">
                      <span class="text-danger">*</span>名稱
                    </label>
                    <input type="text" name="名稱" id="title" v-model="currentCuopon.title" placeholder="請輸入名稱" class="form-control" :class="classes">
                    <span class="invalid-feedback" >{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-6 mb-4">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="discountCode">
                      <span class="text-danger">*</span>優惠碼
                    </label>
                    <input type="text" name="優惠碼" id="discountCode" v-model="currentCuopon.code" placeholder="請輸入優惠碼" class="form-control" :class="classes">
                    <span class="invalid-feedback" >{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-6 mb-4">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="expireDay">
                      <span class="text-danger">*</span>到期日
                    </label>
                    <input type="date" name="到期日" id="expireDay" v-model="currentCuopon.due_date" placeholder="請輸入到期日" class="form-control" :class="classes">
                    <span class="invalid-feedback" >{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-6 mb-4">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="discountPercent"><span class="text-danger">*</span>折扣百分比</label>
                    <input type="number" name="折扣百分比" id="discountPercent" v-model="currentCuopon.percent" placeholder="請輸入折扣百分比" class="form-control" :class="classes">
                    <span class="invalid-feedback" >{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-6 mt-5">
                  <div class="form-check mb-4  ms-1">
                    <label class="form-check-label" for="is_enabled"> 是否啟用</label>
                    <input class="form-check-input" type="checkbox"
                    id="is_enabled" v-model="currentCuopon.is_enabled" :true-value="1" :false-value="0">
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-third" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-abstract text-white" :disabled="invalid" @click="updateCoupon">確認</button>
            </div>
          </div>
        </div>
      </div>
    </ValidationObserver>
    <ValidationObserver v-slot="{ invalid }">
      <div class="modal fade" id="UpdateModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header bg-abstract bg-gradient text-white">
              <h5 class="modal-title" >
                {{ modalTitle }}<i class="ms-2 fas fa-pencil-alt" ></i>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row g-3">
                <div class="col-12 mb-4">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="title"><span class="text-danger">*</span>名稱</label>
                    <input type="text" name="名稱" id="title" v-model="currentCuopon.title" placeholder="請輸入名稱" class="form-control" :class="classes">
                    <span class="invalid-feedback" >{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-6 mb-4">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="discountCode">
                      <span class="text-danger">*</span>優惠碼
                    </label>
                    <input type="text" name="優惠碼" id="discountCode" v-model="currentCuopon.code" placeholder="請輸入優惠碼" class="form-control" :class="classes">
                    <span class="invalid-feedback" >{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-6 mb-4">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="expireDay">
                      <span class="text-danger">*</span>到期日
                    </label>
                    <input type="date" name="到期日" id="expireDay" v-model="currentCuopon.due_date" placeholder="請輸入到期日" class="form-control" :class="classes">
                    <span class="invalid-feedback" >{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-6 mb-4">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="discountPercent">
                      <span class="text-danger">*</span>折扣百分比
                    </label>
                    <input type="number" name="折扣百分比" id="discountPercent" v-model="currentCuopon.percent" placeholder="請輸入折扣百分比" class="form-control" :class="classes">
                    <span class="invalid-feedback" >{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-6 mt-5">
                  <div class="form-check mb-4 ms-1">
                    <label class="form-check-label" for="is_enabled"> 是否啟用</label>
                    <input class="form-check-input" type="checkbox"
                    id="is_enabled" v-model="currentCuopon.is_enabled" :true-value="1" :false-value="0">
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-third" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-abstract text-white" :disabled="invalid" @click="updateCoupon">確認</button>
            </div>
          </div>
        </div>
      </div>
    </ValidationObserver>
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="delCouponModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger bg-gradient">
            <h5 class="modal-title text-white" id="delCouponModallLabel">
              刪除優惠卷<i class="fas fa-trash-alt ms-2"></i>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ currentCuopon.title }}</strong> 優惠卷(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-third" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">確認刪除</button>
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
  name: 'Coupon',
  data () {
    return {
      coupons: [],
      currentCuopon: {},
      pagination: {},
      isNew: false,
      modalTitle: '',
      modalUpdate: null,
      modalDelete: null,
      modalAdd: null
    }
  },
  components: {
    Pagination,
    LoaderAnimation
  },
  methods: {
    getCoupons (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/coupons?page=${page}`
      vm.$store.dispatch('updatedLoading', true)
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.coupons = res.data.coupons
          vm.pagination = res.data.pagination
        } else {
          vm.$store.dispatch('updateMessage', {
            message: res.data.message,
            status: 'danger'
          })
        }
        vm.$store.dispatch('updatedLoading', false)
      }).catch((err) => {
        vm.$store.dispatch('updateMessage', {
          message: err,
          status: 'danger'
        })
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.currentCuopon = {}
        this.isNew = true
        this.modalTitle = '新增優惠卷'
        this.modalAdd.show()
      } else {
        this.currentCuopon = { ...item }
        this.isNew = false
        this.modalTitle = '修改優惠卷'
        this.modalUpdate.show()
      }
    },
    openModalDelete (item) {
      this.currentCuopon = { ...item }
      this.modalDelete.show()
    },
    updateCoupon () {
      const vm = this
      let api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/coupon`
      let HttpMethod = 'post'
      vm.$store.dispatch('updatedLoading', true)
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/coupon/${vm.currentCuopon.id}`
        HttpMethod = 'put'
      }
      vm.$http[HttpMethod](api, { data: vm.currentCuopon }).then((res) => {
        if (!res.data.success) {
          vm.$store.dispatch('updateMessage', {
            message: res.data.message,
            status: 'danger'
          })
        }
        vm.getCoupons()
        vm.modalUpdate.hide()
        vm.modalAdd.hide()
        vm.$store.dispatch('updatedLoading', false)
      }).catch((err) => {
        vm.$store.dispatch('updateMessage', {
          message: err,
          status: 'danger'
        })
      })
    },
    deleteCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/coupon/${this.currentCuopon.id}`
      vm.$store.dispatch('updatedLoading', true)
      vm.$http.delete(api).then((res) => {
        if (!res.data.success) {
          vm.$store.dispatch('updateMessage', {
            message: res.data.message,
            status: 'danger'
          })
        }
        vm.modalDelete.hide()
        vm.getCoupons()
        vm.$store.dispatch('updatedLoading', false)
      }).catch((err) => {
        vm.$store.dispatch('updateMessage', {
          message: err,
          status: 'danger'
        })
      })
    },
    TransformDate (date) {
      return date.replace('-', '/').replace('-', '/')
    }
  },
  created () {
    this.getCoupons()
    this.$store.dispatch('updateCheckoutBtn', true)
  },
  mounted () {
    this.modalDelete = new Modal(document.getElementById('delCouponModal'))
    this.modalAdd = new Modal(document.getElementById('AddNewModal'))
    this.modalUpdate = new Modal(document.getElementById('UpdateModal'))
  },
  computed: {
    ...mapGetters(['isLoading', 'checkoutVisible'])
  }
}
</script>
