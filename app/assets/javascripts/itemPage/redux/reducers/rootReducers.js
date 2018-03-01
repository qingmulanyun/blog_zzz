const initialState = {
    item: {},
    loading: false,
    requireLogin: '',
    isLogin: false,
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
      case "REQUIRE_LOGIN":
          return {
              ...state,
              requireLogin: "required"
          };
      case "HANDLE_CLOSE_LOGIN_DIALOG":
          return {
              ...state,
              requireLogin: initialState.requireLogin
          };
      default:
      return state;
  }
}