<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="image-info">
    <!-- 文字描述 -->
    <div class="info-desc clear-fix">
      <div></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div></div>
    </div>
    <!-- 详情展示 -->
    <div
      class="info-list"
      v-for="item of detailInfo.detailImage"
      :key="item.id"
    >
      <div class="info-key">{{ item.key }}</div>
      <img
        v-for="itemImg of item.list"
        :key="itemImg.id"
        :src="itemImg"
        @load="imgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailImageInfo',
  props: {
    detailInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad () {
      this.$emit('detail-image-load')
    }
  }
}
</script>

<style scoped>
  .image-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc div:nth-of-type(odd) {
    position: relative;
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
  }

  .info-desc div:nth-of-type(odd)::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc div:last-child::before {
    right: 0;
  }

  .info-desc div:first-child {
    float: left;
  }

  .info-desc div:last-child {
    float: right;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-list .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
