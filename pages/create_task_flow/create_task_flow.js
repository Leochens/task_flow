// pages/create_task_flow/create_task_flow.js
const app = getApp();
import {
  compareDate,
  formatTime
} from '../../utils/util';
import {connect} from '../../libs/wechat-weapp-redux';
import {addTaskFlow} from '../../actions/index';
const _page = {

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    beginDate: formatTime(new Date()),
    endDate: formatTime(new Date()),
    leader:wx.getStorageSync('userInfo').nickName 
  },
  onLoad:function(e) {
    // const nickName
  },
  bindBeginDateChange: function (e) {
    const {
      beginDate: oldBegindate,
      endDate
    } = this.data;
    const beginDate = e.detail;
    console.log("beginDate", e.detail);
    if (compareDate(beginDate, endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '开始日期不能比结束日期大',
      });
      this.setData({
        beginDate: oldBegindate
      })
      return false
    };
    this.setData({
      beginDate
    })
  },
  bindEndDateChange: function (e) {
    const endDate = e.detail;
    const {
      endDate: oldEndDate,
      beginDate
    } = this.data;
    console.log("endDate", e.detail);
    if (compareDate(beginDate, endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '结束日期不能比开始日期小',
      })
      this.setData({
        endDate: oldEndDate
      })
      return false;
    }
    this.setData({
      endDate
    })
  },
  onSubmit:function(e){

    console.log("表单提交事件",e);
    const {tf_name,tf_describe} = e.detail.value;
    if(!tf_name || !tf_describe){

      return ;
    }

    const {beginDate:begin_time,endDate:end_time} = this.data;
    console.log(this.addTaskFlow)
    const u_id = wx.getStorageSync('u_id');
    this.addTaskFlow(u_id,JSON.stringify({
        tf_name,
        tf_describe,
        begin_time,
        end_time,
        leader_id: u_id
    }));
    
  }
};
const mapStateToData = state => {
  return {

  }
}
const mapDispatchToPage = dispatch => {
    return {
      addTaskFlow: (u_id,tf) => dispatch(addTaskFlow(u_id,tf))
    }
}

const page = connect(mapStateToData,mapDispatchToPage)(_page);
Page(page)