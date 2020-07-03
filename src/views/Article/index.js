import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { 
  Breadcrumb,
  Card,
  Button,
  Table,
  Tag,
  Modal,
  Typography,
  message,
  Tooltip
} from 'antd'

import { getArticleList, deleteArticleById } from '../../request'
// 时间格式化插件
import moment from 'moment'
// 导出excel插件
import XLSX from 'xlsx'

const ButtonGroup = Button.Group
const { Text } = Typography

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
      page: 1,
      pageSize: 0,
      isLoading: false
    }
  }
  // 根据返回的list生成表格控件所需要的column
  createColumns = (columnKeys, titleMap) => {
    const columns = columnKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleMap[item],
          key: item,
          render: (text) => {
            const { amount } = text 
            return (
              // 带提示框的标签
              <Tooltip placement="topLeft" title={amount > 100 ? '热门文章' : '普通文章'} arrowPointAtCenter>
                <Tag color={amount > 100 ? 'red' : 'green'}>{amount}</Tag>
              </Tooltip>
            )
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
    columns.push({
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <ButtonGroup size='small'> 
            <Button type="primary" onClick={this.editArticle.bind(this, record.id)}>编辑</Button>
            <Button type="danger" onClick={this.deleteArticle.bind(this, record)}>删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }
  // 获取表格数据并同步到state中
  getData = (page, size) => {
    this.setState({
      isLoading: true
    })
    getArticleList(page, size)
      .then((res) => {
        const columnsKeys = Object.keys(res.list[0])
        const columns = this.createColumns(columnsKeys, titleMap)
        this.setState({
          total: res.total,
          columns: columns,
          dataSource: res.list
        })
      })
      .catch(() => {
        // 错误处理
      })
      .finally(() => {
        // 最好在finally中配置isLoading变量
        this.setState({
          isLoading: false
        })
      })
  }
  onPageChange = (page) => {
    this.setState({
      page: page
    }, () => {
      this.getData(this.state.page, this.state.pageSize)
    })
  }
  onShowSizeChange = (current, size) => {
    this.setState({
      // 究竟是会本页还是回到首页视需求而定
      page: 1,
      pageSize: size
    }, () => {
      this.getData(this.state.page, this.state.pageSize)
    })
  }
  exportXLSX = () => {
    const data = []
    data.push(Object.keys(this.state.dataSource[0]))
    this.state.dataSource.forEach(item => {
      data.push([
        item.id,
        item.title,
        item.amount,
        moment(item.createAt).format('yy年MM月DD日')
      ])
    })
    /* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    // 文章名
		XLSX.writeFile(wb, `article_${this.state.page}_${moment().format('yyMMDDHHmmss')}.xlsx`)
  }
  // 删除文章处理部分
  deleteArticle = (record) => {
    // 弹出确认对话框的处理
    Modal.confirm({
      title: '此操作不可逆，确认删除吗',
      cancelText: '点错了哎呀',
      content: <span>删除<Text type="danger">{record.title}</Text>文章</span>,
      maskClosable: false,
      okText: '赶紧，别墨迹了',
      okButtonProps: {
        loading: this.state.deleteIsLoading
      },
      // 确认的处理
      onOk: (close) => {
        deleteArticleById(record.id)
          .then(res => {
            // console.log(res)
            message.success(res.msg)
          })
          .finally(() => {
            close()
            this.setState({
              page: 1
            })
            this.getData()
          })
      }
    })
  }
  // 编辑文章处理部分
  editArticle = (id) => {
    this.props.history.push('/admin/article/edit/' + id)
  }
  componentDidMount = () => {
    this.getData()
  }
  render() {
    return (
      <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item><Link to='/'>主页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>文章列表</Breadcrumb.Item>
        </Breadcrumb>
        <Card title="文章列表" extra={<Button onClick={this.exportXLSX}>导出excel文件</Button>}>
          <Table 
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            // rowkey为必需项，用于标记每一行的key,一般取dataSouce中的id
            rowKey={record => record.id}
            // 表格是否为加载状态
            loading={this.state.isLoading}
            pagination={{
              showQuickJumper: true,
              hideOnSinglePage: true,
              total: this.state.total,
              current: this.state.page,
              pageSizeOptions: ['5', '10', '15'],
              onChange: this.onPageChange,
              onShowSizeChange: this.onShowSizeChange
            }}
          />
        </Card>
      </Fragment>
    )
  }
}
