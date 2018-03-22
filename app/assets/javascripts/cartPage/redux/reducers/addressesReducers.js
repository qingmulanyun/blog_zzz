const initialState = {
    addresses: [],
    deliveryAddress: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "INSERT_ADDRESSES_INFO":
          return {
              ...state,
              addresses: action.data
          };
      case "SELECT_DELIVERY_ADDRESS":
          return {
              ...state,
              deliveryAddress: action.data
          };
      default:
      return state;
  }
}