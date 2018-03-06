const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';
import { fetchingServerData } from './rootActions'

export const createGridAction = (partialStateName, partialStateValue) => ({
    type: GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
});

export function fetchBuyerOrders() {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/orders/api/buyer_orders',
            dataType: 'json',
            type: 'GET',
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

export function insertBuyerOrders(data) {
    return {
        type: 'INSERT_BUYER_ORDERS',
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