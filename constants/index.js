const RANDCODE_USERNAME = 'ZSZM005389'
const RANDCODE_PASSWORD = '123456'

// const SERVER_ADDRESS = 'https://api.sa9051.top'
const SERVER_ADDRESS = 'https://zaizhi.bjzhishanzhimei.com'

const QINIU_REGION = 'NCN'
const QINIU_UPTOKEN = 'me0n-EolWG-KGgXau-Bcm4UWpjS61ssZu288V5bl:9cwY4iQcOjeHxJnz9oTJj6FaCTE=:eyJzY29wZSI6InlhY2h0ZXIiLCJkZWFkbGluZSI6MTUwODg5NzYxMn0='
const QINIU_DOMAIN = 'http://oy1wh09ro.bkt.clouddn.com'
const QINIU_OPTIONS = {
  region: QINIU_REGION,
  domain: QINIU_DOMAIN,
  uptoken: QINIU_UPTOKEN,
  shouldUseQiniuFileName: false
}

module.exports = {
  RANDCODE_USERNAME: RANDCODE_USERNAME,
  RANDCODE_PASSWORD: RANDCODE_PASSWORD,
  SERVER_ADDRESS: SERVER_ADDRESS,
  QINIU_REGION: QINIU_REGION,
  QINIU_UPTOKEN: QINIU_UPTOKEN,
  QINIU_DOMAIN: QINIU_DOMAIN,
  QINIU_OPTIONS: QINIU_OPTIONS
}