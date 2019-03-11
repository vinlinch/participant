import { fetch } from './fetch'
//获取配置信息
export function fetchGetConfig() {
  return fetch({
    url: './static/prod_conf.json',
    method: 'get',//请求方法
  })
}