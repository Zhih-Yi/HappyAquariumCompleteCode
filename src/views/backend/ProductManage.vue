<template>
  <div class="pt-5">
    <loading :active.sync="isLoading" >
      <LoaderAnimation/>
    </loading>
    <h2 class="mt-4 manage-header">
      商品管理<i class="fas fa-shopping-cart ms-2"></i>
    </h2>
    <div class="text-end py-3">
      <button type="button" class="btn btn-primary text-white" data-toggle="modal"
      @click="openModal(true)">
      建立新產品<i class="fas fa-plus ms-2"></i></button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm mt-4 text-third">
        <thead class="border-bottom-2">
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="60">原價</th>
          <th width="60">售價</th>
          <th width="120">是否啟用</th>
          <th width="120">編輯</th>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id" v-cloak>
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-right">{{ item.origin_price | currency }}</td>
            <td class="text-right">{{ item.price | currency }}</td>
            <td>
              <span v-if="item.is_enabled">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button type="button" class="btn btn-outline-third btn-sm"
              @click="openModal(false,item)">編輯</button>
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click="openModalDelete(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="products.length===0&&!isLoading">
        <h3 class="text-center">請新增產品</h3>
      </div>
    </div>
    <Pagination :pagination="pagination" @getData="getProducts"/>
    <!---刪除Modal---->
    <div class="modal fade" id="delProductModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger bg-gradient">
            <h5 class="modal-title text-white" >
              刪除商品<i class="fas fa-trash-alt ms-2"></i>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ currentProduct.title }}</strong>?<br> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-third" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <!--新增Modal---->
    <ValidationObserver v-slot="{ invalid }">
      <div class="modal fade"  id="AddNewModal" tabindex="-1"  aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header bg-abstract text-white bg-gradient">
              <h5 class="modal-title">
                {{ modaltitle }}<i class="ms-2 fas fa-pencil-alt" ></i>
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row g-3">
                <div class="col-12">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="title"><span class="text-danger">*</span>標題</label>
                    <input type="text" name="標題" id="title" v-model="currentProduct.title"
                    placeholder="請輸入標題" class="form-control" :class="classes">
                    <span class="invalid-feedback" >{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="col-md-6">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <label for="category"><span class="text-danger">*</span>分類</label>
                    <select name="分類" id="category" v-model="currentProduct.category"
                    class="form-select" :class="classes">
                      <option value="水草">水草</option>
                      <option value="觀賞魚">觀賞魚</option>
                      <option value="觀賞蝦">觀賞蝦</option>
                      <option value="觀賞螺">觀賞螺</option>
                      <option value="飼料">飼料</option>
                      <option value="水質控制">水質控制</option>
                      <option value="水族用品">水族用品</option>
                      <option value="水草肥料">水草肥料</option>
                    </select>
                  <span class="invalid-feedback" >{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="unit"><span class="text-danger">*</span>單位</label>
                  <input type="text" name="單位" id="unit" v-model="currentProduct.unit"
                  placeholder="請輸入單位" class="form-control" :class="classes">
                  <span class="invalid-feedback" >{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="origin_price"><span class="text-danger">*</span>原價</label>
                  <input type="number" name="原價" id="origin_price" v-model="currentProduct.origin_price"
                  placeholder="請輸入原價" class="form-control" :class="classes">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="price"><span class="text-danger">*</span>售價</label>
                  <input type="number" name="售價" id="price" v-model="currentProduct.price"
                  placeholder="請輸入售價" class="form-control" :class="classes">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-12">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="image">
                    <span class="text-danger">*</span>輸入圖片網址
                  </label>
                  <input type="text" name="圖片" id="image" v-model="currentProduct.imageUrl"
                  placeholder="請輸入圖片連結或上傳圖片" class="form-control" :class="classes">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <label for="customFile">或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="status.fileuploading"></i>
                </label>
                <input type="file" id="customFile" class="form-control" @change="uploadImage"
                ref="files">
                <img class="product-img" :src="currentProduct.imageUrl">
              </div>
              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="description">
                    <span class="text-danger">*</span>產品描述
                  </label>
                  <textarea name="產品描述" id="description" rows="9" v-model="currentProduct.description"
                  placeholder="請輸入產品描述" class="form-control" :class="classes"></textarea>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-12">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="content">
                    <span class="text-danger">*</span>說明內容
                  </label>
                  <textarea name="說明內容" id="content" rows="10" v-model="currentProduct.content"
                  placeholder="請輸入產品說明內容" class="form-control" :class="classes"></textarea>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="is_enabled"
                  v-model="currentProduct.is_enabled" :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled">
                  是否啟用
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-third" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-abstract text-white" :disabled="invalid"  @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
  </ValidationObserver>
  <!--修改Modal-->
  <ValidationObserver v-slot="{ invalid }">
    <div class="modal fade" id="UpdateModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-abstract text-white bg-gradient">
            <h5 class="modal-title" >
              {{ modaltitle }}<i class="ms-2 fas fa-pencil-alt" ></i>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="row g-3">
              <div class="col-12">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="title">
                    <span class="text-danger">*</span>標題
                  </label>
                  <input type="text" name="標題" id="title" v-model="currentProduct.title"
                  placeholder="請輸入標題" class="form-control" :class="classes">
                  <span class="invalid-feedback" >{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="category">
                    <span class="text-danger">*</span>分類
                  </label>
                  <select name="分類" id="category" v-model="currentProduct.category"
                  class="form-select" :class="classes">
                    <option value="水草">水草</option>
                    <option value="觀賞魚">觀賞魚</option>
                    <option value="觀賞蝦">觀賞蝦</option>
                    <option value="觀賞螺">觀賞螺</option>
                    <option value="飼料">飼料</option>
                    <option value="水質控制">水質控制</option>
                    <option value="水族用品">水族用品</option>
                    <option value="水草肥料">水草肥料</option>
                  </select>
                  <span class="invalid-feedback" >{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="unit"><span class="text-danger">*</span>單位</label>
                  <input type="text" name="單位" id="unit" v-model="currentProduct.unit"
                  placeholder="請輸入單位" class="form-control" :class="classes">
                  <span class="invalid-feedback" >{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="origin_price"><span class="text-danger">*</span>原價</label>
                  <input type="number" name="原價" id="origin_price" v-model="currentProduct.origin_price"
                  placeholder="請輸入原價" class="form-control" :class="classes">
                  <span class="invalid-feedback" >{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="price"><span class="text-danger">*</span>售價</label>
                  <input type="number" name="售價" id="price" v-model="currentProduct.price"
                  placeholder="請輸入售價" class="form-control" :class="classes">
                  <span class="invalid-feedback" >{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-12">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="image"><span class="text-danger">*</span>輸入圖片網址</label>
                  <input type="text" name="圖片" id="image" v-model="currentProduct.imageUrl"
                  placeholder="請輸入圖片連結或上傳圖片" class="form-control" :class="classes">
                  <span class="invalid-feedback" >{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-md-6">
                <label for="customFile">或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="status.fileuploading"></i>
                </label>
                <input type="file" id="customFile" class="form-control" @change="uploadImage" ref="files">
                <img class="product-img" :src="currentProduct.imageUrl">
              </div>
              <div class="col-md-6">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="description"><span class="text-danger">*</span>產品描述</label>
                  <textarea name="產品描述" id="description" rows="9" v-model="currentProduct.description"
                  placeholder="請輸入產品描述" class="form-control" :class="classes"></textarea>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="col-12">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <label for="content"><span class="text-danger">*</span>說明內容</label>
                  <textarea name="說明內容" id="content" rows="10" v-model="currentProduct.content"
                  placeholder="請輸入產品說明內容" class="form-control" :class="classes"></textarea>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="is_enabled" v-model="currentProduct.is_enabled"
                  :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-third" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-abstract text-white" :disabled="invalid" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
  </ValidationObserver>
</div>
</template>

<script>
import Pagination from '@/components/backend/PaginationManage.vue'
import LoaderAnimation from '@/components/LoaderAnimation.vue'
import { mapGetters } from 'vuex'
import { Modal } from 'bootstrap'

export default {
  name: 'ProductManage',
  data () {
    return {
      products: [],
      currentProduct: {},
      isNew: false,
      pagination: {},
      status: {
        fileuploading: false
      },
      modaltitle: '',
      modalDelete: null,
      modalUpdate: null,
      modalAdd: null
    }
  },
  components: {
    Pagination,
    LoaderAnimation
  },
  methods: {
    openModal (isNew, item) {
      if (isNew) {
        this.currentProduct = {}
        this.currentProduct.category = '水草'
        this.isNew = true
        this.modaltitle = '新增商品'
        this.modalAdd.show()
      } else {
        this.currentProduct = { ...item }
        this.isNew = false
        this.modaltitle = '編輯商品'
        this.modalUpdate.show()
      }
    },
    openModalDelete (item) {
      this.currentProduct = { ...item }
      this.modalDelete.show()
    },
    getProducts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/products?page=${page}`
      vm.$store.dispatch('updatedLoading', true)
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.products = res.data.products
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
    deleteProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/product/${this.currentProduct.id}`
      vm.$store.dispatch('updatedLoading', true)
      vm.$http.delete(api).then((res) => {
        if (res.data.success) {
          vm.modalDelete.hide()
          vm.getProducts()
        } else {
          vm.modalDelete.hide()
          vm.getProducts()
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
    uploadImage () {
      const vm = this
      const uploadedfile = this.$refs.files.files[0]
      vm.status.fileuploading = true
      const formdata = new FormData()
      formdata.append('file-to-upload', uploadedfile)
      const api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/upload`
      vm.$http.post(api, formdata, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
        if (res.data.success) {
          vm.$set(vm.currentProduct, 'imageUrl', res.data.imageUrl)
        } else {
          vm.$store.dispatch('updateMessage', {
            message: res.data.message,
            status: 'danger'
          })
        }
        vm.status.fileuploading = false
        document.getElementById('customFile').value = ''
      }).catch((err) => {
        vm.$store.dispatch('updateMessage', {
          message: err,
          status: 'danger'
        })
      })
    },
    updateProduct () {
      const vm = this
      let api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/product`
      let HttpMethod = 'post'
      vm.$store.dispatch('updatedLoading', true)
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIHOST}/api/${process.env.VUE_APP_APIPATH}/admin/product/${vm.currentProduct.id}`
        HttpMethod = 'put'
      }
      vm.$http[HttpMethod](api, { data: vm.currentProduct }).then((res) => {
        if (res.data.success) {
          vm.modalUpdate.hide()
          vm.modalAdd.hide()
          vm.getProducts()
        } else {
          vm.modalUpdate.hide()
          vm.modalAdd.hide()
          vm.getProducts()
          vm.$store.dispatch('updateMessage', {
            message: res.data.message,
            status: 'danger'
          })
        }
        vm.$store.dispatch('updatedLoading', true)
      }).catch((err) => {
        vm.$store.dispatch('updateMessage', {
          message: err,
          status: 'danger'
        })
      })
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'checkoutVisible'])
  },
  created () {
    this.getProducts()
    this.$store.dispatch('updateCheckoutBtn', true)
  },
  mounted () {
    this.modalDelete = new Modal(document.getElementById('delProductModal'))
    this.modalAdd = new Modal(document.getElementById('AddNewModal'))
    this.modalUpdate = new Modal(document.getElementById('UpdateModal'))
  }
}
</script>
