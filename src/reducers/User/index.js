import actionTypes from '../../actions/actionTypes'

const isLogin = Boolean(window.localStorage.getItem('authToken')) || Boolean(window.sessionStorage.getItem('authToken'))
const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'))

const initState = {
  ...userInfo,
  isLogin: isLogin,
  isLoading: false
}

export default (state = initState, action) => {
  switch(action.type) {
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.data,
        isLoading: false,
        isLogin: true
      }
    case actionTypes.LOGIN_FAILED:
      return {
        id: '',
        displayName: '',
        avatar: '',
        role: '',
        isLoading: false,
        isLogin: false
      }
    case actionTypes.AVATAR_CHANGE:
      return {
        ...state,
        avatar: action.payload.url
      }
    default:
      return state
  }
}