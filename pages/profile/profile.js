//logs.js
const util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    var that = this
    this.setData({
      userInfo: app.globalData.userInfo
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
