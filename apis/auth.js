var constants = require('../constants/index.js')

function getUserAuthInfo(code, callback) {
  var APPID = constants.APPID
  var SECRET = constants.SECRET
  var FETCH_OPENID_URL = constants.FETCH_OPENID_URL
  //调用request请求api转换登录凭证  
  wx.request({
    url: FETCH_OPENID_URL + '?appid=' + APPID + '&secret=' + SECRET + '&grant_type=authorization_code&js_code=' + code,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callback(null, res)
    }
  })  
}

module.exports = {
  getUserAuthInfo: getUserAuthInfo
}