const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';
import { fetchingServerData } from './rootActions'

export const createGridAction = (partialStateName, partialStateValue) => ({
    type: GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
});

export function fetchOwnCartItems() {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/carts/api/cart_items',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertOwnCartItemsList(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}


export function deleteItems(ids) {
    return  function(dispatch, getState) {
        const currentState = getState();
        $.ajax({
            url: '/carts/api/destroy_item',
            dataType: 'json',
            type: 'DELETE',
            data: {
                cart_item_id: ids
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(fetchOwnCartItems());
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function handleCartItemQuantityChange(cartItemId, quantity) {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/carts/api/update_cart_item',
            dataType: 'json',
            type: 'PATCH',
            data: {
                id: cartItemId,
                quantity: quantity
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertOwnCartItemsList(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}


export function insertOwnCartItemsList(data) {
    return {
        type: 'INSERT_OWN_CART_ITEMS_LIST',
        data: data
    }
}

export function handleSubmitOrders(ids) {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/orders/api/create',
            dataType: 'json',
            type: 'POST',
            data: {
                cart_items_ids: ids
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                window.location.href = '/orders/my_orders';
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}