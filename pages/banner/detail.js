//logs.js
const util = require('../../utils/util.js')
const bannerApis = require('../../apis/banner.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    detailInfo: {
      id: undefined,
      title: '',
      readCount: 0,
      pubTime: '',
      creatorName: '',
      content: '',
      images: [],
      canDelete: false
    }
  },
  onLoad: function (options) {
    var id = options.id
    var that = this
    this.setData({
      userInfo: app.globalData.userInfo
    })
    bannerApis.getBannerDetail(id, (err1, res1) => {
      if (res1.data.length > 0) {
        var detail = res1.data[0]
        var images = []
        var imageStr = detail.images
        if (imageStr && imageStr.length > 0) {
          images = imageStr.split(',')
        }
        this.setData({
          detailInfo: {
            id: id,
            title: detail.title,
            pubTime: detail.pubTime,
            creatorName: detail.creatorName,
            content: detail.content,
            images: images,
            canDelete: false
          }
        })
      }
    })
  },
  previewImage: function (e) {
    var that = this
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: that.data.detailInfo.images
    })
  }
})

