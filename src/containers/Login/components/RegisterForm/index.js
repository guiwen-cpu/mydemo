import React, { Component } from "react";
import { Toast } from "antd-mobile"
import "./style.css";
import Tip from "../../../../components/Tip"
class Register extends Component {
  constructor(props) {
    super(props)
    this.phoneNumber = React.createRef()
    this.userName = React.createRef()
    this.passWord = React.createRef()
    this.confirmPassword = React.createRef()
    this.verification = React.createRef()
  }
  render() {
    const { onChange, handleChangePage, verification, changeVerification, register } = this.props;
    return (
      <div className="registerForm">
        <div className="registerForm__inputContainer">
          <div className="registerForm__row">
            <label className="registerForm__mobileLabel">名称</label>
            <input ref={this.userName}
              className="registerForm__input"
              name="username"
              placeholder="请输入用户名"
              onChange={onChange}
            ></input>
          </div>
          <div className="registerForm__row">
            <label className="registerForm__mobileLabel">86</label>
            <input ref={this.phoneNumber}
              className="registerForm__input"
              name="phoneNumber"
              placeholder="请输入手机号"
              onChange={onChange}
            ></input>
          </div>
          <div className="registerForm__row">
            <label className="registerForm__passwordLabel">密码</label>
            <input ref={this.passWord}
              className="registerForm__input"
              name="password"
              type="password"
              placeholder="请输入密码"
              onChange={onChange}
            ></input>

          </div>
          
          <div className="registerForm__row">
            <label className="registerForm__passwordLabel">密码</label>
            <input ref={this.confirmPassword}
              className="registerForm__input"
              name="password"
              type="password"
              placeholder="再次输入密码"
            ></input>
          </div>
          <div className="registerForm__row">
            <label className="registerForm__passwordLabel">验证码</label>
            <input ref={this.verification}
              className="registerForm__input"
              name="verification"
              placeholder="请输入验证码"
            ></input>
            <span
              onClick={changeVerification}
              className="registerForm__verification"
            >
              {verification}
            </span>
          </div>
        </div>
        <div className="registerForm__btnContainer">
          <button className="registerForm__btn" onClick={this.handleSubmit}>
            注册
          </button>
        </div>
        <div onClick={handleChangePage} className="registerForm__toLogin">
          跳到登录
        </div>
        {register === "2" ? <Tip message="恭喜你！注册成功" onClose={handleChangePage} /> : null}
      </div>
    );
  }

  handleSubmit = () => {
    const mPattern = /^1[3456789]\d{9}$/
    const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
    if (!this.userName.current.value) {
      this.props.confirm("用户名不能为空")
      Toast.offline("用户名不能为空", 1);
      return
    } else if (!this.phoneNumber.current.value || !mPattern.test(this.phoneNumber.current.value)) {
      this.props.confirm("手机号为空或格式不正确！")
      Toast.offline("手机号为空或格式不正确！", 1);
      return
    }
    else if (!this.passWord.current.value || !password.test(this.passWord.current.value)) {
      this.props.confirm("密码为空或密码强度过低！")
      Toast.offline("密码为空或密码强度过低！", 1);
      return
    } else if (this.passWord.current.value !== this.confirmPassword.current.value) {
      this.props.confirm("两次密码输入不一致！")
      Toast.offline("两次密码输入不一致！", 1);
      return
    } else if (this.verification.current.value !== this.props.verification) {
      this.props.confirm("验证码为空或输入不正确！")
      Toast.offline("验证码为空或输入不正确！", 1);
      return
    }



    this.props.noRegister("2")


  }

}

export default Register;
