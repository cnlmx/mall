<template>
  <div class="bottom-bar">
    <!-- 全选 -->
    <div class="check-content">
      <check-button :is-checked="isSelectAll" @click.native="checkClick" />
      <span>全选 ({{ checkLength }})</span>
    </div>
    <!-- 总价格 -->
    <div class="total-price">
      {{ totalPrice }}
    </div>
    <!-- 结算 -->
    <div class="calculate right">
      <button @click="calcClick">结算</button>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return this.cartList
        .filter(item => item.checked)
        .reduce((pre, item) => {
          return pre + item.price * item.count
        }, 0)
        .toFixed(2)
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    /**
       * 全选按钮显示状态
       */
    isSelectAll () {
      // 默认状态下不选中
      if (!this.cartList.length) return false
      // 若存在一个商品没有选中，则全选按钮也不选中
      return !this.cartList.some(elem => elem.checked === false)
    }
  },
  methods: {
    /**
       * 全选按钮点击
       */
    checkClick () {
      if (this.isSelectAll) { // 商品已经全部选中时
        this.cartList.forEach(item => {
          item.checked = false
        })
      } else { // 商品部分选中时
        this.cartList.forEach(item => {
          item.checked = true
        })
      }
    },
    /**
     * 结算按钮
     */
    calcClick () {
      if (this.isSelectAll) {
        console.log('跳转')
      } else {
        this.$toast.show('请选择购买的商品')
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    align-items: center;
    background-color: #fff;
    line-height: 40px;
    font-size: 15px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 90px;
  }

  .check-content span {
    margin-left: 5px;
    width: 70px;
  }

  .total-price::before {
    content: '¥ ';
    font-size: 13px;
  }

  .total-price {
    margin-left: 105px;
    flex-grow: 1;
    font-size: 20px;
    font-weight: bold;

    color: var(--color-high-text);
  }

  .calculate {
    width: 80px;
  }

  .calculate button {
    background-color: var(--color-high-text);
    border: 1px solid transparent;
    padding: 4px 12px;
    color: #fff;
    border-radius: 16px;
    outline: none;
  }
</style>
