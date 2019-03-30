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
    const tf = this.properties.taskFlowData;
    const leader = tf.member.filter(mem => mem.id === tf.leader_id)[0];
    console.log(leader);
    this.setData({
      count: tf.member.length,
      leader
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