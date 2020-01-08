// pages/me/index.js
//获取应用实例
const app = getApp();
// console.log(app);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo: false,
    canIUse:wx.canIUse("button.open-type.getUserInfo")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if(this.data.canIUse) {
      //由于getUserInfo 是一个网络请求，可能会在 Page.onLoad 之后返回数据
      //为了防止这种情况发生，所以此处加入 callback
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },

  /**
   * 获取用户信息的方法
   */
  getUserInfo: function(e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    console.log(e.detail);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})