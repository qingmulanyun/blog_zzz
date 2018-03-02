export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

const gridInitialState = {
    columns: [
        { name: 'image', title: ' ', width: 60 },
        { name: 'item_info', title: '商品信息', width: 300 },
        { name: 'price', title: '单价', width: 100 },
        { name: 'quantity', title: '数量' , width: 100 },
        { name: 'total_price', title: '金额' , width: 100 },
        { name: 'shop_name', title: '店铺', width: 150 },
        { name: 'actions', title: '操作', width: 100 },
    ],
    rows: [],
    sorting: [],
    grouping: [{ columnName: "shop_name" }],
    expandedGroups: [],
    selection: [],
    expandedRows: [1],
    filters: [],
    currentPage: 0,
    pageSize: 10,
    allowedPageSizes: [10, 20, 40],
    columnOrder: [ 'image', 'item_info', 'price', 'quantity', 'total_price', 'shop_name', 'actions'],
    columnWidths:
        [
            { columnName: 'shop_name', width: 150 },
            { columnName: 'image', width: 60 },
            { columnName: 'item_info', width: 300 },
            { columnName: 'price', width: 100 },
            { columnName: 'quantity', width: 100 },
            { columnName: 'total_price', width: 100 },
            { columnName: 'actions', width: 100 },

        ],
    type: 'all',
    snackBar: {
        open: false,
        message: ''
    }
};

export const gridReducer = (state = gridInitialState, action) => {
    if (action.type === GRID_STATE_CHANGE_ACTION) {
        const nextState = Object.assign(
            {},
            state,
            {
                [action.partialStateName]: action.partialStateValue,
            },
        );
        return nextState;
    }
    if (action.type === 'FETCHING_SEVER_DATA') {
        const nextState = Object.assign(
            {},
            state,
            {
                loading: action.isFetching,
            },
        );
        return nextState;
    }
    if (action.type === 'INSERT_OWN_CART_ITEMS_LIST') {
        const nextState = Object.assign(
            {},
            state,
            {
                rows: action.data,
                selection: []
            },
        );
        return nextState;
    }
    if (action.type === 'DO_CHANGE_TEMPLATES_LIST_TYPE_ACTION') {
        const nextState = Object.assign(
            {},
            state,
            {
                type: action.value,
            },
        );
        return nextState;
    }
    if (action.type === 'CLOSE_SNACK_BAR') {
        const nextState = Object.assign(
            {},
            state,
            {
                snackBar: {
                    open: false,
                    message: ''
                }
            },
        );
        return nextState;
    }
    if (action.type === 'OPEN_SNACK_BAR') {
        const nextState = Object.assign(
            {},
            state,
            {
                snackBar: {
                    open: true,
                    message: action.message
                }
            },
        );
        return nextState;
    }
    if (action.type === 'HANDLE_INPUT_CHANGE') {
        var originCurrentItem = state.currentItem;

        const nextState = Object.assign(
            {},
            state,
            {
                currentItem: Object.assign({}, originCurrentItem, action.data)
            },
        );
        return nextState;
    }
    if (action.type === 'SUBMIT_NEW_ITEM_SUCCESSFULLY') {
        const nextState = Object.assign(
            {},
            state,
            {
                currentItem: gridInitialState.currentItem
            },
        );
        return nextState;
    }
    return state;
};