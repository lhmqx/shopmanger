import http from "./index";

// 登录接口
export const checkLogin = (params) => http("/api/auth/login", params, "post");
