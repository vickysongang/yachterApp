var constants = require('../constants/index.js')

function queryBanners(payload, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/banner/list',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: payload,
    success: function (res) {
      callback(null, res)
    }
  })
}

function getBannerDetail(id, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/banner/detail',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      id: id
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

function deleteBanner(id, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/banner/delete',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      id: id
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

module.exports = {
  queryBanners: queryBanners,
  getBannerDetail: getBannerDetail,
  deleteBanner: deleteBanner,
}