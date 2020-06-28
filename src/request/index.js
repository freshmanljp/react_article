import axios from 'axios'
import { message } from 'antd'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/258518' : ''
})

// 注意写到use方法，不然会卡死
service.interceptors.request.use((config) => {
  config.data = Object.assign(config.data, {
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