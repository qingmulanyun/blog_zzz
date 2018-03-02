import { fetchingServerData } from './rootActions'

export function handleChangeItemQuantity(q){
    return {
        type: "HANDLE_CHANGE_ITEM_QUANTITY",
        data: q
    }
}

export function handleAddItemToCart(itemId){
    return  function(dispatch, getState) {
        const currentState = getState();
        const itemQuantity = currentState.cart.itemQuantity;
        $.ajax({
            url: '/carts/api/add_item',
            dataType: 'json',
            type: 'POST',
            data: {
                item_id: itemId,
                item_quantity: itemQuantity
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(addItemToCartSuccessfully(data));
            }.bind(this),
            error: function(xhr, status, err) {
                if(xhr.status === 401){
                    dispatch(requireLogin());
                }
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function requireLogin() {
    return {
        type: "REQUIRE_LOGIN"
    }
}

export function loginAndAddItemToCart(email, password, callback_url) {
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
                const tempArray = data.redirect_url.split("/");
                const itemId = tempArray[tempArray.length - 1];
                dispatch(fetchingServerData(false));
                window.location.href = data.redirect_url;
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr.status)
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function addItemToCartSuccessfully(data){
    return {
        type: "ADD_ITEM_TO_CART_SUCCESSFULLY",
        data: {
            addedItem: data.item,
            addedQuantity: data.added_quantity
        }
    }
}

export function handleCloseCartConfirmDialog() {
    return  function(dispatch, getState) {
        dispatch(handleShowCartItemsListPage());
        dispatch(closeCartConfirmDialog());
    }
}

export function closeCartConfirmDialog() {
    return {
        type: "CLOSE_CART_CONFIRM_DIALOG"
    }
}


export function toggleItemsListPage(boolean) {
    return {
        type: "TOGGLE_ITEMS_LIST_PAGE",
        data: boolean
    }
}

export function handleShowCartItemsListPage() {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/carts/api/cart_items',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(toggleItemsListPage(true))
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(insertCartItems(data));
                dispatch(fetchingServerData(false));
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr.status);
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function insertCartItems(data) {
    return {
        type: "INSERT_CART_ITEMS",
        data: data
    }
}

export function handleDeleteCartItems(cartItemId){
    return  function(dispatch, getState) {
        $.ajax({
            url: '/carts/api/destroy_item',
            dataType: 'json',
            type: 'DELETE',
            data: {
                cart_item_id: [cartItemId]
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(insertCartItems(data));
                dispatch(fetchingServerData(false));
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr.status);
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}