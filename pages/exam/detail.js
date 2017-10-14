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
  }
})
