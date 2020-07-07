import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.less'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { mainRouter } from './routes'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/admin' render={(routerProps) => {
          // TODO: render方式用于设置权限，需要登录才能访问admin
          return <App {...routerProps}/>
        }}/>
        {
          mainRouter.map(item => {
            return <Route path={item.pathname} component={item.component} key={item.pathname}/>
          })
        }
        <Redirect to='/admin' from='/' exact />
        <Redirect to='/404'/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
