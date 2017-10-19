const util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
  },
  onLoad: function () {

  },
  redirectToUrl: function (e) {
    var url = e.currentTarget.dataset.url
    console.log('url is:', url)
    wx.redirectTo({
      url: url
    })
  }
})
