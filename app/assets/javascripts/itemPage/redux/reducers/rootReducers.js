const initialState = {
    item: {},
    loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "FETCH_ITEM_SUCCESSFULLY":
          return {
              ...state,
              item: action.data
          };
      case "FETCHING_SEVER_DATA":
          return {
              ...state,
              loading: action.isFetching
          };
      default:
      return state;
  }
}