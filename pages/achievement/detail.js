// pages/achievement/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scoreItems:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.handleIsRegistered()
    var result = options.result
    this.setData({
      scoreItems:JSON.parse(result)
    })
  },
  onShareAppMessage: function () {
    return {}
  },
})