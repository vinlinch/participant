import { fetch } from 'request/fetch'
//查询仲裁委列表
export function relateGetOrg() {
  return fetch({
    //引用url.js里面的数据
    url: '/arb/relate/getOrg',
    method: 'get',//请求方法
  })
}

//查询申请人列表
export function relateGetApplicants(caseId) {
  return fetch({
    //引用url.js里面的数据
    url: '/arb/relate/getApplicants?caseId='+caseId,
    method: 'get',//请求方法
  })
}
//查询被申请人列表
export function relateGetRespondents(caseId) {
  return fetch({
    url: '/arb/relate/getRespondents?caseId='+caseId,
    method: 'get',
  })
}
//添加案例
export function caseAddCase(orgId) {
  return fetch({
    url: '/arb/case/addCase',
    method: 'post',
    data:{
      orgId
    }
  })
}

//查询申请人列表
export function fetchRelateGetApplicants(caseId) {
  return fetch({
    url: '/arb/relate/getApplicants'+caseId,
    method: 'get',
  })
}
//查询代理人列表
export function relateGetAgent(caseId) {
  return fetch({
    url: '/arb/relate/getAgents?caseId='+caseId,
    method: 'get',
  })
}
//查询合同列表信息
export function relateGetContract(caseId) {
  return fetch({
    url: '/arb/contract/list?caseId='+caseId,
    method: 'get',
  })
}
//添加编辑合同
export function contractAdd(params) {
  return fetch({
    url: '/arb/contract/add',
    method: 'post',
    data: params
  })
}
//删除合同
export function contractDel(paramObj) {
  return fetch({
    url: '/arb/contract/del',
    method: 'delete',
    data: paramObj
  })
}

//证据相关----start
//查询证据列表信息
export function apiEvidenceList(caseId) {
  return fetch({
    url: '/arb/evidence/list',
    method: 'post',
    data:{
      caseId,
      page:1,
      size:10
    }
  })
}
//添加编辑证据
export function apiEvidenceAdd(params) {
  return fetch({
    url: '/arb/evidence/add',
    method: 'post',
    data: params
  })
}
//删除证据
export function apiEvidenceDel(paramObj) {
  return fetch({
    url: '/arb/evidence/del',
    method: 'delete',
    data: paramObj
  })
}

//证据相关----end



//请求相关----start
//查询请求列表信息
export function apiClaimList(caseId) {
  return fetch({
    url: '/arb/claim/list',
    method: 'post',
    data:{
      caseId,
      page:1,
      size:10
    }
  })
}
//添加编辑请求
export function apiClaimAdd(params) {
  return fetch({
    url: '/arb/claim/add',
    method: 'post',
    data: params
  })
}
//删除请求
export function apiClaimDel(paramObj) {
  return fetch({
    url: '/arb/claim/del',
    method: 'delete',
    data: paramObj
  })
}

//删除仲裁申请书
export function apiClaimDelBook(paramObj) {
  return fetch({
    url: '/arb/claim/delBook',
    method: 'delete',
    data: paramObj
  })
}

//获取reason
export function apiClaimGetReason(params) {
  return fetch({
    url: '/arb/claim/getReason',
    method: 'get',
    params: params
  })
}

//添加编辑reason
export function apiClaimSaveReason(params) {
  return fetch({
    url: '/arb/claim/saveReason',
    method: 'post',
    data: params
  })
}
// 查询案由列表
export function apiClaimGetBrief() {
  return fetch({
    url: '/arb/claim/getBrief',
    method: 'get'
  })
}
//获取签署pdf信息
export function apiClaimReview(params) {
  return fetch({
    url: '/arb/claim/review',
    method: 'post',
    data: params
  })
}
//签署
export function apiClaimSign(params) {
  return fetch({
    url: '/arb/claim/sign',
    method: 'post',
    data: params
  })
}
//请求相关----end

//查看代理人详情
export function relateSeeAgent(paramObj) {
  return fetch({
    url: '/arb/relate/getAgentInfo',
    method: 'post',
    data:paramObj
  })
}
//添加案件关联申请人
export function relateAddApplicant(paramObj) {
  return fetch({
    url: '/arb/relate/addApplicant',
    method: 'post',
    data:paramObj
  })
}
//添加案件关联被申请人
export function relateAddRespondents(paramObj) {
  return fetch({
    url: '/arb/relate/addRespondent',
    method: 'post',
    data:paramObj
  })
}
//添加案件关联代理人
export function relateAddAgent(paramObj) {
  console.log(paramObj)
  return fetch({
    url: '/arb/relate/addAgent',
    method: 'post',
    data:paramObj
  })
}
//编辑代理人
export function relateEditAgent(paramObj) {
  console.log(paramObj)
  return fetch({
    url: '/arb/relate/editAgent',
    method: 'put',
    data:paramObj
  })
}
//删除案件关联申请人
export function relateDelApplicant(paramObj) {
  return fetch({
    url: '/arb/relate/delApplicant',
    method: 'delete',
    data:paramObj
  })
}
//删除案件关联被申请人
export function relateDelRespondents(paramObj) {
  return fetch({
    url: '/arb/relate/delRespondent',
    method: 'delete',
    data:paramObj
  })
}
//删除案件代理人
export function relateDelAgent(paramObj) {
  return fetch({
    url: '/arb/relate/delAgent',
    method: 'delete',
    data:paramObj
  })
}

//获取案件详情
export function apiCaseGetDetail(caseId) {
  return fetch({
    url: '/arb/case/getDetails',
    method: 'post',
    data: {caseId}
  })
}

//删除案件代理人
export function apiCaseConfirm(caseId) {
  return fetch({
    url: '/arb/case/confirm',
    method: 'post',
    data:{caseId}
  })
}
