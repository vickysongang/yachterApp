//logs.js
const util = require('../../utils/util.js')
const commonApis = require('../../apis/common.js')
const noticeApis = require('../../apis/notice.js')
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
    noticeType: ''
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo,
      noticeType: options.noticeType,
    })
    commonApis.fetchCategories('notice', (err, res) => {
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
        console.log(res)
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
    var params = 'key=title&value=' + this.data.title
    wx.navigateTo({
      url: '../common/TextInput/Textinput?' + params,
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
  bindPublishNotice: function (e) {
    if (this.data.title === undefined || this.data.title.length === 0) {
      this.setData({
        popErrorMsg: "标题不能为空"
      })
    } if (this.data.content === undefined || this.data.content.length === 0) {
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
    noticeApis.insertNotice({
      openId: openId,
      title: title,
      content: content,
      type: this.data.noticeType,
      categoryId: categoryId,
      images: imageList && imageList.length > 0 ? imageList.join(',') : ''
    }, (err, res) => {
      var pages = getCurrentPages();
      if (pages.length > 1) {
        //上一个页面实例对象
        var prePage = pages[pages.length - 2];
        //关键在这里
        prePage.loadNotices(0)
      }
      wx.navigateBack({
      })
    })
  }
})
