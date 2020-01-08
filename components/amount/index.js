// components/amount/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 1
    }
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
    inputChangeHandle(e){
      var value = e.detail.value;
      var myEventDetail = {
        val: value
      }
      //数据改变时，向父组件传递数值
      this.triggerEvent("myevent", myEventDetail);
    },
    subtract(e){
      let count = this.data.count;
      count > 1 ? count-- : 1;
      this.setData({
        count: count
      })
      var myEventDetail = {
        val: count
      }
      //数据改变时，向父组件传递数值
      this.triggerEvent("myevent", myEventDetail);
      //点击减号触发
      this.triggerEvent("subevent");
    },
    add(e){
      let count = this.data.count;
      this.setData({
        count: count++
      })
      var myEventDetail = {
        val: count
      }
      //数据改变时，向父组件传递数值
      this.triggerEvent("myevent", myEventDetail);
      //点击加号触发
      this.triggerEvent("addevent");
    }
  }
})
