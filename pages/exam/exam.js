//index.js
//获取应用实例
const examApis = require('../../apis/exam.js')
const app = getApp()

Page({
  data: {
    examType: 'college',
    exams: [],
    currPage: 0
  },
  onLoad: function () {
    this.loadExams()
  },
  loadExams: function () {
    examApis.queryExams({
      type: this.data.examType,
      page: 0,
      count: 10
    }, (err, result) => {
      this.setData({
        exams: result.data,
        currPage: 0
      })
    })
  },
  onPullDownRefresh: function () {
    examApis.queryExams({
      type: this.data.examType,
      page: 0,
      count: 10
    }, (err, result) => {
      this.setData({
        exams: result.data,
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
          exams: this.data.exams.concat(result.data),
          currPage: this.data.currPage + 1
        })
      }
    })
  },
  changeTabType: function (event) {
    var examType = event.currentTarget.dataset.type
    this.setData({
      examType: examType,
      currPage: 0
    })
    this.loadExams()
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
