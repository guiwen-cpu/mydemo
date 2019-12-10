import React, { Component } from "react";
import { Toast} from 'antd-mobile';
import "./style.css";
import DiscoverMain from "./components/DiscoverMain"
class FaXian extends Component {
  loadingToast() {
    Toast.loading('Loading...', 1, () => {
      console.log('Load complete !!!');
    });
  }
  render() {
    return (
      <div className="discover">
        <div className="discover__category">
          <a href="##" className="discover__coin">
            <div className="content__warpper">
              <p className="title">金币商城</p>
              <p className="tips">0元好物在这里</p>
            </div>
            <span className="icon"></span>
          </a>
          <a href="##" className="discover__recommend">
            <div className="content__warpper">
              <p className="title">推荐有奖</p>
              <p className="tips">20元现金拿不停</p>
            </div>
            <span className="icon"></span>
          </a>
          <a href="##" className="discover__discount">
            <div className="content__warpper">
              <p className="title">周边优惠</p>
              <p className="tips">领取口碑好券</p>
            </div>
            <span className="icon"></span>
          </a>
        </div>
       
        <DiscoverMain loading={this.loadingToast}/>
      </div>
    );
  }
}


export default FaXian;
