import React, { Component, Fragment, createRef } from 'react'
import { Row, Col, Card } from 'antd'
import echarts from 'echarts'
import './index.css'
import { queryArticleAmount } from '../../request'

export default class index extends Component {
  constructor() {
    super()
    this.chartRef = createRef()
  }
  setEcharts = () => {
    // 指定图表的配置项和数据
    // var option = {
    //   title: {
    //       text: 'ECharts 入门示例'
    //   },
    //   tooltip: {},
    //   legend: {
    //       data:['销量']
    //   },
    //   xAxis: {
    //       data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    //   },
    //   yAxis: {},
    //   series: [{
    //       name: '销量',
    //       type: 'bar',
    //       data: [5, 20, 36, 10, 10, 20]
    //   }]
    // }
    queryArticleAmount()
      .then((res) => {
        let option = {
          title: {
                  text: '网站上半年阅读量统计'
          },
          xAxis: {
              type: 'category',
              data: res.amount.map(item => {
                return item.month
              })
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: res.amount.map(item => {
                return item.value
              }),
              type: 'line'
          }]
        }
        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(option);
      })
  }
  componentDidMount = () => {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.chartRef.current)
    this.setEcharts()
  }
  render() {
    return (
      <Fragment>
        <Card title="概况">
          <Row gutter={16}>
            {/* 注意，设置样式应该是在gutter-box那里设置，在gutter-row那里设置gutter起不了作用 */}
            <Col className="gutter-row" span={6}>
              <div style={{backgroundColor: '#9C27B0'}} className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{backgroundColor: '#3F51B5'}} className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{backgroundColor: '#00BCD4'}} className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{backgroundColor: '#4CAF50'}} className="gutter-box">col-6</div>
            </Col>
          </Row>
        </Card>
        <Card title="统计图表">
          {/* 注意div图表区域一定要指定高度，否则显示不了 */}
          <div ref={this.chartRef} className="chart"></div>
        </Card>
      </Fragment>
    )
  }
}
