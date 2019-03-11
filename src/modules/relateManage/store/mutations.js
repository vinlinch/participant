import * as AT from './actionTypes'
export default {
  //查询仲裁委列表
  [AT.GET_RELATEGETORG](state,orgList) {
    state.orgList = orgList
  },
  [AT.SET_CURRENTSELECTORG](state,currentSelectOrg) {
    state.currentSelectOrg = currentSelectOrg
  },
  [AT.SET_CURRENTCASEID](state,currentCaseId) {
    state.currentCaseId = currentCaseId
  },
  [AT.GET_APPLICANTS](state,ApplicantsList) {
    state.ApplicantsList = ApplicantsList
  },
  [AT.GET_CLAIMLISTRESONS](state,claimListresons) {
    state.claimListresons = claimListresons
  },
  [AT.GET_RESPONDENTLIST](state,respondentList) {
    state.respondentList = respondentList
  },
  [AT.GET_AGENTS](state,ApplicantsList) {
    state.ApplicantsList = ApplicantsList
  },
  [AT.GET_CONTRACT](state,contractList) {
    state.contractList = contractList
  },
  [AT.SET_CURRENTEDITCONTRACT](state,currentEditContract) {
    state.currentEditContract = currentEditContract
  },
  [AT.SET_EVIDENCELIST](state,evidenceList) {
    state.evidenceList = evidenceList
  },
  [AT.SET_CURRENTEDITEVIDENCE](state,currentEditevidence) {
    state.currentEditevidence = currentEditevidence
  },
  [AT.SET_CLAIMLIST](state,claimList) {
    state.claimList = claimList
  },
  [AT.SET_CURRENTEDITCLAIM](state,currentEditclaim) {
    state.currentEditclaim = currentEditclaim
    if(currentEditclaim){
      state.currentEditclaim.disputeFee = state.currentEditclaim.disputeFee.toString();
    }


  },
  [AT.SET_CASEDETAIL](state,caseDetail) {
    state.caseDetail = caseDetail
  },
  [AT.SET_CURRENTEDITAGENT](state,currentEditAgent) {
    state.currentEditAgent = currentEditAgent
  },
}

