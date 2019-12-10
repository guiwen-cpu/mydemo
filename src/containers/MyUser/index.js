import React, { Component } from "react";
import Header from "./components/Header";
import HongBao from "./components/HongBao";
import UserMain from "./components/UserMain";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getUsername,
  isLogin,
  actions as myUserActions
} from "../../redux/modules/login";

class MyUser extends Component {
  render() {
    return (
      <div>
        <Header userName={this.props.userName} />
        <HongBao />
        <UserMain login={this.props.login} logout={this.handleLogout} />
      </div>
    );
  }
  handleLogout=()=>{
      this.props.myUserActions.logout()
  }
}
const mapStateToProps = (state, props) => {
  return {
    userName: getUsername(state),
    login: isLogin(state)
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    myUserActions: bindActionCreators(myUserActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyUser);
