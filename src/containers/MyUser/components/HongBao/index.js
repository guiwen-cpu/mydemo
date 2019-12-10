import React, { Component } from "react";
import "./style.css"
class HongBao extends Component {
  render() {
    return (
      <div className="hongBao">
        <div className="hongBao__left">
          <p className="hongBao__p1">
            <span>0</span>个
          </p>
          <p className="hongBao__p2">红包</p>
        </div>
        <div className="hongBao__right">
          <p style={{color:"green"}} className="hongBao__p1">
            <span style={{color:"green"}}>0</span>个
          </p>
          <p className="hongBao__p2">红包</p>
        </div>
      </div>
    );
  }
}

export default HongBao;
