import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'

/**
 * GoodListItem 图片加载
 */
const itemListenerMixin = {
  date () {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted () {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('item-img-load', this.itemImgListener)
  }
}

/**
 * BackTop 回到顶部
 */
const backTopMixin = {
  data () {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick () {
      // better-scroll 方法，滚动到某个位置（坐标）
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}

export { itemListenerMixin, backTopMixin }
