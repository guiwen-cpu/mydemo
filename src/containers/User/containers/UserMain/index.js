import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  actions as userActions,
  getCurrentTab,
  getDeletingOrderId,
  getCurrentOrderComment,
  getCurrentOrderStars,
  getCommentingOrderId,
  getCommentAll
} from "../../../../redux/modules/user";
import { getUsername } from "../../../../redux/modules/login";
import OrderItem from "../../components/OrderItem";
import Confirm from "../../../../components/Confirm";
import "./style.css";
import { Toast } from "antd-mobile";
import {
  actions as purchaseActions,
  getQuantity
} from "../../../../redux/modules/purchase";
import { actions as orderActions } from "../../../../redux/modules/entities/orders";


const tabTitles = ["全部订单", "待付款", "已付款", "退款/售后"];

class UserMain extends Component {
  render() {
    const { currentTab, data, deletingOrderId } = this.props;
    return (
      <div className="userMain">
        <div className="userMain__menu">
          {tabTitles.map((item, index) => {
            return (
              <div
                key={index}
                className="userMain__tab"
                onClick={this.handleClickTab.bind(this, index)}
              >
                <span
                  className={
                    currentTab === index
                      ? "userMain__title userMain__title--active"
                      : "userMain__title"
                  }
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
        <div className="userMain__content">
          {data && data.length > 0
            ? this.renderOrderList(data)
            : this.renderEmpty()}
        </div>
        {deletingOrderId ? this.renderConfirmDialog() : null}
      </div>
    );
  }

  renderOrderList = data => {
    const {
      commentingOrderId,
      orderComment,
      orderStars,
      username,
      commentAll,
      quantity,
      
    } = this.props;
    return data.map(item => {
      return (
        <OrderItem
          quantity={quantity}
          
          onSetQuantity={this.setOrderQuantity}
          key={item.id}
          data={item}
          deleteComment={this.handleDeleteComment}
          handleRefund={this.handleRefund}
          handleType={this.handleType}
          isCommenting={item.id === commentingOrderId}
          comment={item.id === commentingOrderId ? orderComment : ""}
          stars={item.id === commentingOrderId ? orderStars : 0}
          onCommentChange={this.handleCommentChange}
          onStarsChange={this.handleStarsChange}
          onComment={this.handleComment}
          onRemove={this.handleRemove}
          onSubmitComment={this.handleSubmitComment}
          onCancelComment={this.handleCancelComment}
          username={username}
          commentAll={commentAll}
          setCommentAll={this.setCommentAll}
        />
      );
    });
  };

  renderEmpty = () => {
    return (
      <div className="userMain__empty">
        <div className="userMain__emptyIcon" />
        <div className="userMain__emptyText1">您还没有相关订单</div>
        <div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
      </div>
    );
  };

  //删除对话框
  renderConfirmDialog = () => {
    const {
      userActions: { hideDeleteDialog }
    } = this.props;
    return (
      <Confirm
        content="确定删除该订单吗？"
        cancelText="取消"
        confirmText="确定"
        onCancel={hideDeleteDialog}
        onConfirm={this.handleOnConfirm}
      />
    );
  };
  setOrderQuantity = (quantity, productId, orderId) => {
    const {
      orderActions: { setQuantity }
    } = this.props;

    const {
      purchaseActions: { setOrderQuantity }
    } = this.props;
    setOrderQuantity(quantity);
    setQuantity(quantity, productId, orderId);
  };
  handleOnConfirm = () => {
    this.props.userActions.removeOrder();
    setTimeout(() => {
      Toast.success("删除成功!", 1);
    }, 300);
  };
  // 评价内容变化
  handleCommentChange = comment => {
    const {
      userActions: { setComment }
    } = this.props;
    setComment(comment);
  };

  // 订单评级变化
  handleStarsChange = stars => {
    const {
      userActions: { setStars }
    } = this.props;
    setStars(stars);
  };

  //选中当前要评价的订单
  handleComment = orderId => {
    const {
      userActions: { showCommentArea }
    } = this.props;
    showCommentArea(orderId);
  };

  //提交评价
  handleSubmitComment = () => {
    const {
      userActions: { submitComment }
    } = this.props;
    submitComment();
  };

  //取消评价
  handleCancelComment = () => {
    const {
      userActions: { hideCommentArea }
    } = this.props;
    hideCommentArea();
  };

  handleRemove = orderId => {
    this.props.userActions.showDeleteDialog(orderId);
  };

  handleClickTab = index => {
    this.props.userActions.setCurrentTab(index);
  };
  setCommentAll = (commentId, id) => {
    this.props.userActions.setCommentAll(commentId, id);
  };
  handleType = orderId => {
    this.props.userActions.changeType(orderId);
  };
  handleRefund = orderId => {
    this.props.userActions.refundType(orderId);
  };
  handleDeleteComment = (commentId, orderId) => {
    this.props.userActions.deleteComment(commentId, orderId);
  };
}

const mapStateToProps = (state, props) => {
  return {
    currentTab: getCurrentTab(state),
    deletingOrderId: getDeletingOrderId(state),
    commentingOrderId: getCommentingOrderId(state),
    orderComment: getCurrentOrderComment(state),
    orderStars: getCurrentOrderStars(state),
    quantity: getQuantity(state),
    username: getUsername(state),
    commentAll: getCommentAll(state),
   
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    purchaseActions: bindActionCreators(purchaseActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMain);
