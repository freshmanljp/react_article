// import {
//   ArticleList,
//   ArticleEdit,
//   DashBoard,
//   Login,
//   Setting,
//   NotFound
// } from '../views'

import React from 'react'
import { DashboardOutlined, SettingOutlined, OrderedListOutlined } from '@ant-design/icons';

// 路由懒加载的实现
import Loadable from 'react-loadable'
// loading为加载时的显示组件
import { Loading } from '../components'

// 注意import()为动态加载的异步api
const ArticleList = Loadable({
  loader: () => import('../views/Article'),
  loading: Loading
})
const ArticleEdit = Loadable({
  loader: () => import('../views/Article/Edit'),
  loading: Loading
})
const DashBoard = Loadable({
  loader: () => import('../views/Dashboard'),
  loading: Loading
})
const Setting = Loadable({
  loader: () => import('../views/Setting'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import('../views/Login'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () => import('../views/NotFound'),
  loading: Loading
})

// 同一级别的路由定义到一起
// 主页面路由
export const mainRouter = [{
  pathname: '/login',
  component: Login
}, {
  pathname: '/404',
  component: NotFound
}]
// admin部分路由
export const adminRouter = [{
  pathname: '/admin/dashboard',
  component: DashBoard,
  title:'数据统计',
  isNav: true,
  icon: () => (<DashboardOutlined />)
}, {
  pathname: '/admin/setting',
  component: Setting,
  title:'系统设置',
  isNav: true,
  icon: () => (<SettingOutlined />)
}, {
  pathname: '/admin/article',
  component: ArticleList,
  title:'文章列表',
  exact: true,
  isNav: true,
  icon: () => (<OrderedListOutlined />)
}, {
  // 文章编辑页面需要id动态路由
  pathname: '/admin/edit/:id',
  component: ArticleEdit
}, {
  pathname: '/404',
  component: NotFound
}]


