import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { adminRouter } from './routes'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {
            // admin页面的路由配置
            adminRouter.map(adminComponent => {
              return <Route path={adminComponent.pathname}
              key={adminComponent.pathname}
              // render方式利于后面的权限管理
              render={(routerProps) => {
                return <adminComponent.component {...routerProps}/>
              }}
              exact={adminComponent.exact}/>
            })
          }
          {/* 同样需要重定向和404配置 */}
          <Redirect to={adminRouter[0].pathname} from='/admin' exact />
          <Redirect to='/404'/>
        </Switch>
      </Router>
    )
  }
}

export default App

