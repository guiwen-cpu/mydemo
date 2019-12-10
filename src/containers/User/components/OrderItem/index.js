import React, { Component } from "react";
import { Toast, Modal } from "antd-mobile";
import "./style.css";
const alert = Modal.alert;
const prompt = Modal.prompt;
class OrderItem extends Component {
  render() {
    const {
      data: { id, title, statusText, orderPicUrl, channel, text, type },
      isCommenting,
      commentAll,
      quantity
    } = this.props;

    return (
      <div className="orderItem">
        <div className="orderItem__title">
          <span>{title}</span>
        </div>
        <div className="orderItem__main">
          <div className="orderItem__imgWrapper">
            <div className="orderItem__tag">{statusText}</div>
            <img alt="" className="orderItem__img" src={orderPicUrl} />
          </div>
          <div className="orderItem__content">
            <div className="orderItem__line">{text[0]}</div>
            <div className="orderItem__line">{text[1]}</div>
          </div>
          {type === 2 ? (
            <div className="orderItem_setNum">
              <span
                className="orderItem__counter--dec"
                onClick={this.handleDecrease}
              >
                -
              </span>
              <input
                className="purchaseForm__quantity"
                type="number"
                onChange={this.handleChange}
                value={quantity}
              />
              <span
                className="orderItem__counter--inc"
                onClick={this.handleIncrease}
              >
                +
              </span>
            </div>
          ) : null}
        </div>
        <div className="orderItem__bottom">
          <div className="orderItem__type">{channel}</div>
          <div>
            {type === 2 || type === 4 ? null : (
              <div className="orderItem__btn" onClick={this.refund}>
                退款/售后
              </div>
            )}
            {type === 2 ? (
              <div className="orderItem__btn" onClick={this.choicePay}>
                付款
              </div>
            ) : null}
            {type === 3 || type === 4 ? (
              <div className="orderItem__btn" onClick={this.handleComment}>
                评价
              </div>
            ) : null}
            <div className="orderItem__btn" onClick={this.handleRemove}>
              删除
            </div>
          </div>
        </div>
        {commentAll && commentAll[id] ? (
          <div>{this.renderComment()}</div>
        ) : null}
        {isCommenting ? this.renderEditArea() : null}
      </div>
    );
  }
  handleDecrease = () => {
    const {
      quantity,
      data: { productId, id }
    } = this.props;
    if (quantity > 0) {
      this.props.onSetQuantity(quantity - 1, productId, id);
    }
  };

  handleIncrease = () => {
    const {
      quantity,
      data: { productId, id }
    } = this.props;
    this.props.onSetQuantity(quantity + 1, productId, id);
  };

