//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    examItems: [{
      id: 1,
      noticeType: 'notice',
      title: '关于【金融投资俱乐部】群规则的通知',
      abstract: '请于10月21日前完成，按专业投入明德主楼611B门口的铁信箱内。',
      readCount: 145,
      pubTime: '2017-10-11',
      creatorName: '张三'
    },
    {
      id: 2,
      noticeType: 'activity',
      title: '关于【金融投资俱乐部】群规则的通知',
      abstract: '请于10月21日前完成，按专业投入明德主楼611B门口的铁信箱内。',
      readCount: 145,
      pubTime: '2017-10-11',
      creatorName: '李四'
    },
    {
      id: 3,
      noticeType: 'notice',
      title: '关于【金融投资俱乐部】群规则的通知',
      abstract: '请于10月21日前完成，按专业投入明德主楼611B门口的铁信箱内。',
      readCount: 145,
      pubTime: '2017-10-11',
      creatorName: '王五'
    },
    {
      id: 4,
      noticeType: 'notice',
      title: '关于【金融投资俱乐部】群规则的通知',
      abstract: '请于10月21日前完成，按专业投入明德主楼611B门口的铁信箱内。',
      readCount: 145,
      pubTime: '2017-10-11',
      creatorName: '王五'
    },
    {
      id: 5,
      noticeType: 'notice',
      title: '关于【金融投资俱乐部】群规则的通知',
      abstract: '请于10月21日前完成，按专业投入明德主楼611B门口的铁信箱内。',
      readCount: 145,
      pubTime: '2017-10-11',
      creatorName: '王五'
    }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindNavToDetail: function (event) {
    console.log('id is:', event)
    wx.navigateTo({
      url: './detail',
    })
  },
  bindPublishExam: function (event) {
    wx.navigateTo({
      url: './publish',
    })
  }
})
