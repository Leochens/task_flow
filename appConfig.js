const appConfig = {
  apiBaseUrl: 'http://localhost:8899',
  // apiBaseUrl: 'http://192.168.1.102:8899',
  // apiBaseUrl: 'https://api.mokis.top',
  expiration: 1000 * 60 * 60 * 24 * 7, //设置SID过期时间 7天
};
// const env = 'prod'
const env = 'dev'
const allowTaskFlowPinToTop = true; // 允许任务置顶
export default appConfig;