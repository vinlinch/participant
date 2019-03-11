// import store from '../../store'
// import storage from 'storejs'
import index from '../index'
// import stepList from '../stepList'
var metaData = {
  title:'流程配置'
}
export default [
  {
    path: '/relate',
    component: index,
    meta:metaData
  },
  {
    path: '/relate/detailagent',
    component: resolve => require(['../detailagent'],resolve),
    meta:metaData
  },
  {
    path: '/relate/step-list',
    component: resolve => require(['../stepList'],resolve),
    meta:metaData
  },
  {
    path: '/relate/contract-edit',
    component: resolve => require(['../components/contract/contractEdit'],resolve),
    meta:metaData
  },
  {
    path: '/relate/evidence-edit',
    component: resolve => require(['../components/evidence/evidenceEdit'],resolve),
    meta:metaData
  },
  {
    path: '/relate/claim-edit',
    component: resolve => require(['../components/claim/claimEdit'],resolve),
    meta:metaData
  },
  {
    path: '/relate/claim-sign',
    component: resolve => require(['../components/claim/claimSign'],resolve),
    meta:metaData
  },
  {
    path: '/relate/case-detail',
    component: () => import('../components/caseDetail'),
    meta:metaData
  },
  {
    path: '/relate/agent-detail',
    component: resolve => require(['../components/agent/agentDetail'],resolve),
    meta:metaData
  },
]
