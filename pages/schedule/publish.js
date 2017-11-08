//logs.js
const commonApis = require('../../apis/common.js')
const userApis = require('../../apis/user.js')
const scheduleApis = require('../../apis/schedule.js')
const upload = require('../../utils/upload.js')
const textUtil = require('../../utils/textUtil.js')

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
    placeId: undefined,
    placeName: '',
    classId: undefined,
    className: '',
    imageList: [],
    year: undefined,
  },
  onLoad: function () {
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })
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
          year: data.year,
          placeId: data.place_id,
          placeName: data.place_name,
          classId: data.class_id,
          className: data.class_name
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
    var imageList = this.data.imageList
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 9,
      success: function (res) {
        that.setData({
          imageList: imageList.concat(res.tempFilePaths)
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
    } else if (textUtil.checkSensitiveWord(content)) {
      this.setData({
        popErrorMsg: "内容不能包含敏感词"
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
    var placeId = this.data.placeId
    var classId = this.data.classId
    var majorId = this.data.majorId
    var content = this.data.content
    var year = this.data.year
    var imageList = this.data.imageList
    wx.showLoading({
      title: '发布中...',
    })
    var config = app.globalData.config
    var approveFlag = 'Y'
    if (config.schedule_af === 'Y') {
      approveFlag = 'N'
    }
    upload.batchUploadFiles(imageList).then((results) => {
      var imageUrls = results.map((r) => {
        return r.imageURL
      })
      scheduleApis.insertSchedule({
        openId: openId,
        collegeId: collegeId,
        schoolId: schoolId,
        content: content,
        year: year,
        placeId: placeId,
        classId: classId,
        majorId: majorId,
        approveFlag: approveFlag,
        images: imageUrls && imageUrls.length > 0 ? imageUrls.join(',') : ''
      }, (err, res) => {
        wx.hideLoading()
        if (approveFlag === 'N') {
          wx.showModal({
            title: '提示',
            content: '课表已提交，请耐心等待审核！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({})
              }
            }
          })
        } else {
          var pages = getCurrentPages();
          if (pages.length > 1) {
            var prePage = pages[pages.length - 2];
            prePage.loadSchedules()
          }
          wx.navigateBack({})
        }
      })
    })
  },
})
