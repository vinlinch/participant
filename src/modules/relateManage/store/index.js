import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

export const relateManageStore = {
  namespaced: true,
  state: {
    orgList: [],
    ApplicantsList:[],
    respondentList:[],
    //代理人
    currentEditAgent:{},
    //合同
    contractList:[],
    currentEditContract:{},
    //证据
    evidenceList:[],
    currentEditEvidence:{},
    //请求
    claimList:[],
    claimListresons:[],
    currentEditclaim:{},
    //仲裁委
    currentSelectOrg:{},
    currentCaseId:'',
    //案例详情
    caseDetail:{}
  },
  actions,
  mutations,
  getters
}
