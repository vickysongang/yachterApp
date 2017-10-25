//logs.js
const upload = require('../../utils/upload.js')
const commonApis = require('../../apis/common.js')
const noticeApis = require('../../apis/notice.js')

var app = getApp()
Page({
  data: {
    userInfo: {},
    imageList: [],
    title: '',
    content: '',
    popErrorMsg: undefined,
    noticeType: '',
    editMode: 'read',
    showModalStatus: false,
    tagName: '',
    categoryName: '',
    selectedTagIndex: undefined,
    defaultTags: []
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo,
      noticeType: options.noticeType,
    })
    commonApis.fetchCategories('notice', (err, res) => {
      that.setData({
        defaultTags: res.data.map(item => {
          return { tagName: item.name }
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
    var selectedTagIndex = 0
    var defaultTags = this.data.defaultTags
    for (var i = 0; i < defaultTags.length; i++) {
      if (defaultTags[i].tagName === this.data.categoryName) {
        selectedTagIndex = i + 1
        break
      }
    }
    this.setData({
      showModalStatus: true,
      tagName: this.data.categoryName,
      selectedTagIndex: selectedTagIndex
    });
  },
  confirmSelectTag: function () {
    var tagName = this.data.tagName
    if (tagName === undefined || tagName.length === 0) {
      this.setData({
        popErrorMsg: "内容不能为空"
      })
    } else if (tagName.length > 2) {
      this.setData({
        popErrorMsg: "不能超过两个字噢"
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
    this.setData({
      showModalStatus: false,
      selectedTagIndex: 0,
      categoryName: this.data.tagName,
      tagName: ''
    });
  },
  cancelSelectTag: function () {
    this.setData({
      showModalStatus: false,
    });
  },
  bindTagInput: function (e) {
    var tagName = e.detail.value
    var selectedTagIndex = 0
    var defaultTags = this.data.defaultTags
    for (var i = 0; i < defaultTags.length; i++) {
      if (defaultTags[i].tagName === tagName) {
        selectedTagIndex = i + 1
        break
      }
    }
    this.setData({
      selectedTagIndex: selectedTagIndex,
      tagName: tagName
    })
  },
  bindTextAreaInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  bindPublishNotice: function (e) {
    var title = this.data.title
    var categoryName = this.data.categoryName
    var content = this.data.content
    if (title === undefined || title.length === 0) {
      this.setData({
        popErrorMsg: "标题不能为空"
      })
    } else if (categoryName === undefined || categoryName.length === 0) {
      this.setData({
        popErrorMsg: "类别不能为空"
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
    var categoryName = this.data.categoryName
    var content = this.data.content
    var imageList = this.data.imageList
    wx.showLoading({
      title: '发布中...',
    })
    upload.batchUploadFiles(imageList).then((results) => {
      var imageUrls = results.map((r) => {
        return r.imageURL
      })
      noticeApis.insertNotice({
        openId: openId,
        title: title,
        content: content,
        type: this.data.noticeType,
        categoryName: categoryName,
        images: imageUrls && imageUrls.length > 0 ? imageUrls.join(',') : ''
      }, (err, res) => {
        var pages = getCurrentPages();
        if (pages.length > 1) {
          var prePage = pages[pages.length - 2];
          prePage.loadNotices(0)
        }
        wx.hideLoading()
        wx.navigateBack({})
      })
    })
  },
  selectTag: function (e) {
    var dataset = e.currentTarget.dataset
    var index = dataset.index
    var tagName = dataset.tagname
    this.setData({
      selectedTagIndex: parseInt(index),
      tagName: tagName
    })
  }
})
