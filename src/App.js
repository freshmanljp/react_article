import React, { Component } from 'react'
import {
  Button
} from 'antd'

const withHOC = (MyComp) => {
  return class withHOC extends Component {
    render() {
      return (
        <>
          <MyComp/>
          <div>高阶组件的内容</div>
        </>
      )
    }
  }
}

@withHOC
class App extends Component {
  render() {
    return (
      <div>
        app
        <Button>hello</Button>
      </div>
    )
  }
}

export default App

