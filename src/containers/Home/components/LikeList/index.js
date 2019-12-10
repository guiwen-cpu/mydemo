import React, { Component } from "react";
import LikeItem from "../LikeItem";
import Loading from "../../../../components/Loading";
import "./style.css";
import { Toast } from "antd-mobile";

class LikeList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.removeListener = false;
  }

  render() {
    const { data, pageCount, page, handlepageCount } = this.props;

    return (
      <div ref={this.myRef} className="likeList">
        <div className="likeList__header">猜你喜欢</div>
        <div className="likeList__list">
          {data.map((item, index) => {
            return <LikeItem key={index} data={item} />;
          })}
        </div>
        {pageCount < page ? (
          <Loading />
        ) : pageCount >= 15 ? (
          <div className="likeList__bottom">
            
            别拉了！我可是有底线的
            <span onClick={this.returnTop} />
          </div>
        ) : (
          <a
            href="##"
            onClick={() => {
              handlepageCount(this.handleScroll);
            }}
            className="likeList__viewAll"
          >
            查看更多
          </a>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (this.props.pageCount < this.props.page) {
      document.addEventListener("scroll", this.handleScroll);
    } else {
      this.removeListener = true;
    }
    if (this.props.pageCount === 0) {
      this.props.fetchData();
    }
  }
  returnTop() {
    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  componentDidUpdate() {
    if (this.props.pageCount >= this.props.page && !this.removeListener) {
      document.removeEventListener("scroll", this.handleScroll);
      this.removeListener = true;
    }
    
  }

  componentWillUnmount() {
    if (!this.removeListener) {
      document.removeEventListener("scroll", this.handleScroll);
    }
  }

  // 处理屏幕滚动事件，实现加载更多的效果
  handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const likeListTop = this.myRef.current.offsetTop;
    const likeListHeight = this.myRef.current.offsetHeight;
    if (scrollTop > likeListHeight + likeListTop - screenHeight) {
      this.props.fetchData();
      Toast.loading("Loading...", 1, () => {
        console.log("Load complete !!!");
      });
    }
  };
}

export default LikeList;
