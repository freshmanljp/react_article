import React, { Component, Fragment } from 'react'
import './index.css'
import { 
  Breadcrumb,
  Card,
  Button,
  Table,
  Tag
} from 'antd'
import { getArticleList } from '../../request'
// 时间格式化插件
import moment from 'moment'

// 表格标题栏的title映射对象
const titleMap = {
  id: 'id',
  title: '文章',
  amount: '数量',
  createAt: '发布时间'
}

export default class index extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      pageSize: 0
    }
  }
  // 根据返回的list生成表格控件所需要的column
  createColumns = (columnKeys, titleMap) => {
    return columnKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleMap[item],
          key: item,
          render: (text) => {
            const { amount } = text 
            return <Tag color={amount > 100 ? 'red' : 'green'}>{amount}</Tag>
          }
        }
      }
      if (item === 'createAt') {
        return {
          title: titleMap[item],
          key: item,
          render: (text) => {
            const { createAt } = text 
            return moment(createAt).format('yy年MM月DD日')
          }
        }
      }
      return {
        title: titleMap[item],
        dataIndex: item,
        key: item
      }
    })
  }
  // 获取表格数据并同步到state中
  getData = () => {
    getArticleList()
      .then((res) => {
        const columnsKeys = Object.keys(res.list[0])
        const columns = this.createColumns(columnsKeys, titleMap)
        this.setState({
          total: res.total,
          columns: columns,
          dataSource: res.list,
          pageSize: res.list.length
        })
      })
  }
  componentDidMount = () => {
    this.getData()
  }
  render() {
    return (
      <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>文章列表</Breadcrumb.Item>
        </Breadcrumb>
        <Card title="文章列表" extra={<Button>导出excel文件</Button>}>
          <Table 
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            // rowkey为必需项，用于标记每一行的key,一般取dataSouce中的id
            rowKey= {record => record.id}
            pagination={{
              total: this.state.total,
              pageSize: this.state.pageSize
            }}
          />
        </Card>
      </Fragment>
    )
  }
}
