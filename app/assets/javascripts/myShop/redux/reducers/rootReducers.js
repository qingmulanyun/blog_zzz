const initialState = {
  currentTab: 'public',
  createItemPageOpen: false,
  shop: {
    name: '',
    description: ''
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "TOGGLE_CREATE_ITEM_PAGE":
          return {
              ...state,
              createItemPageOpen: !state.createItemPageOpen
          };
      case "SUBMIT_NEW_ITEM_SUCCESSFULLY":
          return {
              ...state,
              createItemPageOpen: false
          };
      case "FETCH_SHOP_INFO_SUCCESSFULLY":
          return {
              ...state,
              shop: action.data.myshop
          }
      default:
      return state;
  }
}