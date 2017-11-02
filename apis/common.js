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

function fetchColleges(payload,callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/colleges',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      schoolId: payload.schoolId
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

function fetchMajors(payload, callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/majors',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      collegeId: payload.collegeId,
      year: payload.year
    },
    success: function (res) {
      callback(null, res)
    }
  })
}

function fetchClasses(payload,callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/classes',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      type: payload.type
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

function fetchPlaces(payload,callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/places',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      schoolId: payload.schoolId
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

function fetchConfig(callback) {
  wx.request({
    url: constants.SERVER_ADDRESS + '/config',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
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
  fetchYears: fetchYears,
  fetchClasses: fetchClasses,
  fetchProvinces: fetchProvinces,
  fetchPlaces: fetchPlaces,
  fetchCategories: fetchCategories,
  fetchConfig: fetchConfig
}