import React, { Component } from "react";
import { Toast } from "antd-mobile";
import "./style.css";
import Tip from "../../../../components/Tip";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.phoneNumber = React.createRef();
    this.passWord = React.createRef();
  }
  render() {
    const { handleChangePage, register } = this.props;
    return (
      <div className="loginForm">
        <div className="loginForm__inputContainer">
          <div className="loginForm__row">
            <label className="loginForm__mobileLabel">86</label>
            <input
              ref={this.phoneNumber}
              className="loginForm__input"
              name="phoneNumber"
              placeholder="请输入手机号"
            ></input>
          </div>
          <div className="loginForm__row">
            <label className="loginForm__passwordLabel">密码</label>
            <input
              ref={this.passWord}
              className="loginForm__input"
              name="password"
              type="password"
              placeholder="请输入密码"
            ></input>
          </div>
        </div>
        <div className="loginForm__btnContainer">
          <button className="loginForm__btn" onClick={this.handleLogin}>
            登录
          </button>
        </div>
        <div onClick={handleChangePage} className="loginForm__toRegister">
          跳到注册
        </div>
        {register === "1" ? (
          <Tip
            message="该手机号还没注册，点击确定前往注册"
            onClose={handleChangePage}
          />
        ) : null}
      </div>
    );
  }
  handleLogin = () => {
    const mPattern = /^1[3456789]\d{9}$/;
    if (
      !this.phoneNumber.current.value ||
      !mPattern.test(this.phoneNumber.current.value)
    ) {
      this.props.confirm("手机号为空或格式不正确");
      Toast.offline("手机号为空或格式不正确", 1);
      return;
    } else if (this.props.phoneNumber !== this.phoneNumber.current.value) {
      this.props.noRegister("1");
      return;
    } else if (
      !this.passWord.current.value ||
      this.props.password !== this.passWord.current.value
    ) {
      this.props.confirm("密码为空或密码不正确！");
      Toast.offline("密码为空或密码不正确！", 1);
      return;
    }
    this.props.onSubmit();
  };
}

export default LoginForm;
