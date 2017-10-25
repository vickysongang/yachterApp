var Promise = require('./bluebird.js')
var constants = require('../constants/index.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
}

function uploadPromisify(fn) {
  return function (filePath) {
    return new Promise((resolve, reject) => {
      const success = (res) => {
        resolve(res)
      }
      const fail = (res) => {
        reject(res)
      }
      fn(filePath, success, fail, constants.QINIU_OPTIONS)
    })
  }
}

function validatePhone(phone){
  var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
  return reg.test(phone); //true
}

module.exports = {
  formatTime: formatTime,
  wxPromisify: wxPromisify,
  uploadPromisify: uploadPromisify,
  validatePhone: validatePhone
}
