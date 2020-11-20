module.exports = {

  // 别名设置方法一：
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  },
  // 别名设置方法二：
  // chainWebpack: config => {
  //   config.resolve.alias
  //     // .set(别名, 路径)
  //     .set('assets', '@/assets')
  //     .set('components', '@/components')
  //     .set('common', '@/common')
  //     .set('network', '@/network')
  //     .set('views', '@/views')
  // }

  // 打包时去掉 map 文件，节省带宽
  productionSourceMap: false
  // // 模拟本地数据
  // devServer: {
  //   port: 8080,
  //   before (app) {
  //     app.get('/api/index', (req, res) => {
  //       res.json(mockIndexData)
  //     })
  //   }
  // }
}
