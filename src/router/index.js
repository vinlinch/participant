import Vue from 'vue'
import Router from 'vue-router'
import {routerConfig} from './routerConfig'

//测试router
import homePageRouter from 'modules/homePage/router'
import relateManageRouter from 'modules/relateManage/router'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  saveScrollPosition: true,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    ...homePageRouter,
    ...relateManageRouter
  ]
})
routerConfig(router)
export default router
