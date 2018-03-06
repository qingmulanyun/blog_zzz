const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';
import { fetchingServerData } from './rootActions'

export const createGridAction = (partialStateName, partialStateValue) => ({
    type: GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
});

export function fetchSellerOrders() {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/orders/api/seller_orders',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertSellerOrders(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function insertSellerOrders(data) {
    return {
        type: 'INSERT_SELLER_ORDERS',
        data: data
    }
}

export function cancelOrder(orderId) {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/orders/api/cancel',
            dataType: 'json',
            type: 'PATCH',
            data: {
                id: orderId
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertBuyerOrders(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}