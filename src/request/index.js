// 非常奇怪的问题， 不能省略文件路径？？？
import { BaseApi } from 'http/index'
// import { BaseApi } from 'http'

console.log('BaseApi', BaseApi);

const merge = (option = {}, baseOption = {}) => {
  return Object.assign({}, option, baseOption)
}
// const merge = (option = {}, baseOption = {}) => {
//   return {...option, ...baseOption}
// }

const commonHeaders = () => {
  return { 'Content-Type': 'application/json' }
}

// 为什么接收参数那里是headers就可以，header就是对象？
export const userLogin = async (option) => {
  console.log('option', option);
  let res = await BaseApi(merge(option, {
    path: '/api/userlogin',
    method: 'post',
    header: commonHeaders()
  }))
  return res
}

export const menuList = async (option) => {
  const res = await BaseApi(merge(option, {
    path: '/api/menulist?istree=1',
    method: 'get',
    header: commonHeaders()
  }))
  return res.data
}

export const addmenu = async (option) => {
  const res = await BaseApi(merge(option, {
    path: '/api/menuadd',
    method: 'post',
    header: commonHeaders()
  }))
  console.log('res---》', res);
  return res
}
