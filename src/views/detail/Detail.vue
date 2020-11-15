<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar />
    <scroll class="content" ref="scroll">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 商品基本信息 -->
      <detail-base-info :goods="goodsInfo" />
      <!-- 店铺基本信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品详情 -->
      <detail-goods-info :detailInfo="detailInfo" @image-load="imageLoad" />
      <!-- 参数 -->
      <detail-param-info :paramInfo="itemParams" />
      <!-- 评论 -->
      <detail-comment-info :comment="commentInfo" />
      <!-- 推荐 -->
      <goods-list :goodsList="recommends" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, getRecommend, GoodsInfo, Shop, GoodsParam } from 'network/detail.js'
import { debounce } from 'common/utils.js'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
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
      recommends: []
    }
  },
  created () {
    // 1.保存传入的 iid
    this.iid = this.$route.params.iid

    // 2.根据 iid 请求详情数据
    getDetail(this.iid).then(({ data: { result } }) => {
      // 获取轮播图数据
      this.topImages = result.itemInfo.topImages

      // 获取商品信息
      this.goodsInfo = new GoodsInfo(
        result.itemInfo,
        result.columns,
        result.shopInfo.services
      )

      // 获取店铺信息
      this.shop = new Shop(result.shopInfo)

      // 获取商品详情
      this.detailInfo = result.detailInfo

      // 获取参数
      this.itemParams = new GoodsParam(
        result.itemParams.info,
        result.itemParams.rule
      )

      // 获取评论
      if (result.rate.cRate !== 0) {
        this.commentInfo = result.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then(({ data: { data } }) => {
      this.recommends = data.list
    })
  },
  mounted () {
    // 监听 GoodListItem 中图片加载是否完成，并且增加防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.$bus.$on('detail-item-img-load', () => {
      refresh()
    })
  },
  methods: {
    imageLoad () {
      this.$refs.scroll.refresh()
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
    height: calc(100% - 44px);
    background-color: #fff;
  }
</style>
