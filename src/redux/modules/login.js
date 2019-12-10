const createCode = () => {
  let cook = "";
  const codeLength = 6; //验证码的长度
  const random = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "n",
    "m",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];

  //随机数
  for (let i = 0; i < codeLength; i++) {
    //循环操作
    let index = Math.floor(Math.random() * 62); //取得随机数的索引（0~35）
    cook += random[index]; //根据索引取得随机数加到cook上
  }
  return cook; //把cook值赋给验证码
};
const initialState = {
  username: localStorage.getItem("username") || "",
  password: "",
  
  phoneNumber: localStorage.getItem("phone") || "",
  isRegister: false,
  isFetching: false,
  noRegister: "3",
  verification: createCode(),
  status: localStorage.getItem("login") || false //登录态标识
};

// action types
export const types = {
  LOGIN_REQUEST: "LOGIN/LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN/LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN/LOGIN_FAILURE",
  LOGOUT: "LOGIN/LOGOUT",
  SET_USERNAME: "LOGIN/SET_USERNAME",
  SET_PASSWORD: "LOGIN/SET_PASSWORD",
  CHANGE_PAGE: "LOGIN/CHANGE_PAGE",
  CHANGE_VERIFICATION: "LOGIN/CHANGE_VERIFICATION",
  CONFIRM_REGISTER: "LOGIN/CONFIRM_REGISTER",
  SET_PHONENUMBER: "LOGIN/SET_PHONENUMBER",
  CHANGE_REGISTER: "LOGIN/CHANGE_REGISTER",
  
};

// action creators
export const actions = {
  // 异步action, 执行登录

  login: () => {
    return (dispatch, getState) => {
      const { username, status, phoneNumber } = getState().login;
      dispatch(loginRequest());
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch(loginSuccess());
          localStorage.setItem("username", username);
          localStorage.setItem("phone", phoneNumber);
          localStorage.setItem("login", status);
        }, 1000);
      });
    };
  },
  noRegister: (tips) => {
    console.log(345)
    return {
      type: types.CHANGE_REGISTER,
      tips
    };
  },

  changeVerification: () => {
    return (dispatch, getState) => {
      const verification = createCode();
      dispatch({
        type: types.CHANGE_VERIFICATION,
        verification
      });
    };
  },
  logout: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("phone");
    localStorage.removeItem("login");
    return {
      type: types.LOGOUT
    };
  },
  setUsername: username => ({
    type: types.SET_USERNAME,
    username
  }),
  setPassword: password => ({
    type: types.SET_PASSWORD,
    password
  }),
  setPhoneNumber: phoneNumber => ({
    type: types.SET_PHONENUMBER,
    phoneNumber
  }),
  changePage: () => ({
    type: types.CHANGE_PAGE
  }),
  confirm: error => ({
    type: types.CONFIRM_REGISTER,
    error
  })
};

const loginRequest = () => ({
  type: types.LOGIN_REQUEST
});

const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS
});

// const loginFailure = error => ({
//   type: types.LOGIN_FAILURE,
//   error
// });

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, isFetching: true };
    case types.LOGIN_SUCCESS:
      return { ...state, isFetching: false, status: true };
    case types.LOGIN_FAILURE:
      return { ...state, isFetching: false };
    case types.LOGOUT:
      return { ...state, status: false, username: "", password: "", phoneNumber: "" };
    case types.SET_USERNAME:
      return { ...state, username: action.username };
    case types.SET_PASSWORD:
      return { ...state, password: action.password };
    case types.CHANGE_PAGE:
      return { ...state, isRegister: !state.isRegister };
    case types.CHANGE_VERIFICATION:
      return { ...state, verification: action.verification };
    case types.SET_PHONENUMBER:
      return { ...state, phoneNumber: action.phoneNumber };
    case types.CHANGE_REGISTER:
      return { ...state, noRegister: action.tips };
   
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getUsername = state => state.login.username;
export const verification = state => state.login.verification;
export const getPassword = state => state.login.password;
export const noRegister = state => state.login.noRegister;
export const isLogin = state => state.login.status;
export const isRegister = state => state.login.isRegister;
export const getPhoneNumber = state => state.login.phoneNumber;

