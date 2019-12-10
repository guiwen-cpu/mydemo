import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Category from "./components/Category";
import Headline from "./components/Headline";
import Discount from "./components/Discount";
import LikeList from "./components/LikeList";
import HomeHeader from "./components/HomeHeader";
import Footer from "../../components/Footer";
// import LabelBottomNavigation from "../../components/TabBar";
import Activity from "./components/Activity";
import {
  actions as homeActions,
  getLikes,
  getDiscounts,
  getPageCountOfLikes,
  getPage
} from "../../redux/modules/home";
import "./style.css"

class Home extends Component {
 constructor(props) {
    super(props);
    
    this.removeListener = true;
    
  }
  render() {
    const {
      likes,
      discounts,
      pageCount,
      
      page,
      
    } = this.props;
    return (
      <div>
        <HomeHeader />

        <Category />
        <Headline />
        <Activity />
        <Discount data={discounts} />
        
        <LikeList
          data={likes}
          pageCount={pageCount}
          page={page}
          fetchData={this.fetchMoreLikes}
          handlepageCount={this.pageCountHandle}
        />
        <Footer />
        
      </div>
    );
  }
  pageCountHandle=(handleScroll)=>{
    this.props.homeActions.changePage();
    this.fetchMoreLikes();
    this.handleScroll=handleScroll
    document.addEventListener("scroll",handleScroll);
     this.removeListener = false;
    

    
    
  }
 componentDidUpdate() {
    if (this.props.pageCount >= this.props.page && !this.removeListener) {
      document.removeEventListener("scroll", this.handleScroll);
      this.removeListener = true;
    }
    
  }
  componentWillUnmount(){
    
    if(!this.removeListener){
       document.removeEventListener("scroll", this.handleScroll);
    }
  }
 


  componentDidMount() {
    this.props.homeActions.loadDiscounts();
  }

  fetchMoreLikes = () => {
    this.props.homeActions.loadLikes();
  };
}

const mapStateToProps = (state, props) => {
  return {
    likes: getLikes(state),
    discounts: getDiscounts(state),
    pageCount: getPageCountOfLikes(state),
    page: getPage(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
