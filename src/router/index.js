

import React from 'react'

const Login = React.lazy(() => import('pages/Login'));
const Layout = React.lazy(() => import('pages/Layout'));
// 系统设置
const Menu = React.lazy(() => import('pages/SystemSetting/Menu'))
const Role = React.lazy(() => import('pages/SystemSetting/Role'))
const Admin = React.lazy(() => import('pages/SystemSetting/Administrators'))

// 商城管理
const Commodity = React.lazy(() => import('pages/Shopping/Commodity'))
const SpecsCation = React.lazy(() => import('pages/Shopping/SpecsCation'))
const Goods = React.lazy(() => import('pages/Shopping/Goods'))
const Member = React.lazy(() => import('pages/Shopping/Member'))
const Banner = React.lazy(() => import('pages/Shopping/Banner'))
const Seckill = React.lazy(() => import('pages/Shopping/Seckill'))

// 数据统计
const Tiao = React.lazy(() => import('pages/Tiao/Tiao'))

// 功能演示
const Wangedit = React.lazy(() => import('pages/DemoTest/Wangedit'))
const Echarts = React.lazy(() => import('pages/DemoTest/Echarts'))


const routes = [
  // 重定 在v6后不知道怎么用了， 反复执行堆栈会崩溃
  // 先加上组件
  {
    path: '/',
    to: '/login',
    component: Login,
    exact: true
  },
  {
    path: 'login',
    component: Login,
    exact: false
  },
  {
    path: 'layout',
    component: Layout,
    exact: false,
    children: [
      {
        path: 'menu',
        component: Menu,
        exact: false
      },
      {
        path: 'role',
        component: Role,
        exact: false
      },
      {
        path: 'admin',
        component: Admin,
        exact: false
      },

      {
        path: 'category',
        component: Commodity,
        exact: false
      },
      {
        path: 'specs',
        component: SpecsCation,
        exact: false
      },
      {
        path: 'goods',
        component: Goods,
        exact: false
      },
      {
        path: 'member',
        component: Member,
        exact: false
      },
      {
        path: 'banner',
        component: Banner,
        exact: false
      },
      {
        path: 'seckill',
        component: Seckill,
        exact: false
      },


      {
        path: 'tiao',
        component: Tiao,
        exact: false
      },


      {
        path: 'Wangedit',
        component: Wangedit,
        exact: false
      },
      {
        path: 'echarts',
        component: Echarts,
        exact: false
      },


    ]
  }
]

export default routes