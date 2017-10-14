const util = require('../../utils/util.js')
const randCodeApi = require('../../apis/randCode.js')
var app = getApp()
Page({
  data: {
    schools: ['北京大学', '清华大学', '中国人民大学', '北京理工大学'],
    schoolIndex: 0,
    colleges: ['经济学院', '软件学院'],
    collegeIndex: 0,
    marjors: ['金融学', '软件工程'],
    marjorIndex: 0,
    grades:['2016年秋季班', '2016年冬季班'],
    gradeIndex: 0,
    provinces: ['北京', '上海', '天津', '重庆'],
    provinceIndex: 0,
    randCodeButtonText: '获取验证码'
  },
  onLoad: function () {

  },
  bindPickSchool: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    })
  },
  bindPickCollege: function (e) {
    this.setData({
      collegeIndex: e.detail.value
    })
  },
  bindPickGrade: function (e) {
    this.setData({
      gradeIndex: e.detail.value
    })
  },
  bindPickProvince: function (e) {
    this.setData({
      provinceIndex: e.detail.value
    })
  },
  bindGetRandCode: function (e) {
    var that = this
    var time = 60
    that.setData({
      randCodeButtonText: time + 's'
    })
    randCodeApi.getRandCode('18600397392', function(err, code){
      wx.setStorage({
        key: 'randCode',
        data: code,
      })
    })
    var interval = setInterval(function() {
      time--
      that.setData({
        randCodeButtonText: time + 's'
      })
      if (time === 0) {
        interval && clearInterval(interval)
        wx.removeStorage({
          key: 'randCode',
          success: function(res) {},
        })
        that.setData({
          randCodeButtonText: '获取验证码'
        })
      }
    }, 1000)
  },
  bindComfirm: function (e) {
    var randCode = wx.getStorageSync('randCode')
    console.log('randCode is:', randCode)
  }
})
