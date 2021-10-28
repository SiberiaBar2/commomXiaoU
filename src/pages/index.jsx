import React, { useState, useEffect, Suspense } from 'react'
import routes from 'router'
import RouterView from 'router/RouterView'
import { Spin } from 'antd'
import { HashRouter as Router, NavLink } from 'react-router-dom'

const Summary = (props) => {
  return (
    <Router>
      <Suspense fallback={<div style={{ textAlign: 'center' }}><Spin size="large" /></div>}>
        <RouterView routes={routes} />
      </Suspense>
    </Router>
  )
}

export default Summary