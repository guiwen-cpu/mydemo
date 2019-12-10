import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "../../components/Header";
import PurchaseForm from "./components/PurchaseForm";
import Tip from "../../components/Tip";
import {
  actions as purchaseActions,
  getProduct,
  getQuantity,
  getTipStatus
} from "../../redux/modules/purchase";
import { getUsername, getPhoneNumber } from "../../redux/modules/login";
import { actions as detailActions } from "../../redux/modules/detail";
import { actions as userActions } from "../../redux/modules/user";
import { Toast, Modal } from "antd-mobile";
const alert = Modal.alert;
const prompt = Modal.prompt;

class Purchase extends Component {
  render() {
    const { product, username, quantity, showTip, phone } = this.props;
    return (
      <div>
        <Header title="下单" onBack={this.handleBack} />
        {product ? (
          <PurchaseForm
            phone={phone}
            product={product}
            username={username}
            quantity={quantity}
            onSubmit={this.handleSubmit}
            onSetQuantity={this.handleSetQuantity}
            choicePay={this.choicePay}
          />
        ) : null}
        {showTip ? (
          <Tip message="购买成功！" onClose={this.handleCloseTip} />
        ) : null}
      </div>
    );
  }

  componentDidMount() {
    const { product } = this.props;
    if (!product) {
      const productId = this.props.match.params.id;
      this.props.detailActions.loadProductDetail(productId);
    }
  }

  componentWillUnmount() {
    this.props.purchaseActions.setOrderQuantity(1);
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  handleCloseTip = () => {
    this.props.purchaseActions.closeTip();
  };

  // 提交订单
  handleSubmit = () => {};

  //设置购买数量
  handleSetQuantity = quantity => {
    this.props.purchaseActions.setOrderQuantity(quantity);
  };
  choicePay = totalPrice => {
    alert(
      "请选择你的支付方式",
      <div>
        <span className="weixin"></span>
        <span className="zhifubao"></span>
      </div>,
      [
        {
          text: "微信支付",
          onPress: () =>
           prompt(
              "微信支付",
              `请支付：${totalPrice} 元`,
              (login, password) => {
               
                
                if (login === totalPrice) {
                  
                  const productId = this.props.match.params.id;
                this.props.purchaseActions.submitOrder(productId);
                  Toast.success("购买成功!", 1);
                } else {
                  Toast.fail("输入金额错误!", 1);
                }
              },
              "login-password",
              null,
              ["请输入金额", "请输入你的密码"]
            )
        },
        {
          text: "支付宝支付",
          onPress: () => {
            prompt(
              "支付宝支付",
              `请支付：${totalPrice} 元`,
               (login, password) => {
               
                
                if (login === totalPrice) {
                  
                  const productId = this.props.match.params.id;
                this.props.purchaseActions.submitOrder(productId);
                  Toast.success("购买成功!", 1);
                } else {
                  Toast.fail("输入金额错误!", 1);
                }
              },
              
              "login-password",
              null,
              ["请输入金额", "请输入你的密码"]
            )
          }
        }
      ]
    );
  };
}

const mapStateToProps = (state, props) => {
  const productId = props.match.params.id;
  return {
    product: getProduct(state, productId),
    quantity: getQuantity(state),
    showTip: getTipStatus(state),
    username: getUsername(state),
    phone: getPhoneNumber(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseActions: bindActionCreators(purchaseActions, dispatch),
    detailActions: bindActionCreators(detailActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
