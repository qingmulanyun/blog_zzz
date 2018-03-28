const initialState = {
    loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "FETCHING_SEVER_DATA":
          return {
              ...state,
              loading: action.isFetching
          };
      default:
      return state;
  }
}