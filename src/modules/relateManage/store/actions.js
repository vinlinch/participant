import * as AT from './actionTypes'
import {
  relateGetOrg,
  caseAddCase,
  relateAddApplicant,
  relateAddRespondents,
  relateDelAgent,
  relateSeeAgent,
  relateDelApplicant,
  relateDelRespondents,
  relateAddAgent,
  relateEditAgent,
  relateGetApplicants,
  relateGetRespondents,
  relateGetAgent,
  relateGetContract,
  contractAdd,
  contractDel,
  apiEvidenceList,
  apiEvidenceAdd,
  apiEvidenceDel,
  apiClaimList,
  apiClaimAdd,
  apiClaimDel,
  apiClaimDelBook,
  apiClaimSaveReason,
  apiClaimReview,
  apiClaimGetReason,
  apiClaimSign,
  apiClaimGetBrief,
  apiCaseGetDetail,
  apiCaseConfirm
} from './api'

//查询仲裁委列表
export const getRelateGetOrg = ({commit}) => {
  return relateGetOrg().then(res => {
    const orgList = res.data;
    commit(AT.GET_RELATEGETORG, orgList)
  })
}
//查询申请人列表
export const getRelateGetApplicants = ({commit}, caseId) => {
  return relateGetApplicants(caseId).then(res => {
    const ApplicantsList = res.data;
    commit(AT.GET_APPLICANTS, ApplicantsList)
  })
}
//查询被申请人列表
export const getRelateGetRespondents = ({commit}, caseId) => {
  return relateGetRespondents(caseId).then(res => {
    const respondentList = res.data;
    console.info(respondentList)
    commit(AT.GET_RESPONDENTLIST, respondentList)
  })
}
//查询代理人列表
export const getRelateGetAgent = ({commit}, caseId) => {
  return relateGetAgent(caseId).then(res => {
    const ApplicantsList = res.data;
    console.info(ApplicantsList)
    commit(AT.GET_AGENTS, ApplicantsList)
  })
}
//查询合同信息列表
export const getRelateGetContract = ({commit}, caseId) => {
  return relateGetContract(caseId).then(res => {
    const contractList = res.data;
    console.info(contractList)
    commit(AT.GET_CONTRACT, contractList)
  })
}
//添加编辑合同提交
export const postContractAdd = ({commit}, paramObj) => {
  return contractAdd(paramObj).then(res => {
    return res;
  });
}
//删除合同
export const deleteContractDel = ({dispatch,commit},paramObj) => {
  return contractDel(paramObj).then(res => {
    if (res.success) {
      dispatch('getRelateGetContract', paramObj.caseId)
    }
    return res;
  });
}
//证据相关----start
//查询证据信息列表
export const getEvidenceList = ({commit}, caseId) => {
  return apiEvidenceList(caseId).then(res => {
    const evidenceList = res.data.list;
    console.info('2222222',evidenceList)
    commit(AT.SET_EVIDENCELIST, evidenceList)
  })
}
//添加编辑证据提交
export const postEvidenceAdd = ({commit}, paramObj) => {
  return apiEvidenceAdd(paramObj).then(res => {
    return res;
  });
}
//删除证据
export const deleteEvidenceDel = ({dispatch,commit},paramObj) => {
  return apiEvidenceDel(paramObj).then(res => {
    if (res.success) {
      dispatch('getEvidenceList', paramObj.caseId)
    }
    return res;
  });
}

//证据相关----end

//请求相关----start
//查询请求信息列表
export const getClaimList = ({commit}, caseId) => {
  return apiClaimList(caseId).then(res => {
    const claimList = res.data.list;
    console.info(claimList)
    commit(AT.SET_CLAIMLIST, claimList)
  })
}
//添加编辑请求提交
export const postClaimAdd = ({commit}, paramObj) => {
  return apiClaimAdd(paramObj).then(res => {
    return res;
  });
}
//删除请求
export const deleteClaimDel = ({dispatch,commit},paramObj) => {
  return apiClaimDel(paramObj).then(res => {
    if (res.success) {
      dispatch('getClaimList', paramObj.caseId)
    }
    return res;
  });
}
//删除仲裁申请书
export const deleteClaimDelBook = ({dispatch,commit},paramObj) => {
  return apiClaimDelBook(paramObj).then(res => {
    return res;
  });
}

