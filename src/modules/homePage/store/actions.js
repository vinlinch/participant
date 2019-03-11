import * as AT from './actionTypes'
import {
  fetchParticipantsList,
  fetchSeearbitrate,
  fetchEditarbitrate,
  fetchAddarbitrate,
  fetchAddarbitratecom,
  fetchAddarbitrateCom,
  // fetchgetBaseStr,
  fetchSeearbitrateCom,
  fetchCasesList,
  caseGetOrgStatus,
  caseCallback,
  apiFileDownDocument
} from './api'

//获取仲裁表格数据
export const getParticipantsList = ({commit}, ruleForm) => {
  return fetchParticipantsList(ruleForm).then(res => {
    commit(AT.GET_PARTICIPANTSLIST, {
      tableData: res.data.list,
      total: res.data.total
    })
    return res
  })
}

//案件管理相关----start
//获取案件管理列表
export const getCasesList = ({commit}, ruleForm) => {
  return fetchCasesList(ruleForm).then(res => {
    commit(AT.GET_CASESLIST, res.data.list)
    return res
  })
}
//获取仲裁委相关状态
export const getCaseGetOrgStatus = ({commit}, orgId) => {
  return caseGetOrgStatus(orgId).then(res => {
    return res
  })
}
//案件撤回
export const postCaseCallback = ({commit}, caseId) => {
  return caseCallback(caseId).then(res => {
    return res
  })
}
//案件管理相关----end


//查看表格某条数据
// export const getSeearbitrate = async (store, id) => {
//   let resultData = {};
//   await fetchSeearbitrate(id).then(res => {
//     resultData = res.data;
//   })
//   await fetchgetBaseStr({fileId:resultData.frontKey,address:'arbFile'}).then(res => {
//     resultData['frontBaseStr'] = res.data;
//     console.log(res.data)
//   })
//   await fetchgetBaseStr({fileId:resultData.behindKey,address:'arbFile'}).then(res => {
//     resultData['behindBaseStr'] = res.data;
//   })
//   return resultData;
// }
export const getParticipantsGetPersonal = ({commit}, id) => {
  return fetchSeearbitrate(id).then(res => {
    commit(AT.GET_SEEARBITRATE, {
      arbitratetype: res
    })
    return res
  })
}
//查看企业表格某条数据
export const getSeearbitrateCom = ({commit}, id) => {
  return fetchSeearbitrateCom(id).then(res => {
    commit(AT.GET_SEEARBITRATE, {
      arbitratetype: res
    })
    return res
  })
}
//编辑表格个人数据
export const getEditarbitrate = ({commit}, ruleForm) => {
  return fetchEditarbitrate(ruleForm).then(res => {
    commit(AT.GET_EDITARBITRATE, {
      arbitratetype: res
    })
    return res
  })
}
//编辑表格企业数据
export const getEditarbitratecom = ({commit}, ruleForm) => {
  return fetchAddarbitratecom(ruleForm).then(res => {
    commit(AT.GET_EDITARBITRATE, {
      arbitratetype: res
    })
    return res
  })
}
//新增表格数据
export const postAddarbitrate = ({commit}, ruleForm) => {
  return fetchAddarbitrate(ruleForm).then(res => {
    commit(AT.GET_ADDARBITRATE, {
      arbitratetype: res
    })
    return res
  })
}
//新增表格数据-企业
export const postAddarbitratecom = ({commit}, ruleForm) => {
  return fetchAddarbitrateCom(ruleForm).then(res => {
    commit(AT.GET_ADDARBITRATE, {
      arbitratetype: res
    })
    return res
  })
}
//获取64文件
// export const getBaseStr = ({commit}, ruleForm) => {
//   return fetchgetBaseStr(ruleForm).then(res => {
//     commit(AT.GET_BASESTR, {
//       fileinfo: res
//     })
//     return res
//   })
// }
//下载仲裁文书
export const postFileDownDocument = ({commit}, paramsObj) => {
  return apiFileDownDocument(paramsObj).then(res => {
    return res
  })
}
// Promise.all([getBaseStr]).then((res) => {
//   console.log(res, 'promise all 方法')
// })
