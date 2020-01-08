// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    baitiao: [],
    baitiaoSelectItem:{
      desc: "【白条支付】首单享立减优惠"
    },
    hideBaitiao:true,
    hideBuy: true,
    count: 1,
    badgeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let code =  options.code;
    let self = this;
    wx.showLoading({
      title: '加载中....',
    });

    wx.request({
      url: 'http://127.0.0.1/api/detail.php?product_id=' + code,
      method: "GET",
      success: function(res){
        self.setData({
          list: res.data,
          baitiao: res.data.iou
        })
        wx.hideLoading();
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
    const self = this;
    wx.getStorage({
      key: 'cartInfo',
      success: function(res) {
        const cartArray = res.data;
        self.setBadge(cartArray);
      },
    })
  },

  /**
   * 跳转进入购物车展示页面
   * 
   */
  showCartView(){
    wx.switchTab({
      url: "/pages/cart/index"//进如tabBar页面，并关闭其它非tabBar页面
    })
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

  },

  /**
   * 定义调用子组件事件处理
   */
  popBaitiaoView(){
    //console.log("显示白条");
    this.setData({
      hideBaitiao: false
    })
  },
  popBuyView(){
    //console.log("已选中");
    this.setData({
      hideBuy: false
    })
  },
  updateSelectItem(e){
    let desc = e.detail.desc;
    let baitiaoSelectItem = this.data.baitiaoSelectItem;
    baitiaoSelectItem.desc = desc;
    this.setData({
      baitiaoSelectItem: baitiaoSelectItem
    })
  },
  updateCount(e){
    //console.log(e.detail.val);
    this.setData({
      count: e.detail.val
    })
  },
  addCart(){
    //console.log("加入购物车");
    let self = this;
    //登录即查看本地购物车是否存储有商品
    wx.getStorage({
      key: 'cartInfo',
      success: function(res) {
        //如果有就存储在变量中
        let cartArray = res.data;
        let listData = self.data.list;//拿到当前页面商品信息
        let isExit = false;//判断商品是否存在本地购物车
        let product = listData.product;
        //匹配本地购物车中商品id与当前页面商品id是否一致
        cartArray.forEach(cart => {
          if (cart.product[0].product_id == product[0].product_id){
            isExit = true; //当前页面商品已在购物车中
            cart.total += self.data.count; //将当前选中的商品数量更新到本地购物车中
            wx.setStorage({
              key: 'cartInfo',
              data: cartArray,//更新数据
            })
          }
        })
        //console.log(product[0].product_id);
        //假设商品不存在购物车中
        if(!isExit){
          listData.total = self.data.count;//更新商品数量
          cartArray.push(listData);//存进本地购物车
          wx.setStorage({
            key: 'cartInfo',
            data: cartArray,
          })
        }

        //将购物车中商品不同类件数量取出
        self.setBadge(cartArray);
      },
      fail(){
        let list = self.data.list;
        list.total = self.data.count;
        let cartArray = [];
        cartArray.push(list);
        wx.setStorage({//本地购物车无此商品就保存进本地购物车
          key: 'cartInfo',
          data: cartArray,
        })

        //将购物车中商品不同类件数量取出
        self.setBadge(cartArray);
      }
    }),
    wx.showToast({
      title: '加入购物车成功',
      icon: "success",
      duration: 3000
    })
  },
  setBadge(cartArray){
    this.setData({
      badgeCount: cartArray.length
    })
  }
})