import * as AT from './actionTypes'
export default {
  //更新仲裁参与分页查询
  [AT.GET_PARTICIPANTSLIST](state, {participantsList,tableData}) {
    state.participantsList = participantsList
    state.tableData=tableData
  },
  [AT.SET_CURRENTEDITPARTICIPANT](state, currentEditParticipant) {
    state.currentEditParticipant = currentEditParticipant
  },
  // 更新列表信息
  [AT.GET_SEEARBITRATE](state, {arbitratetype}) {
    state.arbitratetype = arbitratetype
  },
  //编辑列表信息
  [AT.GET_EDITARBITRATE](state, {arbitratetype}) {
    state.arbitratetype = arbitratetype
  },
  [AT.GET_ADDARBITRATE](state, {arbitratetype}) {
    state.arbitratetype = arbitratetype
  },
  [AT.GET_BASESTR](state, {fileinfo}) {
    state.fileinfo = fileinfo
  },
  [AT.GET_CASESLIST](state,caseList) {
    state.caseList = caseList
  },
}

