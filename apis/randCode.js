var constants = require('../constants/index.js')

function generateRandCode() {
  var code = '';
  var codeLength = 6;
  var random = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
  for (var i = 0; i < codeLength; i++) {
    var index = Math.floor(Math.random() * 9);
    code += random[index];
  }
  return code;
}

function getRandCode(phone, callback) {
  var code = generateRandCode()
  wx.request({
    url: constants.SERVER_ADDRESS + '/randcode/send',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      phone: phone,
      code: code
    },
    success: function (res) {
      callback(null, code)
    }
  })
}

module.exports = {
  getRandCode: getRandCode
}