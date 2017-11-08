// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    return
  },
  onShareAppMessage: function () {
    return {}
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    return
  },
  bindJoinClassAction: function () {
    wx.redirectTo({
      url: '../../pages/joinClass/joinClass',
    })
  }
})