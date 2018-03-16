export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

const gridInitialState = {
    columns: [
        { name: 'created_at', title: '下单时间', width: 150 },
        { name: 'id', title: '订单号', width: 300 },
        { name: 'shop_name', title: '店铺名称', width: 150 },
        { name: 'status', title: '交易状态', width: 150 },
        { name: 'delivery_track_number', title: '快递单号', width: 150 },
        { name: 'actions', title: '交易操作', width: 350 },
    ],
    rows: [],
    sorting: [],
    grouping: [],
    expandedGroups: [],
    selection: [],
    expandedRows: [1],
    filters: [],
    currentPage: 0,
    pageSize: 10,
    allowedPageSizes: [10, 20, 40],
    columnOrder: [ 'created_at', 'id', 'shop_name', 'status', 'delivery_track_number', 'actions'],
    columnWidths:
        [
            { columnName: 'created_at', width: 150 },
            { columnName: 'id', width: 300 },
            { columnName: 'shop_name', width: 150 },
            { columnName: 'status', width: 150 },
            { columnName: 'delivery_track_number', width: 150 },
            { columnName: 'actions', width: 350 },

        ],
    type: 'all',
    itemsColumns: [
        { name: 'image', title: ' ' },
        { name: 'item_info', title: '商品' },
        { name: 'price', title: '单价' },
        { name: 'quantity', title: '数量' },
        { name: 'total_price', title: '实付款(含运费)' },
    ],
    itemsColumnsExtensions: [
        { columnName: 'image', width: 60 },
        { columnName: 'item_info', width: 300 },
        { columnName: 'price', width: 150 },
        { columnName: 'quantity', width: 150 },
        { columnName: 'total_price', width: 150 },
    ],
    deliveryTracking: [],
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
    if (action.type === 'INSERT_DELIVERY_TRACK') {
        const nextState = Object.assign(
            {},
            state,
            {
                deliveryTracking: action.data,
            },
        );
        return nextState;
    }
    return state;
};