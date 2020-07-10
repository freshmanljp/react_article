import React, { Component } from 'react'
import { Card, Upload, Breadcrumb, Spin } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'
import axios from 'axios'
import { connect } from 'react-redux'
import { avatarChange } from '../../actions/User'

const mapState = (state) => {
  const { avatar } = state.user
  return {
    avatar
  }
}

@connect(mapState, {avatarChange})
class index extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false
    }
  }
  handleUploadReq = (data) => {
    const formdata = new FormData()
    // token设置，根据文档该token配置在body中
    formdata.append('Token', '9b95c6a34be402b262998671981137f070fca5ee:YyJmAiAilGuG1zwChIL2yLLId9o=:eyJkZWFkbGluZSI6MTU5NDM3MzQ5MiwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzIyOTgyIiwiYWlkIjoiMTcwMjMxOSIsImZyb20iOiJmaWxlIn0=')
    formdata.append('file', data.file)
    this.setState({
      isLoading: true
    })
    axios.post('http://up.imgapi.com/', formdata)
      .then(res => {
        if (res.status === 200 ) {
          this.setState({
            isLoading: false
          })
          this.props.avatarChange(res.data.linkurl)
        } else {
          // 自行处理错误
          this.setState({
            isLoading: false
          })
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
        // 自行处理错误
      })
  }
  render() {
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item><Link to='/'>主页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>个人设置</Breadcrumb.Item>
        </Breadcrumb>
        <Card title="头像上传">
          <Spin spinning={this.state.isLoading}>
            <Upload showUploadList={false} customRequest={this.handleUploadReq}>
              {
              !this.props.avatar
              ?
              '上传头像'
              :
              <img src={this.props.avatar} alt="帅帅哒头像" className="touxiang"></img>
              }
            </Upload>
          </Spin>
        </Card>
      </>
    )
  }
}

export default index
