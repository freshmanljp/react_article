import axios from 'axios'
import { message } from 'antd'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/258518' : ''
})
// 不需要拦截的网络请求处理
const serviceWithNoInter = axios.create({
  baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/258518' : ''
})

// 注意写到use方法，不然会卡死
service.interceptors.request.use((config) => {
  // 注意，源对象为{}，config的data有可能为空，作为目标对象可能会出错
  config.data = Object.assign({}, config.data, {
    authToken: 'tokenPlaceHolder'
  })
  return config
})

service.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data.data
  } else {
    // mocks里面没有token仍然是返回200
    message.error(res.data.errMsg)
  }
})

export const getArticleList = (page = 1, limited = 10) => {
  return service.post('/api/v1/article', {
    page,
    limited
  })
} 
export const deleteArticleById = (id) => {
  return service.post('/api/v1/articleDelete/' + id)
}
export const queryArticleById = (id) => {
  return service.post(`/api/v1/articleQuery/${id}`)
}
export const editArticleById = (id) => {
  return service.post(`/api/v1/articleEdit/${id}`)
}
export const queryArticleAmount = () => {
  return service.post(`/api/v1/articleAmount`)
}
export const getMessageList = () => {
  return service.post('/api/v1/message')
}

// 登录请求，不需要加token
export const loginRequest = (value) => {
  return serviceWithNoInter.post('/api/v1/login', value)
}

