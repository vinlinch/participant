/* eslint-disable*/
export const routerConfig = router =>{
  router.beforeEach(async (to, from, next) =>{
    // 登录状态验证 权限验证 数据/参数完整性验证 url拦截跳转逻辑 url链路验证 数据埋点
    //与router的meta交互操作当前页 改变title 隐藏导航 等动作
    console.info('to-------',to)
    console.info('from-------',from)
    next();
  })
  router.afterEach((to, from) =>{
    //卸载全局数据 卸载全局事件 spa页面切换操作（关闭loading 关闭dialog 滚动条置顶）数据埋点
  })
  router.onError((error) => {
    //当router尝试解析当前组件出错时捕获错误
    const pattern = /Loading chunk (\d)+ failed/g
    const isChunkLoadFailed = error.message.match(pattern)
    const targetPath = router.history.pending.fullPath
    if (isChunkLoadFailed) {
      router.replace(targetPath)
    }
  })
  return router
}
