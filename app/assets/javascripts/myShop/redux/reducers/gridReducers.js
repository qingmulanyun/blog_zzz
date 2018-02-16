export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

const gridInitialState = {
    columns: [
        { name: 'name', title: '名称', width: 150 },
        { name: 'price', title: '价格', width: 100 },
        { name: 'cost', title: '成本' , width: 100 },
        { name: 'description', title: '简介' , width: 300 },
        { name: 'status', title: '状态', width: 150 },
        { name: 'createdAt', title: '创建时间', width: 150 },
        { name: 'updatedAt', title: '上次更新时间 ', width: 150 }
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
    columnOrder: ['name','price', 'cost', 'description', 'status',  'createdAt', 'updatedAt'],
    columnWidths:
        [
            { columnName: 'name', width: 150 },
            { columnName: 'price', width: 100 },
            { columnName: 'cost', width: 100 },
            { columnName: 'description', width: 300 },
            { columnName: 'status', width: 100 },
            { columnName: 'createdAt', width: 150 },
            { columnName: 'updatedAt', width: 150 }
        ],
    loading: true,
    type: 'all',
    snackBar: {
        open: false,
        message: ''
    },
    currentItem: {
        id: '',
        name: '',
        price: '',
        original_price: '',
        transport_cost: '',
        description: '',
        status: 'New',
        image: ''
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
    if (action.type === 'INSERT_OWN_ITEMS_LIST') {
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