// pages/profile/feedback.js
const feedbackApis = require('../../apis/feedback.js')
const textUtil = require('../../utils/textUtil.js')

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    popErrorMsg: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindTextAreaInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  publishFeedback: function () {
    var content = this.data.content
    if (content === undefined || content.length === 0) {
      this.setData({
        popErrorMsg: "内容不能为空"
      })
    } else if (textUtil.checkSensitiveWord(content)) {
      this.setData({
        popErrorMsg: "内容不能包含敏感词"
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
    wx.showLoading({
      title: '发布中...',
    })
    feedbackApis.insertFeedback({
      openId: app.globalData.openId,
      content: this.data.content
    }, (err, result) => {
      wx.hideLoading()
      wx.showToast({
        title: '反馈成功',
        icon: 'success',
        duration: 3000,
        success: () => {
          wx.navigateBack({})
        }
      })
    })
  }
})