import { AsyncStorage } from 'react-native';

this.state = {
  userInfo:0
}
(async () => {
  this.setState({
    userInfo: 1
  })
})()
var userInfo = this.state.userInfo
console.log(userInfo)

var UserInfo = {
  phone:userInfo.phone,
  balance:userInfo.balance,
  nickName:userInfo.nickName,
  shopName:userInfo.shopName,
  state:userInfo.state,
  time:userInfo.time
}

module.exports = {
  UserInfo
}
