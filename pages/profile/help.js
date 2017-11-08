// pages/profile/help.js
var WxParse = require('../../wxParse/wxParse.js')
var app = getApp()
Page({
  data: {
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var config = app.globalData.config
    WxParse.wxParse('richContent', 'html', config ? config.help_content : '', this, 5);
  },
  onShareAppMessage: function () {
    return {}
  }
})