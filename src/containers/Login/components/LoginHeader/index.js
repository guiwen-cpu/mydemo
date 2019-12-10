import React, { Component } from 'react';

import "./style.css"

class LoginHeader extends Component {
  render() {
    const {isRegister}=this.props
    return (
      <div className="loginHeader">
        <span onClick={()=>{this.props.onclick()}} className="loginHeader__back"></span>
        <div className="loginHeader__title">{isRegister?"欢迎注册":"欢迎登录"}</div>
      </div>
    );
  }
}

export default LoginHeader;