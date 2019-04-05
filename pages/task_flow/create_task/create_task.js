// pages/task_flow/create_task/create_task.js
import {
  compareDate,
  formatTime
} from '../../../utils/util';
import {connect} from '../../../libs/wechat-weapp-redux';
import {addTask} from '../../../actions/index';
const _page = {

  /**
   * 页面的初始数据
   */
  data: {
    beginDate: formatTime(new Date()),
    endDate: formatTime(new Date()),
    members:[],
    selectedMembersIds:[],
    selectedMembersNames:[],
    selectedMembers:[]
  },
  onLoad:function(op){
    const timeLimit = JSON.parse(op.time);
    const tf_id = op.tf_id || '123456';
    const members = JSON.parse(op.members)||[];
    console.log(op);
    this.setData({
      timeLimit,
      tf_id,
      members
    })
  },
  bindBeginDateChange: function (e) {
    const {
      beginDate: oldBegindate,
      endDate,
      timeLimit
    } = this.data;
    const beginDate = e.detail;
    console.log("beginDate", e.detail);
    if (compareDate(timeLimit.beginDate, beginDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '开始日期不能比任务流开始日期小',
      });
      this.setData({
        beginDate: oldBegindate
      })
      return false
    }
    if (compareDate(beginDate, endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '开始日期不能比结束日期大',
      });
      this.setData({
        beginDate: oldBegindate
      })
      return false
    }
    this.setData({
      beginDate
    })
  },
  bindEndDateChange: function (e) {
    const endDate = e.detail;
    const {
      endDate: oldEndDate,
      beginDate,
      timeLimit
    } = this.data;
    console.log("endDate", e.detail);
    if (compareDate(endDate,timeLimit.endDate)) {
      wx.showModal({
        title: '日期选择有误',
        content: '结束日期不能比任务流结束日期大',
      })
      this.setData({
        endDate: oldEndDate
      })
      return false;
    }
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
  selectMember:function(e){
    // console.log()
      wx.navigateTo({
        url:'./select_member/select_member?members='+JSON.stringify(this.data.members)+"&selected_members="+JSON.stringify(this.data.selectedMembersIds)
      })
  },
  onSubmit:function(e){
    console.log(e);

    const data = e.detail.value;
    if(!data.t_name || !data.t_describe){
      wx.showModal({
        title: '提示',
        content: '请填写完整字段',
      })
      return false;
    }
    if(!this.data.selectedMembers.length){
      wx.showModal({
        title:"提示",
        content: "请至少选择一个任务人"
      });
      return false;
    }
    const {t_name,t_describe} = data;

    const task = {
      t_name,
      t_describe,
      is_completed:false,
      begin_time: this.data.beginDate,
      end_time: this.data.endDate,
      is_important:false,
      members:this.data.selectedMembers // 第二次sql执行
    }
    this.addTask(this.data.tf_id,JSON.stringify(task),this.data.selectedMembers);
    
  }
}
const mapStateToData = state => {
  return {

  }
}
const mapDispatchToPage = dispatch => {
    return {
      addTask: (tf_id,task,members) => dispatch(addTask(tf_id,task,members))
    }
}

const page = connect(mapStateToData,mapDispatchToPage)(_page);

Page(page)