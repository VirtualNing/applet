// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipers: [
      { id: 1, image: "/image/l1.jpg"},
      { id: 2, image: "/image/l2.jpg" },
      { id: 3, image: "/image/l3.jpg" },
      { id: 4, image: "/image/l4.jpg" },
      { id: 5, image: "/image/l5.jpg" },
      { id: 6, image: "/image/l6.jpg" },
      { id: 7, image: "/image/l7.jpg" },
      { id: 8, image: "/image/l8.jpg" }
    ],
    quick: [
      { id: 1, image: "/image/quick1.jpg" },
      { id: 2, image: "/image/quick2.jpg" },
      { id: 3, image: "/image/quick3.jpg" },
      { id: 4, image: "/image/quick4.jpg" },
      { id: 5, image: "/image/quick5.jpg" },
      { id: 6, image: "/image/quick6.jpg" }
    ],
    logos: [],
    list: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;//存储this，因为this在此处默认为 null
    //数据未加载完成之前
    wx.showLoading({
      title: '加载中....',
    });

    wx.request({
      url: 'http://localhost:80/api/product.php',
      method: "GET",
      success(res){
        let data = res.data;
        if(data.success){
          self.setData({
            list: data.list,
            logos: data.logos
          })
        }
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
    console.log("到底了");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 自定义跳转
   */
  showdetail(e){
    let code = e.currentTarget.dataset.code;
    //跳转进入详情页面
    wx.navigateTo({
      url: '/pages/detail/index?code=' + code,
    })
  }
})