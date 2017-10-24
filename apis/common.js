var constants = require('../constants/index.js')

function fetchSchools(callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/schools',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {},
    success: function (res) {
      callback(null, res)
    }
  })
}

function fetchColleges(schoolId,callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/colleges',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      schoolId: schoolId
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

function fetchMajors(collegeId, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/majors',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      collegeId: collegeId
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

function fetchGrades(callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/grades',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

function fetchYears(callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/years',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

function fetchSeasons(callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/seasons',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

function fetchProvinces(callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/provinces',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

function fetchCategories(moduleName, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/categories',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      module: moduleName
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

module.exports = {
  fetchSchools: fetchSchools,
  fetchColleges: fetchColleges,
  fetchMajors: fetchMajors,
  fetchGrades: fetchGrades,
  fetchYears: fetchYears,
  fetchSeasons: fetchSeasons,
  fetchProvinces: fetchProvinces,
  fetchCategories: fetchCategories
}