import http from "./index";

// 登录接口
export const getShopMes = (params) => http("/api/shop/shopmessage", params, "post");
