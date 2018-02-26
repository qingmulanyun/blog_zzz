const initialState = {
    item: {},
    itemQuantity: 1,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "HANDLE_CHANGE_ITEM_QUANTITY":
          return {
              ...state,
              itemQuantity: action.data
          };
      default:
      return state;
  }
}