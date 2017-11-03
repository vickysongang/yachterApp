var constants = require('../constants/index.js')

function insertNotice(payload, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/notice/insert',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data:payload,
    success: function (res) {
      callback(null, res)
    }
  })
}

function queryNotices(payload, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/notice/list',
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

function getNoticeDetail(id, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/notice/detail',
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

function deleteNotice(id, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/notice/delete',
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

function incrNoticeReadCount(id, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/notice/readcount/incr',
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
  insertNotice: insertNotice,
  queryNotices: queryNotices,
  getNoticeDetail: getNoticeDetail,
  deleteNotice: deleteNotice,
  incrNoticeReadCount: incrNoticeReadCount
}