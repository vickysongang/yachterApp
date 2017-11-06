//logs.js
const util = require('../../utils/util.js')
const examApis = require('../../apis/exam.js')
const htmlUtil = require('../../utils/htmlUtil.js')
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
    examApis.incrExamReadCount(id, (err, res) => {
      examApis.getExamDetail(id, (err1, res1) => {
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
          var pages = getCurrentPages();
          if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.incrReadCount(id)
          }
        }
      })
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

