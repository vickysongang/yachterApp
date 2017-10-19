//logs.js
const upload = require('../../utils/upload.js')
const commonApis = require('../../apis/common.js')
const examApis = require('../../apis/exam.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    imageList: [],
    title: '',
    categories: [],
    categoryNames: [],
    categoryIndex: 0,
    content: '',
    popErrorMsg: undefined,
    examType: '',
    editMode: 'read'
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo,
      examType: options.examType,
    })
    commonApis.fetchCategories('exam', (err, res) => {
      that.setData({
        categories: res.data,
        categoryNames: res.data.map(item => {
          return item.name
        })
      })
    })
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 9,
      success: function (res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  bindTitleAction: function () {
    this.setData({
      editMode: 'edit'
    })
  },
  bindInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindInputBlur: function () {
    this.setData({
      editMode: 'read'
    })
  },
  bindPickCategory: function (e) {
    this.setData({
      categoryIndex: e.detail.value
    })
  },
  bindTextAreaInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  bindPublishExam: function (e) {
    var title = this.data.title
    var content = this.data.content
    if (title === undefined || title.length === 0) {
      this.setData({
        popErrorMsg: "标题不能为空"
      })
    } else if (content === undefined || content.length === 0) {
      this.setData({
        popErrorMsg: "内容不能为空"
      })
    }
    var popErrorMsg = this.data.popErrorMsg
    if (popErrorMsg && popErrorMsg.length > 0) {
      setTimeout(() => {
        this.setData({
          popErrorMsg: ''
        });
      }, 1000)
      return
    }
    var title = this.data.title
    var openId = app.globalData.openId
    var categoryId = this.data.categories[this.data.categoryIndex].id
    var content = this.data.content
    var imageList = this.data.imageList
    wx.showLoading({
      title: '发布中...',
    })
    upload.batchUploadFiles(imageList).then((results) => {
      var imageUrls = results.map((r) => {
        return r.imageURL
      })
      examApis.insertExam({
        openId: openId,
        title: title,
        content: content,
        type: this.data.examType,
        categoryId: categoryId,
        images: imageUrls && imageUrls.length > 0 ? imageUrls.join(',') : ''
      }, (err, res) => {
        var pages = getCurrentPages();
        if (pages.length > 1) {
          var prePage = pages[pages.length - 2];
          prePage.loadExams(0)
        }
        wx.hideLoading()
        wx.navigateBack({})
      })
    })
  }
})
