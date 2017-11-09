const achievementApis = require('../../apis/achievement.js')
const commonApis = require('../../apis/common.js')
var app = getApp()
Page({
  data: {
    bh: '',
    sfzh: '',
    loading: false,
    popErrorMsg: '',
    canQueryScore: undefined
  },
  onLoad: function () {
    app.handleIsRegistered()
    wx.showNavigationBarLoading()
    var userDetailInfo = app.globalData.userDetailInfo
    commonApis.getSchoolDetail(userDetailInfo.school_id, (err,res)=>{
      wx.hideNavigationBarLoading()
      if(res.data && res.data.length > 0){
        this.setData({
          canQueryScore: res.data[0].can_query_score === 'Y'
        })
      }
    })
    var queryInfo = wx.getStorageSync('queryInfo')
    if (queryInfo) {
      this.setData({
        bh: queryInfo.bh,
        sfzh: queryInfo.sfzh
      })
    }
  },
  onShareAppMessage: function () {
    return {}
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
        this.setData({
          loading: false
        })
        return
      }
      this.setData({
        loading: false
      })
      wx.setStorage({
        key: 'queryInfo',
        data: {
          bh: this.data.bh,
          sfzh: this.data.sfzh
        },
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
