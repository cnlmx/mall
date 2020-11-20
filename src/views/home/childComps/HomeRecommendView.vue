<template>
  <div class="recommend">
    <div v-for="item of recommends" :key="item.id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
 .recommend {
   display: flex;
   width: 100%;
   text-align: center;
   font-size: 12px;
   padding: 15px 0;
   border-bottom: 10px solid #1111;
 }

 .recommend-item {
   flex-grow: 1;
 }

 .recommend-item  img {
   width: 70%;
   height:  70%;
   margin-bottom: 10px;
 }
</style>
