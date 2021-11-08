import { Routes, Route } from 'react-router-dom'
const RouterView = ({
  routes
}) => {
  const commonRender = ({ item, index }, type) => {
    return (
      item.component &&
      (
        type
          ? <Route key={index} path={`${item.path}/*`} exact={item.exact} element={<item.component />} />
          : <Route key={index} path={item.path} exact={item.exact} element={<item.component />} />
      )
    )
  }

  return (
    <>
      <Routes>
        {routes.map((item, index) => {
          if (item.hasOwnProperty('children')) {
            return commonRender({ item, index }, 'sec')
          } else {
            return commonRender({ item, index })
          }
        })}
      </Routes>
    </>
  )
}

export default RouterView