<template>
  <ul class="flow list-unstyled d-flex justify-content-around py-3">
    <li :class="{'active':step===1}">確認訂單</li>
    <li :class="{'active':step===2}">結帳付款</li>
  </ul>
</template>

<script>
export default {
  name: 'CheckoutFlow',
  props: ['step']
}
</script>
