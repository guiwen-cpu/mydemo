import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../App";
import Discover from "../Discover";
import Buycar from "../Buycar";
import My from "../My";
import TabBar from "../../components/TabBar";
import Login from "../Login";
import User from "../User";
import ProductDetail from "../ProductDetail";
import Search from "../Search";
import SearchResult from "../SearchResult";
import Purchase from "../Purchase";
import PrivateRoute from "../PrivateRoute";
import { actions as appActions, getError,getLength } from "../../redux/modules/app";
// import ErrorToast from "../../components/ErrorToast";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getIds} from "../../redux/modules/user"
import "./style.css";
import { Toast } from "antd-mobile";
class AppAll extends Component {
  constructor(props){
    super(props)
    this.btn = React.createRef()
  }
  render() {
    // const {
    //   error,

    // } = this.props;
    return (
      <div >
        <Router>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/user" component={User} />
          <Route path="/detail/:id" component={ProductDetail} />
          <Route path="/search" component={Search} />
          <Route path="/search_result" component={SearchResult} />
          <PrivateRoute path="/purchase/:id" component={Purchase} />

          <Route path="/home" exact component={App} />
          <Route path="/discover" component={Discover} />
          <Route path="/buycar" component={Buycar} />
          <Route path="/my" component={My} />
          <Route
            path="/"
            {...this.props}
            render={props => {
              return (
                <div>
                  <Redirect to="/home" />
                  <TabBar idLength={this.props.idLength} setLength={this.props.setLength} />
                </div>
              );
            }}
          />
        </Router>
        <div ref={this.btn} id="btnTop" onClick={this.returnTop}></div>
        
      </div>
    );
  }
  scrollFunction() {
  // let scrollTop = document.body.scrollTop || document.documentElement.scrollTop

  // if(scrollTop > 400) {
  //   document.getElementById("btnTop").style.display = "block";
  // }else {
  //   document.getElementById("btnTop").style.display = "none";
  // }

  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    this.btn.current.style.display = "block";
  } else {
    this.btn.current.style.display = "none";
  }
}
componentDidMount(){
 this.scrollFunction()
}
  componentDidUpdate() {
    // this.offline(this.props.error);
   
    
  }
 
  offline(error) {
    Toast.offline(error, 1);
  }
  returnTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
const mapStateToProps = (state, props) => {
  return {
    error: getError(state),
    idLength:getIds(state),
    setLength:getLength(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppAll);
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  // let scrollTop = document.body.scrollTop || document.documentElement.scrollTop

  // if(scrollTop > 400) {
  //   document.getElementById("btnTop").style.display = "block";
  // }else {
  //   document.getElementById("btnTop").style.display = "none";
  // }

  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    document.getElementById("btnTop").style.display = "block";
  } else {
    document.getElementById("btnTop").style.display = "none";
  }
}

// 点击按钮，返回顶部
