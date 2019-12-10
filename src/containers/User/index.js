import React, { Component } from 'react';
import UserMain from "./containers/UserMain"
import UserHeader from "./components/UserHeader"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { actions as userActions, getOrders} from "../../redux/modules/user"
import { actions as loginActions } from "../../redux/modules/login"


class User extends Component {
  render() {
    const {orders} = this.props
    return (
      <div>
        <UserHeader />
        <UserMain data={orders} />
      </div>
    );
  }

  componentDidMount() {
    this.props.userActions.loadOrders()
  }

  // handleBack = () => {
    
  //   this.props.history.goBack() 
  // }

  // handleLogout = () => {
  //   console.log(this.props)
  //   this.props.loginActions.logout();
  // }

 
}

const mapStateToProps = (state, props) => {
  return {
    orders: getOrders(state)
    
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);