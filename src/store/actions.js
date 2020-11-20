import { ADD_COUNTER, ADD_TO_CART, CHECK_BUTTON } from './mutation-types'

export default {
  addCart ({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      // 在列表中查找新传入的商品是否已存在
      const oldProduct = state.cartList.find(item => item.iid === payload.iid)

      // 若重复则将该商品的 count + 1，不重复则设置 count = 1，并加入到列表
      if (oldProduct) {
        commit(ADD_COUNTER, oldProduct)
      } else {
        payload.count = 1
        payload.checked = false
        commit(ADD_TO_CART, payload)
      }
      resolve('成功添加到购物车')
    })
  },
  checkButton ({ state, commit }, payload) {
    commit(CHECK_BUTTON, payload)
  }
}
