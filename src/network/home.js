import { request } from './request'

function getHomeMultidata () {
  return request({
    url: '/home/multidata' // 接口包含轮播图和推荐信息数据
  })
}

export { getHomeMultidata }
