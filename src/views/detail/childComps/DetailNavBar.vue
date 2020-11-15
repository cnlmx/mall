<template>
  <div>
    <nav-bar class="nav-bar">
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template #center>
        <div class="nav-title">
          <div
            v-for="(item, index) of titles"
            :key="item.id"
            :class="{ active: index === currentIndex }"
            @click="titleClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index
    },
    backClick () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

  .nav-bar {
    position: relative;
    z-index: 8;
    background-color: #fff;
  }

  .nav-title {
    display: flex;
    font-size: 13px;
    justify-content: space-evenly;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 15px;
    width: 15px;
  }
</style>
