import React, { Component } from 'react'
import { Layout, Menu } from 'antd';

// 引入静态资源的方式
import logo from './Logo.jpg'
import './index.less'
import { adminRouter } from '../../routes'
import { withRouter } from 'react-router-dom'

const { Header, Content, Sider } = Layout;

@withRouter
class index extends Component {
  menuCLick = ({ key }) => {
    this.props.history.push(key)
  }
  render() {
    return (
      <Layout>
        <Header className="header myheader">
          <div className="mylogo">
            <img src={logo} alt="React Niubi" title="React Niubi"></img>
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

