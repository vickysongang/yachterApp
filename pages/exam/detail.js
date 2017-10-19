//logs.js
const util = require('../../utils/util.js')
const examApis = require('../../apis/exam.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    detailInfo: {
      id: undefined,
      title: '',
      readCount: 0,
      pubTime: '',
      creatorName: '',
      content: '',
      images: [],
      canDelete: false
    }
  },
  onLoad: function (options) {
    var id = options.id
    var that = this
    this.setData({
      userInfo: app.globalData.userInfo
    })
    examApis.incrExamReadCount(id, (err, res) => {
      examApis.getExamDetail(id, (err1, res1) => {
        if (res1.data.length > 0) {
          var detail = res1.data[0]
          var images = []
          var imageStr = detail.images
          if (imageStr && imageStr.length > 0) {
            images: imageStr.split(',')
          }
          this.setData({
            detailInfo: {
              id: id,
              title: detail.title,
              readCount: detail.read_count,
              pubTime: detail.pubTime,
              creatorName: detail.creatorName,
              content: detail.content,
              images: images,
              canDelete: app.globalData.openId === detail.openId
            }
          })
        }
      })
    })
  }
})

