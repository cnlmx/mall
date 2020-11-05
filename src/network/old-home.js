import { request } from './old-request'

function getHomeMultidata () {
  return request({
    url: '/home/multidata'
  })
}

export { getHomeMultidata }
