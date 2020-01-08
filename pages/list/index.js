// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_list: [],
    sid: '',
    pname: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;//存储this，因为this在此处默认为 null
    //存储传递过来的不同参数
    self.setData({sid: options.id});
    self.setData({pname: options.pname});
    let Url = '';
    wx.showLoading({
      title: '加载中....',
    });
    if(options.id !== null){//对参数进行区分
      console.log("分类页过来的");
      Url = 'http://127.0.0.1/api/shop_list.php?shop_id=' + options.id;
    } else if(options.name){
      console.log("首页过来的");
    }
    wx.request({
      url: Url,
      method: "GET",
      success: function(res){
        self.setData({
          shop_list: res.data
        })
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
    //显示加载状态
    wx.showNavigationBarLoading();

    const self = this;
    let Url = '';
    if (self.data.sid !== null) {
      Url = 'http://127.0.0.1/api/shop_list.php?shop_id=' + self.data.sid;
    }
    wx.request({
      url: Url,
      method: "GET",
      success: function (res) {
        self.setData({
          shop_list: res.data
        })
        //隐藏加载状态
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 用户自定义点击事件
   */
  showdetail(e){
    const code = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '/pages/detail/index?code=' + code,
    })
  }
})