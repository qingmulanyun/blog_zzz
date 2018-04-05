const initialState = {
    loading: false,
    data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "FETCHING_SEVER_DATA":
          return {
              ...state,
              loading: action.isFetching
          };
      case "INSERT_REPORT_DATA":
          return {
              ...state,
              data: action.data
          };
      default:
      return state;
  }
}