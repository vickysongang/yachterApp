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
        authApis.getUserAuthInfo(res.code, (err,result) => {
          var openId = result.data.openid
          that.globalData.openId = openId
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    console.log('sdfsdfsd:', res.userInfo)
                    // 可以将 res 发送给后台解码出 unionId
                    that.globalData.userInfo = res.userInfo
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (that.userInfoReadyCallback) {
                      that.userInfoReadyCallback(res)
                    }
                  }
                })
              }
            }
          })
          userApis.queryUserById(openId, (err,r1) => {
            if (r1.data.length === 0) {
              wx.redirectTo({
                url: '../../pages/joinClass/joinClass',
              })
            } 
          })
        })
      }
    })
  },
  globalData: {
    userInfo: {},
    openId:''
  }
})