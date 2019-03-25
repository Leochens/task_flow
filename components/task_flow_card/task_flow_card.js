// components/task_flow_card/task_flow_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    taskFlowData: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0
  },
  ready:function(){
    this.setData({
      // count: Object.keys(this.properties.taskFlowData.members).length
    })
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    test: function(){
      console.log(this.properties); 
     
    }
  }
})