<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  date () {
    return {
      isLoad: false
    }
  },
  methods: {
    imgLoad () {
      if (!this.isLoad) {
        this.$emit('swiper-image-load')
        this.isLoad = true
      }
    }
  }
}
</script>

<style></style>
