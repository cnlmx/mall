import { request } from './request'

function getDetail (iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

function getRecommend () {
  return request({
    url: '/recommend'
  })
}

/*
 * 注意，这里传参数一定要和接口地址保持一致
 * 如 http://152.136.185.210:8000/api/w6/detail?iid=1m19k6y
 * 问号后的是 iid，而不是 id
 */

class GoodsInfo {
  constructor (itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.realPrice = itemInfo.price
    this.discountDesc = itemInfo.discountDesc
    this.discountBg = itemInfo.discountBgColor
    this.columns = columns
    this.services = services
  }
}

class Shop {
  constructor (shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

class GoodsParam {
  constructor (info, rule) {
    // image 有些商品没有值
    this.image = info.images ? info.image[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}

export { getDetail, getRecommend, GoodsInfo, Shop, GoodsParam }
