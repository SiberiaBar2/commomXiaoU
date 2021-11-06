import { combineReducers } from 'redux'


// 为什么每次都能进到这
const userInfo = JSON.parse(sessionStorage.getItem('userinfo')) || '{}'
const InitData = userInfo ? userInfo : []

const NavabarData = (state = InitData, action) => {
  switch (action.type) {
    case 'init':
      const { data } = action
      return data

    default:
      return state
  }
}
const otherSdata = (state = [], action) => {
  switch (action.type) {
    case 'init':
      console.log('otherSdata的init', action);
      const { data } = action
      return data

    default:
      return state
  }
}

export default combineReducers({
  NavabarData,
  otherSdata
})