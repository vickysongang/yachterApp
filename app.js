//app.js
var authApis = require('./apis/auth.js')
var userApis = require('./apis/user.js')
var commonApis = require('./apis/common.js')
App({
  onLaunch: function () {
    var that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        authApis.getUserAuthInfo(res.code, (err, result) => {
          var data = JSON.parse(result.data.text)
          var openId = data.openid
          that.globalData.openId = openId
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                that.getUserInfo()
                that.getUserDetailInfo()
                that.getConfigInfo()
                that.navToJoinHomePage(openId)
              } else {
                wx.authorize({
                  scope: 'scope.userInfo',
                  success(res) {
                    that.getConfigInfo()
                    that.navToJoinHomePage(openId)
                  }
                })
              }
            }
          })
        })
      }
    })
  },
  getUserInfo: function () {
    wx.getUserInfo({
      success: res => {
        this.globalData.userInfo = res.userInfo
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  getUserDetailInfo: function(){
    userApis.queryUserInfoById(this.globalData.openId, (err, info) => {
      if (info.data && info.data.length > 0) {
        var detailInfo = info.data[0]
        this.globalData.userDetailInfo = detailInfo
        if (detailInfo.status === 2) {
          wx.redirectTo({
            url: '../../pages/common/forbidden',
          })
          return
        }
      }
    })
  },
  getConfigInfo: function() {
    commonApis.fetchConfig((err,res)=>{
      this.globalData.config = res.data
    })
  },
  navToJoinHomePage: function (openId) {
    userApis.queryUserById(openId, (err, r1) => {
      console.log('sfsfsddffs:', r1)
      if (r1.data.length === 0) {
        wx.redirectTo({
          url: '../../pages/home/home',
        })
      } else {
        wx.switchTab({
          url: '../../pages/index/index',
        })
      }
    })
  },
  globalData: {
    userInfo: {},
    userDetailInfo: {},
    config: {},
    openId: ''
  }
})