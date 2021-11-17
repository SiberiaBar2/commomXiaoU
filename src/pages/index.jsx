import React, { Suspense } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Spin } from 'antd'
import routes from 'router'
import RouterView from 'router/RouterView'

const Summary = () => {
  return (
    <Router>
      <Suspense fallback={<div style={{ textAlign: 'center' }}><Spin size="large" /></div>}>
        <RouterView routes={routes} />
      </Suspense>
    </Router>
  )
}

export default Summary