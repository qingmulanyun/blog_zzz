export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

const gridInitialState = {
    columns: [
        { name: 'image', title: ' ', width: 60 },
        { name: 'item_info', title: '商品信息', width: 300 },
        { name: 'price', title: '单价', width: 100 },
        { name: 'quantity', title: '数量' , width: 100 },
        { name: 'total_price', title: '实付款' , width: 100 },
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
    if (action.type === 'INSERT_BUYER_ORDERS') {
        const nextState = Object.assign(
            {},
            state,
            {
                rows: action.data,
            },
        );
        return nextState;
    }
    return state;
};