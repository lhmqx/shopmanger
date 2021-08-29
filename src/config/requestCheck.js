import axios from "axios";

// 请求存储容器
const requestList = [];

// 添加请求
function addRequest(config) {
  if (!config) return;
  if (config.method && config.method === "get") {
    config.cancelToken = new axios.CancelToken((c) => {
      requestList.push({
        url: config.url,
        params: JSON.stringify({ ...delete config.params.token }),
        cancel: c,
      });
    });
  } else if (config.method && config.method === "post") {
    config.cancelToken = new axios.CancelToken((c) => {
      requestList.push({
        url: config.url,
        params: JSON.stringify({ ...delete config.data.token }),
        cancel: c,
      });
    });
  }
  return config;
}

// 取消请求
function cancelRequest(config) {
  if (!config) return;
  let data;
  if(!!config.params){
    data = JSON.stringify(config.params);
  }else{
    delete config.data.token;
    data = JSON.stringify(config.data);
  }
  requestList.forEach((item, index) => {
    if (item.url === config.url && item.params === data) {
      item.cancel("cancel");
      requestList.splice(index, 1);
    }
  });
}

// 移除请求
function removeRequest(config) {
  if (!config) return;
  requestList.forEach((item, index) => {
    if (item.url === config.url) {
      requestList.splice(index, 1);
    }
  });
}

export { addRequest, cancelRequest, removeRequest };
