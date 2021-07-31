// 主入口
import React from "react";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Index from "../background/main/Index";
import Login from "../login/Login";
import NotFound from "../notFound/NotFound";

export default function Main() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home/index" component={Index} />
        <Redirect exact from="/" to="/login" />
        <Redirect exact from="/home" to="/home/index" />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
