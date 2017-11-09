const scheduleApis = require('../../apis/schedule.js')
var WxParse = require('../../wxParse/wxParse.js')
const htmlUtil = require('../../utils/htmlUtil.js')

var app = getApp()
Page({
  data: {
    userInfo: {},
    detailInfo: {
      id: undefined,
      title: '',
      pubTime: '',
      creatorName: '',
      content: '',
      images: [],
      canDelete: false
    }
  },
  onLoad: function (options) {
    app.handleIsRegistered()
    var id = options.id
    var that = this
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.showNavigationBarLoading()
    scheduleApis.getScheduleDetail(id, (err1, res1) => {
      wx.hideNavigationBarLoading()
      if (res1.data.length > 0) {
        var detail = res1.data[0]
        var images = []
        var imageStr = detail.images
        if (imageStr && imageStr.length > 0) {
          images = imageStr.split(',')
        }
        if (htmlUtil.isHtml(detail.content)) {
          WxParse.wxParse('richContent', 'html', detail.content, this, 5);
        } 
        this.setData({
          detailInfo: {
            id: id,
            title: options.title,
            pubTime: detail.pubTime,
            creatorName: detail.creatorName,
            content: htmlUtil.replaceEscape(detail.content),
            images: images,
            canDelete: app.globalData.openId === detail.openId
          }
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {}
  },
  deleteAction: function (e) {
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否确认删除？',
      success: function (res) {
        if (res.confirm) {
          scheduleApis.deleteSchedule(id, (err, res) => {
            var pages = getCurrentPages();
            if (pages.length > 1) {
              //上一个页面实例对象
              var prePage = pages[pages.length - 2];
              //关键在这里
              prePage.removeScheduleItem(id)
            }
            wx.navigateBack({})
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