//获取reason
export const postClaimGetReason = ({commit}, paramObj) => {
  return apiClaimGetReason(paramObj).then(res => {
    return res;
  });
}
//添加编辑reason
export const postClaimSaveReason = ({commit}, paramObj) => {
  return apiClaimSaveReason(paramObj).then(res => {
    return res;
  });
}
// 查询案由列表
export const postClaimGetBrief = ({commit}, paramObj) => {
  return apiClaimGetBrief(paramObj).then(res => {
    const claimListresons=res.data
    commit(AT.GET_CLAIMLISTRESONS, claimListresons)
  });
}
//获取签署pdf信息
export const getClaimReview = ({commit}, caseId) => {
  return apiClaimReview({caseId}).then(res => {
    return res;
  })
}

//签署pdf
export const postClaimSign = ({commit}, caseId) => {
  return apiClaimSign({caseId}).then(res => {
    return res;
  })
}
//请求相关----end

//添加案例
export const putCaseAddCase = ({commit}, orgId) => {
  return caseAddCase(orgId).then(res => {
    commit(AT.SET_CURRENTCASEID, res.data.caseId)
    return res;
  });
}

//添加申请人
export const putRelateAddApplicant = ({dispatch}, paramObj) => {
  console.info(paramObj)
  return relateAddApplicant(paramObj).then(res => {
    if (res.code) {
      dispatch('getRelateGetApplicants', paramObj.caseId)
    }
    return res;
  });
}
//添加被申请人
export const putRelateAddRespondents = ({dispatch}, paramObj) => {
  console.info(paramObj)
  return relateAddRespondents(paramObj).then(res => {
    if (res.code) {
      dispatch('getRelateGetRespondents', paramObj.caseId)
    }
    return res;
  });
}
//查看代理人
export const postRelateSeeAgent = ({dispatch}, paramObj) => {
  console.info(paramObj)
  return relateSeeAgent(paramObj).then(res => {
    if (res.code) {
      dispatch('getRelateGetAgent', paramObj.caseId)
    }
    return res;
  });
}
//添加代理人
export const putRelateAddAgent = ({dispatch}, paramObj) => {
  console.info(paramObj)
  return relateAddAgent(paramObj).then(res => {
    if (res.code) {
      dispatch('getRelateGetAgent', paramObj.caseId)
    }
    return res;
  });
}
//编辑代理人
export const putRelateEditAgent = ({dispatch}, paramObj) => {
  console.info(paramObj)
  return relateEditAgent(paramObj).then(res => {
    if (res.code) {
      dispatch('getRelateGetAgent', paramObj.caseId)
    }
    return res;
  });
}
//删除申请人
export const DeleteRelateDelApplicant = ({dispatch}, paramObj) => {
  console.info(paramObj)
  return relateDelApplicant(paramObj).then(res => {
    if (res.code) {
      dispatch('getRelateGetApplicants', paramObj.caseId)
    }
    return res;
  });
}
//删除被申请人
export const DeleteRelateDelRespondents = ({dispatch}, paramObj) => {
  console.info(paramObj)
  return relateDelRespondents(paramObj).then(res => {
    if (res.code) {
      dispatch('getRelateGetRespondents', paramObj.caseId)
    }
    return res;
  });
}
//删除代理人
export const DeleteRelateDelAgent = ({dispatch}, paramObj) => {
  console.info(paramObj)
  return relateDelAgent(paramObj).then(res => {
    if (res.code) {
      dispatch('getRelateGetAgent', paramObj.caseId)
    }
    return res;
  });
}

//获取案例详情
export const getCaseDetail = ({commit},caseId) => {
  return apiCaseGetDetail(caseId).then(res => {
    console.info(res)
    commit(AT.SET_CASEDETAIL, res.data)
    return res;
  });
}

//提交仲裁申请
export const postCaseConfirm = ({dispatch}, paramObj) => {
  // console.info(paramObj)
  return apiCaseConfirm(paramObj).then(res => {
    return res;
  });
}
