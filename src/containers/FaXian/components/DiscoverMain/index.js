import React, { Component } from "react";
import "./style.css";
import RecommendItem from "../ProductItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getRecommends,
  actions as recommendActions,
  getPageCountOfRecommends
} from "../../../../redux/modules/discover";

class DiscoverMain extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.removeListener = false;
  }
  render() {
    const { productData } = this.props;
    return (
      <div className="discover__main">
        <div className="discover__header">
          <p className="discover__header-title">
            <span className="discover__header-title-left"></span>
            为你推荐
            <span className="discover__header-title-right"></span>
          </p>
          <p className="discover__tips">你的口味，我都懂哒</p>
        </div>
        <div className="product__list" ref={this.myRef}>
          {productData.map((item, index) => {
            return <RecommendItem data={item} key={index} />;
          })}
        </div>
        {this.props.pageCount >= 4?(<div className="discover__bottom"> 别拉了！我可是有底线的<span onClick={this.returnTop}/></div> ):null}
      </div>
    );
  }
  returnTop() {
    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  componentDidMount() {
    if (this.props.pageCount < 4) {
      document.addEventListener("scroll", this.handleScroll);
    } else {
      this.removeListener = true; //重新挂在大于等于3，没有添加滚动时间，所以后面（同步）更新数据也不用清楚滚动事件
    }
    if (this.props.pageCount === 0) {
      this.props.recommendActions.loadRecommend();
    }
  }

  componentDidUpdate() {
    //组件挂载完成的时候因为pageCount大于等于3，所以没有添加滚动事件，所以即便更新完成的时候pagecount大于3，也不用清滚动事件
    if (this.props.pageCount >= 4 && !this.removeListener) {
      document.removeEventListener("scroll", this.handleScroll);
      this.removeListener = true;

    }
    console.log(this.props.productData);
  }

  componentWillUnmount() {
    if (!this.removeListener) {
      document.removeEventListener("scroll", this.handleScroll);
    }
  }
  handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const productlistTop = this.myRef.current.offsetTop;
    const productlistHeight = this.myRef.current.offsetHeight;
    if (scrollTop >= productlistHeight + productlistTop - screenHeight) {
      this.props.recommendActions.loadRecommend();
      this.props.loading();
    }
  };
}
const mapStateToProps = (state, props) => {
  return {
    productData: getRecommends(state),
    pageCount: getPageCountOfRecommends(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    recommendActions: bindActionCreators(recommendActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMain);
