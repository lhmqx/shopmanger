import React from "react";
import "./login.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { checkLogin } from "../../http/adminApi";

let pro;

export default function Login(props) {
  pro = props;
  return (
    <div className="loginMain">
      <div className="login">
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={confirmLogin}>
          <Form.Item name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "请输入密码!" }]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="www.baidu.com">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

// 确认登录
async function confirmLogin(options){
  let { username, password} = options;
  try {
    let loginMes = await checkLogin({username,password});
    if(loginMes.username==="zhangsan"&&loginMes.password==="123456"){
      pro.history.replace("/home");
    }else{
      return;
    }
    // if(loginMes.status === 200){
    //   pro.history.repolace("/home");
    // }
  } catch (error) {
    console.log(error);
  }
}