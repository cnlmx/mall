<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <template #center>商城</template>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tab-click="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />

    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pulling-up="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiper-image-load="swiperImageLoad" />
      <!-- 推荐信息 -->
      <home-recommend-view :recommends="recommends" />
      <!-- 本周流行 -->
      <home-feature-view />
      <!-- 标签控制 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tab-click="tabClick"
        ref="tabControl2"
      />
      <!-- 商品展示 -->
      <goods-list :goodsList="showGoods" />
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

// 方法
import { getHomeMultidata, getHomeGoods } from 'network/home.js'
import { itemListenerMixin, backTopMixin } from 'common/mixin.js'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  /*
     * 监听 GoodListItem 中图片加载是否完成，并且增加防抖函数
     * BackTop 滚动回顶点
     */
  mixins: [itemListenerMixin, backTopMixin],
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
  // 活跃时: 回到之前记录的坐标，先重新计算一下高度
  activated () {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  // 失活时: 记录当前滚动停留的坐标
  deactivated () {
    // 1.保存 Y 值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听
    this.$bus.$off('item-img-load', this.itemImgListener)
  },
  methods: {
    /**
       * 事件监听相关的方法
       */
    tabClick (index) {
      // 获取当前点击的 index
      this.currentType = Object.keys(this.goods)[index]
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll (position) {
      // 1.判断 BackTop 是否显示
      this.isShowBackTop = -position.y > 1000

      // 2.决定 TabControl 是否吸顶（position: fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore () {
      this.getHGoods(this.currentType)
    },
    swiperImageLoad () {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
       * 网络请求相关的方法
       */
    getHMdata () {
      getHomeMultidata().then(({ data: { data } }) => {
        this.banners = data.banner.list
        this.recommends = data.recommend.list
      })
    },
    getHGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(({ data }) => {
        this.goods[type].list.push(...data.data.list)
        this.goods[type].page += 1

        // better-scroll 使用该方法触发多次上拉加载事件
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 7; */
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }

  .tab-control {
    position: relative;
    z-index: 7;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
