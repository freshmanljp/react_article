import actionTypes from '../../actions/actionTypes'

const initState = {
  isLoading: false,
  list: [{
    id: 1,
    title: '账号余额不足',
    dsc: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
    isRead: false
  },
  {
    id: 2,
    title: '你女朋友跑路了',
    dsc: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
    isRead: true
  },
  {
    id: 3,
    title: '导师问你为什么不在实验室',
    dsc: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
    isRead: true
  },
  {
    id: 4,
    title: '该关心一下自己了',
    dsc: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
    isRead: false
  }]
}

export default (state = initState, action) => {
  switch(action.type) {
    case actionTypes.START_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FINISH_NOTIFICATION_POST:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
      // 一下这种操作不行为什么
      // let newList = state.list
      // newList.forEach(item => {
      //   if(item.id === action.payload.id) {
      //     item.isRead = true
      //   }
      // })
      let newList = state.list.map(item => {
        if(item.id === action.payload.id) {
          item.isRead = true
        }
        return item
      })
      return {
        ...state,
        list: newList
      }
    case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
      return {
        ...state,
        list: state.list.map(item => {
          item.isRead = true
          return item
        })
      }
    case actionTypes.RECEIVED_NOTIFICATIONS:
      return {
        ...state,
        list: action.payload.list
      }
    default:
      return state
  }
}