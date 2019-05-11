// pages/task_flow/tf_settings/tf_settings.js

import {
  connect
} from '../../../libs/wechat-weapp-redux';
import { toggleTaskFlowMemverInvite } from '../../../actions/index';
const app = getApp();
const page = {
  data: {
    tf_id: '',
    is_leader: false,
    invite: true
  },
  onLoad: function (options) {
    console.log(options);
    const tf_id = options.tf_id;
    const is_leader = options.is_leader === 'true' ? true : false;
    const invite = Number(options.invite);
    this.setData({
      tf_id,
      is_leader,
      invite
    })
  },
  toggleInviteStatus: function () {
    const { tf_id, invite } = this.data;
    const u_id = app.globalData.u_id;
    this.toggleTaskFlowMemverInvite(u_id, tf_id, !invite);
  }
}
const mapStateToData = state => {
  return {

  }
}

const mapDispatchToPage = dispatch => {
  return {
    toggleTaskFlowMemverInvite: (u_id, tf_id, status) => dispatch(toggleTaskFlowMemverInvite(u_id, tf_id, status))
  }
}
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page)

