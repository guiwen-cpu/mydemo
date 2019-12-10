import url from "../../utils/url";
import { FETCH_DATA } from "../middleware/api";
import { schema } from "./entities/products";

export const params = {
  PATH_RECOMMEND: "recommend",
  PAGE_SIZE_RECOMMEND: 5
};
export const types = {
  FETCH_RECOMMEND_REQUEST: "DISCOVER/FETCH_RECOMMEND_REQUEST",
  FETCH_RECOMMEND_SUCCESS: "DISCOVER/FETCH_RECOMMEND_SUCCESS",
  FETCH_RECOMMEND_FAILURE: "DISCOVER/FETCH_RECOMMEND_FAILURE"
};
const initialState = {
  recommend: {
    isFetching: false,
    pageCount: 0,
    ids: []
  }
};
export const actions = {
  loadRecommend: () => {
    return (dispatch, getState) => {
      const { pageCount } = getState().recommend;
      const rowIndex = pageCount * params.PAGE_SIZE_RECOMMEND;
      const endpoint = url.getProductList(
        params.PATH_RECOMMEND,
        rowIndex,
        params.PAGE_SIZE_RECOMMEND
      );
      return dispatch(fetchRecomend(endpoint));
    };
  }
};
const fetchRecomend = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_RECOMMEND_REQUEST,
      types.FETCH_RECOMMEND_SUCCESS,
      types.FETCH_RECOMMEND_FAILURE
    ],
    endpoint,
    schema
  }
 
});
const reducer = (state = initialState.recommend, action) => {
  switch (action.type) {
    case types.FETCH_RECOMMEND_REQUEST:
      return { ...state, isFetching: true };

    case types.FETCH_RECOMMEND_SUCCESS:
    console.log(action.response.ids)
      return {
        ...state,
        isFetching: false,
        pageCount: state.pageCount + 1,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_RECOMMEND_FAILURE:
      return {
        ...state,
        isFetching: false
      };

    default:
      return state;
  }

}
export const getRecommends=state=>{
    return state.recommend.ids.map(id=>{
        return state.entities.products[id]
    })
}
export const getPageCountOfRecommends = state => {
  return state.recommend.pageCount
}
export default reducer;
