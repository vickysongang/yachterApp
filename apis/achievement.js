var constants = require('../constants/index.js')

function queryScoreInfo(payload, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/score/query',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      bh: payload.bh,
      sfzh: payload.sfzh
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

module.exports = {
  queryScoreInfo: queryScoreInfo
}