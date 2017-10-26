/**
 * Created by songang on 2017/8/19.
 */
function delHtmlTag(htmlStr) {
  htmlStr = htmlStr.replace(/&nbsp;/g, " ")
  var reTag = /<(?:.|\s)*?>/g
  return htmlStr.replace(reTag, "")
}

function replaceEscape(htmlStr) {
  if (!htmlStr) {
    return ''
  }
  console.log('ssss:', htmlStr)
  htmlStr = htmlStr.replace(/( )/g, "&nbsp;")
  htmlStr = htmlStr.replace(/\u0008/g, "&nbsp;")
  htmlStr = htmlStr.replace(/\u0009/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
  htmlStr = htmlStr.replace(/\u000A/g, "\n")
  htmlStr = htmlStr.replace(/\u000B/g, "")
  htmlStr = htmlStr.replace(/\u000C/g, "")
  htmlStr = htmlStr.replace(/\u000D/g, "")
  htmlStr = htmlStr.replace(/\u0022/g, "\"")
  htmlStr = htmlStr.replace(/\u0027/g, "\\'")
  htmlStr = htmlStr.replace(/\u005C/g, "\\")
  htmlStr = htmlStr.replace(/\u00A0/g, "")
  htmlStr = htmlStr.replace(/\u2028/g, "")
  htmlStr = htmlStr.replace(/\u2029/g, "")
  htmlStr = htmlStr.replace(/\uFEFF/g, "")
  console.log('ssss:', htmlStr)
  return htmlStr
}

module.exports = {
  delHtmlTag,
  replaceEscape
}