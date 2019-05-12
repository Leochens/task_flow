// pages/log/log.js
import {
  connect
} from '../../libs/wechat-weapp-redux';

const page = {
  data: {

  },
  onLoad: function (options) {

  }
}


const mapStateToData = (state) => {
  return {
    u_id: wx.getStorageSync('u_id') || "no_user_id",
  };
}
const mapDispatchToPage = dispatch => ({

})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);