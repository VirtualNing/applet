// components/buy/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBuy: {
      type: Boolean,
      value: true
    },
    imgData: Array,
    productData: Object,
    count: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideBuyView(e){
      if (e.target.dataset.target == "self") {
        this.setData({
          hideBuy: true
        })
      }
    },
    getCount(e){
      let val = e.detail.val;
      this.triggerEvent("onGetCount",e.detail);
    },
    buy(){
      this.setData({
        hideBuy: true
      })
      //事件传递
      this.triggerEvent("buyEvent");
    }
  }
})
