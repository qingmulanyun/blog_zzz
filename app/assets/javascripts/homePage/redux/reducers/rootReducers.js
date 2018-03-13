const initialState = {
    items: [],
    loading: false,
    ads:[],
    starredItems: [],
    searchKeyWords: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "FETCH_HOME_PAGE_INFO_SUCCESSFULLY":
          return {
              ...state,
              items: action.data.items,
              ads: action.data.ads,
              starredItems: action.data.starred_items
          };
      case "FETCHING_SEVER_DATA":
          return {
              ...state,
              loading: action.isFetching
          };
      case "SEARCH_ITEMS_WITH_KEY_WORDS":
          return {
              ...state,
              items: action.data
          };
      case "STORE_KEY_WORDS":
          return {
              ...state,
              searchKeyWords: action.data
          };
      default:
      return state;
  }
}