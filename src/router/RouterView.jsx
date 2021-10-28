import { Switch, Route, Redirect } from 'react-router-dom'
// import { routerList } from 'constants/index'

const RouterView= ({
  routes,
  flag
}) => {

  // console.log('routerList', routerList[0])
  console.log('routes呵呵呵', routes)
  return (
    <Switch>
      {
        (routes.map((item, index) => {
          if (item.component) {
            return <Route key={index} path={item.path} exact={item.exact} component={item.component} />
          } else {
            return <Route key={index} path={item.path} exact={item.exact}>
              <Redirect to={item.to} />
            </Route>
          }
        })
        )
      }
    </Switch>
  )
}

export default RouterView