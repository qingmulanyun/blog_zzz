const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

export const createGridAction = (partialStateName, partialStateValue) => ({
    type: GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
});

export function switchBuildComponent(tab_index) {
    return {
        type: 'SWITCH_BUILD_COMPONENT',
        data: tab_index
    }
}

export function fetchOwnItems() {
    return  function(dispatch, getState) {
        const currentState = getState();
        $.ajax({
            url: '/items/api/seller_items',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertOwnItemsList(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function fetchingServerData(bool) {
    return {
        type: 'FETCHING_SEVER_DATA',
        isFetching: bool
    }
}

export function insertOwnItemsList(data) {
    return {
        type: 'INSERT_OWN_ITEMS_LIST',
        data: data
    }
}

export function handleInputChange(name, value) {
    return {
        type: "HANDLE_INPUT_CHANGE",
        data: {
            [name]: value
        }
    }
}

export function submitNewItemForm(data) {
    return  function(dispatch, getState) {
        const currentState = getState();
        $.ajax({
            url: '/items/api/create_seller_item',
            dataType: 'json',
            type: 'POST',
            data: data,
            processData : false,
            contentType: false,
            cache : false,
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(submitNewItemSuccessfully());
                dispatch(fetchingServerData(false));
                dispatch(fetchOwnItems());
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function submitNewItemSuccessfully(){
    return {
        type: "SUBMIT_NEW_ITEM_SUCCESSFULLY"
    }
}

export function deleteItems(ids) {
    return  function(dispatch, getState) {
        const currentState = getState();
        $.ajax({
            url: '/items/api/delete_items',
            dataType: 'json',
            type: 'DELETE',
            data: {
                ids: ids
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(fetchOwnItems());
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}