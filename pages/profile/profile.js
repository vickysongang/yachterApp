//logs.js
const util = require('../../utils/util.js')
const userApis = require('../../apis/user.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    schoolName: '',
    collegeName: '',
    majorName: ''
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
          schoolName: data.school_name,
          collegeName: data.college_name,
          majorName: data.major_name
        })
      }
    })
  },
  bindNavToPage: function (event) {
    var dataset = event.currentTarget.dataset
    var url = dataset.url
    wx.navigateTo({
      url: url,
    })
  }
})
