const commonApis = require('../../apis/common.js')
const scheduleApis = require('../../apis/schedule.js')
var app = getApp()
Page({
  data: {
    currPage: 0,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    schedules: []
  },
  onLoad: function () {
    this.loadSchedules()
  },
  loadSchedules: function () {
    scheduleApis.querySchedules({
      collegeId: app.globalData.userDetailInfo.college_id,
      page: 0,
      count: 10
    }, (err, result) => {
      this.setData({
        schedules: result.data,
        currPage: 0
      })
    })
  },
  onPullDownRefresh: function () {
    scheduleApis.querySchedules({
      collegeId: app.globalData.userDetailInfo.college_id,
      page: 0,
      count: 10
    }, (err, result) => {
      this.setData({
        schedules: result.data,
        currPage: 0
      })
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom: function () {
    scheduleApis.querySchedules({
      collegeId: app.globalData.userDetailInfo.college_id,
      page: this.data.currPage + 1,
      count: 10
    }, (err, result) => {
      var datas = result.data
      if (datas.length > 0) {
        this.setData({
          schedules: this.data.schedules.concat(result.data),
          currPage: this.data.currPage + 1
        })
      }
    })
  },
  removeScheduleItem: function (id) {
    var schedules = this.data.schedules.filter((val) => {
      return val.id !== parseInt(id)
    })
    this.setData({
      schedules: schedules
    })
  },
  bindNavToScheduleDetail: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: './detail?id=' + id,
    })
  },
  bindPublishSchedule: function (event) {
    wx.navigateTo({
      url: './publish',
    })
  }
})
