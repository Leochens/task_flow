const base = {
    apiBaseUrl: 'http://localhost:8899',
  };
  
  let appConfig = base;
  
  // if (process.env.NODE_ENV == 'development') {
  //   appConfig = {apiBaseUrl: "http://localhost:6789"};
  // }
  export default appConfig;