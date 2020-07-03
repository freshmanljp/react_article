import React, { Component, Fragment, createRef } from 'react'
import { Link } from 'react-router-dom'
// 时间格式处理插件
import moment from 'moment'
// 富文本编辑器插件
import Editor from 'wangeditor'
import { 
  Breadcrumb,
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Spin,
  message
} from 'antd'
import './index.css'
import { queryArticleById, editArticleById } from '../../request'

export default class Edit extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false
    }
    this.editorRef = createRef()
    this.formRef = createRef()
  }
  submitEdit = values => {
    this.setState({
      isLoading: true
    })
    const id = this.props.match.params.id
    // 将moment对象转换成时间值
    values.createAt = values.createAt.valueOf()
    editArticleById(id, values)
      .then(res => {
        message.success(res.msg)
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
        this.props.history.push('/admin/article')
      })
  }
  // 初始化富文本编辑器
  initEditor = () => {
    this.editor = new Editor(this.editorRef.current)
    this.editor.create()
  }
  getArticleData = (id) => {
    queryArticleById(id)
      .then((res) => {
        // 解构出不含id的data
        const { id, ...data } = res 
        //注意DatePicker组件接受的是一个moment对象
        data.createAt = moment(data.createAt)
        // 通过setFieldsValue方法来设置表单域中的value
        this.formRef.current.setFieldsValue(data)
        // 讲返回的content数据更新到页面的editor中
        this.editor.txt.html(data.content)
      })
  }
  componentDidMount = () => {
    this.setState({
      isLoading: true
    })
    const id = this.props.match.params.id
    this.initEditor()
    this.getArticleData(id)
    this.setState({
      isLoading: false
    })
  }
  render() {
    // 表单布局配置项
    const layout = {
      // label长度
      labelCol: {
        span: 4,
      },
      // 内容长度
      wrapperCol: {
        span: 20,
      },
    };
    // 无label的表单内容配置
    const tailLayout = {
      wrapperCol: {
        // 缩进长度，一般设为label的长度
        offset: 4,
        span: 20,
      }
    }
    // 自定义DatePicker显示时间格式
    const dateFormat = 'YYYY/MM/DD'
    return (
      <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item><Link to='/'>主页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>文章列表</Breadcrumb.Item>
          <Breadcrumb.Item>文章编辑</Breadcrumb.Item>
        </Breadcrumb>
        <Card title="文章编辑" extra={<Button onClick={this.props.history.goBack}>取消</Button>}>
          <Spin spinning={this.state.isLoading}>
            <Form
              {...layout}
              onFinish={this.submitEdit}
              ref={this.formRef}
            >
              <Form.Item
                label="文章标题"
                name="title"
                rules={[
                  {
                    required: true,
                    message: '文章标题不能为空',
                  },{
                    min: 2,
                    max: 15,
                    message: '文章标题为2到10个字符'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="阅读量"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: '阅读量不能为空',
                  }
                ]}
              >
                <Input type='number'/>
              </Form.Item>
              <Form.Item
                label="创建时间"
                name="createAt"
                rules={[
                  {
                    required: true,
                    message: '创建时间不能为空',
                  }
                ]}
              >
                <DatePicker format={dateFormat} />
              </Form.Item>
              <Form.Item
                label="文章内容"
                name="content"
                rules={[
                  {
                    required: true,
                    message: '文章内容不能为空',
                  }
                ]}
              >
                <div ref={this.editorRef} className="editor"></div>
                {/* 富文本编辑器 */}
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  保存修改
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </Fragment>
    )
  }
}
