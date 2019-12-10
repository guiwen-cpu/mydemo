import { getProductDetail } from "./entities/products"
import { actions as orderActions, AVAILABLE_TYPE,TO_PAY_TYPE } from "./entities/orders"

export const types = {
  SET_ORDER_QUANTITY: "PURCHASE/SET_ORDER_QUANTITY",
  CLOSE_TIP: "PURCHASE/CLOSE_TIP",
  //提交订单相关
  SUBMIT_ORDER_REQUEST: "PURCHASE/SUBMIT_ORDER_REQUEST",
  SUBMIT_ORDER_SUCCESS: "PURCHASE/SUBMIT_ORDER_SUCCESS",
  SUBMIT_ORDER_FAILURE: "PURCHASE/SUBMIT_ORDER_FAILURE",
  //加入购物车
  ADD_CART_REQUEST:"PURCHASE/ADD_CART_REQUEST",
  ADD_CART_SUCCESS:"PURCHASE/ADD_CART_SUCCESS",
  ADD_CART_FAILURE:"PURCHASE/ADD_CART_FAILURE"
}

const initialState = {
  quantity: 1,
 
  showTip: false,
}


// action creators
export const actions = {
  //设置下单数量
  setOrderQuantity: quantity => ({
    type: types.SET_ORDER_QUANTITY,
    quantity
  }),
  //关闭提示弹窗
  closeTip: () => ({
    type: types.CLOSE_TIP
  }),
  //提交订单
  submitOrder: (productId) => {
    return (dispatch, getState) => {
      dispatch({type: types.SUBMIT_ORDER_REQUEST});
      return new Promise((resovle, reject) => {
        setTimeout(() => {
          const product = getProductDetail(getState(), productId);
          const quantity = getState().purchase.quantity;
          const totalPrice = (product.currentPrice * quantity).toFixed(1);
          const text1 = `${quantity}张 | 总价：${totalPrice}`;
          const text2 = product.validityPeriod;
          const order = {
            productId:productId,
            currentPrice:product.currentPrice,
            title: `${product.shop}:${product.product}`,
            orderPicUrl: product.picture,
            channel: '团购',
            statusText:'已付款',
            text: [text1, text2],
            type:AVAILABLE_TYPE
          }
          dispatch(orderActions.addOrder(order));
          dispatch({type: types.SUBMIT_ORDER_SUCCESS});
        }, 500);
      })
    }
  },
  addCart:(productId)=>{
    return (dispatch, getState) => {
      dispatch({type: types.ADD_CART_REQUEST});
      return new Promise((resovle, reject) => {
        setTimeout(() => {
          const product = getProductDetail(getState(), productId);
          const quantity = getState().purchase.quantity;
          const totalPrice = (product.currentPrice * quantity).toFixed(1);
          const text1 = `${quantity}张 | 总价：${totalPrice}`;
          const text2 = product.validityPeriod;
          const order = {
            currentPrice:product.currentPrice,
            productId:productId,
            title: `${product.shop}:${product.product}`,
            orderPicUrl: product.picture,
            channel: '团购',
            statusText:'待付款',
            text: [text1, text2],
            type:TO_PAY_TYPE
          }
          dispatch(orderActions.addOrder(order));
          // dispatch({type: types.ADD_CART_SUCCESS});
        }, 500);
      })
    }
  }
  
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case types.SET_ORDER_QUANTITY:
      return {...state, quantity: action.quantity}
    case types.CLOSE_TIP:
      return {...state}
    case types.SUBMIT_ORDER_SUCCESS:
      return {...state}
      // case types.ADD_CART_SUCCESS:
      // return {...state, showTip: true}
    default:
      return state;
  }
}

export default reducer;

//selectors
export const getQuantity = (state) => {
  return state.purchase.quantity
}

export const getTipStatus = (state) => {
  return state.purchase.showTip
}

export const getProduct = (state, id) => {
  return getProductDetail(state, id)
}