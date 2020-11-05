<template>
  <tab-bar>
      <tab-bar-item v-for="item of tabBarData" :key="item.index" :link="item.path" activeColor="tomato">
        <template #item-icon><img :src="item.img"></template>
        <template #item-icon-active><img :src="item.imgActive"></template>
        <template #item-text><div>{{item.text}}</div></template>
      </tab-bar-item>
  </tab-bar>
</template>

<script>

import TabBar from '../tabbar/TabBar'
import TabBarItem from '../tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  data () {
    return {
      tabBarData: [
        {
          path: '/home',
          img: require('assets/img/tabbar/home.svg'),
          imgActive: require('assets/img/tabbar/home_active_color.svg'),
          text: '首页'
        },
        {
          path: '/category',
          img: require('assets/img/tabbar/category.svg'),
          imgActive: require('assets/img/tabbar/category_active_color.svg'),
          text: '分类'
        },
        {
          path: '/cart',
          img: require('assets/img/tabbar/shopcart.svg'),
          imgActive: require('assets/img/tabbar/shopcart_active_color.svg'),
          text: '购物车'
        },
        {
          path: '/profile',
          img: require('assets/img/tabbar/profile.svg'),
          imgActive: require('assets/img/tabbar/profile_active_color.svg'),
          text: '我的'
        }
      ]
    }
  },
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>
