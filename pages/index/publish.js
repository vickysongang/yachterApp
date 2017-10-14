//logs.js
const util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    imageList: [],
    title: '我的通知',
    creatorName: '',
    typeName: ''
  },
  onLoad: function () {
    var that = this
    this.setData({
      userInfo: app.globalData.userInfo
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
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  bindTitleAction: function () {
    var params = 'key=title&value='+ this.data.title
    wx.navigateTo({
      url: '../common/TextInput/Textinput?' + params,
    })
  }
})
