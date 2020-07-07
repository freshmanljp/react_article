import React, { Component } from 'react'
import { Button, Card, Breadcrumb, Avatar, List, Badge,Spin } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'
import { connect } from 'react-redux'
import { markNotificationAsReadById, markAllNotificationAsRead } from '../../actions/Notifications'

// 将store中的数据映射为props中的数据
const mapstate = (state => {
  const {
    list,
    isLoading
  } = state.notifications
  return {
    list,
    isLoading
  }
})

@connect(mapstate, { 
  markNotificationAsReadById, 
  markAllNotificationAsRead 
})
class index extends Component {
  render() {
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item><Link to='/'>主页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>通知中心</Breadcrumb.Item>
        </Breadcrumb>
        <Spin spinning={this.props.isLoading}>
          <Card title="通知中心"
            extra={
              <Button 
                disabled={this.props.list.every(item => item.isRead === true)}
                onClick={this.props.markAllNotificationAsRead}
                >
                  全部标记为已读
              </Button>
            }
          >
            {/* 通知消息列表 */}
            <List
              itemLayout="horizontal"
              // 从数据中心中读取消息列表数据
              dataSource={this.props.list}
              renderItem={item => (
                <List.Item extra={!item.isRead ? <Button onClick={this.props.markNotificationAsReadById.bind(this, item.id)}>标记为已读</Button> : null}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<Badge dot={!item.isRead}>{item.title}</Badge>}
                    description={item.dsc}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Spin>
      </>
    )
  }
}

export default index
