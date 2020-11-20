<template>
  <div class="bottom-bar">
    <!-- 左侧 -->
    <div class="bar-item bar-left">
      <!-- 店铺 -->
      <div>
        <i class="icon shop"></i>
        <p class="text">店铺</p>
      </div>
      <!-- 客服 -->
      <div>
        <i class="icon service"></i>
        <p class="text">客服</p>
      </div>
      <!-- 收藏 -->
      <div>
        <i class="icon select"></i>
        <p class="text">收藏</p>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart () {
      this.$emit('add-cart')
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 49px;
    line-height: 49px;
    background-color: #fff;
    text-align: center;
  }

  .bar-item {
    display: flex;
    flex-grow: 1;
  }

  .bar-item > div {
    flex-grow: 1;
  }

  .bar-left .text {
    margin-top: 5px;
    font-size: 12px;
    line-height: 12px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
    background-image: url("~assets/img/detail/detail_bottom.svg");
    background-size: 130%;
    background-position: 0 1px;
  }

  .bar-left .shop {
    background-position: 0 -81px;
  }

  .bar-left .service {
    background-position: 0 -44px;
  }

  .bar-right {
    font-weight: bold;
    text-align: center;
    font-size: 16px;

  }

  .bar-right .cart {
    background-color: #cfdcf3;
    color: #334f7e;

  }

  .bar-right .buy {
    background-color: var(--color-high-text);
    color: #fff;
  }
</style>
