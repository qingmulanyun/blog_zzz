const initialState = {
    items: [],
    loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "FETCH_ALL_ITEMS_SUCCESSFULLY":
          return {
              ...state,
              items: action.data
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