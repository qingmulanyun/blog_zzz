const initialState = {
    item: {},
    itemQuantity: 1,
    addedItem: {},
    addedQuantity: 0,
    cartConfirmdialogOpen: false,
    cartItemsListOpen: false,
    cartItems: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "HANDLE_CHANGE_ITEM_QUANTITY":
          return {
              ...state,
              itemQuantity: action.data
          };
      case "ADD_ITEM_TO_CART_SUCCESSFULLY":
          return {
              ...state,
              addedItem: action.data.addedItem,
              addedQuantity: action.data.addedQuantity,
              cartConfirmdialogOpen: true
          };
      case "CLOSE_CART_CONFIRM_DIALOG":
          return {
              ...state,
              cartConfirmdialogOpen: false,
              cartItemsListOpen: true,
          };
      case "TOGGLE_ITEMS_LIST_PAGE":
          return {
              ...state,
              cartItemsListOpen: action.data
          };
      case "INSERT_CART_ITEMS":
          return {
              ...state,
              cartItems: action.data
          };
      default:
      return state;
  }
}