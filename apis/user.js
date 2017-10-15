var constants = require('../constants/index.js')

function queryUserById(openId, callback){
  wx.request({
    url: constants.SERVER_ADDRESS + '/user/queryById',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      openId: openId
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

module.exports = {
  queryUserById: queryUserById
}