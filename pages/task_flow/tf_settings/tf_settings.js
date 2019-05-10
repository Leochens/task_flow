// pages/task_flow/tf_settings/tf_settings.js

import {
  connect
} from '../../../libs/wechat-weapp-redux';

const page = {

  /**
   * 页面的初始数据
   */
  data: {
    tf_id: '',
    is_leader: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const tf_id = options.tf_id;
    const is_leader = options.is_leader === 'true' ? true : false;
    this.setData({
      tf_id,
      is_leader
    })
  }
}
const mapStateToData = state => {
  return {

  }
}

const mapDispatchToPage = dispatch => {
  return {
  }
}
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page)

