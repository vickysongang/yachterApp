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
    years: [],
    yearNames: [],
    yearIndex: 1,
    classes: [],
    classNames: [],
    classIndex: undefined,
    customClassName: '',
    showClassPicker: true,
    places: [],
    placeNames: [],
    placeIndex: 0,
    phone: '',
    randCodeButtonText: '获取验证码',
    popErrorMsg: undefined,
    classMode: 'read',
    phoneMode: 'read',
    randCode: ''
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
    commonApis.fetchYears((err, res) => {
      var currYear = new Date().getFullYear()
      var years = res.data
      var defaultYearIndex = 0
      for (var i = 0; i < years.length; i++) {
        if (parseInt(years[i].name) === currYear) {
          defaultYearIndex = i
          break
        }
      }
      this.setData({
        years: years,
        yearIndex: defaultYearIndex,
        yearNames: years.map(item => {
          return item.name
        })
      })
    })
    commonApis.fetchClasses({ type: 'default' }, (err, res) => {
      var classes = res.data
      classes.push({
        id: -1,
        name: '自定义',
        type: ''
      })
      this.setData({
        classes: classes,
        classNames: res.data.map(item => {
          return item.name
        })
      })
    })
  },
  bindPickSchool: function (e) {
    var schoolIndex = e.detail.value
    var school = this.data.schools[schoolIndex]
    commonApis.fetchColleges({ schoolId: school.id }, (err, res) => {
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
    commonApis.fetchPlaces({ schoolId: school.id }, (err, res) => {
      this.setData({
        places: res.data,
        placeNames: res.data.map(item => {
          return item.name
        })
      })
    })
  },
  bindPickCollege: function (e) {
    var collegeIndex = e.detail.value
    var college = this.data.colleges[collegeIndex]
    var year = parseInt(this.data.years[this.data.yearIndex].name)
    commonApis.fetchMajors({ collegeId: college.id, year: year }, (err, res) => {
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
  bindPickYear: function (e) {
    var yearIndex = e.detail.value
    var year = parseInt(this.data.years[yearIndex].name)
    if (this.data.collegeIndex !== undefined) {
      var collegeId = this.data.colleges[this.data.collegeIndex].id
      commonApis.fetchMajors({ collegeId: collegeId, year: year }, (err, res) => {
        this.setData({
          majors: res.data,
          majorNames: res.data.map(item => {
            return item.name
          }),
          yearIndex: yearIndex
        })
      })
    } else {
      this.setData({
        yearIndex: yearIndex
      })
    }
  },
  bindPickClass: function (e) {
    var classIndex = e.detail.value
    if (this.data.classes[classIndex].id === -1) {
      this.setData({
        showClassPicker: false,
        classMode: 'edit'
      })
    } else {
      this.setData({
        classIndex: classIndex
      })
    }
  },
  bindPickPlace: function (e) {
    this.setData({
      placeIndex: e.detail.value
    })
  },
  bindGetRandCode: function (e) {
    var phone = this.data.phone
    if (phone === undefined || phone.length === 0) {
      this.setData({
        popErrorMsg: "手机号不能为空"
      })
    } else if (phone.length < 11) {
      this.setData({
        popErrorMsg: "手机号长度为11位"
      })
    } else if (!util.validatePhone(phone)) {
      this.setData({
        popErrorMsg: "手机号不合法"
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
    var that = this
    var time = 60
    that.setData({
      randCodeButtonText: time + 's'
    })
    randCodeApis.getRandCode(phone, function (err, code) {
      wx.setStorage({
        key: 'randCode',
        data: code,
      })
    })
    //改变按钮文字
    var interval = setInterval(function () {
      time--
      that.setData({
        randCodeButtonText: time + 's'
      })
      if (time === 0) {
        interval && clearInterval(interval)
        that.setData({
          randCodeButtonText: '获取验证码'
        })
      }
    }, 1000)
    //设置验证码的失效时间
    setTimeout(function () {
      wx.removeStorage({
        key: 'randCode',
        success: function (res) { },
      })
    }, 1000 * 60 * 10)
  },
  bindClassAction: function () {
    this.setData({
      classMode: 'edit'
    })
  },
  bindPhoneAction: function () {
    this.setData({
      phoneMode: 'edit'
    })
  },
  bindInputRandCode: function (e) {
    this.setData({
      randCode: e.detail.value
    })
  },
  bindInput: function (e) {
    if (this.data.classMode === 'edit') {
      this.setData({
        customClassName: e.detail.value
      })
    } else if (this.data.phoneMode === 'edit') {
      this.setData({
        phone: e.detail.value
      })
    }
  },
  bindInputBlur: function () {
    if (this.data.classMode === 'edit') {
      if (this.data.customClassName.length > 0) {
        this.setData({
          classMode: 'read'
        })
      } else {
        this.setData({
          classMode: 'read',
          showClassPicker: true,
        })
      }
    } else if (this.data.phoneMode === 'edit') {
      this.setData({
        phoneMode: 'read'
      })
    }
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
    } else if (this.data.customClassName.length === 0 && this.data.classIndex === undefined) {
      this.setData({
        popErrorMsg: "班级不能为空"
      })
    } else if (this.data.phone === undefined || this.data.phone === '') {
      this.setData({
        popErrorMsg: "手机号码不能为空"
      })
    } else if (this.data.randCode === undefined || this.data.randCode === '') {
      this.setData({
        popErrorMsg: "验证码不能为空"
      })
    } else if (randCode !== this.data.randCode) {
      // this.setData({
      //   popErrorMsg: "验证码不匹配"
      // })
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
    var userInfo = app.globalData.userInfo
    var schoolId = this.data.schools[this.data.schoolIndex].id
    var collegeId = this.data.colleges[this.data.collegeIndex].id
    var majorId = this.data.majors[this.data.majorIndex].id
    var year = this.data.years[this.data.yearIndex].name
    var customClassName = this.data.customClassName
    var placeId = this.data.places[this.data.placeIndex].id
    var phone = this.data.phone
    var payload = {
      openId: app.globalData.openId,
      schoolId: schoolId,
      collegeId: collegeId,
      majorId: majorId,
      year: year,
      placeId: placeId,
      phone: phone,
      nickname: userInfo.nickName,
      gender: userInfo.gender,
      avatarUrl: userInfo.avatarUrl
    }
    if (customClassName.length > 0) {
      payload.customClassName = customClassName
    } else {
      var classId = this.data.classes[this.data.classIndex].id
      payload.classId = classId
    }
    userApis.insertUser(payload, (err, res) => {
      app.getUserDetailInfo()
      wx.switchTab({
        url: '../index/index',
      })
    })
  }
})
