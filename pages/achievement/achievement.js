const achievementApis = require('../../apis/achievement.js')
var app = getApp()
Page({
  data: {
    bh: '',
    sfzh: '',
    loading: false,
    popErrorMsg: ''
  },
  onLoad: function () {

  },
  bindBhInput: function (e) {
    this.setData({
      bh: e.detail.value
    })
  },
  bindSfzhInput: function (e) {
    this.setData({
      sfzh: e.detail.value
    })
  },
  bindQueryAction: function () {
    if (this.data.bh.length === 0) {
      this.setData({
        popErrorMsg: "必须输入资格卡号(或姓名)"
      })
    } else if (this.data.sfzh.length === 0) {
      this.setData({
        popErrorMsg: "必须输入身份证号"
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
      loading: true
    })
    achievementApis.queryScoreInfo({
      bh: this.data.bh,
      sfzh: this.data.sfzh
    }, (err, res) => {
      var data = res.data
      if (data.code === 1) {
        wx.showModal({
          title: '提示',
          content: data.msg,
          showCancel: false
        })
      }
      this.setData({
        loading: false
      })
      wx.navigateTo({
        url: './detail?result=' + JSON.stringify(data.result)
      })
    })
  },
  bindResetAction: function () {
    this.setData({
      bh: '',
      sfzh: ''
    })
  }
})
