const initialState = {
    loading: false,
    allWishProducts: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "FETCHING_SEVER_DATA":
          return {
              ...state,
              loading: action.isFetching
          };
      case "FETCH_WISH_PRODUCTS_INFO_SUCCESSFULLY":
          return {
              ...state,
              allWishProducts: action.data
          };
      default:
      return state;
  }
}