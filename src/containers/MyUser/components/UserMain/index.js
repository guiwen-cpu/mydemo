import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class UserMain extends Component {
  render() {
    const { login, logout } = this.props;
    return (
      <div className="userMain">
        <div className="userMain__one">
          <div className="oneWarpper">
            <i className="oneWarpper__logo"></i>
            <span className="oneWarpper__text">我的地址</span>
            <div className="oneWarpper__arrow">
              <span></span>
            </div>
          </div>
        </div>
        <div className="userMain__two">
          <div className="oneWarpper">
            <i className="twoWarpper__logo__jinbi"></i>
            <span className="oneWarpper__text">金币商城</span>
            <div className="oneWarpper__arrow">
              <span></span>
            </div>
          </div>
          <div className="oneWarpper">
            <i className="twoWarpper__logo—__xianjin"></i>
            <span className="oneWarpper__text">分享拿20元现金</span>
            <div className="oneWarpper__arrow">
              <span></span>
            </div>
          </div>
        </div>
        <div className="userMain__three">
          <div className="oneWarpper">
            <i className="oneWarpper__logo__kefu"></i>
            <span className="oneWarpper__text">我的客服</span>
            <div className="oneWarpper__arrow">
              <span></span>
            </div>
          </div>
          <div className="oneWarpper">
            <i className="oneWarpper__logo__App"></i>
            <span className="oneWarpper__text">下载App</span>
            <div className="oneWarpper__arrow">
              <span></span>
            </div>
          </div>
          <div className="oneWarpper">
            <i className="oneWarpper__logo__rule"></i>
            <span className="oneWarpper__text">规则中心</span>
            <div className="oneWarpper__arrow">
              <span></span>
            </div>
          </div>
        </div>
        <div className="user__login__botton">
          <Link
            to={login?"/my":"/login"}
            onClick={logout}
            className={login ? "gray" : "light"}
          >
            {login ? "退出登录" : "点击登录"}
          </Link>
        </div>
      </div>
    );
  }
}

export default UserMain;