  handleChange = e => {
    const {
      data: { productId, id }
    } = this.props;
    const quantity = e.target.value;
    this.props.onSetQuantity(Number.parseInt(quantity, productId, id));
  };
  refund = () => {
    prompt(
      "问题反馈",
      "请输入你要反馈的问题",
      [
        { text: "取消" },
        {
          text: "提交",
          onPress: () => {
            const orderId = this.props.data.id;
            this.props.handleRefund(orderId);
            Toast.success("提交成功！", 1);
          }
        }
      ],
      "default",
      ""
    );
  };
  choicePay = () => {
    console.log(456789);
    const {
      data: { currentPrice },
      quantity
    } = this.props;
    const totalPrice = (currentPrice * quantity).toFixed(1);

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
               
                const orderId = this.props.data.id;
                if (login === totalPrice) {
                  
                  this.props.handleType(orderId);
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
          onPress: () =>
            prompt(
              "支付宝支付",
              `请支付：${totalPrice} 元`,
               (login, password) => {
               
                const orderId = this.props.data.id;
                if (login === totalPrice) {
                  
                  this.props.handleType(orderId);
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
      ]
    );
  };
  renderComment() {
    const id = this.props.data.id;
    let idObj = this.props.commentAll[id];

    let arr = [];

    for (let i in idObj) {
      arr.push(idObj[i]);
    }

    return arr.map(item => {
      const normalizeDate = () => {
        let time = item.id;

        time = new Date(time);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        let time1 = [year, month, date].join("-");
        let time2 = [hour, minute, second].join(":");
        let time3 = [time1, time2].join("  ");
        return time3;
      };
      const renderstars = () => {
        const starsLength = item.stars;
        let showstars = "";
        for (let i = 0; i < starsLength; i++) {
          showstars = showstars + "★";
        }
        return showstars;
      };
      const handleDeleteComment = () => {
        alert("确定删除该条评论吗", "", [
          {
            text: "取消",
            onPress: () => console.log("cancel"),
            style: "default"
          },
          {
            text: "确定",
            onPress: () => {
              this.props.deleteComment(item.id, this.props.data.id);
              Toast.success("删除成功！", 1);
            }
          }
        ]);
      };

      // this.time = idObj[key].id
      // this.stars = idObj[key].stars
      return (
        <div key={item.id} className="orderItem__commentshow">
          <p className="username__time">
            <span className="username">{this.props.username}</span>
            <span className="time">{normalizeDate()}</span>
            <span className="stars">
              <span>评分：</span>
              {renderstars()}
            </span>
          </p>
          <p className="commentText">{item.content}</p>
          <span className="deleteComment" onClick={handleDeleteComment}>
            删除
          </span>
        </div>
      );
    });
    // console.log(this.props.commentAll)
  }

  //渲染订单评价区域的DOM
  renderEditArea() {
    return (
      <div className="orderItem__commentContainer">
        <textarea
          className="orderItem__comment"
          onChange={this.handleCommentChange}
          value={this.props.comment}
        />
        {this.renderStars()}
        <button
          className="orderItem__commentBtn"
          onClick={this.onSubmitComment}
        >
          提交
        </button>
        <button
          className="orderItem__commentBtn"
          onClick={this.props.onCancelComment}
        >
          取消
        </button>
      </div>
    );
  }

  renderStars() {
    const { stars } = this.props;
    return (
      <div>
        {[1, 2, 3, 4, 5].map((item, index) => {
          const lightClass = stars >= item ? "orderItem__star--light" : "";
          return (
            <span
              className={"orderItem__star " + lightClass}
              key={index}
              onClick={this.props.onStarsChange.bind(this, item)}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps !== this.props) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  componentDidUpdate() {
    // this.showComment();
  }
  showComment = () => {
    if (this.props.data.commentId) {
      console.log(45688);
    }
  };
  //   showComment=()=>{
  //     if(this.getAllComent()){
  //   this.props.setCommentAll(123)
  //   // console.log(this.getAllComent())
  // }
  //   }
  // getAllComent = () => {
  //   const {
  //     comments,
  //     data: { commentId }
  //   } = this.props;

  //   console.log(comments, commentId);
  //   const newcomment = comments[commentId];
  //   this.props.setCommentAll(newcomment);

  // if (commentId&&comments) {
  //   for (let key in comments) {
  //     if (comments[key].id === commentId) {
  //       // this.props.setCommentAll(comments[key])
  //       return comments[key]

  //     }
  //   }
  // }
  // };
  onSubmitComment = () => {
    if (!this.props.comment) {
      Toast.offline("评论内容不能为空", 1);
    } else if (!this.props.stars) {
      Toast.offline("大哥，给我评个分吧", 1);
    } else {
      this.props.onSubmitComment();
      setTimeout(() => {
        const {
          data: { commentId, id }
        } = this.props;

        this.props.setCommentAll(commentId, id);
      }, 500);
    }
  };
  //评价按钮点击事件
  handleComment = () => {
    const {
      data: { id }
    } = this.props;
    this.props.onComment(id);
    // console.log(this.props.isCommenting)
    // this.getAllComent()
  };

  //评价信息发生变化
  handleCommentChange = e => {
    this.props.onCommentChange(e.target.value);
  };

  //删除订单
  handleRemove = () => {
    const {
      data: { id }
    } = this.props;
    this.props.onRemove(id);
  };
}

export default OrderItem;
