<template>
  <div class="feature">
    <h3>本周流行</h3>
    <div class="feature-content">
      <a
        class="item"
        v-for="item of featureData"
        :key="item.id"
        :href="item.href"
      >
        <img :src="item.img" alt="" />
        <p>{{ item.text }}</p>
      </a>
    </div>
    <!-- <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/feature_bg.jpg" alt="">
    </a> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeFeatureView',
  data () {
    return {
      featureData: []
    }
  },
  created () {
    axios.get('/mock/data').then(res => {
      this.featureData = res.data
    })
  }
}
</script>

<style scoped>
  /* .feature {
    border-bottom: 10px solid #1111;
  } */

  .feature h3 {
    text-align: center;
    padding-top: 15px;
    color: var(--color-high-text);
  }
  .feature .feature-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 5px;
  }

  .feature .item {
    flex-grow: 1;
    width: 25%;
    padding: 11px;
  }

  .item img {
    width: 100%;
  }

  .item p {
    font-size: 15px;
    text-align: center;
    line-height: 20px;
    height: 20px;
    margin: 2px;
  }
</style>
