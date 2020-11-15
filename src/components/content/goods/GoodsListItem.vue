<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodListItem',
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    showImg () {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imgLoad () {
      if (this.$route.path.includes('/home')) {
        this.$bus.$emit('home-item-img-load')
      } else if (this.$route.path.includes('/detail')) {
        this.$bus.$emit('detail-item-img-load')
      }
    },
    itemClick () {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  .goods-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    /* height: 100%; */
    border-radius: 5px;
  }

  .goods-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    font-size: 12px;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden; /* 溢出部分隐藏 */
    text-overflow: ellipsis; /* 溢出文本通过省略号展示 */
    white-space: nowrap; /* 禁止文本自动换行 */
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background-image: url("~assets/img/common/collect.svg");
    background-size: 14px 14px;
  }
</style>
