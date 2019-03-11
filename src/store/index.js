import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

//各模块store
import {homePageStore} from 'modules/homePage/store'
import {relateManageStore} from 'modules/relateManage/store'

Vue.use(Vuex)

import mutations from './mutations'
import actions from './action'

export default new Vuex.Store({
  modules:{
    homePageStore:homePageStore,
    relateManageStore:relateManageStore
  },
  state:{
    sessionKey: '',
    token: '',
  },
  mutations,
  actions,
  plugins: [createPersistedState({
    storage: sessionStorage
  })]
})
