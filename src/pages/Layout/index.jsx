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
    match,
    allData,
    location
  } = props
  console.log('props', props);
  const { pathname } = location
  useEffect(() => {
  }, [])
  // 取出二级路由
  const nowRouterPath = match && match.path
  const sercondRouter = routes.findIndex(item => item.path === nowRouterPath)
  const secondChildren = sercondRouter !== -1 && routes[sercondRouter].children

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
      (secondChildren && pathname !== '/layout')
        ? (
          <Suspense fallback={<div style={{ textAlign: 'center' }}><Spin size="large" /></div>}>
            <div className={cx('rigth-content')}>
              <div className={cx('content-border')}>
                <RouterView routes={secondChildren} />
              </div>
            </div>
          </Suspense>
        )
        : <div className={cx('love')}>I love Mountain wind ,<br />
          Summer rain <br />
          And your smile .
        </div>
    )
  }

  return (
    <div className={cx('layout')}>
      <div className={cx('layouTop')}>
        <div
          className={cx('lay-top-left')}
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

export default connect(
  (state) => {
    return {
      allData: state
    }
  }, {
  initMethod
})(Layout)