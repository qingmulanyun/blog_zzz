export function fetchAllItems() {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/items/api/all_items',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(fetchAllItemsSuccessfully(data));
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

export function fetchAllItemsSuccessfully(data) {
    return {
        type: "FETCH_ALL_ITEMS_SUCCESSFULLY",
        data: data
    }
}