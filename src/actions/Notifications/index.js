import actionTypes from '../actionTypes'
import { getMessageList } from '../../request'

export const markNotificationAsReadById = (id) => {
  return dispatch => {
    // dispatch的是执行的actioncreator
    dispatch(startPost())
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
        payload: {
          id
        }
      })
      dispatch(finishPost())
    }, 1000)
  }
}

export const markAllNotificationAsRead = () => {
  return dispatch => {
    dispatch(startPost())
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ
      })
      dispatch(finishPost())
    }, 1000)
  }
}

export const startPost = () => {
  return {
    type: actionTypes.START_NOTIFICATION_POST
  }
}

export const finishPost = () => {
  return {
    type: actionTypes.FINISH_NOTIFICATION_POST
  }
}

export const receivedNotifications = () => dispatch => {
  dispatch(startPost())
  getMessageList()
      .then(res => {
        dispatch({
          type: actionTypes.RECEIVED_NOTIFICATIONS,
          payload: {
            list: res.list
          }
        })
        dispatch(finishPost())
      })
}