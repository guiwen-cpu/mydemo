import React, { Component } from "react";
import "./style.css"

class UserHeader extends Component {
  render() {
   
    return (
      <header className="userHeader">
        
        <div className="userHeader__list">
          <span className="userHeader__item userHeader__item--selected">
            订单
          </span>
          <span className="userHeader__item">抵用券</span>
        </div>
       
      </header>
    );
  }
}

export default UserHeader;
