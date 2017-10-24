//index.js
//获取应用实例
const examApis = require('../../apis/exam.js')
const commonApis = require('../../apis/common.js')
const app = getApp()

Page({
  data: {
    examType: 'college',
    exams: [],
    currPage: 0,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
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
  },
  loadExams: function () {
    examApis.queryExams({
      type: this.data.examType,
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
    }
  },
  bindNavToDetail: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: './detail?id=' + id,
    })
  },
  bindPublishExam: function (event) {
    wx.navigateTo({
      url: './publish?examType=' + this.data.examType,
    })
  }
})
