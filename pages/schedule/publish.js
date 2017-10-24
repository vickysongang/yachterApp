//logs.js
const commonApis = require('../../apis/common.js')
const userApis = require('../../apis/user.js')
const scheduleApis = require('../../apis/schedule.js')
const upload = require('../../utils/upload.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    schoolId: undefined,
    schoolName: '',
    colleageId: undefined,
    collegeName: '',
    majorId: undefined,
    majorName: '',
    gradeId: undefined,
    gradeName: '',
    imageList: [],
    years: [],
    yearNames: [],
    yearIndex: 0,
    seasons: [],
    seasonNames: [],
    seasonIndex: 0
  },
  onLoad: function () {
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })
    commonApis.fetchYears((err, res) => {
      that.setData({
        years: res.data,
        yearNames: res.data.map(item => {
          return item.name
        })
      })
    })
    commonApis.fetchSeasons((err, res) => {
      that.setData({
        seasons: res.data,
        seasonNames: res.data.map(item => {
          return item.name
        })
      })
    }),
      userApis.queryUserInfoById(app.globalData.openId, (err, res) => {
        if (res.data.length > 0) {
          var data = res.data[0]
          that.setData({
            schoolId: data.school_id,
            schoolName: data.school_name,
            collegeId: data.college_id,
            collegeName: data.college_name,
            majorId: data.major_id,
            majorName: data.major_name,
            gradeId: data.grade_id,
            gradeName: data.grade_name
          })
        }
      })
  },
  bindPickYear: function (e) {
    var yearIndex = e.detail.value
    this.setData({
      yearIndex: yearIndex
    })
  },
  bindPickSeason: function (e) {
    var seasonIndex = e.detail.value
    this.setData({
      seasonIndex: seasonIndex
    })
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 9,
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  bindTextAreaInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  bindPublishSchedule: function (e) {
    var content = this.data.content
    if (content === undefined || content.length === 0) {
      this.setData({
        popErrorMsg: "内容不能为空"
      })
    }
    var popErrorMsg = this.data.popErrorMsg
    if (popErrorMsg && popErrorMsg.length > 0) {
      setTimeout(() => {
        this.setData({
          popErrorMsg: ''
        });
      }, 1000)
      return
    }
    var openId = app.globalData.openId
    var collegeId = this.data.collegeId
    var schoolId = this.data.schoolId
    var content = this.data.content
    var imageList = this.data.imageList
    wx.showLoading({
      title: '发布中...',
    })
    upload.batchUploadFiles(imageList).then((results) => {
      var imageUrls = results.map((r) => {
        return r.imageURL
      })
      scheduleApis.insertSchedule({
        openId: openId,
        collegeId: collegeId,
        schoolId: schoolId,
        content: content,
        year: this.data.years[this.data.yearIndex].name,
        seasonId: this.data.seasons[this.data.seasonIndex].id,
        images: imageUrls && imageUrls.length > 0 ? imageUrls.join(',') : ''
      }, (err, res) => {
        var pages = getCurrentPages();
        if (pages.length > 1) {
          var prePage = pages[pages.length - 2];
          prePage.loadSchedules()
        }
        wx.hideLoading()
        wx.navigateBack({})
      })
    })
  },
})
