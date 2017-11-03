//index.js
//获取应用实例
const examApis = require('../../apis/exam.js')
const commonApis = require('../../apis/common.js')
const bannerApis = require('../../apis/banner.js')

const app = getApp()
Page({
  data: {
    examType: 'college',
    exams: [],
    currPage: 0,
    bannerInfo: {},
    defaultTags: [],
    categories: []
  },
  onLoad: function () {
    var that = this;
    commonApis.fetchCategories('exam', (err, res) => {
      that.setData({
        categories: res.data,
        defaultTags: res.data.map(item => {
          return { tagName: item.name }
        })
      })
    })
    this.loadExams()
    this.loadBanners()
  },
  loadBanners: function () {
    var collegeId = app.globalData.userDetailInfo.college_id
    var placeId = app.globalData.userDetailInfo.place_id
    bannerApis.queryBanners({
      module: 'exam',
      type: this.data.examType,
      collegeId: collegeId,
      placeId: placeId,
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
  loadExams: function () {
    examApis.queryExams({
      type: this.data.examType,
      collegeId: app.globalData.userDetailInfo.college_id,
      placeId: app.globalData.userDetailInfo.place_id,
      page: 0,
      count: 10
    }, (err, result) => {
      console.log()
      this.setData({
        exams: this.parseExamDatas(result.data),
        currPage: 0
      })
    })
  },
  parseExamDatas: function (datas) {
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
  onPullDownRefresh: function () {
    examApis.queryExams({
      type: this.data.examType,
      collegeId: app.globalData.userDetailInfo.college_id,
      placeId: app.globalData.userDetailInfo.place_id,
      page: 0,
      count: 10
    }, (err, result) => {
      this.setData({
        exams: this.parseExamDatas(result.data),
        currPage: 0
      })
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom: function () {
    examApis.queryExams({
      type: this.data.examType,
      collegeId: app.globalData.userDetailInfo.college_id,
      placeId: app.globalData.userDetailInfo.place_id,
      page: this.data.currPage + 1,
      count: 10
    }, (err, result) => {
      var datas = result.data
      if (datas.length > 0) {
        this.setData({
          exams: this.parseExamDatas(this.data.exams.concat(result.data)),
          currPage: this.data.currPage + 1
        })
      }
    })
  },
  switchNav: function (e) {
    var that = this;
    if (this.data.examType === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        examType: e.target.dataset.current,
        currPage: 0
      })
      this.loadExams()
      this.loadBanners()
    }
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
  bindPublishExam: function (event) {
    wx.navigateTo({
      url: './publish?examType=' + this.data.examType,
    })
  },
  incrReadCount: function (id) {
    var exams = this.data.exams
    var newExams = exams.map((exam) => {
      if (exam.id === parseInt(id)) {
        exam.readCount = exam.readCount + 1
      }
      return exam
    })
    this.setData({
      exams: newExams
    })
  }
})
