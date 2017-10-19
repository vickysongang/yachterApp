var util = require('./util.js')
const qiniuUploader = require('./qiniuUploader.js')
var Promise = require('./bluebird.js')

var uploadPromisified = util.uploadPromisify(qiniuUploader.upload)

function uploadFile(filePath) {
  return uploadPromisified(filePath).then(function (res) {
    return res
  }).catch(function () {
    console.error("upload file failed")
  })
}

function batchUploadFiles(filePaths) {
  var promises = []
  filePaths.forEach((filePath)=>{
    var p = uploadFile(filePath)
    promises.push(p)
  })
  return Promise.all(promises)
}

module.exports = {
  uploadFile: uploadFile,
  batchUploadFiles: batchUploadFiles
}