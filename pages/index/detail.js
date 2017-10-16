//logs.js
const util = require('../../utils/util.js')
const noticeApis = require('../../apis/notice.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    title: '',
    readCount: 0,
    pubTime: '',
    creatorName: '',
    content: ''
  },
  onLoad: function (options) {
    var id = options.id
    var that = this
    this.setData({
      userInfo: app.globalData.userInfo
    })
    noticeApis.incrNoticeReadCount(id, (err, res) => {
      noticeApis.getNoticeDetail(id, (err1, res1) => {
        if (res1.data.length > 0) {
          var detail = res1.data[0]
          this.setData({
            title: detail.title,
            readCount: detail.read_count,
            pubTime: detail.pubTime,
            creatorName: detail.creatorName,
            content: detail.content
          })
        }
      })
    })
  }
})
