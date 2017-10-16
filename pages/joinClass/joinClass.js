const util = require('../../utils/util.js')
const randCodeApis = require('../../apis/randCode.js')
const commonApis = require('../../apis/common.js')
const userApis = require('../../apis/user.js')
var app = getApp()
Page({
  data: {
    schools: [],
    schoolNames: [],
    schoolIndex: undefined,
    colleges: [],
    collegeNames: [],
    collegeIndex: undefined,
    majors: [],
    majorNames: [],
    majorIndex: undefined,
    grades: [],
    gradeNames: [],
    gradeIndex: undefined,
    provinces: [],
    provinceNames: [],
    provinceIndex: undefined,
    phone: '',
    randCodeButtonText: '获取验证码',
    popErrorMsg: undefined
  },
  onLoad: function () {
    commonApis.fetchSchools((err, res) => {
      this.setData({
        schools: res.data,
        schoolNames: res.data.map(item => {
          return item.name
        })
      })
    })
    commonApis.fetchGrades((err, res) => {
      this.setData({
        grades: res.data,
        gradeNames: res.data.map(item => {
          return item.name
        })
      })
    })
    commonApis.fetchProvinces((err, res) => {
      this.setData({
        provinces: res.data,
        provinceNames: res.data.map(item => {
          return item.name
        })
      })
    })
  },
  bindPickSchool: function (e) {
    var schoolIndex = e.detail.value
    var school = this.data.schools[schoolIndex]
    commonApis.fetchColleges(school.id, (err, res) => {
      this.setData({
        colleges: res.data,
        collegeNames: res.data.map(item => {
          return item.name
        }),
        schoolIndex: schoolIndex,
        collegeIndex: undefined,
        majorIndex: undefined,
      })
    })
  },
  bindPickCollege: function (e) {
    var collegeIndex = e.detail.value
    var college = this.data.colleges[collegeIndex]
    commonApis.fetchMajors(college.id, (err, res) => {
      this.setData({
        majors: res.data,
        majorNames: res.data.map(item => {
          return item.name
        }),
        collegeIndex: collegeIndex
      })
    })
  },
  bindPickMajor: function (e) {
    this.setData({
      majorIndex: e.detail.value
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
    randCodeApis.getRandCode('18600397392', function (err, code) {
      wx.setStorage({
        key: 'randCode',
        data: code,
      })
    })
    var interval = setInterval(function () {
      time--
      that.setData({
        randCodeButtonText: time + 's'
      })
      if (time === 0) {
        interval && clearInterval(interval)
        wx.removeStorage({
          key: 'randCode',
          success: function (res) { },
        })
        that.setData({
          randCodeButtonText: '获取验证码'
        })
      }
    }, 1000)
  },
  bindPhoneAction: function () {
    var params = 'key=phone&value=' + this.data.phone
    wx.navigateTo({
      url: '../common/TextInput/Textinput?' + params,
    })
  },
  bindComfirm: function (e) {
    var randCode = wx.getStorageSync('randCode')
    if (this.data.schoolIndex === undefined) {
      this.setData({
        popErrorMsg: "学校不能为空"
      })
    } else if (this.data.collegeIndex === undefined) {
      this.setData({
        popErrorMsg: "学院不能为空"
      })
    } else if (this.data.majorIndex === undefined) {
      this.setData({
        popErrorMsg: "专业不能为空"
      })
    } else if (this.data.gradeIndex === undefined) {
      this.setData({
        popErrorMsg: "年级不能为空"
      })
    } else if (this.data.provinceIndex === undefined) {
      this.setData({
        popErrorMsg: "省份不能为空"
      })
    } else if (this.data.phone === undefined || this.data.phone === '') {
      this.setData({
        popErrorMsg: "手机号码不能为空"
      })
    }
    var popErrorMsg = this.data.popErrorMsg
    if (popErrorMsg && popErrorMsg.length > 0) {
      setTimeout(() => {
        this.setData({
          popErrorMsg: ''
        });
      }, 1000)
    }
    var userInfo = app.globalData.userInfo
    var schoolId = this.data.schools[this.data.schoolIndex].id
    var collegeId = this.data.colleges[this.data.collegeIndex].id
    var majorId = this.data.majors[this.data.majorIndex].id
    var gradeId = this.data.grades[this.data.gradeIndex].id
    var provinceId = this.data.provinces[this.data.provinceIndex].id
    var phone = this.data.phone
    userApis.insertUser({
      openId: app.globalData.openId,
      schoolId: schoolId,
      collegeId: collegeId,
      majorId: majorId,
      gradeId: gradeId,
      provinceId: provinceId,
      phone: phone,
      nickname: userInfo.nickName,
      gender: userInfo.gender,
      avatarUrl: userInfo.avatarUrl
    }, (err, res) => {
      wx.switchTab({
        url: '../index/index',
      })
    })
  }
})
