import React, { Component } from "react";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";
import {
  getUsername,
  getPassword,
  getPhoneNumber,
  isLogin,
  noRegister,
  isRegister,
  verification,
  
  actions as loginActions
} from "../../redux/modules/login";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Register from "./components/RegisterForm";

class Login extends Component {
  render() {
    const {    
      
      phoneNumber,
      login,
      noRegister,
      verification,
      isRegister,
      password,
      
      location: { state }
    } = this.props;
    if (login) {
      if (state && state.from) {
        return <Redirect to={state.from} />;
      }
      return <Redirect to="/my" />;
    }
    return (
      <div>
        <LoginHeader onclick={this.handleOnclick} isRegister={isRegister} />
        {isRegister ? (
          <Register
            handleChangePage={this.changePage}
            verification={verification}
            changeVerification={this.changeVerification}
            onChange={this.handleChange}
            noRegister={this.noRegister}
            confirm={this.confirm}
            register={noRegister}
            
           
          />
        ) : (
          <LoginForm
          phoneNumber={phoneNumber}
          register={noRegister}
          confirm={this.confirm}
            noRegister={this.noRegister}
            password={password}
            onSubmit={this.handleSubmit}
            handleChangePage={this.changePage}
          />
        )}
      </div>
    );
  }
 
  noRegister=(tips)=>{
    console.log(123)
    this.props.loginActions.noRegister(tips);
  }
 
  changeVerification = () => {
    this.props.loginActions.changeVerification();
  };
  confirm=(error)=>{
this.props.loginActions.confirm(error)
  }
  changePage = () => {
    this.props.loginActions.noRegister("3");
    this.props.loginActions.changePage();
    console.log(this.props.isRegister);
  };

  // input元素改变的响应函数
  handleChange = e => {
    if (e.target.name === "username") {
      this.props.loginActions.setUsername(e.target.value);
    } else if (e.target.name === "password") {
      this.props.loginActions.setPassword(e.target.value);
    }else if(e.target.name==="phoneNumber"){
      this.props.loginActions.setPhoneNumber(e.target.value);
    }
  };
  handleOnclick = () => {
    this.props.history.goBack();
  };

  // 登录
  handleSubmit = () => {
    this.props.loginActions.login();
  };
}

const mapStateToProps = (state, props) => {
  return {
    username: getUsername(state),
    password: getPassword(state),
    phoneNumber:getPhoneNumber(state),
    login: isLogin(state),
    isRegister: isRegister(state),
    verification: verification(state),
    noRegister:noRegister(state),
    

  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
