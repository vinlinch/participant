import * as AT from './actionTypes'

export default {

  // 更新token
  [AT.GET_PDFPICTURE](state, {token}) {
    state.token = token
  },
}
