// 非常奇怪的问题， 不能省略文件路径？？？
import { BaseApi } from 'http/index'
// import { BaseApi } from 'http'

const merge = (option = {}, baseOption = {}) => {
  return Object.assign({}, option, baseOption)
}
// const merge = (option = {}, baseOption = {}) => {
//   return {...option, ...baseOption}
// }

const commonHeaders = () => {
  return { 'Content-Type': 'application/json' }
}

// 登录
// 为什么接收参数那里是headers就可以，header就是对象？
export const userLogin = async (option) => {
  let res = await BaseApi(merge(option, {
    path: '/api/userlogin',
    method: 'post',
    header: commonHeaders()
  }))
  return res
}

// 菜单管理
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
  return res
}

export const editmenu = async (option) => {
  const res = await BaseApi(merge(option, {
    path: '/api/menuedit',
    method: 'post',
    header: commonHeaders()
  }))
  return res
}
export const delmenu = async (option) => {
  console.log('option',option);
  const res = await BaseApi(merge(option, {
    path: '/api/menudelete',
    method: 'post',
    header: commonHeaders()
  }))
  return res
}
// 角色管理
export const rolelist = async (option) => {
  const res = await BaseApi(merge(option, {
    path: '/api/rolelist',
    method: 'get',
    header: commonHeaders()
  }))
  return res
}
export const roleadd = async (option) => {
  const res = await BaseApi(merge(option, {
    path: '/api/roleadd',
    method: 'post',
    header: commonHeaders()
  }))
  return res
}
export const roleedit = async (option) => {
  console.log('option',option);
  const res = await BaseApi(merge(option, {
    path: '/api/roleedit',
    method: 'post',
    header: commonHeaders()
  }))
  console.log('res----角色修改', res);
  return res
}
export const roledel = async (option) => {
  console.log('option',option);
  const res = await BaseApi(merge(option, {
    path: '/api/roledelete',
    method: 'post',
    header: commonHeaders()
  }))
  console.log('res----角色删除', res);
  return res
}

