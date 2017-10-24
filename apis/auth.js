var constants = require('../constants/index.js')

function getUserAuthInfo(code, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/auth',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      code: code
    },
    success: function (res) {
      console.log('sdfsfds:', res)
      callback(null, res)
    }
  })
}

module.exports = {
  getUserAuthInfo: getUserAuthInfo
}