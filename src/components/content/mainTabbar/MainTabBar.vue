<template>
  <tab-bar>
    <tab-bar-item link="/home">
      <template #item-icon><img src="~assets/img/tabbar/home.svg" alt=""></template>
      <template #item-icon-active><img src="~assets/img/tabbar/home_active.svg" alt=""></template>
      <template #item-text><div>首页</div></template>
    </tab-bar-item>

    <tab-bar-item link="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>

    <tab-bar-item link="/cart">
      <img slot="item-icon" src="@/assets/img/tabbar/shopcart.svg">
      <img slot="item-icon-active" src="@/assets/img/tabbar/shopcart_active.svg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>

    <tab-bar-item link="/profile">
      <img slot="item-icon" src="@/assets/img/tabbar/profile.svg">
      <img slot="item-icon-active" src="@/assets/img/tabbar/profile_active.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>

import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>
