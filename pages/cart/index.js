// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray: [],
    totalMoney: "0.00",//总价
    totalCount: 0,//商品个数
    selectAll: false, //是否全选,
    startX: 0, //初始X轴坐标
    startY: 0 //初始Y轴坐标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  touchstart(e){
    //开始触摸时,重置所有删除
    this.data.cartArray.forEach(cart => {
      if(cart.isTouchMove){
        cart.isTouchMove = false;
      }
    })
    //更新数据
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      cartArray: this.data.cartArray
    })
  },

  touchmove(e){
    let index = e.currentTarget.dataset.index;
    let that = this; //保存this
    //开始X轴与Y轴坐标
    let startX = that.data.startX;
    let startY = that.data.startY;

    //移动的X轴与Y轴坐标
    var touchMoveX = e.changedTouches[0].clientX,
        touchMoveY = e.changedTouches[0].clientY;
    
    //调用计算角度方法
    var angel = that.angel({X: startX, Y: startY}, {X: touchMoveX, Y: touchMoveY});

    //遍历数组中的所有对象
    that.data.cartArray.forEach((cart,i) => {
      cart.isTouchMove = false;
      //滑动角度大于30,直接 return
      if(Math.abs(angel) > 30) return;

      //匹配
      if(i == index){
        if(touchMoveX > startX){//向右滑动
          cart.isTouchMove = false;
        }else{
          cart.isTouchMove = true;
        }
      }
    })

    //更新数据 
    this.setData({
      cartArray: that.data.cartArray
    })
  },

  //计算角度
  angel(start,end){
    var _X = end.X - start.X;
    var _Y = end.Y - start.Y;

    //返回角度Math.atan() 返回数字的反正切值
    return 360 * Math.atan(_X / _Y) / (2 * Math.PI);
  },

  //删除购物车商品事件
  del(e){
    var self = this;
    let index = e.currentTarget.dataset.index;
    wx.getStorage({
      key: 'cartInfo',
      success: function(res) {
        const listData = res.data;
        listData.forEach((cart,i) => {
          if(cart.product[0].product_id == self.data.cartArray[index].product[0].product_id){
            listData.splice(i,1);//删除数组中指定位置的数值
          }
        })

        //存储
        wx.setStorage({
          key: 'cartInfo',
          data: listData
        })

        //更新页面数据
        self.update(index);
      },
    })

  },

  //更新数据
  update(index){
    var cartArray = this.data.cartArray;
    var totalMoney = Number(this.data.totalMoney);//字符串转数值
    var totalCount = this.data.totalCount;

    //计算价格和数量
    if(cartArray[index].select){
      totalMoney -= Number(cartArray[index].product[0].product_price) * Number(cartArray[index].total);
      totalCount--;
    }

    //删除
    cartArray.splice(index,1);

    //更新数据
    this.setData({
      cartArray: this.data.cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount
    })

    //设置tabBar图标
    cartArray.length > 0 ? wx.setTabBarBadge({
      index: 2,
      text: String(cartArray.length)
    }) : wx.removeTabBarBadge({
      index: 2,
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
    var self = this;

    wx.getStorage({
      key: 'cartInfo',
      success: function(res) {
        const cartArray = res.data;

        //遍历数组给每一项添加一个属性
        cartArray.forEach(cart => {
          cart.select = false; //表示默认不选中
          cart.isTouchMove = false; //是否滑动
        })

        //初始化数据
        self.setData({
          cartArray: cartArray,
          selectAll: false,
          totalMoney: "0.00",//总价
          totalCount: 0
        })

        //设置tabBar图标
        cartArray.length > 0 ? wx.setTabBarBadge({//给tabBar指定下标图标添加样式
          index: 2,
          text: String(cartArray.length),//字符串格式
        }) : wx.removeTabBarBadge({//给tabBar指定下标图标移除样式
          index: 2,
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //页面离开时更新 storage
    const cartArray = this.data.cartArray;
    wx.setStorage({
      key: 'cartInfo',
      data: cartArray,
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 用户自定义点击事件
   */
  getCount(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    cartArray[index].total = e.detail.val;
    //更新
    this.setData({
      cartArray: cartArray
    })
  },

  switchGoodDetail(e){
    let index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    wx.navigateTo({
      url: '/pages/detail/index?code=' + cartArray[index].product[0].product_id,
    })
    //console.log(cartArray[index].product[0].product_id);
  },

  selectGood(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;

    //拿到合计与数量
    let totalMoney = Number(this.data.totalMoney);//字符串转数值
    let totalCount = this.data.totalCount;
    let selectAll = this.data.selectAll;//选中状态

    //设置选中与不选中状态
    cartArray[index].select = !cartArray[index].select;

    //如果商品被选中
    if(cartArray[index].select){
      totalMoney += Number(cartArray[index].product[0].product_price) * Number(cartArray[index].total);
      totalCount++;
      console.log(cartArray[index].total, "当前total");
    }else{
      //如果商品未选中
      totalMoney -= Number(cartArray[index].product[0].product_price) * Number(cartArray[index].total);
      totalCount--;
      selectAll = false;
      console.log(cartArray[index].total, "当前total");
    }

    //更新数据
    this.setData({
      cartArray: cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount,
      selectAll: selectAll
    })
  },
  subCount(e){
    let index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    //拿到合计
    let totalMoney = Number(this.data.totalMoney);//字符串转数值
    if(cartArray[index].select){
      totalMoney -= Number(cartArray[index].product[0].product_price) * Number(cartArray[index].total);
    }
    //更新数据
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })
  },
  addCount(e){
    let index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    //拿到合计
    let totalMoney = Number(this.data.totalMoney);//字符串转数值
    if (cartArray[index].select) {
      totalMoney += Number(cartArray[index].product[0].product_price) * Number(cartArray[index].total);
    }
    //更新数据
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })
  },

  selectAll(){
    const cartArray = this.data.cartArray;
    let totalMoney = 0;
    let totalCount = 0;
    let selectAll = this.data.selectAll;
    selectAll = !selectAll;

    cartArray.forEach(cart => {
      cart.select = selectAll;//设置选中或者不选中

      //计算总金额与商品个数
      if(cart.select){
        totalMoney += Number(cart.product[0].product_price) * Number(cart.total);
        totalCount++;
      }else{
        totalMoney = 0;
        totalCount = 0;
      }
    })
    //更新数据
    this.setData({
      cartArray: cartArray,
      totalMoney: totalMoney,
      totalCount: totalCount,
      selectAll: selectAll
    })
  }
})