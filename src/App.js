import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { adminRouter } from './routes'
import { Frame } from './components'
import { connect } from 'react-redux'

const mapstate = state => {
  const {
    isLogin,
    role 
  } = state.user
  return {
    isLogin,
    role
  }
}

@connect(mapstate)
// 因为需要用到redux的connect，所以放在App中处理登录验证
class App extends Component {
  render() {
    return (
      this.props.isLogin
      ?
      <Frame>
        <Switch>
          {
            // admin页面的路由配置
            adminRouter.map(adminComponent => {
              return <Route
              path={adminComponent.pathname}
              key={adminComponent.pathname}
              // render方式利于后面的权限管理
              render={(routerProps) => {
                // 判断用户 是否有该权限
                const isAuth = adminComponent.role.includes(this.props.role)
                // 根据用户权限展示组件
                return isAuth ? <adminComponent.component {...routerProps}/> : <Redirect to='/admin/noAuth'/>
              }}
              exact={adminComponent.exact}/>
            })
          }
          {/* 同样需要重定向和404配置 */}
          <Redirect to={adminRouter[0].pathname} from='/admin' exact />
          <Redirect to='/404'/>
        </Switch>
      </Frame>
      :
      <Redirect to='/login'/>
    )
  }
}

export default App

