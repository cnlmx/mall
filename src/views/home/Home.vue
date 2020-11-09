<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pulling-up="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" />
      <!-- 推荐信息 -->
      <home-recommend-view :recommends="recommends" />
      <!-- 本周流行 -->
      <home-feature-view />
      <!-- 商品展示 -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tab-click="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 子组件
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView'

// 公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

// 方法
import { getHomeMultidata, getHomeGoods } from 'network/home.js'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  created () {
    // 1.请求轮播图和推荐信息数据
    this.getHMdata()

    // 2.请求商品数据
    this.getHGoods('pop')
    this.getHGoods('new')
    this.getHGoods('sell')
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick (index) {
      this.currentType = Object.keys(this.goods)[index]
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll (position) {
      this.isShowBackTop = -position.y > 1000
    },
    loadMore () {
      this.getHGoods(this.currentType)
    },
    /**
     * 网络请求相关的方法
     */
    getHMdata () {
      getHomeMultidata().then(({ data }) => {
        this.banners = data.data.banner.list
        this.recommends = data.data.recommend.list
      })
    },
    getHGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(({ data }) => {
        this.goods[type].list.push(...data.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    position: relative;
    padding-top: 44px;
    height: 100vh;
  }

  .home-nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 7;
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 7;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
