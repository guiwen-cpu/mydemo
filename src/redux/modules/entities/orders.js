import createReducer from "../../../utils/createReducer";
import { getProductDetail } from "./products";

export const schema = {
  name: "orders",
  id: "id"
};

export const USED_TYPE = 1; // 已消费
export const TO_PAY_TYPE = 2; //待付款
export const AVAILABLE_TYPE = 3; //可使用
export const REFUND_TYPE = 4; //退款

export const types = {
  //删除订单
  DELETE_ORDER: "ORDERS/DELETE_ORDER",
  //新增评价
  ADD_COMMENT: "ORDERS/ADD_COMMENT",
  //增加订单
  ADD_ORDER: "ORDERS/ADD_ORDER",

  CHANGE_TYPE: "CHANGE_TYPE",
  REFUND_TYPE: "REFUND_TYPE",
  SET_QUANTITY: "ORDER/SET_QUANTITY"
};

let orderIdCounter = 10;

export const actions = {
  //删除订单
  deleteOrder: orderId => ({
    type: types.DELETE_ORDER,
    orderId
  }),
  //新增评价
  addComment: (orderId, commentId) => ({
    type: types.ADD_COMMENT,
    orderId,
    commentId
  }),
  //增加订单
  addOrder: order => {
    const orderId = `o-${orderIdCounter++}`;
    return {
      type: types.ADD_ORDER,
      orderId,
      order: { ...order, id: orderId }
    };
  },
  setQuantity: (quantity, productId, orderId) => {
    return (dispatch, getState) => {
      const product = getProductDetail(getState(), productId);
      console.log(product)
      const totalPrice = (product.currentPrice * quantity).toFixed(1);
      const text1 = `${quantity}张 | 总价：${totalPrice}`;
      const text2 = product.validityPeriod;
      const text = [text1, text2];
      
      dispatch({ type: types.SET_QUANTITY, orderId, text });
    };
  }
};

const normalReducer = createReducer(schema.name);

const reducer = (state = {}, action) => {
  if (action.type === types.ADD_COMMENT) {
    return {
      ...state,
      [action.orderId]: {
        ...state[action.orderId],
        commentId: action.commentId
      }
    };
  } else if (action.type === types.ADD_ORDER) {
    return {
      ...state,
      [action.orderId]: action.order
    };
  } else if (action.type === types.DELETE_ORDER) {
    const { [action.orderId]: deleteOrder, ...restOrders } = state;
    return restOrders;
  } else if (action.type === types.CHANGE_TYPE) {
    return {
      ...state,
      [action.orderId]: { ...state[action.orderId], type: AVAILABLE_TYPE }
    };
  } else if (action.type === types.REFUND_TYPE) {
    return {
      ...state,
      [action.orderId]: { ...state[action.orderId], type: REFUND_TYPE }
    };
  } else if (action.type === types.SET_QUANTITY) {
  
    return {
      ...state,
      [action.orderId]: { ...state[action.orderId], text: action.text }
    };
  } else {
    return normalReducer(state, action);
  }
};

export default reducer;

// selectors
export const getOrderById = (state, id) => {
  return state.entities.orders[id];
};
