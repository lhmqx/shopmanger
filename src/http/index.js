import axios from "axios";
import { message } from "antd";
import { addRequest, cancelRequest, removeRequest } from "../config/requestCheck";

// 配置请求超时时间
axios.defaults.timeout = 10000;
// 配置请求token
axios.defaults.headers = { authorization: localStorage.getItem("token") };

// 配置请求拦截器
axios.interceptors.request.use(
  (request) => {
    cancelRequest(request);
    request = addRequest(request);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 配置响应拦截器
axios.interceptors.response.use(
  (response) => {
    removeRequest(response.config);
    if (response.data.tokenCode && response.data.tokenCode === 0) {
      message.warning(response.data.msg);
      setTimeout(() => {
        localStorage.removeItem("userid");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }, 2000);
      return;
    }
    return response.status === 200 ? Promise.resolve(response.data) : Promise.reject(response.data);
  },
  (error) => {
    removeRequest(error.config);
    return Promise.reject(error)
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
