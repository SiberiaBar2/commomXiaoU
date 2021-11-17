import { Routes, Route } from 'react-router-dom'
const RouterView = ({
  routes
}) => {
  return (
    <>
      <Routes>
        {routes.map((item, index) => {
          if (item.hasOwnProperty('children')) {
            return <Route key={index} exact={item.exact} path={`${item.path}/*`} element={<item.component />} />
          } else {
            return <Route key={index} exact={item.exact} path={item.path} element={<item.component />} />
          }
        })}
      </Routes>
    </>
  )
}

export default RouterView