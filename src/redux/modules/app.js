const initialState = {
  error: null,
  setLength:false
}

export const types = {
  CLEAR_ERROR: "APP/CLEAR_ERROR",
  SET_SHOW:"APP/SET_SHOW"
}

//action creators
export const actions = {
  clearError: () => ({
    type: types.CLEAR_ERROR
  }),
  showLength:()=>({
    type:types.SET_SHOW
  })
}

const reducer = (state = initialState, action) => {
  const { type, error } = action
  if (type === types.CLEAR_ERROR) {
    return {...state, error: null}
  } else if (error) {
    return {...state, error: error}
  }else if(type===types.SET_SHOW){
    return{...state,setLength:!state.setLength}
  }
  return state;
}

export default reducer;

// selectors
export const getError = (state) => {
  return state.app.error
}
export const getLength=state=>{
  return state.app.setLength
}