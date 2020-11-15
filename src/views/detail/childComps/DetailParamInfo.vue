<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <!-- 尺码 -->
    <table class="info-size" v-for="table of paramInfo.sizes" :key="table.id">
      <tr v-for="tr of table" :key="tr.id">
        <td v-for="td of tr" :key="td.id">{{ td }}</td>
      </tr>
    </table>

    <!-- 其他参数 -->
    <table class="info-param">
      <tr v-for="info of paramInfo.infos" :key="info.id">
        <td>{{ info.key }}</td>
        <td>{{ info.value }}</td>
      </tr>
    </table>
    <!-- 图片 -->
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetalParamsInfo',
  props: {
    paramInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse; /* 边框折叠 */
  }

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  }

  .info-size {
    text-align: center;
  }

  .info-size tr td:first-child {
    text-align: left;
    width: 60px;
  }

  .info-param {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .info-param tr td:first-child {
    width: 80px;
  }

  .info-param tr td:last-child {
    color: var(--color-high-text);
  }

  .info-img img {
    width: 100%;
  }
</style>
