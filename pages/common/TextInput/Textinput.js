// pages/common/TextInput/Textinput.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputKey: '',
    inputValue: '',
    maxlength: 140
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var key = options.key
    var navBarTitle = '填写内容'
    switch(key){
      case 'title':
        navBarTitle = '填写标题'
        break
      case 'phone':
        navBarTitle = '填写手机号码'
        this.setData({
          maxlength: 11
        })
        break
    }
    wx.setNavigationBarTitle({
      title: navBarTitle
    })
    var value = options.value
    this.setData({
      inputKey: key,
      inputValue: value
    })
  },
  bindInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindFinishAction: function () {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      [this.data.inputKey]: this.data.inputValue
    })
    wx.navigateBack({})
  },
  bindConfirm: function () {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      [this.data.inputKey]: this.data.inputValue
    })
    wx.navigateBack({})
  }
})