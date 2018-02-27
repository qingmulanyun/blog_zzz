export function fetchItem(id) {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/items/api/show_item',
            dataType: 'json',
            type: 'GET',
            data: {
              id: id
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(fetchItemSuccessfully(data));
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

export function fetchItemSuccessfully(data) {
    return {
        type: "FETCH_ITEM_SUCCESSFULLY",
        data: data
    }
}

export function handleCloseLoginDialog() {
    return {
        type: "HANDLE_CLOSE_LOGIN_DIALOG"
    }
}

export function login(email, password, callback_url) {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/users/sign_in',
            dataType: 'json',
            type: 'POST',
            data: {
                user: {
                    email: email,
                    password: password,
                    callback: callback_url
                }
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                // dispatch(fetchShopInfoSuccessfully(data));
                console.log(data)
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr.status)
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}