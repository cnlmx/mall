<template>
  <div id="swiper">
    <!-- 图片插入 -->
    <div class="items" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <!-- 小圆点（指示器） -->
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div v-for="(item, index) in slideCount" class="indi-item" :class="{ active: index === currentIndex - 1 }" :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    // 自动轮播时间
    interval: {
      type: Number,
      default: 3000
    },
    // 延时滚动
    animDuration: {
      type: Number,
      default: 500
    },
    // 滚动距离，滚动 25% 时自动划过去
    moveRatio: {
      type: Number,
      default: 0.25
    },
    // 轮播图指示器是否显示：小圆点
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      slideCount: 0, // 元素个数
      totalWidth: 0, // 轮播图宽度
      swiperStyle: {}, // 轮播图样式
      currentIndex: 1, // 当前图片的 index
      scrolling: false // 是否正在滚动
    }
  },
  // 生命周期函数，template 挂载到整个 dom 上执行
  mounted () {
    // 1. 操作 DOM, 在前后添加 Slide
    setTimeout(() => {
      this.handleDom()

      // 2. 开启定时器
      this.startTimer()
    }, 100)
  },
  methods: {
    /**
     * 定时器操作
     */
    startTimer () {
      this.playTimer = setInterval(() => {
        this.currentIndex++
        this.scrollContent(-this.currentIndex * this.totalWidth)
      }, this.interval)
    },
    stopTimer () {
      clearInterval(this.playTimer)
    },

    /**
     * 滚动到正确的位置
     */
    scrollContent (currentPosition) {
      // 0. 设置正在滚动
      this.scrolling = true

      // 1. 开始滚动动画
      this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms'
      this.setTransform(currentPosition)

      // 2. 判断滚动到的位置
      this.checkPosition()

      // 4. 滚动完成
      this.scrolling = false
    },

    /**
     * 校验正确的位置
     */
    checkPosition () {
      setTimeout(() => {
        // 1. 校验正确的位置
        this.swiperStyle.transition = '0ms'
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1
          this.setTransform(-this.currentIndex * this.totalWidth)
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount
          this.setTransform(-this.currentIndex * this.totalWidth)
        }

        // 2. 结束移动后的回调
        this.$emit('transition-end', this.currentIndex - 1)
      }, this.animDuration)
    },

    /**
     * 设置滚动的位置
     */
    setTransform (position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`
    },

    /**
     * 操作 DOM, 在 DOM 前后添加 Slide
     */
    handleDom () {
      // 1. 获取要操作的元素
      const swiperEl = document.querySelector('.items')
      const slidesEls = swiperEl.getElementsByClassName('slide')

      // 2. 保存个数
      this.slideCount = slidesEls.length

      // 3. 如果大于 1 个, 那么在前后分别添加一个 slide
      if (this.slideCount > 1) {
        const cloneFirst = slidesEls[0].cloneNode(true)
        const cloneLast = slidesEls[this.slideCount - 1].cloneNode(true)
        swiperEl.insertBefore(cloneLast, slidesEls[0])
        swiperEl.appendChild(cloneFirst)
        this.totalWidth = swiperEl.offsetWidth
        this.swiperStyle = swiperEl.style
      }

      // 4. 让 swiper 元素, 显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth)
    },

    /**
     * 拖动事件的处理
     */
    touchStart: function (e) {
      // 1. 如果正在滚动, 不可以拖动
      if (this.scrolling) return

      // 2. 停止定时器
      this.stopTimer()

      // 3.保存开始滚动的位置
      this.startX = e.touches[0].pageX
    },

    touchMove (e) {
      // 1. 计算出用户拖动的距离
      this.currentX = e.touches[0].pageX
      this.distance = this.currentX - this.startX
      const currentPosition = -this.currentIndex * this.totalWidth
      const moveDistance = this.distance + currentPosition

      // 2. 设置当前的位置
      this.setTransform(moveDistance)
    },

    touchEnd (e) {
      // 1. 获取移动的距离
      const currentMove = Math.abs(this.distance)

      // 2. 判断最终的距离
      if (this.distance === 0) {
        return
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
        this.currentIndex--
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
        this.currentIndex++
      }

      // 3. 移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth)

      // 4. 移动完成后重新开启定时器
      this.startTimer()
    },

    /**
     * 控制上一个, 下一个
     */
    previous () {
      this.changeItem(-1)
    },

    next () {
      this.changeItem(1)
    },

    changeItem (num) {
      // 1. 移除定时器
      this.stopTimer()

      // 2. 修改 index 和位置
      this.currentIndex += num
      this.scrollContent(-this.currentIndex * this.totalWidth)

      // 3.添加定时器
      this.startTimer()
    }
  }
}
</script>

<style scoped>
  #swiper {
    overflow: hidden;
    position: relative;
  }

  .items {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(56, 106, 195, 1);
  }
</style>
