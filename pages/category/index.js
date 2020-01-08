// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    currenIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    //数据未加载完成之前
    wx.showLoading({
      title: '加载中....',
    });

    wx.request({
      url: 'http://localhost:80/api/category.php',
      method: "GET",
      success(res) {
        self.setData({
          list: res.data
        })
        //console.log(res.data);
        wx.hideLoading() //数据加载完成之后
      }
    })
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
   * 自定义点击事件
   */
  switchRightTab(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      currenIndex: index
    })
  },

  showListView(e){
    let id = e.currentTarget.dataset.id;
    //导航跳转方法
    wx.navigateTo({
      url: '/pages/list/index?id=' + id,
    })
  }
})