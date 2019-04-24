import axios from 'axios';
import { Indicator } from 'mint-ui';
// var baseURL = 'http://test99.yunyikang.cn'; // 测试
var baseURL="https://www.yunyikang.cn";       // 正式
axios.defaults.retry = 2;           //  发起请求次数
axios.defaults.retryDelay = 1000;   //  每次请求时间
let http = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
  transformRequest: [function (data) {
    let newData = '';
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    newData = newData.substr(0, newData.length - 1);
    return newData;
  }]
});

http.interceptors.request.use(function (config) {
  // Indicator.open({
  //   text: '',
  //   spinnerType: 'fading-circle'
  // });
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // Indicator.close();
  if (!response.data.code && response.data.code != 0) {
      window.location.href = '/wechat/err404'
  }
  return response;
}, function (error) {
  var config = error.config;
  if(!config || !config.retry) return Promise.reject(error);
  config.__retryCount = config.__retryCount || 0;
    if(config.__retryCount >= config.retry) {
        return Promise.reject(error);
    }
    config.__retryCount += 1;
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    return backoff.then(function() {
      return http(config);
    })
//   if(error && error.response){
//     switch (error.response.status){
//         case 400:
//         console.log('错误请求')
//         break
//         case 401:
//         console.log('未授权，请重新登录')
//             break
//         case 403:
//         console.log('拒绝访问')
//             break
//         case 404:
//         console.log('请求错误,未找到该资源')
//             break
//         case 405:
//         console.log('请求方法未允许')
//             break
//         case 408:
//         console.log('请求超时')
//             break
//         case 500:
//         console.log('服务器端出错')
//             break
//         case 501:
//         console.log('网络未实现')
//             break
//         case 502:
//         console.log('网络错误')
//             break
//         case 503:
//         console.log('服务不可用')
//             break
//         case 504:
//         console.log('网络超时')
//             break
//         case 505:
//         console.log('http版本不支持该请求')
//             break
//         default:
//         console.log(`连接错误${error.response.status}`)
//     }
// }else{
//   console.log('链接服务器失败')
// }
//   return Promise.reject(error);
});


function apiAxios(method, url, params) {
  return new Promise((resolve, reject) => {
    http({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
    }).then(function (res) {
      resolve(res.data);
    }).catch(function (err) {
      reject(err);
    })
  })
}

export default {
  get: function (url, params) {
    return apiAxios('GET', url, params)
  },
  post: function (url, params) {
    return apiAxios('POST', url, params)
  },
  put: function (url, params) {
    return apiAxios('PUT', url, params)
  },
  delete: function (url, params) {
    return apiAxios('DELETE', url, params)
  },
  baseURL: baseURL,
  all: function(arr, response) {
    axios.all(arr).then(
      axios.spread(function(acct, perms) {
        return response(acct, perms);
      })
    );
  },
}
