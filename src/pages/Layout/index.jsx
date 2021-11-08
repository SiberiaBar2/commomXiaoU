import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd';
import { initMethod } from 'store/actions'
import Navabar from 'pages/conponents/Navabar'
import routes from 'router'
import RouterView from 'router/RouterView'
import cx from 'classnames'
import './index.css'

const Layout = (props) => {
  const [headerWidth, setHeaderWidth] = useState(false)
  const {
    allData
  } = props
  // 所有路由配置相关的都会在props上
  // react-router v6不再支持
  console.log('props', props);

  useEffect(() => {
  }, [])

  // 取出二级路由数组
  let secondChildren = []
  for (const value of routes) {
    if (value.hasOwnProperty('children')) {
      secondChildren = value.children
    }
  }

  const navUseFunction = (val) => {
    setHeaderWidth(val)
  }

  const { NavabarData } = allData
  const { menus, username } = NavabarData
  const renderNav = () => {
    return (
      menus && <Navabar
        menus={menus}
        navUseFunction={navUseFunction}
      />
    )
  }

  const renderSec = () => {
    return (
      // n 个路由组件 等待被调起
      // layoutPage
      //   ? <div className={cx('love')}>I love Mountain wind ,<br />
      //     Summer rain <br />
      //     And your smile .
      //   </div>
      //   : 
      <div className={cx('rigth-content')}>
        <Suspense fallback={<div style={{ textAlign: 'center' }}><Spin size="large" /></div>}>
          <div className={cx('content-border')}>
            <RouterView routes={secondChildren} />
          </div>
        </Suspense>
      </div>
    )
  }

  return (
    <div className={cx('layout')}>
      <div className={cx('layouTop')}>
        <div className={cx('lay-top-left')}
          style={{ width: headerWidth ? 80 : 226 }}>xiaoU</div>
        <div className={cx('lay-top-right')}>
          <div className={cx('breade-left')}></div>
          <div className={cx('user-info')}>{username}</div>
        </div>
      </div>
      <div className={cx('layouBottom')}>
        {renderNav()}
        {renderSec()}
      </div>
    </div>
  )
}

export default connect((state) => {
  return {
    allData: state
  }
}, {
  initMethod
})(Layout)