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
const Notifications = Loadable({
  loader: () => import('../views/Notifications'),
  loading: Loading
})
const NoAuth = Loadable({
  loader: () => import('../views/NoAuth'),
  loading: Loading
})
const Profile = Loadable({
  loader: () => import('../views/Profile'),
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
  icon: () => (<DashboardOutlined />),
  role: ['001', '002', '003']
}, {
  pathname: '/admin/article',
  component: ArticleList,
  title:'文章管理',
  exact: true,
  isNav: true,
  icon: () => (<OrderedListOutlined />),
  role: ['001', '002', '003']
}, {
  pathname: '/admin/setting',
  component: Setting,
  title:'系统设置',
  isNav: true,
  icon: () => (<SettingOutlined />),
  role: ['001']
}, {
  // 文章编辑页面需要id动态路由
  pathname: '/admin/article/edit/:id',
  component: ArticleEdit,
  role: ['001', '002']
}, {
  pathname: '/admin/notifications',
  component: Notifications,
  role: ['001', '002', '003']
}, {
  pathname: '/admin/noAuth',
  component: NoAuth,
  role: ['001', '002', '003']
}, {
  pathname: '/admin/profile',
  component: Profile,
  role: ['001', '002', '003']
}]


