// pages/log/log.js
import {
  connect
} from '../../libs/wechat-weapp-redux';
import { fetchLogs } from '../../actions/index';
import { dynamicDate } from '../../utils/util';
const page = {
  data: {
    id: '',
    type: 'tf',
    intellectDatetime: false
  },
  onLoad: function (options) {
    const id = options.id;
    const type = options.type;
    if (!type || !id || !['tf', 't'].includes(type)) return;
    this.fetchLogs(id, type);
    this.setData({
      id,
      type
    })
  }
}


const mapStateToData = (state) => {
  const logs = [...state.logs];
  const intellectDatetime = state.settings.intellectDatetime;
  let Logs = logs || [];
  if (intellectDatetime) { // 是否智能化日期
    Logs = logs.map(log => {
      const _log = { ...log };
      _log.d_create_time = dynamicDate(_log.create_time);
      return _log;
    })
  }
  return {
    logs: Logs,
    intellectDatetime
  };
}
const mapDispatchToPage = dispatch => ({
  fetchLogs: (tf_id, type, callback) => dispatch(fetchLogs(tf_id, type, callback))
})
const _page = connect(mapStateToData, mapDispatchToPage)(page);
Page(_page);