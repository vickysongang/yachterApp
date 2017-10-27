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
    this.loadBanners()
    this.loadSchedules()
  },
  loadBanners: function () {
    var noticeType = this.data.noticeType
    var collegeId = app.globalData.userDetailInfo.college_id
    bannerApis.queryBanners({
      module: 'schedule',
      type: 'schedule',
      collegeId: collegeId,
      gradeId: 0,
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
  navToBannerDetail: function (e) {
    var id = e.currentTarget.dataset.bannerid
    wx.navigateTo({
      url: '../banner/detail?id=' + id,
    })
  },
  bindPublishSchedule: function (event) {
    wx.navigateTo({
      url: './publish',
    })
  }
})
