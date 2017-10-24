var constants = require('../constants/index.js')

function insertSchedule(payload, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/schedule/insert',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      openId: payload.openId,
      collegeId: payload.collegeId,
      schoolId: payload.schoolId,
      content: payload.content,
      year: payload.year,
      seasonId: payload.seasonId,
      images: payload.images
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

function querySchedules(payload, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/schedule/list',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      page: payload.page,
      count: payload.count
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

function getScheduleDetail(id, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/schedule/detail',
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

function deleteSchedule(id, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/schedule/delete',
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
  insertSchedule: insertSchedule,
  querySchedules: querySchedules,
  getScheduleDetail: getScheduleDetail,
  deleteSchedule: deleteSchedule
}