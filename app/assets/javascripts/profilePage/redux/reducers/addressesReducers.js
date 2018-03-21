import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
    addresses: [],
    currentAddress: {
        country: '',
        province: '',
        city: '',
        area: '',
        addressLine: '',
        name: '',
        phone: ''

    }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "INSERT_ADDRESSES_INFO":
          return {
              ...state,
              addresses: action.data
          };
      default:
      return state;
  }
}