const request = require("request");

const requestSync = async (url) =>
  new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    })
  })
module.exports = requestSync