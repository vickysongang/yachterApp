//index.js
//获取应用实例
const noticeApis = require('../../apis/notice.js')
const app = getApp()
Page({
  data: {
    noticeType: 'class',
    notices: [],
    currPage: 0,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
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
  swichNav: function (e) {
    var that = this;
    if (this.data.noticeType === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        noticeType: e.target.dataset.current,
        currPage: 0
      })
      this.loadNotices()
    }
  },
  removeNoticeItem: function (id) {
    var notices = this.data.notices.filter((val) => {
      return val.id !== parseInt(id)
    })
    this.setData({
      notices: notices
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
