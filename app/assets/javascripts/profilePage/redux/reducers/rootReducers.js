import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  loading: false,
  currentTab: 'profile',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case LOCATION_CHANGE:
          let featureTitle = action.payload.pathname.split("/")[2];
          return {
              ...state,
              currentTab: featureTitle,
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