import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  loading: false,
  currentTab: 'profile',
  tipOpen: false,
  tipMessage: ''
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
      case "UPDATE_PROFILE_SUCCESSFULLY":
          return {
              ...state,
              tipOpen: true
          };
      case "CREAT_NEW_ADDRESS_SUCCESSFULLY":
          return {
              ...state,
              tipOpen: true,
              tipMessage: '添加新收货地址成功！'
          };
      case "DELETE_ADDRESS_SUCCESSFULLY":
          return {
              ...state,
              tipOpen: true,
              tipMessage: '删除收货地址成功！'
          };
      case "CLOSE_TIP":
          return {
              ...state,
              tipOpen: false
          };
      default:
      return state;
  }
}