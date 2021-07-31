import React from "react";

export default function Login(props) {
  return (
    <>
      <button onClick={() => props.history.replace("/home")}>登录</button>
    </>
  );
}
