import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.less'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { mainRouter } from './routes'
import store from './store'
import { Provider } from 'react-redux'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

ReactDOM.render(
  // 整体的相关provider配置就放在index.js中
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          {/* <Route path='/admin' render={(routerProps) => {
            // TODO: render方式用于设置权限，需要登录才能访问admin,转到App内设置权限
            return <App {...routerProps}/>
          }}/> */}
          <Route path='/admin' component={App}/>
          {
            mainRouter.map(item => {
              return <Route path={item.pathname} component={item.component} key={item.pathname}/>
            })
          }
          <Redirect to='/admin' from='/' exact />
          <Redirect to='/404'/>
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);
