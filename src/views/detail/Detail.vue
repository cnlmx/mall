<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar @title-click="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 商品基本信息 -->
      <detail-base-info :goods="goodsInfo" />
      <!-- 店铺基本信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品详情 -->
      <detail-image-info
        :detailInfo="detailInfo"
        @detail-image-load="detailImageLoad"
      />
      <!-- 参数 -->
      <detail-param-info ref="param" :paramInfo="itemParams" />
      <!-- 评论 -->
      <detail-comment-info ref="comment" :comment="commentInfo" />
      <!-- 推荐 -->
      <goods-list ref="recommend" :goodsList="recommends" />
    </scroll>
    <!-- 底部导航栏 -->
    <detail-bottom-bar @add-cart="addToCart" />
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailImageInfo from './childComps/DetailImageInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {
  getDetail,
  getRecommend,
  GoodsInfo,
  Shop,
  GoodsParam
} from 'network/detail.js'
import { itemListenerMixin, backTopMixin } from 'common/mixin.js'
import { debounce } from 'common/utils.js'
import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
    // Toast
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  /*
     * 监听 GoodListItem 中图片加载是否完成，并且增加防抖函数
     * BackTop 滚动回顶点
     */
  mixins: [itemListenerMixin, backTopMixin],
  created () {
    // 1.保存传入的 iid
    this.iid = this.$route.params.iid

    // 2.根据 iid 请求详情数据
    getDetail(this.iid).then(({ data: { result } }) => {
      // 1.获取轮播图数据
      this.topImages = result.itemInfo.topImages

      // 2.获取商品信息
      this.goodsInfo = new GoodsInfo(
        result.itemInfo,
        result.columns,
        result.shopInfo.services
      )

      // 3.获取店铺信息
      this.shop = new Shop(result.shopInfo)

      // 4.获取详情图片
      this.detailInfo = result.detailInfo

      // 5.获取参数
      this.itemParams = new GoodsParam(
        result.itemParams.info,
        result.itemParams.rule
      )

      // 6.获取评论
      if (result.rate.cRate !== 0) {
        this.commentInfo = result.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then(({ data: { data } }) => {
      this.recommends = data.list
    })

    // 4.给 getThemeTopY 进行防抖函数赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      // 参数的 offsetTop
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
      // 评论的 offsetTop
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      // 推荐的 offsetTop
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      // 增加一个超大值，用于简化滚动范围判断
      this.themeTopYs.push(Number.MAX_VALUE)
    })
  },
  mounted () {},
  updated () {},
  destroyed () {
    // 取消全局事件的监听（推荐信息中的图片）
    this.$bus.$off('item-img-load', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    detailImageLoad () {
      // mixin 中的数据，详情图防抖
      this.newRefresh()
      // 调用函数，offestTop 防抖
      this.getThemeTopY()
    },
    // 监听标题点击
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },
    // 获取滚动的坐标值并和主题中值进行对比
    contentScroll (position) {
      const positionY = -position.y
      const len = this.themeTopYs.length - 1
      for (let i = 0; i < len; i++) {
        if (
          this.currentIndex !== i &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 判断 BackTop 是否显示
      this.isShowBackTop = -position.y > 1000
    },
    addToCart () {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.iid = this.iid
      product.img = this.topImages[0]
      product.title = this.goodsInfo.title
      product.price = this.goodsInfo.lowNowPrice
      product.shopName = this.shop.name

      // 2.将商品添加到购物车，且返回成功的消息
      // 使用自定义插件弹出"成功加入购物车"信息
      this.addCart(product).then(res => {
        this.$toast.show(res)
      })
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    height: 100vh;
    z-index: 8;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
    background-color: #fff;
  }
</style>
