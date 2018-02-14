const initialState = {
  currentTab: 'public',
  createItemPageOpen: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case "TOGGLE_CREATE_ITEM_PAGE":
          return {
              ...state,
              createItemPageOpen: !state.createItemPageOpen
          };
      default:
      return state;
  }
}