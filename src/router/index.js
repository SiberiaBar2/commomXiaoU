

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
  // 重定
  {
    path: '/',
    to: '/login',
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: false
  },
  {
    path: '/layout',
    component: Layout,
    exact: false,
    children: [
      {
        path: '/layout/menu',
        component: Menu,
        exact: false
      },
      {
        path: '/layout/role',
        component: Role,
        exact: false
      },
      {
        path: '/layout/admin',
        component: Admin,
        exact: false
      },

      {
        path: '/layout/category',
        component: Commodity,
        exact: false
      },
      {
        path: '/layout/specs',
        component: SpecsCation,
        exact: false
      },
      {
        path: '/layout/goods',
        component: Goods,
        exact: false
      },
      {
        path: '/layout/member',
        component: Member,
        exact: false
      },
      {
        path: '/layout/banner',
        component: Banner,
        exact: false
      },
      {
        path: '/layout/seckill',
        component: Seckill,
        exact: false
      },


      {
        path: '/layout/tiao',
        component: Tiao,
        exact: false
      },


      {
        path: '/layout/Wangedit',
        component: Wangedit,
        exact: false
      },
      {
        path: '/layout/echarts',
        component: Echarts,
        exact: false
      },


    ]
  }
]

export default routes