// import store from '../../store'
// import storage from 'storejs'
import index from '../index'
var metaData = {
  title:'主页'
}
export default [
  {
    path: '/home',
    component: index,
    meta:metaData
  },
  {
    path: '/participant-detail',
    component: () => import('../components/participantDetail'),
    meta:metaData
  },
  {
    path: '/list',
    component: () => import('../List'),
    meta:metaData
  }
]
