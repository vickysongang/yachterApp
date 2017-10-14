// pages/common/TextInput/Textinput.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputKey: '',
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var key = options.key
    var value = options.value
    this.setData({
      inputKey: key,
      inputValue: value
    })
  },
  bindInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindFinishAction: function () {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      [this.data.inputKey]: this.data.inputValue
    })
    wx.navigateBack({})
  },
  bindConfirm: function () {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      [this.data.inputKey]: this.data.inputValue
    })
    wx.navigateBack({})
  }
})