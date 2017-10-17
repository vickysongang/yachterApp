//app.js
var authApis = require('./apis/auth.js')
var userApis = require('./apis/user.js')
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
          console.log('openId is: ', openId)
          that.globalData.openId = openId
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                that.getUserInfo()
                that.navToJoinClassPage(openId)
              } else {
                wx.authorize({
                  scope: 'scope.userInfo',
                  success(res) {
                    that.getUserInfo()
                    that.navToJoinClassPage(openId)
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
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  navToJoinClassPage: function (openId) {
    userApis.queryUserById(openId, (err, r1) => {
      if (r1.data.length === 0) {
        wx.redirectTo({
          url: '../../pages/joinClass/joinClass',
        })
      }
    })
  },
  globalData: {
    userInfo: {},
    openId: ''
  }
})