<template>
<div class="row py-3  justify-content-center ">
  <div class="col-md-10">
    <div class="row g-0">
      <div class="col-md-6">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14454.69451790876!2d121.56160521985707!3d25.079048728054456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac6fedcd2e59%3A0x4ada3c932a4448b4!2zMTE05Y-w5YyX5biC5YWn5rmW5Y2A5YWn5rmW56eR5a245ZyS5Y2A!5e0!3m2!1szh-TW!2stw!4v1622525770633!5m2!1szh-TW!2stw" width="100%" height="350" style="border:0;" loading="lazy"></iframe>
      </div>
      <div class="col-md-6">
        <div class="contact-bg bg-secondary" :style="{'backgroundImage':`url(${require('@/assets/images/contact-bg.jpg')})`}">
          <div class="px-3 py-3">
            <ValidationObserver v-slot="{ invalid }" ref="observer">
              <form @submit.prevent="sendMessage">
                <ValidationProvider rules="required" v-slot="{ errors, classes }" class="form-floating">
                  <div class="form-floating">
                    <input type="text" class="form-control mb-3" v-model="name" id="Name" placeholder="姓名" :class="classes" name="姓名">
                    <label for="Name" v-if="errors.length === 0">姓名</label>
                    <label class="invalid-feedback" for="Name">{{ errors[0] }}</label>
                  </div>
                </ValidationProvider>
                <ValidationProvider rules="required|email" v-slot="{ errors, classes }">
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control mb-3" v-model="email" id="Email" placeholder="name@example.com" :class="classes" name="Email">
                    <label for="Email" v-if="errors.length === 0">電子信箱</label>
                    <label class="invalid-feedback" for="Email">{{ errors[0] }}</label>
                  </div>
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <div class="form-floating">
                    <textarea class="form-control mb-3" id="Msg" v-model="msg" placeholder="留言" style="height: 100px" :class="classes" name="訊息"></textarea>
                    <label for="Msg" v-if="errors.length === 0">留言</label>
                    <label class="invalid-feedback" for="Msg">{{ errors[0] }}</label>
                  </div>
                </ValidationProvider>
                <div class="text-end">
                  <button type="submit" class="btn btn-outline-third btn-hv-style" :disabled = "invalid">送出</button>
                </div>
              </form>
           </ValidationObserver>
          </div>
        </div>
      </div>
   </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'MapContact',
  data () {
    return {
      name: '',
      email: '',
      msg: ''
    }
  },
  methods: {
    sendMessage () {
      this.$emit('msgModal')
    }
  }
}
</script>
