var constants = require('../constants/index.js')

function insertFeedback(payload, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/feedback/insert',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      openId: payload.openId,
      content: payload.content
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

module.exports = {
  insertFeedback: insertFeedback
}