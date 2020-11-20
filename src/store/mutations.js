import { ADD_COUNTER, ADD_TO_CART, CHECK_BUTTON } from './mutation-types'

export default {
  [ADD_COUNTER] (state, payload) {
    payload.count++
  },
  [ADD_TO_CART] (state, payload) {
    state.cartList.push(payload)
  },
  [CHECK_BUTTON] (state, payload) {
    payload.checked = !payload.checked
  }
}
