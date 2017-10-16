//index.js
//获取应用实例
const noticeApis = require('../../apis/notice.js')
const app = getApp()
Page({
  data: {
    noticeType: 'class',
    notices: [],
    currPage: 0
  },
  onLoad: function () {
    this.loadNotices()
  },
  loadNotices: function () {
    noticeApis.queryNotices({
      type: this.data.noticeType,
      page: 0,
      count: 10
    }, (err, result) => {
      this.setData({
        notices: result.data,
        currPage: 0
      })
    })
  },
  onPullDownRefresh: function () {
    noticeApis.queryNotices({
      type: this.data.noticeType,
      page: 0,
      count: 10
    }, (err, result) => {
      this.setData({
        notices: result.data,
        currPage: 0
      })
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom: function () {
    noticeApis.queryNotices({
      type: this.data.noticeType,
      page: this.data.currPage + 1,
      count: 10
    }, (err, result) => {
      var datas = result.data
      if (datas.length > 0) {
        this.setData({
          notices: this.data.notices.concat(result.data),
          currPage: this.data.currPage + 1
        })
      }
    })
  },
  changeTabType: function (event) {
    var noticeType = event.currentTarget.dataset.type
    this.setData({
      noticeType: noticeType,
      currPage: 0
    })
    this.loadNotices()
  },
  bindNavToDetail: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: './detail?id=' + id,
    })
  },
  bindPublishNotice: function (event) {
    wx.navigateTo({
      url: './publish?noticeType=' + this.data.noticeType,
    })
  }
})
