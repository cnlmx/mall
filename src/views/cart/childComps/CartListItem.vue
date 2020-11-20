<template>
  <div id="shop-item">
    <!-- 选择按钮和店铺名 -->
    <div class="info-top">
      <div class="item-selector">
        <check-button :isChecked="itemInfo.checked" @click.native="checkClick" />
      </div>
      <span class="item-shopName">{{ itemInfo.shopName }}</span>
    </div>
    <!-- 商品信息 -->
    <div class="goods-info">
      <!-- 选择按钮 -->
      <div class="item-selector"><check-button :isChecked="itemInfo.checked" @click.native="checkClick" /></div>
      <!-- 商品图片 -->
      <img class="img-item" :src="itemInfo.img" alt="" />
      <div class="info-right">
        <!-- 商品名称 -->
        <div class="item-title">{{ itemInfo.title.slice(0, 23) + '...' }}</div>
        <!-- 商品说明 -->
        <span class="item-desc">付款后最晚于3日内发货</span>
        <!-- 商品价格 -->
        <div class="item-price left">{{ itemInfo.price }}</div>
        <!-- 商品数量 -->
        <div class="item-count right">
          <button>-</button>
          <span>{{ itemInfo.count }}</span>
          <button>+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: 'CartListItem',
  props: {
    itemInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick () {
      this.$store.dispatch('checkButton', this.itemInfo)
    }
  }
}
</script>

<style scoped>
  #shop-item {
    height: 220px;
    padding: 5px;
    margin:2px 2px 0px;
    border: 5px solid #cfdcf3;
    border-radius: 10px;
    background-color: #fff;
  }

  .info-top {
    display: flex;
    margin-top: 8px;
  }

  .info-top .item-selector {
    margin-top: 1px;
  }

  .info-top .item-shopName {
    font-size: 17px;
    font-weight: bold;
    color: #333;
    margin-left: 4px;
  }

  .goods-info {
    display: flex;
    align-items: center;
  }

  .item-title {
    font-size: 17px;
    line-height: 17px;
    height: 34px;
    font-weight: bold;
  }

  .img-item {
    margin: 5px;
    display: block;
    width: 75px;
    height: 110px;
    border-radius: 5px;
  }

  .info-right {
    position: relative;
    top: 18px;
    font-size: 17px;
    color: #333;
    overflow: hidden;
    padding: 5px;
    height: 150px;
  }

  .info-right .item-desc {
    display: inline-block;
    font-size: 12px;
    padding: 2px;
    border-radius: 3px;
    color: var(--color-high-text);
    margin-top: 30px;
    margin-right: 80px;
    background-color: #cfdcf3;
  }

  .info-right .item-price {
    font-size: 20px;
    color: var(--color-high-text);
    font-weight: bold;
    margin-top: 30px;
  }

  .item-price::before {
    content: '¥ ';
    font-size: 13px;
  }

  .item-count {
    margin-right: 10px;
    background-color: #f3f5f7;
    border-radius: 15px;
    overflow: hidden;
    width: 80px;
    height: 30px;
    line-height: 30px;
    font-size: 17px;
    margin-top: 26px;
  }

  .item-count button {
    width: 25px;
    height: 30px;
    background-color: transparent;
    border: 1px solid transparent;
    outline: none;
    color: #a2b5d4;
  }

  .item-count span {
    padding: 10px;
  }
</style>
