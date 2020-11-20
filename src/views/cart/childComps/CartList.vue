<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="item of cartList"
        :key="item.id"
        :itemInfo="item"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  nama: 'CartList',
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    Scroll,
    CartListItem
  },
  activated () {
    this.$refs.scroll.refresh()
  },
  methods: {}
}
</script>

<style scoped>
  .content {
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
    background-color: #cfdcf3;
  }

</style>
