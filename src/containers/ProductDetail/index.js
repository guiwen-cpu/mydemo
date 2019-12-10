import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProductOverview from "./components/ProductOverview";
import ShopInfo from "./components/ShopInfo";
import Detail from "./components/Detail";
import Remark from "./components/Remark";
import BuyButton from "./components/BuyButton";
import Header from "../../components/Header";
import { ActionSheet, Toast } from "antd-mobile";
import {
  actions as detailActions,
  getProduct,
  getRelatedShop,
  getShare
} from "../../redux/modules/detail";
import { actions as purchaseActions } from "../../redux/modules/purchase";

class ProductDetail extends Component {
  render() {
    const { product, relatedShop, share } = this.props;
    return (
      <div>
        <Header
          title="团购详情"
          share={share}
          showShare={this.showShareActionSheetMulpitleLine}
          onBack={this.handleBack}
          grey
        />
        {product && (
          <ProductOverview data={product} addCart={this.handleAddCart} />
        )}
        {relatedShop && (
          <ShopInfo data={relatedShop} total={product.shopIds.length} />
        )}
        {product && (
          <div>
            <Detail data={product} />
            <Remark data={product} />
            <BuyButton productId={product.id} />
          </div>
        )}
      </div>
    );
  }
  dataList = [
    { url: "OpHiXAcYzmPQHcdlLFrc", title: "发送给朋友" },
    { url: "wvEzCMiDZjthhAOcwTOu", title: "新浪微博" },
    { url: "cTTayShKtEIdQVEMuiWt", title: "生活圈" },
    { url: "umnHwvEgSyQtXlZjNJTt", title: "微信好友" },
    { url: "SxpunpETIwdxNjcJamwB", title: "QQ" }
  ].map(obj => ({
    
    icon: (
      <img
        src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`}
        onClick={()=>{Toast.success("分享成功!", 1)}}
        alt={obj.title}
        style={{ width: 36 }}
      />
    ),
    title: obj.title
  }));
  showShareActionSheetMulpitleLine = () => {
    const data = [
      [...this.dataList, this.dataList[2]],
      [this.dataList[3], this.dataList[4]]
    ];
    ActionSheet.showShareActionSheetWithOptions(
      {
        options: data,
        message: "嘿！你想分享到哪里呢"
      },
      (buttonIndex, rowIndex) => {
        this.setState({
          clicked2:
            buttonIndex > -1 ? data[rowIndex][buttonIndex].title : "cancel"
        });
      }
    );
  };
  showSuccess = () => {
    console.log(456789)
    Toast.success("分享成功!", 1);
  };

  componentDidMount() {
    this.props.detailActions.showShare();
    const { product } = this.props;
    if (!product) {
      const productId = this.props.match.params.id;
      this.props.detailActions.loadProductDetail(productId);
    } else if (!this.props.relatedShop) {
      this.props.detailActions.loadShopById(product.nearestShop);
    }
  }
  componentWillUnmount() {
    this.props.detailActions.showShare();
  }

  componentDidUpdate(preProps) {
    // 第一次获取到产品详情时，需要继续获取关联的店铺信息
    if (!preProps.product && this.props.product) {
      this.props.detailActions.loadShopById(this.props.product.nearestShop);
    }
  }
  handleAddCart = () => {
    const productId = this.props.match.params.id;
    this.props.purchaseActions.addCart(productId);
  };

  handleBack = () => {
    this.props.history.goBack();
    console.log(this.props);
  };
}

const mapStateToProps = (state, props) => {
  const productId = props.match.params.id;
  return {
    product: getProduct(state, productId),
    relatedShop: getRelatedShop(state, productId),
    share: getShare(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    detailActions: bindActionCreators(detailActions, dispatch),
    purchaseActions: bindActionCreators(purchaseActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
