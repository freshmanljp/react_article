import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

// 引入静态资源的方式
import logo from './Logo.jpg'
import './index.less'
import { adminRouter } from '../../routes'
import { withRouter } from 'react-router-dom'

import { receivedNotifications } from '../../actions/Notifications'
import { logout } from '../../actions/User'

const { Header, Content, Sider } = Layout;

const mapState = (state) => {
  return {
    listLength: state.notifications.list.filter(item => item.isRead === false).length,
    userInfo: state.user
  }
}

@connect(mapState, { receivedNotifications, logout })
@withRouter
class index extends Component {
  componentDidMount = () => {
    this.props.receivedNotifications()
  }
  menuCLick = ({ key }) => {
    this.props.history.push(key)
  }
  dropdownClick = ({ key }) => {
    if(key === '/login') {
      this.props.logout()
    } else {
      this.props.history.push(key)
    }
  }
  render() {
    // header下拉菜单的菜单配置
    const menu = (
      <Menu onClick={this.dropdownClick}>
        <Menu.Item
          key="/admin/notifications"
        >
          <Badge dot={Boolean(this.props.listLength)}>
            通知中心
          </Badge>
        </Menu.Item>
        <Menu.Item
          key="/admin/profile"
        >
          个人设置
        </Menu.Item>
        <Menu.Item
          key="/login"
        >
          退出登录
        </Menu.Item>
      </Menu>
    )
    return (
      <Layout>
        <Header className="header myheader">
          <div className="mylogo">
            <img src={logo} alt="React Niubi" title="React Niubi"></img>
          </div>
          <div>
            <Dropdown overlay={menu} trigger={['click']}>
              <div className="dropdown">
                <Avatar src={this.props.userInfo.avatar} />
                <span>欢迎您，{this.props.userInfo.displayName}&nbsp;</span>
                {/* 消息提醒图标 */}
                <Badge count={this.props.listLength} offset={[10, -5]}>
                  <DownOutlined />
                </Badge>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background mySider">
            <Menu
              mode="inline"
              defaultSelectedKeys={this.props.location.pathname}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.menuCLick}
            >
              {
                adminRouter.map(item => {
                  if (item.isNav) {
                    return <Menu.Item key={item.pathname}><item.icon />{item.title}</Menu.Item>
                  }
                  return null
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default index

