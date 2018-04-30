export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

const gridInitialState = {
    columns: [
        { name: 'created_at', title: '下单时间', width: 100 },
        { name: 'id', title: '订单号', width: 300 },
        { name: 'buyer_name', title: '买家', width: 100 },
        { name: 'status', title: '交易状态', width: 150 },
        { name: 'delivery_track_number', title: '运单号', width: 200 },
        { name: 'actions', title: '交易操作', width: 350 },
        { name: 'delivery_address', title: '收货地址', width: 300 },
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
    columnOrder: [ 'buyer_name', 'created_at', 'status', 'actions', 'delivery_track_number', 'delivery_address', 'id' ],
    columnWidths:
        [
            { columnName: 'created_at', width: 100 },
            { columnName: 'id', width: 300 },
            { columnName: 'buyer_name', width: 100 },
            { columnName: 'status', width: 150 },
            { columnName: 'delivery_track_number', width: 200 },
            { columnName: 'actions', width: 350 },
            { columnName: 'delivery_address', width: 300 },
        ],
    type: 'all',
    itemsColumns: [
        { name: 'image', title: ' ' },
        { name: 'item_info', title: '商品' },
        { name: 'price', title: '单价' },
        { name: 'quantity', title: '数量' },
        { name: 'total_price', title: '应付款（含运费）' },
    ],
    itemsColumnsExtensions: [
        { columnName: 'image', width: 60 },
        { columnName: 'item_info', width: 300 },
        { columnName: 'price', width: 100 },
        { columnName: 'quantity', width: 100 },
        { columnName: 'total_price', width: 150 },
    ],
    deliveryTracking: []
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
    if (action.type === 'INSERT_SELLER_ORDERS') {
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