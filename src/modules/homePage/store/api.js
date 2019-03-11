import { fetch } from 'request/fetch'
//分页查询仲裁参与列表
export function fetchParticipantsList(ruleForm) {
  return fetch({
    //引用url.js里面的数据
    url: '/arb/participants/list',
    method: 'post',//请求方法
    data: ruleForm
  })
}

//案件管理相关----start
//分页查询案件管理列表
export function fetchCasesList(ruleForm) {
  return fetch({
    //引用url.js里面的数据
    url: '/arb/case/list',
    method: 'post',//请求方法
    data: ruleForm
  })
}

//查询仲裁委相关状态
export function caseGetOrgStatus(orgId) {
  return fetch({
    //引用url.js里面的数据
    url: '/arb/case/getOrgStatus',
    method: 'get',//请求方法
    params: {orgId}
  })
}


//案件撤回
export function caseCallback(caseId) {
  return fetch({
    //引用url.js里面的数据
    url: '/arb/case/callback',
    method: 'post',//请求方法
    data: {caseId}
  })
}
//案件管理相关----end


// export function fetchParticipantsList(ruleForm) {
//   return fetch({
//     //引用url.js里面的数据
//     url: '/arb/participants/list',
//     method: 'post',//请求方法
//     data: ruleForm
//   })
// }
// 查看仲裁参与人信息-个人
export function fetchSeearbitrate(id) {
  return fetch({
    //引用url.js里面的数据
    url: '/arb/participants/getPersonal/'+id,
    method: 'get',//请求方法
  })
}
// 查看仲裁参与人信息-企业
export function fetchSeearbitrateCom(id) {
  return fetch({
    //引用url.js里面的数据
    url: '/arb/participants/getCompany/'+id,
    method: 'get',//请求方法
  })
}
//编辑仲裁参与人信息-个人
export function fetchEditarbitrate(ruleForm) {
  return fetch({
    //引用url.js里面的数据
    url: '/arb/participants/editPersonal',
    method: 'put',//请求方法
    data:ruleForm
  })
}
//新增仲裁参与人信息-个人
export function fetchAddarbitrate(ruleForm) {
  return fetch({
    //引用url.js里面的数据
    url: '/arb/participants/addPersonal',
    method: 'post',//请求方法
    data:ruleForm
  })
}
//新增仲裁参与人信息-企业
export function fetchAddarbitrateCom(ruleForm) {
  return fetch({
    //引用url.js里面的数据
    url: '/arb/participants/addCompany',
    method: 'post',//请求方法
    data:ruleForm
  })
}
//编辑仲裁参与人信息-企业
export function fetchAddarbitratecom(ruleForm) {
  return fetch({
    //引用url.js里面的数据
    url: '/arb/participants/editCompany',
    method: 'put',//请求方法
    data:ruleForm
  })
}
//上传文件
export function uploadFile(file) {
  let formData = new FormData()
  formData.append('file', file)
  return fetch({
      url: '/arb/file/upload',
      method: 'post',
      data: formData
  })
}
// 下载仲裁文书
export function apiFileDownDocument(paramsObj) {
  //http://172.19.60.78:9800/arb/file/downDocument?address=arbFile&fileId=fc92a3bb54674a139d9c14cce4d60fe6
  return fetch({
      url: '/arb/file/downDocument',
      method: 'post',
      data: paramsObj,
      responseType: 'blob'
  })
}
