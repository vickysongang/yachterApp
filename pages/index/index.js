//index.js
//获取应用实例
const noticeApis = require('../../apis/notice.js')
const commonApis = require('../../apis/common.js')
const bannerApis = require('../../apis/banner.js')
const app = getApp()
Page({
  data: {
    noticeType: 'college',
    notices: [],
    currPage: 0,
    bannerInfo: {},
    defaultTags: [],
    categories: []
  },
  onLoad: function () {
    var that = this;
    commonApis.fetchCategories('notice', (err, res) => {
      that.setData({
        categories: res.data,
        defaultTags: res.data.map(item => {
          return { tagName: item.name }
        })
      })
    })
    wx.showNavigationBarLoading()
    var interval = setInterval(() => {
      var openId = app.globalData.userDetailInfo.open_id
      if (openId && openId.length > 0) {
        interval && clearInterval(interval)
        this.loadNotices()
        this.loadBanners()
        wx.hideNavigationBarLoading()
      }
    }, 1000)
  },
  onShareAppMessage: function() {
    return {}
  },
  loadBanners: function () {
    var noticeType = this.data.noticeType
    var collegeId = app.globalData.userDetailInfo.college_id
    var schoolId = app.globalData.userDetailInfo.school_id
    var majorId = app.globalData.userDetailInfo.major_id
    bannerApis.queryBanners({
      module: 'notice',
      type: noticeType,
      collegeId: collegeId,
      schoolId: schoolId,
      majorId: majorId
    }, (err, res) => {
      this.setData({
        bannerInfo: {
          indicatorDots: false,
          autoplay: true,
          interval: 5000,
          duration: 500,
          banners: res.data || []
        }
      })
    })
  },
  loadNotices: function () {
    noticeApis.queryNotices({
      type: this.data.noticeType,
      schoolId: app.globalData.userDetailInfo.school_id,
      collegeId: app.globalData.userDetailInfo.college_id,
      majorId: app.globalData.userDetailInfo.major_id,
      placeId: app.globalData.userDetailInfo.place_id,
      year: app.globalData.userDetailInfo.year,
      page: 0,
      count: 10
    }, (err, result) => {
      this.setData({
        notices: this.parseNoticeDatas(result.data),
        currPage: 0
      })
    })
  },
  parseNoticeDatas: function (datas) {
    return datas.map((data) => {
      var color = this.getCategoryColor(data.categoryName)
      return Object.assign(data, { color: color })
    })
  },
  getCategoryColor: function (categoryName) {
    var categories = this.data.categories
    for (var i = 0; i < categories.length; i++) {
      if (categoryName === categories[i].name) {
        return categories[i].color
      }
    }
    return 'other'
  },
  switchNav: function (e) {
    var that = this;
    if (this.data.noticeType === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        noticeType: e.target.dataset.current,
        currPage: 0
      })
      this.loadNotices()
      this.loadBanners()
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
      schoolId: app.globalData.userDetailInfo.school_id,
      collegeId: app.globalData.userDetailInfo.college_id,
      majorId: app.globalData.userDetailInfo.major_id,
      placeId: app.globalData.userDetailInfo.place_id,
      year: app.globalData.userDetailInfo.year,
      page: 0,
      count: 10
    }, (err, result) => {
      this.setData({
        notices: this.parseNoticeDatas(result.data),
        currPage: 0
      })
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom: function () {
    noticeApis.queryNotices({
      type: this.data.noticeType,
      schoolId: app.globalData.userDetailInfo.school_id,
      collegeId: app.globalData.userDetailInfo.college_id,
      majorId: app.globalData.userDetailInfo.major_id,
      placeId: app.globalData.userDetailInfo.place_id,
      year: app.globalData.userDetailInfo.year,
      page: this.data.currPage + 1,
      count: 10
    }, (err, result) => {
      var datas = result.data
      if (datas.length > 0) {
        this.setData({
          notices: this.parseNoticeDatas(this.data.notices.concat(result.data)),
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
  navToBannerDetail: function (e) {
    var id = e.currentTarget.dataset.bannerid
    wx.navigateTo({
      url: '../banner/detail?id=' + id,
    })
  },
  bindPublishNotice: function (event) {
    wx.navigateTo({
      url: './publish?noticeType=' + this.data.noticeType,
    })
  },
  incrReadCount: function(id){
    var notices = this.data.notices
    var newNotices = notices.map((notice)=>{
      if (notice.id === parseInt(id)) {
        notice.readCount = notice.readCount + 1
      }
      return notice
    })
    this.setData({
      notices: newNotices
    })
  }
})
