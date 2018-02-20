const initialState = {
    items: [],
    loading: false,
    ads:[]
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "FETCH_HOME_PAGE_INFO_SUCCESSFULLY":
          return {
              ...state,
              items: action.data.items,
              ads: action.data.ads
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