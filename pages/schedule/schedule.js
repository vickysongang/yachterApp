const commonApis = require('../../apis/common.js')
const scheduleApis = require('../../apis/schedule.js')
const bannerApis = require('../../apis/banner.js')
var app = getApp()
Page({
  data: {
    currPage: 0,
    bannerInfo: {},
    schedules: []
  },
  onLoad: function () {
    app.handleIsRegistered()
    this.loadBanners()
    this.loadSchedules()
  },
  onShareAppMessage: function () {
    return {}
  },
  loadBanners: function () {
    var schoolId = app.globalData.userDetailInfo.school_id
    var collegeId = app.globalData.userDetailInfo.college_id
    bannerApis.queryBanners({
      module: 'schedule',
      type: 'schedule',
      collegeId: collegeId,
      schoolId: schoolId
    }, (err, res) => {
      this.setData({
        bannerInfo: {
          indicatorDots: false,
          autoplay: true,
          interval: 5000,
          duration: 500,
          banners: res.data || []
        }
      })
    })
  },
  loadSchedules: function () {
    scheduleApis.querySchedules({
      schoolId: app.globalData.userDetailInfo.school_id,
      collegeId: app.globalData.userDetailInfo.college_id,
      majorId: app.globalData.userDetailInfo.major_id,
      classId: app.globalData.userDetailInfo.class_id,
      year: app.globalData.userDetailInfo.year,
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
      schoolId: app.globalData.userDetailInfo.school_id,
      collegeId: app.globalData.userDetailInfo.college_id,
      majorId: app.globalData.userDetailInfo.major_id,
      classId: app.globalData.userDetailInfo.class_id,
      year: app.globalData.userDetailInfo.year,
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
      schoolId: app.globalData.userDetailInfo.school_id,
      collegeId: app.globalData.userDetailInfo.college_id,
      majorId: app.globalData.userDetailInfo.major_id,
      classId: app.globalData.userDetailInfo.class_id,
      year: app.globalData.userDetailInfo.year,
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
    var data = this.data
    var schedules = data.schedules.filter((item) => {
      return item.id === parseInt(id)
    })
    var schedule = schedules[0]
    var title = schedule.collegeName + schedule.majorName + schedule.year + schedule.className + '课表'
    wx.navigateTo({
      url: './detail?id=' + id + '&title=' + title,
    })
  },
  navToBannerDetail: function (e) {
    var id = e.currentTarget.dataset.bannerid
    var title =
      wx.navigateTo({
        url: '../banner/detail?id=' + id
      })
  },
  bindPublishSchedule: function (event) {
    wx.navigateTo({
      url: './publish',
    })
  }
})
