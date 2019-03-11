import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

export const homePageStore = {
  namespaced: true,
  state: {
    participantsList: [],
    currentEditParticipant:{},
    tableData:[],
    arbitratetype:{},
    fileinfo:{},
    caseList: [],
  },
  actions,
  mutations,
  getters
}
