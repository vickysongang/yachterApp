var constants = require('../constants/index.js')

function insertExam(payload, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/exam/insert',
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

function queryExams(payload, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/exam/list',
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

function getExamDetail(id, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/exam/detail',
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

function deleteExam(id, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/exam/delete',
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

function incrExamReadCount(id, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/exam/readcount/incr',
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
  insertExam: insertExam,
  queryExams: queryExams,
  getExamDetail: getExamDetail,
  deleteExam: deleteExam,
  incrExamReadCount: incrExamReadCount
}