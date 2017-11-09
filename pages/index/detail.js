//logs.js
const util = require('../../utils/util.js')
const htmlUtil = require('../../utils/htmlUtil.js')
const noticeApis = require('../../apis/notice.js')
var WxParse = require('../../wxParse/wxParse.js')
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
      images:[],
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
    noticeApis.incrNoticeReadCount(id, (err, res) => {
      noticeApis.getNoticeDetail(id, (err1, res1) => {
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
              title: detail.title,
              readCount: detail.read_count,
              pubTime: detail.pubTime,
              creatorName: detail.creatorName,
              content: htmlUtil.replaceEscape(detail.content),
              images: images,
              canDelete: app.globalData.openId === detail.openId
            }
          })
        }
        var pages = getCurrentPages();
        if (pages.length > 1) {
          //上一个页面实例对象
          var prePage = pages[pages.length - 2];
          //关键在这里
          prePage.incrReadCount(id)
        }
      })
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
          noticeApis.deleteNotice(id, (err, res) => {
            var pages = getCurrentPages();
            if (pages.length > 1) {
              //上一个页面实例对象
              var prePage = pages[pages.length - 2];
              //关键在这里
              prePage.removeNoticeItem(id)
            }
            wx.navigateBack({
            })
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
