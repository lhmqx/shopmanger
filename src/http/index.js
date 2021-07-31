import axios from "axios";

// 配置请求超时时间
axios.defaults.timeout = 10000;

// 配置请求拦截器
axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.error(error);
  }
);

// 配置相应拦截器
axios.interceptors.response.use(
  (response) => {
    return response.status === 200 ? Promise.resolve(response.data) : Promise.reject(response.data);
  },
  (error) => {
    console.log(error);
  }
);

export default function http(url = "", params = {}, type = "GET") {
  let promise;
  return new Promise((resolve, reject) => {
    // 判断请求类型
    if (type.toUpperCase() === "GET") {
      // get请求
      promise = axios({
        url,
        params,
      });
    } else {
      // post请求
      promise = axios({
        method: "post",
        url,
        data: params,
      });
    }
    // 处理返回结果
    promise
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
