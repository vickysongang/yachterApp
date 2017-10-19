const util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    schedules: [
      {
        id: 1,
        college:'经济学院',
        gradeName: '2016年春季班',
        gradeType: 'spring'
      },
      {
        id: 1,
        college: '经济学院',
        gradeName: '2016年夏季班',
        gradeType: 'summer'
      },
      {
        id: 1,
        college: '经济学院',
        gradeName: '2016年秋季班',
        gradeType: 'autumn'
      },
      {
        id: 1,
        college: '经济学院',
        gradeName: '2016年冬季班',
        gradeType: 'winter'
      }
    ]
  },
  onLoad: function () {

  },
  bindNavToScheduleDetail: function (event) {
    wx.navigateTo({
      url: './detail',
    })
  },
  bindPublishSchedule: function (event) {
    wx.navigateTo({
      url: './publish',
    })
  }
})
