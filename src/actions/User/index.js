import actionTypes from '../actionTypes'
import { loginRequest } from '../../request'

const loginStart = () => {
  return {
    type: actionTypes.START_LOGIN
  }
}

const loginSuccess = (data) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      data
    }
  }
}

// 带一点延迟，看登录的交互效果
// const loginSuccess = data => dispatch => {
//   setTimeout(() => {
//     dispatch({
//       type: actionTypes.LOGIN_SUCCESS,
//       payload: {
//         data
//     }})
//   }, 1000)
// }

const loginFailed = () => {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('userInfo')
  window.sessionStorage.removeItem('authToken')
  window.sessionStorage.removeItem('userInfo')
  return {
    type: actionTypes.LOGIN_FAILED
  }
}

export const login = value => dispatch => {
  const { remember, ...data } = value
  dispatch(loginStart())
  loginRequest(data)
    .then(res => {
      if(res.data.code === 200) {
        const { authToken, ...userInfo } = res.data.data
        if(remember) {
          window.localStorage.setItem('authToken', authToken)
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
        } else {
          window.sessionStorage.setItem('authToken', authToken)
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        }
        dispatch(loginSuccess(res.data.data))
      } else {
        dispatch(loginFailed())
      }
    })
}

export const logout = () => dispatch => {
  // 实际项目中，这里要告诉服务器
  dispatch(loginFailed())
}

export const avatarChange = (url) => {
  return {
    type: actionTypes.AVATAR_CHANGE,
    payload: {
      url
    }
  }
}