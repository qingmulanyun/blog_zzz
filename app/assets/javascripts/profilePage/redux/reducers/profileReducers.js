import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
    id: '',
    name: '',
    email: '',
    phone: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case LOCATION_CHANGE:
          return {
              ...initialState
          };
      case "INSERT_PROFILE_INFO":
          return {
              ...state,
              id: action.data.id,
              name: action.data.name,
              email: action.data.email,
              phone: action.data.phone
          };
      case "HANDLE_CHANGE_USER_NAME":
          return {
              ...state,
              name: action.data,
          };
      case "HANDLE_CHANGE_USER_INFO":
          return {
              ...state,
              [action.key]: action.value,
          };
      default:
      return state;
  }
}