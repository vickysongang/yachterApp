const util = require('../../utils/util.js')
const randCodeApis = require('../../apis/randCode.js')
const commonApis = require('../../apis/common.js')
const userApis = require('../../apis/user.js')
const textUtil = require('../../utils/textUtil.js')

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
    places: [],
    placeNames: [],
    placeIndex: 0,
    phone: '',
    randCodeButtonText: '获取验证码',
    popErrorMsg: undefined,
    phoneMode: 'read',
    randCode: '',
    showModalStatus: false,
    className: '',
    selectedClassName: '',
    selectedClassIndex: undefined,
    defaultClasses: []
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
      this.setData({
        defaultClasses: res.data.map(item => {
          return { className: item.name }
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
  confirmSelectClass: function () {
    var className = this.data.className
    var selectedClassIndex = this.data.selectedClassIndex
    if (selectedClassIndex === -1) {
      className = '不分班'
    }
    if (className === undefined || className.length === 0) {
      this.setData({
        popErrorMsg: "内容不能为空"
      })
    } else if (textUtil.checkSensitiveWord(className)) {
      this.setData({
        popErrorMsg: "内容不能包含敏感词"
      })
    } else if (className.length > 2 && selectedClassIndex !== -1) {
      this.setData({
        popErrorMsg: "不能超过两个字噢"
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
    this.setData({
      showModalStatus: false,
      selectedClassIndex: 0,
      selectedClassName: className,
      className: ''
    });
  },
  cancelSelectClass: function () {
    this.setData({
      showModalStatus: false,
    });
  },
  bindClassAction: function () {
    var selectedClassIndex = undefined
    var defaultClasses = this.data.defaultClasses
    for (var i = 0; i < defaultClasses.length; i++) {
      if (defaultClasses[i].className === this.data.className) {
        selectedClassIndex = i + 1
        break
      }
    }
    this.setData({
      showModalStatus: true,
      className: this.data.className,
      selectedClassIndex: selectedClassIndex
    });
  },
  selectClass: function (e) {
    var dataset = e.currentTarget.dataset
    var index = parseInt(dataset.index)
    var className = dataset.classname
    if (index === -1) {
      this.setData({
        selectedClassIndex: parseInt(index),
        className: ''
      })
    } else {
      this.setData({
        selectedClassIndex: parseInt(index),
        className: className
      })
    }
  },
  bindClassInput: function (e) {
    var className = e.detail.value
    var selectedClassIndex = 0
    var defaultClasses = this.data.defaultClasses
    for (var i = 0; i < defaultClasses.length; i++) {
      if (defaultClasses[i].className === className) {
        selectedClassIndex = i + 1
        break
      }
    }
    this.setData({
      selectedClassIndex: selectedClassIndex,
      className: className
    })
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
    if (this.data.phoneMode === 'edit') {
      this.setData({
        phone: e.detail.value
      })
    }
  },
  bindInputBlur: function () {
    if (this.data.phoneMode === 'edit') {
      this.setData({
        phoneMode: 'read'
      })
    }
  },
  bindComfirm: function (e) {
    var randCode = wx.getStorageSync('randCode')
    var selectedClassName = this.data.selectedClassName
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
    } else if (selectedClassName.length === 0) {
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
      this.setData({
        popErrorMsg: "验证码不匹配"
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
    var userInfo = app.globalData.userInfo
    var schoolId = this.data.schools[this.data.schoolIndex].id
    var collegeId = this.data.colleges[this.data.collegeIndex].id
    var majorId = this.data.majors[this.data.majorIndex].id
    var year = this.data.years[this.data.yearIndex].name
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
      avatarUrl: userInfo.avatarUrl,
      customClassName: selectedClassName
    }
    userApis.insertUser(payload, (err, res) => {
      wx.showToast({
        title: '加入成功',
      })
      app.getUserDetailInfo()
      wx.switchTab({
        url: '../index/index',
      })
    })
  }
})
